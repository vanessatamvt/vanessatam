# Vanessa Tam — Portfolio Site

A portfolio site for Vanessa Tam's Vancouver job search, built with [Astro](https://astro.build). Design language is drawn from her own PDF portfolio (cream/ink editorial look, rotated section labels) and structurally inspired by the [prb-archive.netlify.app](https://prb-archive.netlify.app) reference site (horizontal project gallery, Gallery/Index toggle, full-screen menu overlay, dark fact-sheet panels).

## Requirements

This project needs **Node ≥22.12.0** (Astro 7's minimum). If `node -v` shows something older:

```sh
brew install node@22
# then run project commands with that version explicitly, e.g.:
/opt/homebrew/opt/node@22/bin/npm run dev
```

## Running locally

```sh
npm install
npm run dev
```

Opens at `http://localhost:4321`.

## Adding or editing a project

Projects live in `src/content/projects/`, one folder per project:

```
src/content/projects/
  01-the-knightsbridge/
    index.md       ← frontmatter (title, location, facts, sections, etc.)
    hero.jpeg
    gallery-01-*.jpeg, gallery-02-*.jpeg, ...
```

**To add a new project**, duplicate an existing folder (e.g. `05-inujima`), rename it, edit the frontmatter in `index.md`, and drop in new photos. Reference them from frontmatter with plain relative paths (`./hero.jpeg`). No component code needs to change — the homepage gallery, index list, and `/work/[slug]` page all pick up new entries automatically.

The `code` field (e.g. `"06"`) controls display/sort order and is Vanessa's own portfolio numbering, not a fabricated job code.

The `facts` object is fully optional per-field — omit anything that doesn't apply to a given project (e.g. academic thesis work has no GFA or Project Cost).

`facts.responsibilities` is a comma-separated list and is handled specially: it's excluded from the generic fact table and instead rendered as its own highlighted "Vanessa's Role" section (`RoleHighlight.astro`), since it's specifically her personal contribution rather than a general project fact.

### `sections` — composing the page like a real spread, not a photo grid

The body of a project page is built from `sections`, not a flat gallery array. This exists because her PDF portfolio doesn't just list photos — it composes them: a rendering sits next to its construction photo, a technical drawing has the paragraph that explains it directly underneath, and one hero shot might stand full-width while three others form a tighter cluster. A flat grid loses all of that; `sections` preserves it. Each entry in the array is one "beat" of the story, and can hold:

- Just `text` — a standalone paragraph, no images.
- One image in `images` — renders full-width.
- Two or three `images` — render side by side. Each gets its own `caption`, *unless* you set `sharedCaption` on the section, in which case one caption spans the whole row (use this for a rendering + construction pair that's really one idea, like "Podium indoor pool: design rendering and construction").
- Three `images` plus `featuredIndex` (0, 1, or 2) — the other two stack in one column beside the featured image at full height. This is the "two small construction mockups beside one tall final rendering" layout.
- Any of the above plus `text` — the paragraph renders directly below those specific images, not as disconnected body copy elsewhere on the page.

```yaml
sections:
  - images:
      - src: ./gallery-03-pool-rendering.jpeg
      - src: ./gallery-04-pool-construction.jpeg
    sharedCaption: "Podium indoor pool: design rendering and construction"

  - images:
      - src: ./gallery-09-balcony-section.jpeg
        caption: "Residential balcony typical design: Architect's Instruction"
    text: "There are more than 7 typical balcony configurations across the residential towers..."

  - images:
      - src: ./gallery-10-balcony-mockup-sales-office.jpeg
        caption: "Construction mockup of balcony detail design for sales office"
      - src: ./gallery-11-balcony-mockup-detail.jpeg
        caption: "Construction mockup, balcony detail"
      - src: ./gallery-12-balcony-rendering.jpeg
        caption: "Design rendering of the residential balcony"
    featuredIndex: 2
```

See `01-the-knightsbridge/index.md` for the fullest worked example (it mirrors that project's PDF pages almost one-to-one) — the other four projects currently use the simplest form (one section per image) since they haven't had the same page-by-page treatment yet.

## Where things live

| What | Where |
|---|---|
| Design tokens (colors, type, spacing, motion) | `src/styles/tokens.css` |
| Global base styles | `src/styles/global.css` |
| Page shell (fonts, nav, footer, view transitions) | `src/layouts/BaseLayout.astro` |
| Reusable pieces | `src/components/*.astro` |
| Content schema | `src/content.config.ts` |
| Homepage | `src/pages/index.astro` |
| Project page template | `src/pages/work/[slug].astro` |

## Currently out of scope

An About/Resume page and the Photography section aren't wired up yet (her resume content and photos are available but not yet built into pages — see the project plan). Deployment hasn't been set up either; this is dev-server-only for now.

## Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview the production build locally |
