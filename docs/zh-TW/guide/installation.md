# 安裝

nPlyr 來自同一個 Xcode 工程的兩個 target：

- **`nPlyr`**——macOS 應用程式。
- **`nPlyrIOS`**——iOS / iPadOS 應用程式。

兩者共用同一套播放核心與規則引擎。

## macOS

### Mac App Store（推薦）

1. 打開 **Mac App Store**，搜尋 **nPlyr**，或使用[首頁](/zh-TW/)上的徽章。
2. 點擊 **取得**，等待下載完成。
3. 從 Dock 或啟動台啟動 nPlyr。

Mac App Store 版本經過沙盒化並由 Apple 簽署，因此無需額外設定。

### 側載（開發 / TestFlight）

如果你從原始碼建構，請打開 `nPlyr.xcodeproj`，選擇 **`nPlyr`** scheme，並在「My Mac」上執行。開發簽署建構在首次使用瀏覽器或下載功能時，可能會提示你授予[權限](/zh-TW/guide/permissions)中描述的權限。

## iOS / iPadOS

### App Store

在 iOS App Store 中搜尋 **nPlyr** 並安裝。同一個帳號可在兩個平台上解鎖小程式功能。

### 從原始碼建構

1. 打開 `nPlyr.xcodeproj` 並選擇 **`nPlyrIOS`** scheme。
2. 選擇一個模擬器或已連接的裝置（iOS 16+）。
3. 執行。在實體裝置上，你需要在 Signing & Capabilities 中設定一個開發團隊。

> iOS 建構與 macOS 使用同一套共享原始碼；只有少量平台膠水檔案不同。沒有獨立的 `ffmpeg` 依賴。

## 首次啟動

首次啟動時，nPlyr 會：

- 請求它所需的權限（請參閱[權限](/zh-TW/guide/permissions)），
- 在使用者資料容器中建立本機媒體庫，
- 預設使用你的系統語言（可隨時在[設定](/zh-TW/guide/settings)中切換）。

如果安裝後某些行為不符合預期，請跳轉到[疑難排解](/zh-TW/guide/troubleshooting)。
