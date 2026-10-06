# FAQ

**Q: What is nPlyr?**

A: nPlyr is a native video player for macOS and iOS/iPadOS. It plays local files and
streams, includes a built-in browser that sniffs direct video links from web pages, and
runs hikerView-compatible mini-programs so it can browse third-party video sources.

**Q: Which platforms are supported?**

A: macOS 14 Sonoma or later (Apple Silicon optimized, Intel supported) and iOS / iPadOS 16
or later.

**Q: Does it use ffmpeg or any external binary?**

A: No. The playback and remuxing core is built entirely on Apple's AVFoundation (AVPlayer).
This keeps the app lightweight and App-Store compliant.

**Q: What video formats can it play?**

A: Whatever AVPlayer decodes natively — HLS (`m3u8`), MP4, MOV, M4V, and other containers.
For HLS, nPlyr can also download and remux to MP4 in-app.

**Q: How is the sniffer different from a mini-program?**

A: The sniffer captures media links a web page actually requests. A mini-program is a rule
that knows a source's structure and API, so it can navigate categories, search and parse
playable links — more reliable for sites the sniffer can't crack.

**Q: Are mini-programs safe? Where do they come from?**

A: Mini-programs are community-provided hikerView-compatible rules that run inside a
sandboxed JavaScript engine. They are not authored by nPlyr. See
[Compatibility](/guide/miniapp-compatibility) for exactly which behaviors are supported,
and only install sources you trust.

**Q: Is my data private?**

A: Your library, history and bookmarks stay on your device (and sync only through your own
account). The browser is a standard WKWebView with no extra trackers. There is no telemetry.
See [Privacy](/guide/privacy).

**Q: Does the free version do everything?**

A: The core player, sniffer, downloads and library are fully usable. A free tier limits the
number of imported mini-programs; a one-time unlock removes that limit.

**Q: Which languages is the UI available in?**

A: 25 languages, switchable live from Settings without restarting.
