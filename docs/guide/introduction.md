# Introduction

## About nPlyr

**nPlyr** is a native video player for **macOS** and **iOS / iPadOS**. It is built on
Apple's [AVFoundation](https://developer.apple.com/av-foundation/) (`AVPlayer`) — there
is **no external binary** inside the app. On top of the player it adds two
things that make it more than a plain viewer:

- a **built-in media sniffer** (a Chrome-style multi-tab browser that captures direct
  video links from any web page), and
- a **hikerView-compatible mini-program runtime** that runs community rules so the app
  can browse and parse third-party video sources.

This combination is sometimes called a *"player + sniffer + mini-program runtime"* in one.

## The three pillars

### 1. Native Player

A single playback core shared by macOS and iOS. It plays HLS (`m3u8`), `MP4`, `MOV`,
`M4V`, `FLV`, `TS` and any container `AVPlayer` can decode, with:

- subtitles (external `.srt` / `.vtt` / embedded),
- multiple audio tracks,
- playback speed control,
- Picture-in-Picture,
- AirPlay and (on macOS) DLNA rendering.

See [Player](/guide/player).

### 2. Sniffer Browser

nPlyr embeds a real `WKWebView` with multiple Chrome-style tabs. A media-detection
script is injected into every page; when the page requests `m3u8` / `mp4` / `flv` / `ts`
media, the link — together with its request headers — appears in a results drawer you can
send straight to the player or downloader.

See [Browser & Sniffer](/guide/browser).

### 3. Mini-Program Runtime

nPlyr reimplements the **hikerView mini-program contract** natively:

- the rule DSL (`pdfh` / `pdfa` / `pd` selectors, `setResult`, `lazyRule`, `$.rule`, …),
- the `fy_bridge_app` (`fba`) JavaScript bridge that rules use to call host features
  (play, fetch, parse, store variables),
- the `hiker://` pseudo-protocol routing.

Existing hikerView community rules and mini-programs can therefore run inside nPlyr.
Because the original engine is Android/Java (Rhino), **some Java-specific behavior is not
fully compatible** — this is documented in detail on the
[Compatibility](/guide/miniapp-compatibility) page.

## System Requirements

| Platform | Minimum version | Notes |
|---|---|---|
| macOS | macOS 14 Sonoma | Apple Silicon (M-series) optimized; Intel supported |
| iOS | iOS 16 | iPhone |
| iPadOS | iPadOS 16 | iPad |

- **Memory**: 4 GB RAM minimum, 8 GB recommended for large HLS playlists.
- **Storage**: ~60 MB for installation, plus space for downloaded media.
- **Network**: required for streaming, sniffing and mini-program sources.

## Supported Languages

The app UI is translated into **25 languages** and follows the system language on first
launch. The documentation site is available in English, 简体中文, 繁體中文, 日本語,
Deutsch, Español and Français.

## Getting Started

1. [Install](/guide/installation) nPlyr on your Mac or iPhone.
2. Learn the [Player](/guide/player) basics.
3. Capture a stream with the [Browser & Sniffer](/guide/browser).
4. Explore community sources through [Mini-Programs](/guide/miniapps).
