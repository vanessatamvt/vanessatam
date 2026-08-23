// The photo-journal's chapters — one per folder in src/content/photo-journal/.
//
// Photos are DISCOVERED from the folders, not listed here, so sorting and
// re-sorting the folders never means editing code. This file only holds the
// things a folder can't tell us on its own: the order chapters appear in, the
// earth tone each one is tinted with, the opening line, and per-photo captions.
//
// To add a chapter: make the folder, add an entry below with a matching
// `folder`. To caption a photo: add its filename to that chapter's `captions`.
// Anything uncaptioned simply renders without one.
//
// Not sure which photo is which filename? Run the dev server and open
// /photo-journal/contact-sheet — every photograph at thumbnail size with its
// filename underneath. Click a frame to copy the filename, paste it in below.
//
//   captions: {
//     'DSCF6741.JPEG': 'Two sentences on what you were thinking here.',
//   },
//
// A captioned photograph automatically takes a row to itself on its chapter
// page, and the caption sets below it at a tab stop from the photo number.

export type Chapter = {
  /** Folder name under src/content/photo-journal/ — must match exactly. */
  folder: string;
  /** URL segment: /photo-journal/<slug> */
  slug: string;
  /** Muted earth tone drawn from the place itself. Used for the chapter's
   *  index tile before its cover loads, the rule under its title, and the
   *  frame around its photos — so each chapter reads as its own colour without
   *  ever competing with the photographs. */
  tint: string;
  /** One or two lines setting up the chapter. */
  intro?: string;
  /** Filename of the cover. Unset falls back to the first photo in the folder,
   *  which is the placeholder behaviour for now. */
  cover?: string;
  /** Per-photo captions, keyed by filename. Two sentences is plenty — this is
   *  where the thinking behind the frame goes. */
  captions?: Record<string, string>;
  /** Force the relative order of specific photographs. The named files take the
   *  slots they ALREADY occupy in the running order, filled in the order listed
   *  — so naming two swaps them, naming five reorders just those five, and
   *  every other photograph stays exactly where it was.
   *
   *  This is the escape hatch for the cases the shape grouping and filename
   *  order get wrong, without having to hand-write a whole chapter's order.
   *  Naming the cover will move it off the front, so don't. */
  sequence?: string[];
  /** Run in filename order (roughly the order they were taken) instead of the
   *  house rule, which is to gather one frame shape at a time.
   *
   *  Grouping is the default because the stack recedes SIDEWAYS: the front
   *  photograph changes width every time the shape changes, and grouped that
   *  happens at one or two boundaries you can see coming rather than repeatedly
   *  through the chapter. It also lowers `--reach`, which makes every
   *  photograph in the chapter render larger.
   *
   *  Set this on a chapter that reads as a sequence, where the order of the
   *  walk matters more than the steadiness of the frame. */
  keepShotOrder?: boolean;
};

export const chapters: Chapter[] = [
  {
    folder: 'British Columbia',
    slug: 'british-columbia',
    // Wet cedar and deep coastal rainforest.
    tint: '#3f5147',
    intro: '',
    cover: 'DSCF5788.JPEG',
    captions: {},
  },
  {
    folder: 'Switz_Jungfrau',
    slug: 'switz-jungfrau',
    // Pine shadow against limestone — alpine green with the light taken out.
    tint: '#515c4e',
    intro: '',
    cover: 'DSCF5998.JPEG',
    captions: {},
  },
  {
    folder: 'Japan_Le Labo Kyoto',
    slug: 'japan-le-labo-kyoto',
    // Apothecary wood and amber — the darkest, warmest tone in the set.
    tint: '#5a4a3f',
    intro: '',
    captions: {},
    // The chapter's only two landscapes, and they close it. Filename order put
    // 0517 before 0574; this is the other way round.
    sequence: ['DSCF0574.JPEG', 'DSCF0517.JPEG'],
  },
  {
    folder: 'Iceland',
    slug: 'iceland',
    // Wet basalt and moss — the two things the whole island is made of.
    tint: '#4c5750',
    intro: '',
    cover: 'DSCF6656.JPEG',
    captions: {},
  },
  {
    folder: 'Yukon_Kluane',
    slug: 'yukon-kluane',
    // Cold slate — snow shadow under cloud, the only non-earth tone in the set
    // because nothing about the Yukon photographs is warm.
    tint: '#68707a',
    intro: '',
    cover: 'DSCF7412.JPG',
    captions: {},
  },
  {
    folder: 'New York_TWA Hotel',
    slug: 'new-york-twa-hotel',
    // Weathered red brick, the colour of the low-rise blocks between towers.
    tint: '#6d5044',
    intro: '',
    cover: 'DSCF4918.JPEG',
    captions: {},
  },
  {
    folder: 'Japser-Banff',
    slug: 'japser-banff',
    // Glacial teal: the lake colour, held down to spruce-shadow darkness.
    tint: '#47605e',
    intro: '',
    cover: 'DSCF4242.JPEG',
    captions: {},
  },
  {
    folder: 'Japan_Osaka',
    slug: 'japan-osaka',
    // Dusk indigo, the blue the city sits in before the signs take over.
    tint: '#4b5966',
    intro: '',
    captions: {},
  },
  {
    folder: 'Japan_Teshima',
    slug: 'japan-teshima',
    // Concrete against terraced green — the island's two surfaces.
    tint: '#67705f',
    intro: '',
    captions: {},
  },
  {
    folder: 'Kenya-Tanzania',
    slug: 'kenya-tanzania',
    // Dry savanna grass at the end of the season.
    tint: '#7a6a4d',
    intro: '',
    cover: 'IMG_9141.JPG',
    captions: {},
  },
  {
    folder: 'Italy',
    slug: 'italy',
    // Warm travertine. Placeholder photographs for now — real ones to come.
    tint: '#8a7361',
    intro: '',
    captions: {},
  },
];


