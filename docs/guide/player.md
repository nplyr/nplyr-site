# Player

nPlyr's player is a single `AVPlayer`-based core shared by macOS and iOS. This page covers
the everyday controls and the platform-specific gestures.

## Opening something

From the home screen you can:

- **Open a file** — drag a local video onto the window, or use the file picker.
- **Open a URL** — paste a direct link (`.mp4`, `.m3u8`, `.flv`, `.ts`, …) into the URL
  field.
- **Open from the sniffer** — send a captured link straight from the
  [Browser](/guide/browser) drawer to the player.
- **Open from a mini-program** — tap a playable item and nPlyr resolves it through the
  [rule engine](/guide/miniapps).

## Common controls (both platforms)

| Control | What it does |
|---|---|
| Play / Pause | Space (macOS) or tap the center of the video (iOS) |
| Seek | Scrub the progress bar, or use the platform gestures below |
| Volume | System / on-screen volume |
| Speed | 0.5×–3× from the speed button |
| Audio track | Pick a track when the source has multiple |
| Subtitles | Load external `.srt` / `.vtt` or use embedded tracks |
| Picture-in-Picture | Pop the video into a floating PiP window |
| AirPlay | Send video to an Apple TV or AirPlay speaker |
| DLNA (macOS) | Cast to a DLNA renderer on your network |

## macOS gestures & shortcuts

### Trackpad

- **Horizontal swipe** scrubs the timeline. The new position is **previewed** while you
  drag; the actual seek happens when you lift your finger (or after a 250 ms pause), so a
  stray swipe never jumps the video.
- **Vertical swipe** adjusts **brightness** or **volume** depending on where you started:
  the **left half** of the video controls brightness, the **right half** controls volume.
  The first swipe locks the axis so the two never fight.
- **Scroll wheel** over the progress bar fine-tunes the position (±5% per notch).

### Brightness

macOS does not expose a public API to dim another app's video, so nPlyr overlays a dimming
layer between the video and the controls. This is purely cosmetic — the underlying picture
is unchanged.

### Keyboard shortcuts

Shortcuts are matched on the **modifier keys only** (`⌘`, `⌥`, `⌃`, `⇧`) — direction
keys and the numeric keypad are ignored for matching, so arrow-key bindings work reliably.
Single-key shortcuts are suppressed while you are typing in a text field (the URL bar,
search box, etc.).

If a shortcut ever stops working, see [Troubleshooting](/guide/troubleshooting).

## iOS gestures

- **Double-tap** splits the screen into three zones: tap the **left third** to step back
  10 s, the **right third** to step forward 10 s, and the **center** to play / pause
  (with a ripple at the tap point).
- **Long-press (0.5 s)** temporarily plays at **2.0×**; release to return to normal
  speed.
- An **edge dead-zone** (about 30 pt, or 10% of the short side) is ignored so swipes that
  start at the bezel don't trigger gestures. The dead-zone is active only in fullscreen.

## Advanced playback

### Multi-source video JSON

Some rules return a structured JSON describing several video lines (different resolutions
or CDNs), subtitles, lyrics and audio URLs. nPlyr parses this into a **source switcher**
so you can flip between lines without losing your position.

### Resume & source switching

- nPlyr remembers where you stopped and offers to **resume** next time.
- When you switch sources mid-playback, the **last frame is frozen** for a moment during
  the swap so the screen doesn't flash black.
- A seek issued before the item is ready is **queued** and applied the instant playback
  can start — so you never silently restart from the beginning.

### Progressive playback

You can start watching while the file is still downloading. See
[Downloads & Library](/guide/downloads).
