# Browser & Sniffer

nPlyr includes a real **multi-tab browser** built on `WKWebView`, with a built-in
**media sniffer**. It is how you capture a direct video link from a page that doesn't
hand you one.

## The browser

It is a Chrome-style tabbed browser:

- **Tabs** — new / close / switch / reorder; drag a tab out to its own window (macOS).
- **Navigation** — back, forward, reload, and an address bar with autocomplete.
- **Keyboard shortcuts** — `⌘T` new tab, `⌘R` reload, `⌘[` / `⌘]` back / forward,
  `⌘L` focus address bar.
- **Drag & drop** — drop a URL or text onto the window to open it.
- **Pop-ups** — `target="_blank"` and `window.open` open in a new tab instead of a
  blocked window.
- **Dialogs** — JS `alert` / `confirm` / `prompt` are presented natively.
- **Downloads** — intercepted download links open in the in-app **Downloads** tab
  (`nplyr://downloads`).

## How the sniffer works

When a page loads, nPlyr injects a script that hooks:

- `fetch` and `XMLHttpRequest`,
- `video.src` and `HTMLMediaElement` playback,
- `MediaSource` / `SourceBuffer.appendBuffer`.

It also watches navigation via `WKNavigationDelegate` to catch server-side media
redirects. Anything that looks like a media file — **m3u8 / mp4 / flv / ts** — is
collected along with its **request headers** (referer, user-agent, cookies, auth) into a
results drawer.

From the drawer you can:

- **Play** the link immediately in the [Player](/guide/player).
- **Download** it (with its headers preserved) via
  [Downloads](/guide/downloads).
- **Copy** the URL and headers for use elsewhere.

> The sniffer only captures links the page actually requests. Sites that wrap streams in a
> proprietary player or heavy DRM may not expose a clean direct link — for those, a
> [mini-program](/guide/miniapps) that knows the source's API is the more reliable path.

## Limitations (known)

These are consciously deprioritized and may arrive in a later build:

- In-page right-click menu items ("open link in new tab", "download link") — the macOS
  `WKUIDelegate` context-menu hooks are iOS-only; nPlyr currently relies on the tab bar
  and toolbar instead.
- In-page **find** (`⌘F`) — the WebKit API exists but the UI is not wired up yet.
- **Print** (`⌘P`) — WebKit supports it, but there is no menu item yet.
- `⌘W` closes the whole window when multiple tabs are open; per-tab close is planned.
- Open tabs and history are **not** restored after a full app restart yet.

## Privacy

The browser is a standard `WKWebView`. It does not inject trackers of its own. Cookies and
local storage stay in the app's container. See [Privacy](/guide/privacy) for the full
picture.
