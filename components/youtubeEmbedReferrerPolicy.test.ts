// `fs` and `path` are imported without the `node:` prefix on purpose: Jest 25 cannot
// resolve prefixed builtins.
import fs from 'fs';
import path from 'path';

// YouTube's embedded player refuses to start with "Error 153 - Video player
// configuration error" when the iframe request carries no Referer header. Browsers
// send one by default, but an embedding context can withhold it (iOS in-app
// WKWebView browsers, a document-level `Referrer-Policy: no-referrer`, some privacy
// settings). Setting the policy on the iframe itself overrides that context, so
// every YouTube embed we render has to declare it.
const REQUIRED_POLICY = 'referrerPolicy="strict-origin-when-cross-origin"';

const REPO_ROOT = path.join(__dirname, '..');
const SCAN_DIRS = ['app', 'components'];

// The YouTube embeds that existed when this test was written. New ones are picked up
// by the scan automatically; this list only proves the scan still sees the ones we
// know about, so it cannot quietly stop matching and pass on nothing.
const KNOWN_EMBED_FILES = [
  'components/blocks/Features/Features.tsx',
  'components/blocks/Media/MediaComponent.tsx',
  'components/blocks/VideoEmbed/LiteYouTube.tsx',
  'components/tinaMarkdownComponents/docAndBlogComponents.tsx',
];

function tsxFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return tsxFiles(full);
    }
    return entry.isFile() && entry.name.endsWith('.tsx') ? [full] : [];
  });
}

// Returns the source of every `<iframe ...>` opening tag in the file. Only a `>` at
// brace depth zero and outside a quoted value ends a tag, so an expression such as
// `height={h > 400 ? 400 : h}` does not truncate one.
function iframeTags(source: string): string[] {
  const tags: string[] = [];
  let start = source.indexOf('<iframe');
  while (start !== -1) {
    let depth = 0;
    let quote = '';
    let end = -1;
    for (let i = start; i < source.length; i++) {
      const char = source[i];
      if (quote !== '') {
        if (char === quote) {
          quote = '';
        }
      } else if (char === '{') {
        depth++;
      } else if (char === '}') {
        depth--;
      } else if (depth > 0) {
        // Anything inside a JSX expression cannot end the tag.
      } else if (char === '"' || char === "'") {
        quote = char;
      } else if (char === '>') {
        end = i;
        break;
      }
    }
    if (end === -1) {
      break;
    }
    tags.push(source.slice(start, end + 1));
    start = source.indexOf('<iframe', end);
  }
  return tags;
}

// An iframe counts as a YouTube embed when anything in its opening tag mentions
// YouTube: the src, or the title on the components that take the URL from Tina.
const youtubeEmbeds = SCAN_DIRS.flatMap((dir) =>
  tsxFiles(path.join(REPO_ROOT, dir)).flatMap((file) =>
    iframeTags(fs.readFileSync(file, 'utf8'))
      .filter((tag) => /youtube/i.test(tag))
      // Forward slashes so the paths match KNOWN_EMBED_FILES on Windows too.
      .map((tag) => ({
        file: path.relative(REPO_ROOT, file).split(path.sep).join('/'),
        tag,
      })),
  ),
);

test('the scan still finds every known YouTube embed', () => {
  const files = youtubeEmbeds.map((embed) => embed.file);
  const notFound = KNOWN_EMBED_FILES.filter((known) => !files.includes(known));

  expect(notFound).toEqual([]);
});

test('every YouTube embed sets a referrer policy on the iframe', () => {
  const missingPolicy = youtubeEmbeds
    .filter((embed) => !embed.tag.includes(REQUIRED_POLICY))
    .map((embed) => embed.file);

  expect(missingPolicy).toEqual([]);
});
