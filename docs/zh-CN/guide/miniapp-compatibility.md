# 小程序兼容性

> **这是权威边界。** nPlyr 运行 hikerView 兼容的小程序，但原始引擎是 **Android / Java 运行 Rhino**，而 nPlyr 在 Apple 平台上运行于 **JavaScriptCore** 且**没有 JVM**。nPlyr 原生重实现了桥接与规则 DSL，并为规则所依赖的 Java API 添加了一个 **Rhino → Java 兼容层**。本页阐明哪些保持不变、哪些*通过*兼容层（带注意事项）工作，以及哪些**不**被支持。

如果你只是想试用某条规则的用户，请先阅读[小程序](/zh-CN/guide/miniapps)。本页用于理解*为什么*某条规则可能与它在 Android 上的行为不同。

## 为什么存在边界

| | hikerView（Android） | nPlyr（Apple） |
|---|---|---|
| JS 引擎 | **Rhino**（内嵌 Java） | **JavaScriptCore** |
| 能调用 Java 吗？ | 能——`Packages.*`、`new JavaImporter()`、`with(){}` 进入任意类 | 无 JVM。一个**兼容垫片**模拟了 Java API 的*子集* |
| UI | Android `Activity` / `RecyclerView` | 原生 SwiftUI |
| 网络 / 存储 | OkGo / LitePal | URLSession / UserDefaults |

因此*逻辑*是 1:1 移植的（DSL、`fba` 桥接契约、`hiker://` 路由），但任何运行时触及 **Java** 的部分都必须重新提供——而这正是刻意的一个**经过筛选的子集**，而非完整的 JRE。

nPlyr 原生重实现了桥接与规则 DSL，并添加了一个兼容层，模拟规则所依赖的 Java API 的筛选子集。

## ✅ 完全支持——无需改动

以下与 Android 上行为一致；仅使用这些的规则会"开箱即用"：

- **规则 DSL**：`pdfh` / `pdfa` / `pd` 选择器、`parseDom`、`setHomeResult` / `setSearchResult` / `setResult`。
- **`$` 选择器层**——包括 `$(url).lazyRule(fn)`、`$(url, ordinary).lazyRule` 与 `.rule(fn)`。
- **`fy_bridge_app`（`fba`）桥**：播放、`fetch`、`post`、`request`、解析、变量存储。
- **`hiker://` 路由**，包括 `hiker://empty##…`（轻量参数载体）与 `hiker://search?s=`（聚合搜索）。
- **`col_type` 渲染**——全部 **38 种布局**，与 hikerView 自有的条目模板对齐。
- **变量映射**：`putVar` / `getVar` / `putMyVar` / `getMyVar`（内存）与 `setItem` / `getItem` / `clearItem`（持久化到本地存储）。
- **HTTP**：带请求头的 `fetch` / `post`；字符集处理（`gb2312` / `gbk` / `gb18030` → GBK，`big5` → Big5，默认 UTF-8）；`withHeaders` / `onlyHeaders` / `withStatusCode` 返回 JSON 信封。
- **User-Agent**：`auto` / `mobile` / `pc` / 自定义（当你选择跟随时，规则自身的 UA 生效）。
- **云分享**：TextDB（云2）、`cmd.im` 302 重定向（云5）、`pasteme`（云6）。
- **纯 JS 的加密**（`AES`、`CryptoJS`）；由原生桥提供时的 `RSA`。
- **`;post;` 预抓取**与 `decodeConflictStr` 解码。

## ⚠️ 通过 Java 兼容层支持（仅子集）

该层提供以下全局对象与类，但各有注意事项：

- **全局对象**：`Packages`、`java`、`JavaImporter`、`importPackage()`、`importClass()`。
- **`_base64`**——模拟 `android.util.Base64` 的语义。
- **`FileUtil`**（`com.example.hikerview.utils`）——作为*原生垫片*提供（见下文的 `toInputStream`）。
- **`javax.crypto`**：`Cipher.getInstance` / `init` / `doFinal`、`SecretKeySpec`、`IvParameterSpec`——但 **`Cipher.update` 未实现**（它会抛出一个清晰的"语料库未使用，请报告规则名称"错误，而不是静默出错）。

### 已知类列表（重点）

只垫片化了**经过筛选的一组** Java 类。列表之外的类会回退到一个**诊断桩**：它记录一次日志，并在被使用时抛出*清晰*的错误——而**不会**产生裸露的 `ReferenceError`。实践中这意味着：

- 使用常见、知名 Java 类（语料库所需的那些）的规则可以工作。
- 触及冷门或 Android 框架类的规则会以一条可操作的消息失败，指明缺失的类——请报告规则名称，以便列表得以扩充。

### `byte[]` 有两种表示

这一点尤其会让图片解密规则踩坑：

- **小缓冲区（≤ 4096 B）**→ 真正的 JS `Array<number>`，带有 `.length` *属性*（Java 数组语义），并且位运算可用（例如某类图片解密规则中常见的 `toHex` 写法）。
- **大缓冲区（图片等）**→ 一个宿主提供的字节数组对象，仅暴露 `length` / `toBase64` / `toHex` / `utf8String` / `slice`。你**无法**对大形式做逐字节访问——第三方图片解密链路依赖的是宿主方法。

### `FileUtil.toInputStream`（漫画图片解密）

在 Android 上它返回一个 Java `InputStream`。nPlyr **替换**了这条路径：它拦截一个被拦截流的标记，将其转换为从应用缓存提供的本地图片 URL，并将图片交回视图。期望*自己读取流*的规则必须依赖这个宿主转换，而不是去打开一个 `InputStream`。

### Java 文件 I/O 极简

被模拟的文件根返回 `'/'`，`fileExist` 返回布尔值——一个极小的垫片。任意的 `java.io.File` / NIO / `Zip` / `java.net.*` 操作均**不可用**；任何网络相关的事情都请使用 `fetch` / `post` 桥。

### `BigDecimal` 标度

Android 的 `BigDecimal` 保留标度（例如 `"5.0"`）。nPlyr 的小数格式化也保留标度，否则数字格式会漂移。依赖 Java `BigDecimal` 精确 `toString` 输出的规则可能会看到差异。

### Rhino 引擎语义

顶层 `const X = X = …` 的双重赋值 Rhino 可以容忍，但会让 **JavaScriptCore 崩溃**。nPlyr 运行一个脚本预处理器，使这类退化 JS 不会拖垮引擎。因此 Rhino 专属的怪癖被中和，而非被模拟。

### `hijackEnv` 的 `method_*` 桥

支持 Java 方法劫持，但原生桥必须委派给它在注入时捕获的**原始方法**——**绝不**回调进 JS 全局，否则会导致无限递归（`Maximum call stack size exceeded`）。返回 no-op 的桥会静默禁用依赖它的动态卡片。

## ❌ 不支持

- **已知列表之外的任意 Java 类**——没有 JVM，也无法反射进入 Android 框架。
- **Android UI / View / Activity / RecyclerView / Adapter** API——nPlyr 以原生方式渲染；这些没有对应物。
- **Android 权限、Content Providers、Intent 系统。**
- **部分 `javax.crypto` 路径**——`Cipher.update`，以及原生桥尚未实现的任何加密模式。
- **`java.io.File` / NIO / Zip / `java.net.*`**——请改用 `fetch` / `post` 桥。

## 报告不兼容

当某条具体规则行为异常时，请记录：

1. **规则名称**，
2. 它失败的**步骤**（首页 / 搜索 / 详情 / 解析），以及
3. **消息**——兼容层会为未列出的类记录一条清晰的一行日志。

报告这些信息，以便已知类列表与原生桥得以扩充。

## 给规则作者的建议

- 将 `java.io.File` / 流读取替换为 `fetch` / `post` 桥，或替换为返回本地图片 URL 的宿主 `toInputStream` 转换。
- 不要依赖冷门的 Java 类；优先使用 JS 或桥的等价物。
- 避免 Rhino 专属的写法，例如 `const X = X = …` 双重赋值。
- 将逐字节的图片处理保持在**小**缓冲区上；大图片请使用 `toBase64` / `toHex` / `slice` 宿主方法。

## 海阔视界官方文档

nPlyr 旨在与 hikerView 规则生态兼容。关于完整、权威的参考——规则 DSL、选择器、小程序桥接契约与编写指南——请查阅海阔视界官方文档：

- **海阔视界文档：** [https://github.com/ReflectionLab/Documents](https://github.com/ReflectionLab/Documents)

来自 hikerView 的规则作者可以使用相同的分享文本与 JSON；上述记录的兼容性边界说明了 nPlyr 在何处偏离 Android 运行时。
