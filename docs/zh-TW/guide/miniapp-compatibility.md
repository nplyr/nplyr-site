# 小程式相容性

> **這是權威邊界。** nPlyr 執行 hikerView 相容的小程式，但原始引擎是 **Android / Java 執行 Rhino**，而 nPlyr 在 Apple 平台上執行於 **JavaScriptCore** 且**沒有 JVM**。nPlyr 原生重新實作了橋接與規則 DSL，並為規則所依賴的 Java API 添加了一個 **Rhino → Java 相容層**。本頁闡明哪些保持不變、哪些*透過*相容層（帶注意事項）工作，以及哪些**不**被支援。

如果你只是想試用某條規則的使用者，請先閱讀[小程式](/zh-TW/guide/miniapps)。本頁用於理解*為什麼*某條規則可能與它在 Android 上的行為不同。

## 為什麼存在邊界

| | hikerView（Android） | nPlyr（Apple） |
|---|---|---|
| JS 引擎 | **Rhino**（內嵌 Java） | **JavaScriptCore** |
| 能呼叫 Java 嗎？ | 能——`Packages.*`、`new JavaImporter()`、`with(){}` 進入任意類別 | 無 JVM。一個**相容墊片**模擬了 Java API 的*子集* |
| UI | Android `Activity` / `RecyclerView` | 原生 SwiftUI |
| 網路 / 儲存 | OkGo / LitePal | URLSession / UserDefaults |

因此*邏輯*是 1:1 移植的（DSL、`fba` 橋接契約、`hiker://` 路由），但任何執行時觸及 **Java** 的部分都必須重新提供——而這正是刻意的一個**經過篩選的子集**，而非完整的 JRE。

nPlyr 原生重新實作了橋接與規則 DSL，並添加了一個相容層，模擬規則所依賴的 Java API 的篩選子集。

## ✅ 完全支援——無需改動

以下與 Android 上行為一致；僅使用這些的規則會「開箱即用」：

- **規則 DSL**：`pdfh` / `pdfa` / `pd` 選擇器、`parseDom`、`setHomeResult` / `setSearchResult` / `setResult`。
- **`$` 選擇器層**——包括 `$(url).lazyRule(fn)`、`$(url, ordinary).lazyRule` 與 `.rule(fn)`。
- **`fy_bridge_app`（`fba`）橋**：播放、`fetch`、`post`、`request`、解析、變數儲存。
- **`hiker://` 路由**，包括 `hiker://empty##…`（輕量參數載體）與 `hiker://search?s=`（聚合搜尋）。
- **`col_type` 渲染**——全部 **38 種佈局**，與 hikerView 自有的項目範本對齊。
- **變數映射**：`putVar` / `getVar` / `putMyVar` / `getMyVar`（記憶體）與 `setItem` / `getItem` / `clearItem`（持久化到本機儲存）。
- **HTTP**：帶請求標頭的 `fetch` / `post`；字元集處理（`gb2312` / `gbk` / `gb18030` → GBK，`big5` → Big5，預設 UTF-8）；`withHeaders` / `onlyHeaders` / `withStatusCode` 回傳 JSON 信封。
- **User-Agent**：`auto` / `mobile` / `pc` / 自訂（當你選擇跟隨時，規則自身的 UA 生效）。
- **雲端分享**：TextDB（雲2）、`cmd.im` 302 重新導向（雲5）、`pasteme`（雲6）。
- **純 JS 的加密**（`AES`、`CryptoJS`）；由原生橋提供時的 `RSA`。
- **`;post;` 預抓取**與 `decodeConflictStr` 解碼。

## ⚠️ 透過 Java 相容層支援（僅子集）

該層提供以下全域物件與類別，但各有注意事項：

- **全域物件**：`Packages`、`java`、`JavaImporter`、`importPackage()`、`importClass()`。
- **`_base64`**——模擬 `android.util.Base64` 的語意。
- **`FileUtil`**（`com.example.hikerview.utils`）——作為*原生墊片*提供（見下文的 `toInputStream`）。
- **`javax.crypto`**：`Cipher.getInstance` / `init` / `doFinal`、`SecretKeySpec`、`IvParameterSpec`——但 **`Cipher.update` 未實作**（它會拋出一個清晰的「語料庫未使用，請回報規則名稱」錯誤，而不是靜默出錯）。

### 已知類別清單（重點）

只墊片化了**經過篩選的一組** Java 類別。清單之外的類別會回退到一個**診斷樁**：它記錄一次日誌，並在被使用時拋出*清晰*的錯誤——而**不會**產生裸露的 `ReferenceError`。實務上這意味著：

- 使用常見、知名 Java 類別（語料庫所需的那些）的規則可以工作。
- 觸及冷門或 Android 框架類別的規則會以一條可操作的訊息失敗，指明缺失的類別——請回報規則名稱，以便清單得以擴充。

### `byte[]` 有兩種表示

這一點尤其會讓圖片解密規則踩坑：

- **小緩衝區（≤ 4096 B）**→ 真正的 JS `Array<number>`，帶有 `.length` *屬性*（Java 陣列語意），並且位元運算可用（例如某類圖片解密規則中常見的 `toHex` 寫法）。
- **大緩衝區（圖片等）**→ 一個宿主提供的位元組陣列物件，僅暴露 `length` / `toBase64` / `toHex` / `utf8String` / `slice`。你**無法**對大形式做逐位元組存取——第三方圖片解密鏈路依賴的是宿主方法。

### `FileUtil.toInputStream`（漫畫圖片解密）

在 Android 上它回傳一個 Java `InputStream`。nPlyr **替換**了這條路徑：它攔截一個被攔截流的標記，將其轉換為從應用程式快取提供的本機圖片 URL，並將圖片交回視圖。期望*自己讀取流*的規則必須依賴這個宿主轉換，而不是去打開一個 `InputStream`。

### Java 檔案 I/O 極簡

被模擬的檔案根回傳 `'/'`，`fileExist` 回傳布林值——一個極小的墊片。任意的 `java.io.File` / NIO / `Zip` / `java.net.*` 操作均**不可用**；任何網路相關的事情都請使用 `fetch` / `post` 橋。

### `BigDecimal` 標度

Android 的 `BigDecimal` 保留標度（例如 `"5.0"`）。nPlyr 的小數格式化也保留標度，否則數字格式會漂移。依賴 Java `BigDecimal` 精確 `toString` 輸出的規則可能會看到差異。

### Rhino 引擎語意

頂層 `const X = X = …` 的雙重賦值 Rhino 可以容忍，但會讓 **JavaScriptCore 崩潰**。nPlyr 執行一個指令碼預處理器，使這類退化 JS 不會拖垮引擎。因此 Rhino 專屬的怪癖被中和，而非被模擬。

### `hijackEnv` 的 `method_*` 橋

支援 Java 方法劫持，但原生橋必須委派給它在注入時捕獲的**原始方法**——**絕不**回呼進 JS 全域，否則會導致無限遞迴（`Maximum call stack size exceeded`）。回傳 no-op 的橋會靜默停用依賴它的動態卡片。

## ❌ 不支援

- **已知清單之外的任意 Java 類別**——沒有 JVM，也無法反射進入 Android 框架。
- **Android UI / View / Activity / RecyclerView / Adapter** API——nPlyr 以原生方式渲染；這些沒有對應物。
- **Android 權限、Content Providers、Intent 系統。**
- **部分 `javax.crypto` 路徑**——`Cipher.update`，以及原生橋尚未實作的任何加密模式。
- **`java.io.File` / NIO / Zip / `java.net.*`**——請改用 `fetch` / `post` 橋。

## 回報不相容

當某條具體規則行為異常時，請記錄：

1. **規則名稱**，
2. 它失敗的**步驟**（首頁 / 搜尋 / 詳情 / 解析），以及
3. **訊息**——相容層會為未列出的類別記錄一條清晰的一行日誌。

回報這些資訊，以便已知類別清單與原生橋得以擴充。

## 給規則作者的建議

- 將 `java.io.File` / 流讀取替換為 `fetch` / `post` 橋，或替換為回傳本機圖片 URL 的宿主 `toInputStream` 轉換。
- 不要依賴冷門的 Java 類別；優先使用 JS 或橋的等價物。
- 避免 Rhino 專屬的寫法，例如 `const X = X = …` 雙重賦值。
- 將逐位元組的圖片處理保持在**小**緩衝區上；大圖片請使用 `toBase64` / `toHex` / `slice` 宿主方法。

## 海闊視界官方文件

nPlyr 旨在與 hikerView 規則生態相容。關於完整、權威的參考——規則 DSL、選擇器、小程式橋接契約與編寫指南——請查閱海闊視界官方文件：

- **海闊視界文件：** [https://github.com/ReflectionLab/Documents](https://github.com/ReflectionLab/Documents)

來自 hikerView 的規則作者可以使用相同的分享文字與 JSON；上述記錄的相容性邊界說明了 nPlyr 在何處偏離 Android 執行時。
