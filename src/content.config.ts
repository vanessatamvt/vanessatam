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
          projectType: z.string().optional(),
          currentStage: z.string().optional(),
          siteArea: z.string().optional(),
          gfa: z.string().optional(),
          projectCost: z.string().optional(),
          program: z.string().optional(),
          responsibilities: z.string().optional(),
        })
        .optional(),
      heroImage: image(),
      heroCaption: z.string().optional(),
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
            images: z.array(z.object({ src: image(), caption: z.string().optional() })).default([]),
            sharedCaption: z.string().optional(),
            text: z.string().optional(),
          }),
        )
        .default([]),
    }),
});

// A single page (not a per-project collection): the "Personal Photography"
// section of her PDF. Reuses the exact same `sections` shape as projects
// (see comment above) so it renders through the same <ProjectSection />
// component — images sit side by side at equal height, never cropped, with
// each keeping its own caption unless `sharedCaption` groups them (e.g. the
// lioness diptych on the closing spread).
const photography = defineCollection({
  loader: glob({ pattern: 'index.md', base: './src/content/photography' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      sections: z
        .array(
          z.object({
            images: z.array(z.object({ src: image(), caption: z.string().optional() })).default([]),
            sharedCaption: z.string().optional(),
          }),
        )
        .default([]),
    }),
});

export const collections = { projects, photography };
