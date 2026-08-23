# Image Credits — Audit

What got credited, what didn't, and how confident I am. Correct anything that's
wrong and I'll re-run it.

Credit lines used (per your choices):

- Projects 01–05 → `Image Credit: RWA Group Architecture`
- Projects 06–07 → `Image Credit: Ronald Lu & Partners`
- Projects 08–10 → `Image Credit: RAD Ltd`
- Academic (a01–a04) and the Photography page → **no credit** (your own work)

---

## How I judged provenance

Three signals, in order of reliability:

1. **Camera EXIF** — a surviving `Apple iPhone 15 Pro` / `NIKON Z6` / `Galaxy Fold7`
   tag means you shot it. Strong positive evidence.
2. **Source filenames** in `Original Project Images/` — render-package names
   (`E02_Exterior-Hero_3840x2160-72ppi`, `2201-Trailside…Courtyard Render.png`)
   vs. camera names (`IMG_*`, `DSC_*`, `DJI_*`).
3. **The inline comments already in your `index.md` files** — several of them
   record the original filename, which was the single most useful signal.

**The one thing EXIF can't do:** absence of EXIF proves nothing. Batch-resizing to
1400×1867 stripped it inconsistently — some of your own photos lost it. So
"no EXIF" was never treated as evidence on its own.

---

## Credited

| Project | What | Confidence |
|---|---|---|
| 01 SFU Symposia | hero | **High** — `E02_Exterior-Hero`, a render-package file |
| 02 Lynn Trailside | hero | Medium — no EXIF; source folder holds render files |
| 03 Lynn Towns | hero, detail-hero (drone) | Medium |
| 06 Knightsbridge | hero, detail-hero, Renderings carousel, finale, 9 story rows | **High** for renders/drawings |
| 07 HKUST | hero + 3 story rows | **High** — all CGI/diagrams |
| 08 R&D Twin Towers | hero + 4 story rows | **High** |
| 09 Houhai Basement | hero + carousel | **High** |
| 10 Hyatt Mumian | hero, "The Hotel Today" carousel, 26 story rows | **High** |

## Not credited — your own work

| Project | What | Evidence |
|---|---|---|
| 03 Lynn Towns | `buildingGallery` (8 photos), all `site-review-*` | `IMG_6368/6369/6370/6706/9877`, `DSC_1205`; iPhone 15 Pro + Nikon Z6 EXIF |
| 04 Eastward | **everything** — project-page hero is `detail-hero-2.jpg` (iPhone 15 Pro), showcase reel, site reviews | EXIF + `IMG_8254/8261/0038` |
| 05 Arbutus | **everything** — showcase-01–04, site reviews | iPhone 11 / 15 Pro / Galaxy Z Fold7 EXIF |
| 06 Knightsbridge | "Construction Photos" carousel | iPhone 11 Pro EXIF |
| a01–a04 | all academic boards, drawings, renders | your own studio/thesis work |
| Photography page | all 12 | yours |

---

## Three things to check

1. **Symposia says RWA, not Mosaic.** You first asked for `Image Credit: Mosaic
   Homes`, then chose "RWA Group Architecture" for the RWA projects — so I used
   RWA for consistency across 01–05. Say the word and I'll flip 01–03 to Mosaic
   Homes and 04–05 to Intracorp Homes.

2. **Knightsbridge story rows got a blanket RLP credit** — including rows that
   pair a rendering with a *construction photo* (pool, function room, courtyard,
   footbridge site photos). If those site photos are yours, they should come off.

3. **Lynn Trailside and Lynn Towns heroes are my weakest calls.** No EXIF, no
   matching filename in the source folder. The Lynn Towns detail-hero is a drone
   shot (`DJI_*` files are in that folder) — yours if you flew it.

---

## Where the credit renders

A new `credit` treatment, one step quieter than a photo caption (12px, muted,
left-aligned) so it reads as metadata rather than description:

- `heroCredit` / `detailHeroCredit` — under the project-page hero
- `galleryCredit` / `constructionGalleryCredit` — one line under a carousel
- `sharedCredit` on a story row, or `credit` on a single image
- `finaleCredit` — under the closing image
