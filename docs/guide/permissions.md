# Permissions

nPlyr is deliberately **light on permissions**. Because it is a media player (not a
clipboard or screen tool), it does **not** ask for Accessibility or Screen Recording. The
only permissions that may appear are the standard ones any network and file app needs.

## Network access

Streaming, sniffing and mini-program sources all require outbound network access. On macOS
this is allowed by the App Store sandbox by default — there is **no prompt** and nothing to
grant manually.

## Files and Folders

- **Opening a local file** uses the standard macOS open panel, so you pick the file
  yourself; no blanket folder access is required.
- **Saving downloads** writes to your **Downloads** folder (or a folder you choose). The
  first time you download, macOS may show a sandbox prompt to confirm the location. Grant
  it once and nPlyr remembers the choice.

If you later move nPlyr's data or revoke access, you can re-grant it in
**System Settings → Privacy & Security → Files and Folders**.

## Notifications (optional)

nPlyr may show a local notification when a download finishes. This is optional and can be
turned off in **System Settings → Notifications → nPlyr**.

## What nPlyr does *not* request

| Permission | Needed? | Why not |
|---|---|---|
| Accessibility | No | Keyboard shortcuts use in-app event monitors, not global accessibility control. |
| Screen Recording | No | nPlyr plays and captures *network* media; it never records your screen. |
| Full Disk Access | No | All file access goes through the open/save panels or the Downloads folder. |
| Camera / Microphone | No | nPlyr is a viewer; it does not capture input devices. |

If you see a permission prompt that isn't listed here, it is almost certainly from a
mini-program or the browser reaching a specific site — not from the core app. See
[Troubleshooting](/guide/troubleshooting) if something looks wrong.
