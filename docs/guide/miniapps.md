# Mini-Programs

nPlyr can run **hikerView-compatible mini-programs** — the same community rules
that power the Android app. This page explains what they are and how nPlyr executes them.
For the compatibility boundary (especially the Java/Rhino parts), read the
[Compatibility](/guide/miniapp-compatibility) page.

## What is a mini-program?

A mini-program in this ecosystem is a **rule package** (HTML + JavaScript) that tells the
app how to:

- render a **home page** of categories / channels,
- run a **search**,
- parse a **list** and a **detail** page, and
- extract **playable links** and hand them to the player.

The rule logic runs in a JavaScript engine and talks to the host app through a bridge
object called **`fy_bridge_app`** (short: **`fba`**).

## The contract nPlyr reimplements

nPlyr does **not** port hikerView's Android/Java UI. Instead it reuses the layer that
actually carries the value — the **rule engine, the parse DSL and the mini-program bridge
contract** — and rewrites the UI, WebView and network layers natively for Apple platforms.

Concretely, nPlyr provides a native implementation of:

- the **rule DSL**: `pdfh` / `pdfa` / `pd` selectors, `parseDom`, `setHomeResult`,
  `setSearchResult`, `setResult`;
- the **`$` selector compatibility layer** so `$(url).lazyRule(fn)` and
  `$(url, ordinary).lazyRule` behave as expected;
- the **`fy_bridge_app` / `fba` bridge** so rules can call host features: play, fetch,
  post, parse, store variables;
- the **`hiker://` pseudo-protocol** routing (including `hiker://empty##…` as a
  lightweight parameter carrier and `hiker://search?s=` for aggregated search);
- the **`lazyRule` / `.rule(fn)`** execution model, page navigation (`beginResultNavigation`
  / `finalizeResultPage`) and the result-stack lifecycle (`onClose` ownership, `MY_PAGE`
  attribution).

## Rule DSL essentials

| API | Purpose |
|---|---|
| `setHomeResult([…])` | Emit the home grid (categories / channels). |
| `setSearchResult([…])` | Emit search results. |
| `lazyRule` / `.rule(fn)` | Run a sub-rule to parse a list/detail page. |
| `fetch` / `post` | HTTP with headers; `withHeaders` / `onlyHeaders` / `withStatusCode` return a JSON envelope. |
| `putVar` / `getVar` / `putMyVar` / `getMyVar` | In-memory variables; `setItem` / `getItem` / `clearItem` persist to local storage. |
| `MY_URL` / `MY_RULE` | The current rule's URL and rule body. |
| `AES` / `RSA` / `CryptoJS` | Crypto helpers available to rules. |

Each list item carries a `col_type` that nPlyr maps to a SwiftUI layout — there are
**38 `col_type` layouts** (e.g. `text_1`, `pic_19`) aligned with hikerView's own item
templates, so existing rules render the way their authors intended.

## Managing mini-programs

Open **Mini-Programs** (the manager window on macOS; a tab/page on iOS) to:

- **import** a program from a share text or JSON,
- **add / edit** a rule (a full rule editor on macOS; a push page on iOS),
- **reorder** programs (drag) — the home top row follows the order,
- **delete** a program,
- **share / cloud-share** a program (cloud backends: TextDB, `cmd.im` 302 redirect, and
  `pasteme`).

A **free tier** caps the number of imported mini-programs; a one-time unlock removes the
cap.

## Search

The independent search window is built from the rules you have installed that declare a
`search_url`. You can search one engine or aggregate across all of them.

## Next

- [Compatibility](/guide/miniapp-compatibility) — exactly which Java/Rhino behaviors are
  and are not supported.
- [Downloads & Library](/guide/downloads) — where parsed links go.
- [Browser & Sniffer](/guide/browser) — the alternative path for capturing links.

## Official hikerView documentation

nPlyr is built to be compatible with the hikerView rule ecosystem. For the complete rule
and mini-program reference — the DSL, selectors, bridge contract and authoring guides —
see the official hikerView documentation:

- **hikerView Docs:** [https://github.com/ReflectionLab/Documents](https://github.com/ReflectionLab/Documents)

If you already write rules for hikerView, the same share texts and JSON import and run
unchanged in nPlyr (subject to the compatibility boundary above).
