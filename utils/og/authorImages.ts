// utils/og/authorImages.ts
//
// Maps a blog post `author` string to an avatar image used in the dynamic
// OpenGraph image (see utils/og/blogOgImage.tsx).
//
// Authors are free-text strings today (no authors collection — see the TODO in
// tina/collectionsSchema/blogs.tsx), and several posts credit multiple people
// ("James Perkins & James O'Halloran"). We key off the FIRST author and match
// on a normalised name so casing/whitespace differences don't matter.
//
// Paths point at /public. A mapped author only shows a photo once the file
// actually exists on disk — otherwise the renderer falls back to a llama — so
// it's safe to list authors here before their images have been added.

export const AUTHOR_IMAGE_DIR = 'public/img/blog/authors';

/** Normalise an author string to a stable lookup key (first author only). */
export function normaliseAuthorKey(author: string | null | undefined): string {
  if (!author) {
    return '';
  }
  return author
    .split(/&|,| and /i)[0] // first credited author
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

// key (normalised name) -> public path. Fill these in as photos are collected.
// Every value is `/img/blog/authors/<kebab-name>.png` by convention.
export const AUTHOR_IMAGES: Record<string, string> = {
  'james perkins': '/img/blog/authors/james-perkins.png',
  "james o'halloran": '/img/blog/authors/james-ohalloran.png',
  'scott gallant': '/img/blog/authors/scott-gallant.png',
  'kendall strautman': '/img/blog/authors/kendall-strautman.png',
  'jack pettit': '/img/blog/authors/jack-pettit.png',
  'matt wicks': '/img/blog/authors/matt-wicks.jpg',
  'josh berman': '/img/blog/authors/josh-berman.jpg',
  'brook jeynes': '/img/blog/authors/brook-jeynes.jpg',
  'logan anderson': '/img/blog/authors/logan-anderson.png',
  'landon maxwell': '/img/blog/authors/landon-maxwell.png',
  'jeff see': '/img/blog/authors/jeff-see.png',
  'scott byrne': '/img/blog/authors/scott-byrne.png',
  'nolan phillips': '/img/blog/authors/nolan-phillips.png',
  'kelly davis': '/img/blog/authors/kelly-davis.png',
  'frank taillandier': '/img/blog/authors/frank-taillandier.png',
  'dj walker': '/img/blog/authors/dj-walker.png',
  'mitch mackenzie': '/img/blog/authors/mitch-mackenzie.png',
  'joe haddad': '/img/blog/authors/joe-haddad.png',
};

// Three friendly llama mascots used when an author has no photo. Picked
// deterministically per-post so a given slug always shows the same llama.
export const FALLBACK_LLAMAS = [
  '/ai-llamas/Peek-Llama.png',
  '/ai-llamas/Relax-Llama.png',
  '/ai-llamas/tina-llama-working-laptop-table.png',
] as const;

export type LlamaSrc = (typeof FALLBACK_LLAMAS)[number];

/** Stable string hash (djb2) so llama choice is deterministic per slug. */
function hashString(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return hash >>> 0;
}

export function pickLlama(seed: string): LlamaSrc {
  return FALLBACK_LLAMAS[hashString(seed) % FALLBACK_LLAMAS.length];
}

/** Public path of an author's avatar, or null if we don't have one mapped. */
export function authorImagePath(
  author: string | null | undefined,
): string | null {
  return AUTHOR_IMAGES[normaliseAuthorKey(author)] ?? null;
}
