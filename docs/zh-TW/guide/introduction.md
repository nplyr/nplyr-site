# 簡介

## 關於 nPlyr

**nPlyr** 是一款面向 **macOS** 與 **iOS / iPadOS** 的原生影片播放器。它建構於 Apple 的 [AVFoundation](https://developer.apple.com/av-foundation/)（`AVPlayer`）之上——應用程式內部**沒有任何外部二進位**。在播放器的基礎之上，它還加入了兩項讓它超越普通播放器的能力：

- 一個**內建媒體嗅探器**（Chrome 風格的多分頁瀏覽器，可從任意網頁擷取影片直鏈），以及
- 一個 **hikerView 相容的小程式執行環境**，執行社群規則，讓應用程式能夠瀏覽並解析第三方影片來源。

這個組合有時被稱為集「播放器 + 嗅探器 + 小程式執行環境」於一身。

## 三大支柱

### 1. 原生播放器

macOS 與 iOS 共用一套播放核心。它能播放 HLS（`m3u8`）、`MP4`、`MOV`、`M4V`、`FLV`、`TS` 以及任何 `AVPlayer` 可解碼的容器，並支援：

- 字幕（外部 `.srt` / `.vtt` / 內嵌）
- 多音軌
- 倍速控制
- 畫中畫
- AirPlay，以及（macOS 上）DLNA 投放

請參閱 [播放器](/zh-TW/guide/player)。

### 2. 嗅探瀏覽器

nPlyr 內建一個真正的 `WKWebView`，擁有多個 Chrome 風格的分頁。每個頁面都會被注入媒體偵測腳本；當頁面請求 `m3u8` / `mp4` / `flv` / `ts` 媒體時，該連結與其請求標頭會一併出現在結果抽屜中，你可以直接傳送給播放器或下載器。

請參閱 [瀏覽器與嗅探器](/zh-TW/guide/browser)。

### 3. 小程式執行環境

nPlyr 原生重新實作了 **hikerView 小程式契約**：

- 規則 DSL（`pdfh` / `pdfa` / `pd` 選擇器、`setResult`、`lazyRule`、`$.rule` 等），
- 規則用於呼叫宿主功能的 `fy_bridge_app`（`fba`）JavaScript 橋（播放、fetch、解析、儲存變數），
- `hiker://` 偽協定路由。

因此，現有的 hikerView 社群規則與小程式可以直接在 nPlyr 中執行。由於原始引擎是 Android/Java（Rhino），**部分 Java 特有的行為未能完全相容**——這一點在[相容性](/zh-TW/guide/miniapp-compatibility)頁面中有詳細說明。

## 系統需求

| 平台 | 最低版本 | 說明 |
|---|---|---|
| macOS | macOS 14 Sonoma | 針對 Apple Silicon（M 系列）最佳化；支援 Intel |
| iOS | iOS 16 | iPhone |
| iPadOS | iPadOS 16 | iPad |

- **記憶體**：最低 4 GB RAM，大型 HLS 播放清單建議 8 GB。
- **儲存空間**：安裝約需 60 MB，外加下載媒體所佔空間。
- **網路**：串流媒體、嗅探與小程式來源均需要網路。

## 支援的語言

應用程式介面已翻譯為 **25 種語言**，並在首次啟動時跟隨系統語言。本文檔站點提供英文、簡體中文、繁體中文、日本語、Deutsch、Español 與 Français。

## 快速開始

1. 在你的 Mac 或 iPhone 上[安裝](/zh-TW/guide/installation) nPlyr。
2. 了解[播放器](/zh-TW/guide/player)基礎。
3. 使用[瀏覽器與嗅探器](/zh-TW/guide/browser)擷取影片串流。
4. 透過[小程式](/zh-TW/guide/miniapps)探索社群資源。
