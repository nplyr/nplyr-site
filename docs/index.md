---
layout: home

hero:
  name: "nPlyr"
  text: "A video player that does more"
  tagline: "Native macOS & iOS player built on AVFoundation. Capture streams from any site with the built-in sniffer, and run mini-programs."
  image:
    src: /hero-illustration.png
    alt: nPlyr
  actions:
    - theme: brand
      text: Get Started
      link: /guide/installation
    - theme: alt
      text: Mini-Programs
      link: /guide/miniapps

features:
  - icon:
      light: /icons/layers.svg
      dark: /icons/layers-dark.svg
      alt: Player
      width: "24"
      height: "24"
    title: Native Player
    details: One playback core for macOS and iOS powered by AVFoundation (AVPlayer). Plays HLS/m3u8, MP4, FLV, TS and more — with subtitles, audio tracks, playback speed, Picture-in-Picture and AirPlay.
    link: /guide/player
    linkText: Learn more
  - icon:
      light: /icons/zap.svg
      dark: /icons/zap-dark.svg
      alt: Sniffer
      width: "24"
      height: "24"
    title: Built-in Sniffer
    details: A Chrome-style multi-tab browser injects a media-detection script into every page and surfaces m3u8/mp4/flv/ts direct links and their headers in one drawer.
    link: /guide/browser
    linkText: How it works
  - icon:
      light: /icons/sparkles.svg
      dark: /icons/sparkles-dark.svg
      alt: Mini-Programs
      width: "24"
      height: "24"
    title: Mini-Program Runtime
    details: Runs hikerView-compatible mini-programs and rules natively — the same rule DSL and fy_bridge_app contract, reimplemented on Apple platforms. Browse the community catalog.
    link: /guide/miniapps
    linkText: Explore runtime
  - icon:
      light: /icons/camera.svg
      dark: /icons/camera-dark.svg
      alt: Downloads
      width: "24"
      height: "24"
    title: Download & Stream
    details: Download HLS playlists to MP4, or start watching instantly with progressive playback while the file is still downloading. Multi-quality and subtitle downloads supported.
    link: /guide/downloads
    linkText: Download guide
  - icon:
      light: /icons/eye.svg
      dark: /icons/eye-dark.svg
      alt: Library
      width: "24"
      height: "24"
    title: Media Library
    details: Your watch history, bookmarks and downloads live in one searchable library that syncs across your Mac and iPhone.
    link: /guide/downloads
    linkText: Open library
  - icon:
      light: /icons/frame.svg
      dark: /icons/frame-dark.svg
      alt: Theming
      width: "24"
      height: "24"
    title: Theming & 25 Languages
    details: Switch between built-in themes or build your own. The entire UI is localized into 25 languages and follows the system appearance on both platforms.
    link: /guide/settings
    linkText: Customize

floatingCards:
  - Native AVFoundation core
  - No bloat
  - Sniffer + browser
  - Mini-program runtime
sections:
  featuresTitle: Key Features
  featuresSubtitle: Everything you need to play, capture and organize video on Apple platforms
  categoriesTitle: What you can do
  categoriesSubtitle: A player, a browser and a mini-program runtime in one app
  howTitle: How It Works
  howSubtitle: Three pieces that work together out of the box
  faqTitle: Frequently Asked Questions
  faqSubtitle: Quick answers for macOS and iOS users
openMarketplace: Browse Mini-Programs
cta:
  title: Ready to Play Anything?
  description: Download nPlyr and turn any page into a playable stream — native on your Mac and iPhone, powered by AVFoundation.
  primary: Get Started
  primaryLink: /guide/installation
  secondary: How to Use
  secondaryLink: /guide/player
categories:
  - name: Watch
    badge: PL
    desc: Play local files, URLs and streams
    color: "#ef6400"
  - name: Capture
    badge: SN
    desc: Sniff direct links from the web
    color: "#2563eb"
  - name: Extend
    badge: MP
    desc: Run hikerView mini-programs
    color: "#059669"
  - name: Save
    badge: DL
    desc: Download and organize media
    color: "#7c3aed"
  - name: Sync
    badge: LB
    desc: Library across your devices
    color: "#d97706"
  - name: Personalize
    badge: TH
    desc: Themes and 25 languages
    color: "#0891b2"
steps:
  - num: "01"
    title: Install & Launch
    desc: Get nPlyr from the Mac App Store or sideload the iOS build, then launch from the Dock or Home Screen.
  - num: "02"
    title: Open a Video
    desc: Drop a file or paste a link into the home player, or use the built-in browser to find a stream.
  - num: "03"
    title: Capture & Extend
    desc: Sniff a direct link with one click, or open a community mini-program to browse an entire source.
faqs:
  - question: Is nPlyr free?
    answer: nPlyr is a paid app on the App Store. A free tier lets you try the core player and a limited number of mini-programs; unlocking removes the mini-program limit. There are no accounts and no telemetry.
  - question: Which platforms are supported?
    answer: nPlyr ships on macOS 14 Sonoma or later (optimized for Apple Silicon, with Intel support) and on iOS / iPadOS 16 or later. Both targets share the same playback core.
  - question: Does it use ffmpeg or any external binary?
    answer: No. The playback and remuxing core is built entirely on Apple's AVFoundation (AVPlayer). This keeps the app lightweight, sandboxed-friendly and App-Store compliant.
  - question: What video formats are supported?
    answer: Because it relies on AVFoundation, nPlyr plays whatever the OS decodes natively — HLS (m3u8), fragmented MP4, MP4, MOV, M4V, and containers AVPlayer can read. For HLS, downloads and remuxing to MP4 are handled in-app.
  - question: What are mini-programs and are they safe?
    answer: Mini-programs are hikerView-compatible rules that let nPlyr browse and parse third-party video sources through a sandboxed JavaScript engine. They are community-provided. See the Compatibility page for exactly which Java/Rhino behaviors are and are not supported.
  - question: Does the sniffer work on every site?
    answer: The sniffer captures media requests made by the page (fetch/XHR/video.src/MediaSource). Sites that wrap streams in proprietary players or heavy DRM may not expose a direct link. The Mini-Program runtime is the more reliable path for those sources.
---

## nPlyr is a three-in-one media app

Unlike a plain player, nPlyr combines **a native player**, **a media-sniffing browser**
and **a hikerView-compatible mini-program runtime** on top of one shared rule engine.
You can watch a file, capture a stream from the web, or open a community mini-program
that navigates an entire video source for you — all without leaving the app.

- **Player core** — `AVPlayer` on both macOS and iOS, zero external binaries.
- **Sniffer** — a `WKWebView` container that injects JS to intercept media requests
  and surfaces direct links + headers.
- **Mini-program runtime** — a native reimplementation of the hikerView bridge
  (`fy_bridge_app`) and rule DSL, so existing community rules run as-is.

> Built for Apple platforms. No Electron, no telemetry.
