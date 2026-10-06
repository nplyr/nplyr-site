# 小程序

nPlyr 可以运行 **hikerView 兼容的小程序**——也就是为 Android 应用提供动力的同一批社区规则。本页解释它们是什么，以及 nPlyr 如何执行它们。关于兼容性边界（尤其是 Java/Rhino 部分），请阅读[兼容性](/zh-CN/guide/miniapp-compatibility)页面。

## 什么是小程序？

在这个生态中，小程序是一个**规则包**（HTML + JavaScript），它告诉应用如何：

- 渲染一个分类 / 频道的**首页**，
- 执行一次**搜索**，
- 解析一个**列表**页与一个**详情**页，并
- 提取**可播放链接**交给播放器。

规则逻辑运行在 JavaScript 引擎中，并通过一个名为 **`fy_bridge_app`**（简称 **`fba`**）的桥接对象与宿主应用通信。

## nPlyr 重实现的契约

nPlyr **不**移植 hikerView 的 Android/Java UI。相反，它复用了真正承载价值的层次——**规则引擎、解析 DSL 与小程序桥接契约**——并为 Apple 平台原生重写了 UI、WebView 与网络层。

具体而言，nPlyr 提供了以下内容的原生实现：

- **规则 DSL**：`pdfh` / `pdfa` / `pd` 选择器、`parseDom`、`setHomeResult`、`setSearchResult`、`setResult`；
- **`$` 选择器兼容层**，使 `$(url).lazyRule(fn)` 与 `$(url, ordinary).lazyRule` 表现得符合预期；
- **`fy_bridge_app` / `fba` 桥**，使规则可以调用宿主功能：播放、fetch、post、解析、存储变量；
- **`hiker://` 伪协议**路由（包括作为轻量参数载体的 `hiker://empty##…`，以及用于聚合搜索的 `hiker://search?s=`）；
- **`lazyRule` / `.rule(fn)`** 执行模型、页面导航（`beginResultNavigation` / `finalizeResultPage`）以及结果栈生命周期（`onClose` 归属、`MY_PAGE` 归属）。

## 规则 DSL 要点

| API | 用途 |
|---|---|
| `setHomeResult([…])` | 输出首页网格（分类 / 频道）。 |
| `setSearchResult([…])` | 输出搜索结果。 |
| `lazyRule` / `.rule(fn)` | 运行子规则以解析列表 / 详情页。 |
| `fetch` / `post` | 带请求头的 HTTP；`withHeaders` / `onlyHeaders` / `withStatusCode` 返回 JSON 信封。 |
| `putVar` / `getVar` / `putMyVar` / `getMyVar` | 内存变量；`setItem` / `getItem` / `clearItem` 持久化到本地存储。 |
| `MY_URL` / `MY_RULE` | 当前规则的 URL 与规则主体。 |
| `AES` / `RSA` / `CryptoJS` | 规则可用的加密辅助。 |

每个列表条目都带有一个 `col_type`，nPlyr 将其映射到 SwiftUI 布局——共有 **38 种 `col_type` 布局**（如 `text_1`、`pic_19`），与 hikerView 自有的条目模板对齐，因此现有规则会如其作者所预期的那样渲染。

## 管理小程序

打开**小程序**（macOS 上的管理器窗口；iOS 上的标签 / 页面）以：

- 从分享文本或 JSON **导入**一个程序，
- **添加 / 编辑**一条规则（macOS 上是完整规则编辑器；iOS 上是一个 Push 页面），
- **重排**程序（拖拽）——首页顶行跟随该顺序，
- **删除**一个程序，
- **分享 / 云分享**一个程序（云后端：TextDB、`cmd.im` 302 重定向，以及 `pasteme`）。

**免费层级**会限制导入的小程序数量；一次性解锁会移除该限制。

## 搜索

独立的搜索窗口由你已安装且声明了 `search_url` 的规则构建而成。你可以搜索单个引擎，也可以跨所有引擎聚合搜索。

## 下一步

- [兼容性](/zh-CN/guide/miniapp-compatibility)——具体哪些 Java/Rhino 行为被支持、哪些不被支持。
- [下载与媒体库](/zh-CN/guide/downloads)——解析出的链接去向何处。
- [浏览器与嗅探器](/zh-CN/guide/browser)——抓取链接的另一条路径。

## 海阔视界官方文档

nPlyr 旨在与 hikerView 规则生态兼容。关于完整的规则与小程序参考——DSL、选择器、桥接契约与编写指南——请参阅海阔视界官方文档：

- **海阔视界文档：** [https://github.com/ReflectionLab/Documents](https://github.com/ReflectionLab/Documents)

如果你已经为 hikerView 编写规则，同样的分享文本与 JSON 在 nPlyr 中可直接导入并运行（受上述兼容性边界约束）。
