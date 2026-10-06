# 简介

## 关于 nPlyr

**nPlyr** 是一款面向 **macOS** 与 **iOS / iPadOS** 的原生视频播放器。它构建于 Apple 的 [AVFoundation](https://developer.apple.com/av-foundation/)（`AVPlayer`）之上——应用内部**没有任何外部二进制**。在播放器的基础之上，它还加入了两项让它超越普通播放器的能力：

- 一个**内置媒体嗅探器**（Chrome 风格的多标签浏览器，可从任意网页抓取视频直链），以及
- 一个 **hikerView 兼容的小程序运行时**，运行社区规则，让应用能够浏览并解析第三方视频源。

这一组合有时被称为集"播放器 + 嗅探器 + 小程序运行时"于一身。

## 三大支柱

### 1. 原生播放器

macOS 与 iOS 共用一套播放内核。它能播放 HLS（`m3u8`）、`MP4`、`MOV`、`M4V`、`FLV`、`TS` 以及任何 `AVPlayer` 可解码的容器，并支持：

- 字幕（外部 `.srt` / `.vtt` / 内嵌）
- 多音轨
- 倍速控制
- 画中画
- AirPlay，以及（macOS 上）DLNA 投放

参见 [播放器](/zh-CN/guide/player)。

### 2. 嗅探浏览器

nPlyr 内置一个真正的 `WKWebView`，拥有多个 Chrome 风格的标签。每个页面都会被注入媒体探测脚本；当页面请求 `m3u8` / `mp4` / `flv` / `ts` 媒体时，该链接与其请求头会一并出现在结果抽屉中，你可以直接发送给播放器或下载器。

参见 [浏览器与嗅探器](/zh-CN/guide/browser)。

### 3. 小程序运行时

nPlyr 原生重实现了 **hikerView 小程序契约**：

- 规则 DSL（`pdfh` / `pdfa` / `pd` 选择器、`setResult`、`lazyRule`、`$.rule` 等），
- 规则用于调用宿主功能的 `fy_bridge_app`（`fba`）JavaScript 桥（播放、fetch、解析、存储变量），
- `hiker://` 伪协议路由。

因此，现有的 hikerView 社区规则与小程序可以直接在 nPlyr 中运行。由于原始引擎是 Android/Java（Rhino），**部分 Java 特有的行为未能完全兼容**——这一点在[兼容性](/zh-CN/guide/miniapp-compatibility)页面中有详细说明。

## 系统需求

| 平台 | 最低版本 | 说明 |
|---|---|---|
| macOS | macOS 14 Sonoma | 针对 Apple Silicon（M 系列）优化；支持 Intel |
| iOS | iOS 16 | iPhone |
| iPadOS | iPadOS 16 | iPad |

- **内存**：最低 4 GB RAM，大型 HLS 播放列表建议 8 GB。
- **存储**：安装约需 60 MB，外加下载媒体所占空间。
- **网络**：流媒体、嗅探与小程序源均需要网络。

## 支持的语言

应用界面已翻译为 **25 种语言**，并在首次启动时跟随系统语言。本文档站点提供英文、简体中文、繁體中文、日本語、Deutsch、Español 与 Français。

## 快速开始

1. 在你的 Mac 或 iPhone 上[安装](/zh-CN/guide/installation) nPlyr。
2. 了解[播放器](/zh-CN/guide/player)基础。
3. 使用[浏览器与嗅探器](/zh-CN/guide/browser)抓取视频流。
4. 通过[小程序](/zh-CN/guide/miniapps)探索社区资源。
