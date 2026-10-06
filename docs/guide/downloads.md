# Downloads & Library

nPlyr can save streaming playlists to a real file and let you start watching before the
download finishes. Your history, bookmarks and downloads are collected in the Library.

## Downloading an HLS playlist

When you send an `m3u8` to the downloader, nPlyr:

1. Fetches the master and child playlists (validating the HTTP status and that the body
   is a real `#EXTM3U` document).
2. Downloads every segment, rejecting blank or malformed segment lines so a 404 error page
   can never be mistaken for a playlist.
3. Remuxes the segments into an **MP4** container.

### On-disk layout

- While downloading: `<name>.temp/`
- When finished: renamed to `<name>/` with the movie at `<name>/<name>.mp4`.
- If remux fails, the raw `.ts` is kept and marked `completed` (not `failed`) so you don't
  lose data; a per-segment failure is marked `.failed`.
- Resume works from the marker files and manifest — you can pause and continue.

> Any custom request **headers** (referer, cookie, auth) captured by the
> [sniffer](/guide/browser) are preserved and sent with every request. nPlyr never fakes a
> referer or origin — it only adds a user-agent when one is needed.

## Progressive playback

Turn this on to **watch while downloading**. nPlyr serves the partially downloaded file
through a local loopback server and begins playback ahead of the download front
(`progressiveLookahead = 20` segments). It is **off by default**.

When progressive playback is active:

- the playlist's key (`#EXT-X-KEY`) lines are stripped before delivery,
- the player always references the **original** source URL (the local server is
  transparent),
- if a domain fails, that domain is blacklisted for the session, the partial file is
  cancelled and deleted, and nPlyr does not silently reroute.

Progressive playback and ad-blocking are mutually exclusive; ad-blocking takes over only
when progressive playback is not in use.

## Multi-quality & subtitles

- **Quality** selection applies to **downloads** (pick a variant before downloading; if
  you don't choose, nPlyr waits briefly for a choice and otherwise falls back to the best
  variant).
- **Subtitles** are downloaded alongside the media and saved as `subtitle.<ext>` in the
  segment temp directory, so they stay attached to the file.

## Media Library

The Library gathers three things in one searchable place:

- **History** — what you've watched and when.
- **Bookmarks** — sources and items you saved.
- **Downloads** — files saved through the downloader.

Everything is searchable by title, and the library is designed to sync across your Mac and
iPhone when signed into the same environment.

## Ad-blocking

nPlyr blocks ads using the same **subscription-rule** format as Chrome extension
blocklists (the approach hikerView uses). You subscribe to a filter list and nPlyr filters
requests in the browser and during playback. This is separate from progressive playback —
only one of the two is active at a time.
