# Privacy Policy

nPlyr is a native video player for macOS and iOS. Your privacy is our priority.

## Local-First Design

- Your watch history, bookmarks and downloads are stored **entirely on your device**.
- The app requires **no account and no registration**.
- There is **no telemetry** — nPlyr does not phone home with usage data.
- Core playback and downloads work fully offline once the media is on your device.

## Network Use Is User-Directed

nPlyr only uses the network when *you* ask it to:

- Streaming or downloading a video you opened or captured.
- Browsing with the built-in sniffer.
- Running a mini-program / rule source that you imported.

We do not operate a server that receives your media, history or mini-program variables.

## The Browser

The built-in browser is a standard `WKWebView`. It does not inject trackers of its own.
Cookies and local storage stay in the app's container, just like any other browser.

## Mini-Program Data

Mini-programs are community-provided rules that run in a sandboxed JavaScript engine. Any
variables a rule stores (`setItem` / `getItem`) are kept in the app's local storage on your
device. nPlyr does not read or transmit them.

## Debug Logs

If you enable debug logging, logs are written locally and are only shared if *you* choose to
export them when reporting a problem.

## Your Choices

- Delete individual history / bookmark / download entries at any time.
- Reset all local data from **Settings → Advanced → Reset**.
- Remove a mini-program and its stored variables from the **Mini-Programs** manager.

nPlyr is built to be private by default — there is nothing to "opt out" of.
