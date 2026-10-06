# 參與貢獻

我們歡迎各種貢獻來改進 nPlyr！無論是修復 bug、新增功能、翻譯、編寫規則，還是完善文件，我們都感激你的幫助。

## 貢獻方式

### Bug 回報
- 先查看已有的 [issues](https://github.com/nPlyr/nPlyr-site/issues)。
- 包含你的作業系統版本、nPlyr 版本，以及重現步驟。
- 附上範例連結或規則名稱（請勿包含個人媒體或凭据）。

### 功能請求
- 描述該功能及其使用場景。
- 說明它為何會惠及 nPlyr 使用者。
- 檢查它是否符合本機優先、尊重隱私的理念。

### 翻譯
- nPlyr 的介面透過 i18n JSON 檔案支援 25 種語言。
- 為缺失或不完整的語言貢獻翻譯。
- 現有翻譯請參閱 `nPlyr/Resources/i18n/`。

### 小程式與規則
- nPlyr 執行 hikerView 相容的小程式。在社群中分享新來源或修復現有來源。
- 發布前，請查閱[相容性](/zh-TW/guide/miniapp-compatibility)頁面，確保你的規則不依賴不受支援的 Java/Rhino 行為。

### 程式碼貢獻
- 應用程式使用 **Swift 6 + SwiftUI** 編寫。
- Fork 倉庫並提交 pull request。
- 遵循現有架構（共享的 `Core/**` 與 `Features/**`，平台膠水檔案位於 `+macOS` / `+iOS`）。

## 開始上手

### 前置條件
- Node.js 18 或更高版本（用於文件站點）
- pnpm 套件管理器（用於文件站點）
- Xcode 16+（用於應用程式開發）
- macOS 14 Sonoma+（用於建構 / 執行 macOS 應用程式）

### 開發環境搭建（文件站點）

1. 在 GitHub 上 **Fork 倉庫**。
2. **複製你的 Fork**：
   ```bash
   git clone https://github.com/nPlyr/nPlyr-site.git
   cd nPlyr-site
   ```
3. **安裝依賴**：
   ```bash
   pnpm install
   ```
4. **啟動開發伺服器**：
   ```bash
   pnpm docs:dev
   ```
5. 在瀏覽器中打開 `http://localhost:5173`。

### 做出修改

1. 為你的修改建立一個新分支：
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. 修改 `docs/` 中的文件檔案。
3. 透過建構站點來測試你的修改：
   ```bash
   pnpm docs:build
   ```
4. 提交你的修改：
   ```bash
   git add .
   git commit -m "你的修改說明"
   ```

### 提交修改

1. 將分支 **push 到你的 Fork**：
   ```bash
   git push origin feature/your-feature-name
   ```
2. 在 GitHub 上**建立 Pull Request**。
3. **等待評審**並處理回饋。

## 指南

### 寫作風格
- 使用清晰、簡潔的語言。
- 儘量使用主動語態。
- 保持包容與友好。
- 使用一致的格式。
- 在有帮助時附上截圖。

### 檔案結構
- 文件頁面放在 `docs/`。
- 指南放在 `docs/guide/`。
- 檔名使用小寫加連字號：`my-new-guide.md`。

### 連結
- 內部文件使用相對連結。
- 在有帮助時連結到外部資源。
- 確保所有連結可用。

### 圖片與資源
- 將圖片放在 `docs/public/` 或其子目錄。
- 使用描述性的檔名。
- 為網頁最佳化圖片（建議小於 500KB）。

## 行為準則

本專案遵循一份行為準則。參與即表示你同意：
- 保持尊重與包容。
- 聚焦於建設性回饋。
- 為自己的錯誤承擔責任。

## 有疑問？

如果你對貢獻有疑問，請查看已有的 [issues](https://github.com/nPlyr/nPlyr-site/issues) 或新建一個。感謝你幫助改進 nPlyr！
