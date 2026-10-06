# Mini-Program Compatibility

> **This is the authoritative boundary.** nPlyr runs hikerView-compatible mini-programs,
> but the original engine is **Android / Java running Rhino**, while nPlyr runs on Apple
> platforms with **JavaScriptCore** and **no JVM**. nPlyr reimplements the bridge and the
> rule DSL natively and adds a **Rhino → Java compatibility layer** for the Java APIs
> rules depend on. This page spells out what works unchanged, what works *through* the
> compat layer (with caveats), and what is **not** supported.

If you are a user just trying a rule, read [Mini-Programs](/guide/miniapps) first. This
page is for understanding *why* a specific rule might differ from its Android behavior.

## Why a boundary exists

| | hikerView (Android) | nPlyr (Apple) |
|---|---|---|
| JS engine | **Rhino** (Java-embedded) | **JavaScriptCore** |
| Can call Java? | Yes — `Packages.*`, `new JavaImporter()`, `with(){}` into any class | No JVM. A **compat shim** emulates a *subset* of the Java API |
| UI | Android `Activity` / `RecyclerView` | Native SwiftUI |
| Network / storage | OkGo / LitePal | URLSession / UserDefaults |

So the *logic* ported 1:1 (the DSL, the `fba` bridge contract, the `hiker://` routing),
but anything that reached into **Java** at runtime has to be re-provided — and that is
deliberately a **curated subset**, not a full JRE.

nPlyr reimplements the bridge and the rule DSL natively and adds a compatibility layer
that emulates a curated subset of the Java APIs rules depend on.

## ✅ Fully supported — no changes needed

These behave the same as on Android; rules using only these will "just work":

- **Rule DSL**: `pdfh` / `pdfa` / `pd` selectors, `parseDom`, `setHomeResult` /
  `setSearchResult` / `setResult`.
- **`$` selector layer** — including
  `$(url).lazyRule(fn)`, `$(url, ordinary).lazyRule`, and `.rule(fn)`.
- **`fy_bridge_app` (`fba`) bridge**: play, `fetch`, `post`, `request`, parse, variable
  storage.
- **`hiker://` routing**, including `hiker://empty##…` (lightweight parameter carrier)
  and `hiker://search?s=` (aggregated search).
- **`col_type` rendering** — all **38 layouts** aligned with hikerView's own item
  templates.
- **Variable map**: `putVar` / `getVar` / `putMyVar` / `getMyVar` (in-memory) and
  `setItem` / `getItem` / `clearItem` (persisted to local storage).
- **HTTP**: `fetch` / `post` with headers; charset handling (`gb2312` / `gbk` /
  `gb18030` → GBK, `big5` → Big5, default UTF-8); `withHeaders` / `onlyHeaders` /
  `withStatusCode` return a JSON envelope.
- **User-Agent**: `auto` / `mobile` / `pc` / custom (a rule's own UA applies when you
  choose to follow it).
- **Cloud shares**: TextDB (云2), `cmd.im` 302 redirect (云5), `pasteme` (云6).
- **Crypto** that is pure-JS (`AES`, `CryptoJS`); `RSA` where the native bridge provides
  it.
- **`;post;` pre-fetch** and `decodeConflictStr` decoding.

## ⚠️ Supported *through* the Java compatibility layer (subset only)

The layer provides these globals and classes, but each has caveats:

- **Globals**: `Packages`, `java`, `JavaImporter`, `importPackage()`, `importClass()`.
- **`_base64`** mirroring `android.util.Base64` semantics.
- **`FileUtil`** (`com.example.hikerview.utils`) — provided as a *native shim* (see
  `toInputStream` below).
- **`javax.crypto`**: `Cipher.getInstance` / `init` / `doFinal`, `SecretKeySpec`,
  `IvParameterSpec` — but **`Cipher.update` is not implemented** (it throws a clear
  "not used by corpus, report the rule name" error rather than silently misbehaving).

### Known-class list (the big one)

Only a **curated set** of Java classes is shimmed. A class **not** on the list falls back
to a **diagnostic stub**: it logs once and throws a *clear* error on use — it does **not**
produce a bare `ReferenceError`. In practice this means:

- Rules that use common, well-known Java classes (the ones the corpus needs) work.
- Rules that reach into obscure or Android-framework classes will fail with an actionable
  message naming the missing class — please report the rule name so the list can grow.

### `byte[]` has two representations

This trips up image-decryption rules in particular:

- **Small buffers (≤ 4096 B)** → a real JS `Array<number>` with a `.length` *property*
  (Java-array semantics) and working bitwise ops (e.g. a typical `toHex` pattern
  found in image-decryption rules).
- **Large buffers (images, etc.)** → a host-provided byte-array object exposing only
  `length` / `toBase64` / `toHex` / `utf8String` / `slice`. You **cannot** do per-byte
  access on the large form — third-party image-decryption chains rely on the host
  methods instead.

### `FileUtil.toInputStream` (comic image decryption)

On Android this returns a Java `InputStream`. nPlyr **replaces** that path: it intercepts
an intercepted-stream marker, converts it to a local picture URL served from the app's
cache, and hands the image back to the view. A rule that expects to *read the stream
itself* must rely on this host conversion rather than opening an `InputStream`.

### Java File I/O is minimal

the emulated files root returns `'/'` and `fileExist` returns a boolean — a tiny shim.
Arbitrary `java.io.File` / NIO / `Zip` / `java.net.*` operations are **not** available;
use the `fetch` / `post` bridge for anything network-related.

### `BigDecimal` scale

Android's `BigDecimal` keeps scale (e.g. `"5.0"`). nPlyr's decimal formatting preserves
scale too, or numeric formatting drifts. Rules depending on exact Java `BigDecimal`
`toString` output may see differences.

### Rhino engine semantics

A top-level `const X = X = …` double-assignment is tolerated by Rhino but **crashes
JavaScriptCore**. nPlyr runs a script preprocessor so such degenerate JS
doesn't take down the engine. Rhino-only quirks are therefore neutralized, not emulated.

### `hijackEnv` `method_*` bridges

Java method hijacking is supported, but the native bridge must delegate to the
original method it captured at injection time — **never** call back into the JS global, or
you get infinite recursion (`Maximum call stack size exceeded`). A bridge that returns
no-op silently disables the dynamic card that depended on it.

## ❌ Not supported

- **Arbitrary Java classes beyond the known list** — there is no JVM and no reflection into
  the Android framework.
- **Android UI / View / Activity / RecyclerView / Adapter** APIs — nPlyr renders natively;
  these have no counterpart.
- **Android permissions, Content Providers, the Intent system.**
- **Some `javax.crypto` paths** — `Cipher.update`, and any cipher mode the native bridge
  has not implemented.
- **`java.io.File` / NIO / Zip / `java.net.*`** — use the `fetch` / `post` bridge instead.

## Reporting an incompatibility

When a specific rule misbehaves, capture:

1. the **rule name**,
2. the **step** it failed at (home / search / detail / parse), and
3. the **message** — the compat layer logs a clear one-liner for unlisted classes.

Report these so the known-class list and the native bridges can be extended.

## Tips for rule authors

- Replace `java.io.File` / stream reading with the `fetch` / `post` bridge, or with the
  host's `toInputStream` conversion that returns a local picture URL.
- Don't depend on obscure Java classes; prefer the JS or bridge equivalents.
- Avoid Rhino-only idioms such as the `const X = X = …` double assignment.
- Keep per-byte image work on **small** buffers; for large images use the
  `toBase64` / `toHex` / `slice` host methods.

## Official hikerView documentation

nPlyr aims to be compatible with the hikerView rule ecosystem. For the complete,
authoritative reference — the rule DSL, selectors, the mini-program bridge contract and
authoring guides — consult the official hikerView documentation:

- **hikerView Docs:** [https://github.com/ReflectionLab/Documents](https://github.com/ReflectionLab/Documents)

Rule authors coming from hikerView can use the same share texts and JSON; the compatibility
boundary documented above explains where nPlyr diverges from the Android runtime.
