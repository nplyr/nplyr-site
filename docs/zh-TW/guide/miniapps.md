# 小程式

nPlyr 可以執行 **hikerView 相容的小程式**——也就是為 Android 應用程式提供動力的同一批社群規則。本頁解釋它們是什麼，以及 nPlyr 如何執行它們。關於相容性邊界（尤其是 Java/Rhino 部分），請閱讀[相容性](/zh-TW/guide/miniapp-compatibility)頁面。

## 什麼是小程式？

在這個生態中，小程式是一個**規則包**（HTML + JavaScript），它告訴應用程式如何：

- 渲染一個分類 / 頻道的**首頁**，
- 執行一次**搜尋**，
- 解析一個**列表**頁與一個**詳情**頁，並
- 提取**可播放連結**交給播放器。

規則邏輯執行在 JavaScript 引擎中，並透過一個名為 **`fy_bridge_app`**（簡稱 **`fba`**）的橋接物件與宿主應用程式通訊。

## nPlyr 重新實作的契約

nPlyr **不**移植 hikerView 的 Android/Java UI。相反，它複用了真正承載價值的層次——**規則引擎、解析 DSL 與小程式橋接契約**——並為 Apple 平台原生重寫了 UI、WebView 與網路層。

具體而言，nPlyr 提供了以下內容的原生實作：

- **規則 DSL**：`pdfh` / `pdfa` / `pd` 選擇器、`parseDom`、`setHomeResult`、`setSearchResult`、`setResult`；
- **`$` 選擇器相容層**，使 `$(url).lazyRule(fn)` 與 `$(url, ordinary).lazyRule` 表現得符合預期；
- **`fy_bridge_app` / `fba` 橋**，使規則可以呼叫宿主功能：播放、fetch、post、解析、儲存變數；
- **`hiker://` 偽協定**路由（包括作為輕量參數載體的 `hiker://empty##…`，以及用於聚合搜尋的 `hiker://search?s=`）；
- **`lazyRule` / `.rule(fn)`** 執行模型、頁面導覽（`beginResultNavigation` / `finalizeResultPage`）以及結果堆疊生命週期（`onClose` 歸屬、`MY_PAGE` 歸屬）。

## 規則 DSL 要點

| API | 用途 |
|---|---|
| `setHomeResult([…])` | 輸出首頁網格（分類 / 頻道）。 |
| `setSearchResult([…])` | 輸出搜尋結果。 |
| `lazyRule` / `.rule(fn)` | 執行子規則以解析列表 / 詳情頁。 |
| `fetch` / `post` | 帶請求標頭的 HTTP；`withHeaders` / `onlyHeaders` / `withStatusCode` 回傳 JSON 信封。 |
| `putVar` / `getVar` / `putMyVar` / `getMyVar` | 記憶體變數；`setItem` / `getItem` / `clearItem` 持久化到本機儲存。 |
| `MY_URL` / `MY_RULE` | 目前規則的 URL 與規則主體。 |
| `AES` / `RSA` / `CryptoJS` | 規則可用的加密輔助。 |

每個列表項目都帶有一個 `col_type`，nPlyr 將其對應到 SwiftUI 佈局——共有 **38 種 `col_type` 佈局**（如 `text_1`、`pic_19`），與 hikerView 自有的項目範本對齊，因此現有規則會如其作者所預期的那樣渲染。

## 管理小程式

打開**小程式**（macOS 上的管理器視窗；iOS 上的分頁 / 頁面）以：

- 從分享文字或 JSON **匯入**一個程式，
- **新增 / 編輯**一條規則（macOS 上是完整規則編輯器；iOS 上是一個 Push 頁面），
- **重新排列**程式（拖拽）——首頁頂列跟隨該順序，
- **刪除**一個程式，
- **分享 / 雲端分享**一個程式（雲端後端：TextDB、`cmd.im` 302 重新導向，以及 `pasteme`）。

**免費層級**會限制匯入的小程式數量；一次性解鎖會移除該限制。

## 搜尋

獨立的搜尋視窗由你已安裝且宣告了 `search_url` 的規則建構而成。你可以搜尋單一引擎，也可以跨所有引擎聚合搜尋。

## 下一步

- [相容性](/zh-TW/guide/miniapp-compatibility)——具體哪些 Java/Rhino 行為被支援、哪些不被支援。
- [下載與媒體庫](/zh-TW/guide/downloads)——解析出的連結去向何處。
- [瀏覽器與嗅探器](/zh-TW/guide/browser)——擷取連結的另一條路徑。

## 海闊視界官方文件

nPlyr 旨在與 hikerView 規則生態相容。關於完整的規則與小程式參考——DSL、選擇器、橋接契約與編寫指南——請參閱海闊視界官方文件：

- **海闊視界文件：** [https://github.com/ReflectionLab/Documents](https://github.com/ReflectionLab/Documents)

如果你已經為 hikerView 編寫規則，同樣的分享文字與 JSON 在 nPlyr 中可直接匯入並執行（受上述相容性邊界約束）。
