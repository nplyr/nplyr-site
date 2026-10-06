---
title: Mini-Program Sources
description: Where nPlyr's mini-programs and rule sources come from, and how to add your own.
layout: doc
---

# Mini-Program Sources

This page is part of the **Mini-Programs** guide section — the catalog of community
mini-programs and rule sources that nPlyr can import. nPlyr does **not** ship with a fixed
list of video sources; instead you bring your own, and the in-app manager imports them.

## Where sources come from

- **The hikerView ecosystem.** nPlyr is compatible with the same share texts
  and JSON that the Android app uses, so existing community rules import directly.
- **Cloud shares.** nPlyr supports the cloud backends **TextDB** (云2), `cmd.im` (302
  redirect, 云5) and **pasteme** (云6), so rules hosted there can be subscribed to in one
  step.
- **Your own.** Write or adapt a rule and import it — see the
  [Mini-Programs overview](/guide/miniapps) and the
  [Compatibility](/guide/miniapp-compatibility) boundary first.

## Adding a source

1. Open **Mini-Programs** in nPlyr (the manager window on macOS, a page on iOS).
2. Choose **Add** and paste the share text / JSON, or pick a cloud source to subscribe.
3. The program appears in the home top row — drag to reorder.

A free tier caps how many programs you can keep imported at once; a one-time unlock removes
the cap.

## Compatibility matters

Not every Android rule runs identically on nPlyr. nPlyr's engine is **JavaScriptCore**,
not Java/Rhino, and only a curated subset of the Java API is emulated. Before relying on a
source, check the [Compatibility](/guide/miniapp-compatibility) page and report any rule
that fails (include the rule name and the step it failed at).

> The catalog you browse here is community-curated. nPlyr is not the author of third-party
> mini-programs and does not vouch for their content — only install sources you trust.
