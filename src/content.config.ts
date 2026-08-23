import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Each project lives in its own folder under src/content/projects/, e.g.
//   src/content/projects/01-the-knightsbridge/index.md
// with a hero.jpg and any gallery-*.jpg images colocated in the same folder.
// To add a new project: duplicate a folder, edit the frontmatter + body below,
// and drop new photos alongside index.md. Nothing else needs to change.
const projects = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      location: z.string(),
      // "professional" = paid/professional work, "academic" = school/thesis work
      category: z.enum(['professional', 'academic']),
      // Two-digit project number, matches Vanessa's own portfolio numbering (01-05)
      code: z.string(),
      tag: z.string(), // short type label shown on cards, e.g. "Residential, Mixed-Use"
      stage: z.string(), // e.g. "Construction, Partial Completion"
      description: z.string(),
      facts: z
        .object({
          affiliation: z.string().optional(),
          client: z.string().optional(),
          projectType: z.string().optional(),
          currentStage: z.string().optional(),
          siteArea: z.string().optional(),
          gfa: z.string().optional(),
          projectCost: z.string().optional(),
          program: z.string().optional(),
          units: z.string().optional(),
          responsibilities: z.string().optional(),
          // The itemized task list beneath "Vanessa's Role" in her source PDF —
          // rendered as bullet points under the role tags by <RoleHighlight />.
          // Optional: projects without a bulleted breakdown (proposals, academic
          // work) simply omit it.
          responsibilityDetails: z.array(z.string()).optional(),
          // A URL to the full project write-up (e.g. the Behance case study).
          // Rendered as a clickable "Full Read" row in the fact list.
          fullRead: z.string().url().optional(),
        })
        .optional(),
      // Used for the home page's project gallery card. Also the fallback for
      // the project page's own hero banner when detailHeroImage is unset.
      heroImage: image(),
      heroCaption: z.string().optional(),
      // ONE attribution line covering the project's firm/developer-supplied
      // imagery (renderings and marketing photography Vanessa didn't produce
      // herself), e.g. "Images Courtesy of RWA Group Architecture". Rendered
      // once, right-aligned at the bottom of the project brief's fact sheet —
      // deliberately NOT repeated under each image. Projects whose imagery is
      // entirely her own simply omit it.
      imageCredit: z.string().optional(),
      // Optional override for the project page's hero banner ONLY — lets that
      // larger photo differ from the home page card's cover image. If unset,
      // the project page falls back to heroImage/heroCaption, same as before.
      detailHeroImage: image().optional(),
      detailHeroCaption: z.string().optional(),
      // CSS object-position for the project-page hero (the banner is cropped
      // via object-fit: cover, capped at 85vh). Defaults to center; set e.g.
      // "center bottom" to anchor the crop to the image's bottom edge when the
      // meaningful content sits low (street level) and the top is just sky.
      heroPosition: z.string().optional(),
      // Show the project-page hero WHOLE instead of cropping it to fill the
      // banner. The default `object-fit: cover` crop suits a photograph with
      // room to lose at the edges, but ruins a drawing or a rendering whose
      // subject spans the entire frame — cropping a masterplan just zooms into
      // its middle. With this set the image is letterboxed inside the same
      // 85vh band, so the full composition survives. `heroPosition` has no
      // effect alongside it: nothing is cropped, so there's no crop to anchor.
      heroContain: z.boolean().optional(),
      // Opt IN to click-to-zoom on this project's section images. Off by
      // default: a lightbox is worth its interruption only where the images
      // reward close reading — Monumento ai Caduti is a survey of drawings and
      // rectified elevations, where detail IS the content. Everywhere else the
      // images are photographs and renderings that read fine at page size, so
      // opening a modal over them is friction without payoff.
      imageZoom: z.boolean().optional(),
      // A standalone "Explore the Building" showcase gallery — a centered-peek
      // carousel of finished-building photos (portrait), modelled on the
      // "Explore Our Hotel" module on Hyatt property pages. Rendered by
      // <BuildingGallery /> below the story `sections` by default (see
      // `galleryBeforeSections` to flip that). Optional; omit it and the
      // module simply doesn't appear. `galleryTitle` overrides the default
      // centered heading.
      galleryTitle: z.string().optional(),
      // Move buildingGallery ABOVE sections instead of below — for a project
      // whose carousel should lead (e.g. renderings before site-review
      // photos). constructionGallery is unaffected: it always renders last,
      // after sections, as the page's final carousel.
      galleryBeforeSections: z.boolean().optional(),
      // Attribution for THIS carousel only, when its photography has a
      // different source from the rest of the project (e.g. the finished-hotel
      // reel shot by other photographers). Rendered as a quiet right-aligned
      // line beneath the carousel; the project's own `imageCredit` still
      // covers everything else on the page.
      galleryCredit: z.string().optional(),
      // Show the showcase carousel with landscape (3:2) slides instead of the
      // default portrait (3:4) — for projects whose photos are horizontal.
      galleryLandscape: z.boolean().optional(),
      // Mixed-orientation showcase carousel: each slide keeps its own
      // portrait/landscape aspect ratio at a shared height, instead of one
      // uniform slide box — for a reel of finished-building photography where
      // some frames are vertical and some horizontal. Mirrors
      // `constructionGalleryMixed` below.
      galleryMixed: z.boolean().optional(),
      buildingGallery: z
        .array(z.object({ src: image(), caption: z.string().optional() }))
        .default([]),
      // A second, optional showcase carousel rendered directly below
      // buildingGallery — same <BuildingGallery /> component and behaviour.
      // Used e.g. for a "Construction Photos" reel following the "Project
      // Renderings" reel. `constructionGalleryLandscape` mirrors
      // `galleryLandscape` for horizontal (site) photos.
      constructionGalleryTitle: z.string().optional(),
      constructionGalleryLandscape: z.boolean().optional(),
      // Mixed-orientation carousel: each slide keeps its own portrait/landscape
      // aspect ratio at a shared height (instead of one uniform slide box), so
      // e.g. site photos of differing orientation sit together uncropped.
      constructionGalleryMixed: z.boolean().optional(),
      constructionGallery: z
        .array(z.object({ src: image(), caption: z.string().optional() }))
        .default([]),
      // A single closing image rendered AFTER both showcase carousels (and after
      // the story `sections`), immediately before "More Projects" — the page's
      // finale shot. Full content width, with its caption beneath, matching the
      // treatment of a single-image `sections` entry.
      finaleImage: image().optional(),
      finaleCaption: z.string().optional(),
      // The page body below the hero/facts is built from `sections`, not a
      // flat photo grid. Each entry is one "beat" of the story — matching
      // how her PDF actually composes a spread (a rendering next to its
      // construction photo, a technical drawing with the paragraph that
      // explains it, a full-width shot standing alone) rather than dumping
      // every image into a uniform grid. A section can hold:
      //   - just `text` (a standalone paragraph, no images)
      //   - one image (spans the content width)
      //   - 2+ `images` side by side, auto-sized to equal height from their
      //     real aspect ratios and never cropped. Each keeps its own caption,
      //     unless `sharedCaption` is set, in which case ONE caption spans the
      //     row — e.g. a rendering + its construction photo described together
      //   - any of the above plus `text`, which renders directly below the
      //     image(s) as the paragraph that specifically explains them
      sections: z
        .array(
          z.object({
            images: z
              .array(
                z.object({
                  src: image(),
                  caption: z.string().optional(),
                  // Callout labels drawn OVER the image, each joined to a point
                  // on the drawing by a leader line — for exploded axonometrics
                  // and diagrams where the programme needs naming. `x`/`y` are
                  // percentages of the image itself (not the page), so the
                  // labels stay locked to the drawing at any size. Kept as live
                  // text rather than burnt into the file: it stays sharp when
                  // zoomed, can be selected and searched, and picks up the
                  // site's own type and accent colour.
                  annotations: z
                    .array(z.object({ text: z.string(), x: z.number(), y: z.number() }))
                    .optional(),
                }),
              )
              .default([]),
            sharedCaption: z.string().optional(),
            text: z.string().optional(),
            // Booklet-grid presentation (used to mirror the Behance layout):
            // `grid: true` tightens the gutter between side-by-side images to a
            // hairline 4px, so a row reads as pages of one spread; `narrow: true`
            // additionally inset the row (~86% width, centered) — matching
            // Behance's smaller centered 2-up rows.
            grid: z.boolean().optional(),
            narrow: z.boolean().optional(),
            // For a section with exactly one image: render it at one row-slot's
            // width (~50%, left-aligned) instead of the default full-width
            // single-image treatment, so a trailing odd photo (e.g. the last
            // item in a "2 per row" sequence like Site Reviews) matches the
            // height of the 2-up rows above it rather than reading much taller.
            compact: z.boolean().optional(),
            // A short line rendered tightly beneath `text` (not the usual
            // section-to-section gap) at a smaller size than a photo caption —
            // e.g. a disclaimer directly under a "Site Reviews" subheading.
            note: z.string().optional(),
            // Set on a `text` section that's a long explanatory paragraph, to
            // render it a size step down from the default. Default `text`
            // size matches short chapter/divider labels (e.g. "01 — General
            // History..."); without this flag a long paragraph would read at
            // the same weight as those labels, when it's actually a lower
            // level of the page's hierarchy, not an equal one.
            smallText: z.boolean().optional(),
            // Set on a `text` section that's reference/meta material (e.g. a
            // closing bibliography) rather than narrative copy — renders it
            // at the same font-size, color, and measure as a photo caption,
            // since it belongs at that lower level of the hierarchy, not
            // alongside the page's actual body paragraphs.
            captionText: z.boolean().optional(),
            // A standalone embedded video (YouTube URL, e.g.
            // https://youtu.be/xxxx or https://www.youtube.com/watch?v=xxxx).
            // Renders as its own centered, 16:9 section — put it in a section
            // with no `images` to use it on its own between other sections.
            video: z.string().optional(),
            // Autoplay (muted, on scroll into view) independent of videoBanner's
            // width change — for a video that should play on scroll but stay in
            // the default centered box instead of going full width.
            autoplay: z.boolean().optional(),
            // Render the video as a full-width banner (edges aligned with the
            // text/fact-row margins) that autoplays muted when scrolled into
            // view, instead of the default 75% centered click-to-play box.
            videoBanner: z.boolean().optional(),
          }),
        )
        .default([]),
    }),
});

// The photo-journal is deliberately NOT a content collection. Its chapters are
// plain folders of images under src/content/photo-journal/, discovered at build
// time by src/lib/photo-journal.ts, with tones and captions in
// src/data/photo-journal.ts. Nothing about it needs a schema — and keeping it
// out of collections means re-sorting the folders can never break the build,
// which is exactly what happened when the old `photography` collection was left
// pointing at a folder that had been renamed.
export const collections = { projects };
