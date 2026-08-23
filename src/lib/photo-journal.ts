// Pairs the chapter metadata in src/data/photo-journal.ts with the actual image
// files sitting in src/content/photo-journal/<Folder>/.
//
// Everything is glob-discovered so the folders stay the source of truth: drop a
// photo in, it appears; re-sort a folder, nothing breaks. Only the chapter's
// tone, order and captions live in code.
import type { ImageMetadata } from 'astro';
import { chapters, type Chapter } from '../data/photo-journal';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '../content/photo-journal/**/*.{jpg,JPG,jpeg,JPEG,png,PNG}',
  { eager: true },
);

export type Photo = {
  src: ImageMetadata;
  /** Bare filename, which is the key captions are written against. */
  file: string;
  caption?: string;
  /** Landscape frames go full width; portrait ones pair up. */
  wide: boolean;
};

export type LoadedChapter = Chapter & {
  photos: Photo[];
  cover?: Photo;
  count: number;
};

/** "../content/photo-journal/New York/DSCF1.JPEG" -> ["New York", "DSCF1.JPEG"] */
function splitPath(path: string): [string, string] {
  const parts = path.split('/');
  return [parts[parts.length - 2], parts[parts.length - 1]];
}

export function loadChapters(): LoadedChapter[] {
  const byFolder = new Map<string, { file: string; src: ImageMetadata }[]>();
  for (const [path, mod] of Object.entries(files)) {
    const [folder, file] = splitPath(path);
    if (!byFolder.has(folder)) byFolder.set(folder, []);
    byFolder.get(folder)!.push({ file, src: mod.default });
  }

  return chapters
    .map((chapter) => {
      const found = (byFolder.get(chapter.folder) ?? []).sort((a, b) =>
        a.file.localeCompare(b.file, undefined, { numeric: true }),
      );
      const photos: Photo[] = found.map(({ file, src }) => ({
        src,
        file,
        caption: chapter.captions?.[file],
        wide: src.width >= src.height,
      }));
      // An explicit cover wins; otherwise the first photo stands in — the
      // placeholder behaviour until covers are chosen.
      const cover = photos.find((p) => p.file === chapter.cover) ?? photos[0];
      return { ...chapter, photos, cover, count: photos.length };
    })
    // A chapter with no photos yet would render as an empty tile, so it waits
    // until it has something in it.
    .filter((chapter) => chapter.count > 0);
}
