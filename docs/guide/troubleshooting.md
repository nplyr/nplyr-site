# Troubleshooting

This page collects common problems with nPlyr on macOS and iOS and how to resolve them.

## The app won't start or crashes on launch

1. Make sure your OS meets the minimum (macOS 14 Sonoma+, or iOS / iPadOS 16+).
2. Quit and relaunch the app.
3. If you sideloaded a development build, make sure the provisioning profile is still
   valid.

## A video won't play (spins or shows an error)

- Confirm the link is a **direct** media URL (`mp4`, `m3u8`, `flv`, `ts`, …), not a page.
  Use the [Browser & Sniffer](/guide/browser) to capture the real link.
- Some sites require specific **headers** (referer, cookie, auth). Capturing the link
  through the sniffer preserves those headers automatically.
- `TS → MP4` passthrough needs a format hint; if a TS source fails, try a different line
  from the source switcher.
- A `403` from a source is usually brief site-side rate limiting; wait and retry rather
  than changing headers blindly.

## The sniffer captures nothing on a site

- The page may load its video through a proprietary player or DRM that never requests a
  plain media file. In that case a [mini-program](/guide/miniapps) that talks to the
  source's API is the right tool.
- Try reloading the page, or switch the **browser user-agent** to Mobile / Desktop in
  [Settings](/guide/settings).

## A keyboard shortcut doesn't work

- Shortcuts match on modifier keys only (`⌘`, `⌥`, `⌃`, `⇧`); direction keys and the
  numeric keypad are not part of the binding.
- While you are typing in a text field (URL bar, search box), single-key shortcuts are
  intentionally suppressed so they don't fight your input.
- If a binding still feels dead, check it isn't shadowed by a system or app shortcut in
  **System Settings → Keyboard → Keyboard Shortcuts**.

## Downloads stall or fail

- A per-segment failure marks the download `.failed`; resume from the marker files.
- If a domain returns `404` repeatedly, nPlyr blacklists it for the session and will not
  silently reroute — pick another source.
- Remux failures keep the raw `.ts` and mark it `completed`, so your data isn't lost.

## A mini-program doesn't behave like on Android

The original engine is Android/Java (Rhino). nPlyr runs rules on JavaScriptCore and
implements a **Rhino→Java compatibility layer** for the parts rules depend on. Some
Java-specific behavior is intentionally not supported. Check the
[Compatibility](/guide/miniapp-compatibility) page and, if a specific rule fails, report
the rule name.

## Resetting nPlyr

You can reset the app's local data (library, bookmarks, mini-program variables) from
**Settings → Advanced → Reset**. This does not affect your purchased unlock.
