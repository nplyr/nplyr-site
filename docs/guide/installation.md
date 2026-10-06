# Installation

nPlyr ships as two targets from one Xcode project:

- **`nPlyr`** — the macOS app.
- **`nPlyrIOS`** — the iOS / iPadOS app.

Both share the same playback core and rule engine.

## macOS

### Mac App Store (recommended)

1. Open the **Mac App Store** and search for **nPlyr**, or use the badge on the
   [home page](/).
2. Click **Get** and wait for the download to finish.
3. Launch nPlyr from the Dock or Launchpad.

The Mac App Store build is sandboxed and signed by Apple, so no extra setup is required.

### Sideload (development / TestFlight)

If you build from source, open `nPlyr.xcodeproj`, select the **`nPlyr`** scheme and run
on "My Mac". A development-signed build may prompt you to grant the permissions described
in [Permissions](/guide/permissions) the first time you use the browser or downloads.

## iOS / iPadOS

### App Store

Search **nPlyr** on the iOS App Store and install. The same account unlocks the
mini-program features on both platforms.

### Build from source

1. Open `nPlyr.xcodeproj` and select the **`nPlyrIOS`** scheme.
2. Choose a simulator or a connected device (iOS 16+).
3. Run. On a physical device you need a development team set in Signing & Capabilities.

> The iOS build uses the same shared sources as macOS; only the small platform-glue files
> differ. There is no separate `ffmpeg` dependency.

## First launch

On first launch nPlyr:

- asks for the permissions it needs (see [Permissions](/guide/permissions)),
- creates the local media library under your user data container,
- defaults to your system language (switchable anytime in
  [Settings](/guide/settings)).

If something does not behave as expected after install, jump to
[Troubleshooting](/guide/troubleshooting).
