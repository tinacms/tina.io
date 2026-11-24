#!/usr/bin/env node
/**
 * check:colour-tokens — fails when a colour is set outside the token layer.
 *
 *   pnpm check:colour-tokens                 scan the whole site, exit 1 on any hit
 *   pnpm check:colour-tokens -- <paths…>     scan only these files or folders
 *   pnpm check:colour-tokens -- --count      hits per folder, never fails
 *   pnpm check:colour-tokens -- --count --depth=3
 *   pnpm check:colour-tokens -- --fail-on-svg     svg hits fail too
 *
 * A hit is one of:
 *   raw      a hex value or a colour function (rgb, hsl, oklch…), including
 *            Tailwind arbitrary values like bg-[#fff] and colours inside one,
 *            where `_` stands for a space: shadow-[0_1px_rgba(0,0,0,0.1)],
 *            bg-[linear-gradient(90deg,white,#f2fdfc_33%)]
 *   palette  a Tailwind palette class (text-gray-500, bg-white, dark:from-blue-400)
 *   named    a CSS named colour in a colour property (color: 'white')
 *   token    a component naming a colour token directly (text-body,
 *            bg-neutral-surface, text-[var(--blue-500)]) instead of a role,
 *            SURFACE.* or ON_DARK. The role layer (components/styles) and the
 *            specs (styles/) may name tokens, so this kind skips them.
 *   svg      a colour inside an SVG picture: any .svg under public/, or an inline
 *            data:image/svg+xml URL. Listed, but it only fails with
 *            --fail-on-svg, since most pictures keep their colours in both
 *            modes.
 *
 * The token layer is never reported: app/global.css, tailwind.config.js, and
 * the custom-property lines and @theme blocks of styles/tailwind.css.
 * Comments are skipped, so issue numbers like `#4964` don't count as hex.
 *
 * Agreed exceptions live in scripts/check-colour-tokens.allow.json and in one
 * file per slice in scripts/check-colour-tokens.allow/ (PBI-5015-13.json), so
 * parallel writers never edit the same file. One entry per exception:
 * { "file", "pattern", "reason" }. `pattern` is the exact text of the hit.
 * Allowed hits are listed under "allowed" with the allow file that let them
 * through, and never fail the check.
 */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = process.cwd();
const SCAN_DIRS = ['app', 'components', 'src', 'styles', 'utils'];
// Folders scanned for SVG pictures only.
const PICTURE_DIRS = ['public'];
const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.css']);
const PICTURE_EXTENSION = '.svg';
const SKIP_DIRS = new Set(['node_modules', '.next', '__generated__']);
// Build output, not the site's pictures: the TinaCMS admin.
const SKIP_PATHS = new Set(['public/admin']);
const ALLOW_FILE = 'scripts/check-colour-tokens.allow.json';
const ALLOW_DIR = 'scripts/check-colour-tokens.allow';
const CONFIG_FILE = 'tailwind.config.js';
const SPEC_FILE = 'styles/tailwind.css';
const DEFAULT_DEPTH = 2;

// The whole file is the token layer.
const TOKEN_LAYER_FILES = new Set(['app/global.css', CONFIG_FILE]);
// Files that may name tokens (the role and spec layers), so `token` hits
// are skipped there. Raw, palette and named hits still count.
const TOKEN_NAMING_LAYERS = ['components/styles/', 'styles/'];

const KINDS = ['raw', 'palette', 'named', 'token', 'svg'];
// Kinds that are listed but only fail when a flag asks.
const SOFT_KINDS = new Set(['svg']);
const COLOUR_FUNCTIONS = 'rgba?|hsla?|hwb|lab|lch|oklab|oklch';

// Tailwind's default colour families. Shade scales defined in
// tailwind.config.js (blue, orange, seafoam) are added at run time.
const TAILWIND_FAMILIES = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
];
const UNSHADED_PALETTE = ['white', 'black'];

// Utilities that take a colour.
const COLOUR_PREFIXES = [
  'text',
  'bg',
  'border',
  'border-x',
  'border-y',
  'border-t',
  'border-r',
  'border-b',
  'border-l',
  'border-s',
  'border-e',
  'divide',
  'outline',
  'ring',
  'ring-offset',
  'inset-ring',
  'fill',
  'stroke',
  'from',
  'via',
  'to',
  'placeholder',
  'caret',
  'accent',
  'decoration',
  'shadow',
  'inset-shadow',
  'drop-shadow',
];
// `shadow-input` is a box-shadow, not a colour, so token names skip `shadow`.
const TOKEN_PREFIXES = COLOUR_PREFIXES.filter(
  (prefix) => !prefix.includes('shadow'),
);

const CSS_NAMED_COLOURS =
  'aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond blue blueviolet brown burlywood cadetblue chartreuse chocolate coral cornflowerblue cornsilk crimson cyan darkblue darkcyan darkgoldenrod darkgray darkgreen darkgrey darkkhaki darkmagenta darkolivegreen darkorange darkorchid darkred darksalmon darkseagreen darkslateblue darkslategray darkslategrey darkturquoise darkviolet deeppink deepskyblue dimgray dimgrey dodgerblue firebrick floralwhite forestgreen fuchsia gainsboro ghostwhite gold goldenrod gray green greenyellow grey honeydew hotpink indianred indigo ivory khaki lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan lightgoldenrodyellow lightgray lightgreen lightgrey lightpink lightsalmon lightseagreen lightskyblue lightslategray lightslategrey lightsteelblue lightyellow lime limegreen linen magenta maroon mediumaquamarine mediumblue mediumorchid mediumpurple mediumseagreen mediumslateblue mediumspringgreen mediumturquoise mediumvioletred midnightblue mintcream mistyrose moccasin navajowhite navy oldlace olive olivedrab orange orangered orchid palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff peru pink plum powderblue purple rebeccapurple red rosybrown royalblue saddlebrown salmon sandybrown seagreen seashell sienna silver skyblue slateblue slategray slategrey snow springgreen steelblue tan teal thistle tomato turquoise violet wheat white whitesmoke yellow yellowgreen'.split(
    ' ',
  );

// Colour properties, in CSS (kebab) and JS (camel) spelling.
const COLOUR_PROPERTY =
  '(?:color|background|background-color|backgroundColor|border|border-(?:top|right|bottom|left)|border(?:Top|Right|Bottom|Left)|border(?:-(?:top|right|bottom|left))?-color|border(?:Top|Right|Bottom|Left)?Color|outline|outline-color|outlineColor|fill|stroke|box-shadow|boxShadow|text-shadow|textShadow|text-decoration-color|textDecorationColor|caret-color|caretColor|accent-color|accentColor|stop-color|stopColor)';

// A class token starts after whitespace, a quote, a backtick, a brace,
// a bracket, a comma or a variant colon, and may carry `!` and a `-`.
const CLASS_START = '(?<=^|[\\s\'"`{(,:!])';
const CLASS_END = '(?![\\w-])';
const OPACITY = '(?:\\/(?:\\d+|\\[[^\\]]+\\]))?';

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function alternation(words) {
  return [...words]
    .sort((a, b) => b.length - a.length)
    .map(escapeRegex)
    .join('|');
}

function toPosix(file) {
  return file.split(path.sep).join('/');
}

/** Colour names the token layer defines, from tailwind.config.js and the
 *  colour utilities in styles/tailwind.css. */
function readTokenLayerNames() {
  const scales = new Set();
  const tokens = new Set();
  const configPath = path.join(ROOT, CONFIG_FILE);
  if (fs.existsSync(configPath)) {
    try {
      const config = require(configPath);
      const theme = config.theme || {};
      const colours = {
        ...(theme.colors || {}),
        ...(theme.extend?.colors || {}),
      };
      for (const [name, value] of Object.entries(colours)) {
        if (value && typeof value === 'object') {
          const keys = Object.keys(value);
          const isScale = keys.every((key) => /^\d{2,3}$/.test(key));
          if (isScale) {
            scales.add(name);
            continue;
          }
          for (const key of keys) {
            tokens.add(key === 'DEFAULT' ? name : `${name}-${key}`);
          }
        } else {
          tokens.add(name);
        }
      }
    } catch (error) {
      // Without the config, palette scales and token names go unchecked and
      // the count drops, so stop rather than pass short.
      throw new Error(
        `Could not load ${CONFIG_FILE} (run pnpm install first): ${error.message.split('\n')[0]}`,
      );
    }
  }
  const specPath = path.join(ROOT, SPEC_FILE);
  if (fs.existsSync(specPath)) {
    const spec = fs.readFileSync(specPath, 'utf8');
    for (const match of spec.matchAll(/@utility (?:text|bg)-([\w-]+)/g)) {
      tokens.add(match[1]);
    }
  }
  // Custom properties the token layer defines with a colour value.
  const colourVars = new Set();
  for (const file of [...TOKEN_LAYER_FILES, SPEC_FILE]) {
    const filePath = path.join(ROOT, file);
    if (!fs.existsSync(filePath) || !file.endsWith('.css')) {
      continue;
    }
    const css = fs.readFileSync(filePath, 'utf8');
    for (const match of css.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) {
      if (COLOUR_VALUE.test(match[2])) {
        colourVars.add(match[1]);
      }
    }
  }
  return { scales: [...scales], tokens: [...tokens], colourVars };
}

// A custom-property value that is a colour (or points at one).
const COLOUR_VALUE =
  /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color-mix)\(|^\s*var\(--|^\s*\d+(?:\.\d+)?\s+\d+(?:\.\d+)?%\s+\d+(?:\.\d+)?%|^\s*(?:white|black)\s*$/;

/** True when a var() name is a colour token: defined as one in the token
 *  layer, or named like one (--color-*, a palette shade, an -rgb channel
 *  list), which also catches references to tokens that no longer exist. */
function isColourVar(name, colourVars, families) {
  return (
    colourVars.has(name) ||
    new RegExp(
      `^(?:color-|ink-|(?:${families})-\\d{2,3}(?:-|$)|(?:white|black)$)|-rgb$`,
    ).test(name)
  );
}

// Inside an arbitrary value `_` is a space, so it bounds a colour like `,` does.
const VALUE_HEX =
  /(?<![0-9A-Za-z&#-])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![0-9A-Za-z-])/g;
const VALUE_FUNCTION = new RegExp(
  `(?<![A-Za-z-])(?:${COLOUR_FUNCTIONS})\\((?!\\s*var\\()[^)]*\\)`,
  'g',
);
const VALUE_NAMED = new RegExp(
  `(?<![0-9A-Za-z.#-])(?:${alternation(CSS_NAMED_COLOURS)})(?![0-9A-Za-z.-])`,
  'g',
);
const COLOUR_UTILITIES = new Set(COLOUR_PREFIXES);

/** The colours inside one arbitrary value, `<utility>-[<value>]`: hex values
 *  and colour functions in any utility, named colours in colour utilities.
 *  url(…) is skipped, so url(#gradient) and image paths don't count. */
function arbitraryValuePieces(match) {
  const [whole, utility, value] = match;
  const valueStart = match.index + whole.indexOf('[') + 1;
  const scanned = value.replace(/url\([^)]*\)/g, (url) =>
    ' '.repeat(url.length),
  );
  const patterns = [
    ['raw', VALUE_HEX],
    ['raw', VALUE_FUNCTION],
  ];
  if (COLOUR_UTILITIES.has(utility)) {
    patterns.push(['named', VALUE_NAMED]);
  }
  return patterns.flatMap(([kind, regex]) =>
    [...scanned.matchAll(regex)].map((piece) => ({
      kind,
      start: valueStart + piece.index,
      text: value.slice(piece.index, piece.index + piece[0].length),
    })),
  );
}

// Colours inside an SVG picture. `url(#id)` and `href="#id"` point at an
// element, so a hex-looking id there is skipped.
const SVG_MATCHERS = [
  /(?<![\w&/#-]|url\(|href=["'])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![\w-])/g,
  new RegExp(`(?<![\\w-])(?:${COLOUR_FUNCTIONS})\\([^)]*\\)`, 'g'),
  new RegExp(
    `(?<![\\w-])(?:fill|stroke|stop-color|flood-color|lighting-color|color)\\s*(?:=\\s*["']\\s*|:\\s*)(${alternation(CSS_NAMED_COLOURS)})(?![\\w-])`,
    'gid',
  ),
];

/** svg hits in one piece of SVG markup, all on `line`. */
function scanSvgMarkup(markup, file, line) {
  const hits = [];
  for (const regex of SVG_MATCHERS) {
    for (const match of markup.matchAll(regex)) {
      hits.push({
        file,
        line,
        kind: 'svg',
        text: match.indices?.[1] ? markup.slice(...match.indices[1]) : match[0],
      });
    }
  }
  return hits;
}

/** Inline SVG data URLs on one line: where each sits, and its markup. */
function svgDataUrls(line) {
  const urls = [];
  for (const match of line.matchAll(/data:image\/svg\+xml/g)) {
    const start = match.index;
    const opener = line[start - 1];
    const closer =
      opener === '(' ? ')' : ['"', "'", '`'].includes(opener) ? opener : null;
    const found = closer ? line.indexOf(closer, start) : -1;
    const end = found === -1 ? line.length : found;
    const url = line.slice(start, end);
    const comma = url.indexOf(',');
    if (comma === -1) {
      continue;
    }
    const header = url.slice(0, comma);
    const body = url.slice(comma + 1);
    let markup;
    if (header.includes(';base64')) {
      markup = Buffer.from(body, 'base64').toString('utf8');
    } else {
      try {
        markup = decodeURIComponent(body);
      } catch {
        markup = body.replace(/%23/gi, '#');
      }
    }
    urls.push({ start, end, markup });
  }
  return urls;
}

function buildMatchers({ scales, tokens, colourVars }) {
  const families = alternation(new Set([...TAILWIND_FAMILIES, ...scales]));
  const prefixes = alternation(COLOUR_PREFIXES);
  const tokenPrefixes = alternation(TOKEN_PREFIXES);
  const matchers = [
    {
      kind: 'raw',
      // Tailwind arbitrary colour values: bg-[#fff], text-[rgb(0_0_0)].
      regex: new RegExp(
        `${CLASS_START}(?:${prefixes})-\\[(?:#[0-9a-fA-F]{3,8}|(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch)\\([^\\]]*\\))\\]${OPACITY}${CLASS_END}`,
        'g',
      ),
    },
    {
      kind: 'raw',
      // Colours inside any arbitrary value, where `_` stands for a space:
      // shadow-[0_0_8px_rgba(0,0,0,0.03)], bg-[linear-gradient(white,#f2fdfc_33%)].
      regex: new RegExp(
        `${CLASS_START}([a-z][\\w-]*?)-\\[([^\\]\\s'"\`]+)\\]`,
        'g',
      ),
      pieces: arbitraryValuePieces,
    },
    {
      kind: 'raw',
      // url(#id) points at an element, not a colour.
      regex:
        /(?<![\w&/#-]|url\()#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![\w-])/g,
    },
    {
      kind: 'raw',
      // A colour function, unless it only wraps a token: hsl(var(--border)).
      regex:
        /(?<![\w-])(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch)\((?!\s*var\()[^)]*\)/g,
    },
    {
      kind: 'palette',
      regex: new RegExp(
        `${CLASS_START}-?(?:${prefixes})-(?:(?:${families})-\\d{2,3}|${alternation(UNSHADED_PALETTE)})${OPACITY}${CLASS_END}`,
        'g',
      ),
    },
    {
      kind: 'named',
      regex: new RegExp(
        `(?<![\\w-])${COLOUR_PROPERTY}\\s*:\\s*['"\`]?[^;'"\`\\n]*?(?<![\\w-])(?:${alternation(CSS_NAMED_COLOURS)})(?![\\w-])`,
        'gi',
      ),
    },
    {
      kind: 'token',
      // Arbitrary token references: text-[var(--blue-500)], bg-(--x).
      regex: new RegExp(
        `${CLASS_START}(?:${tokenPrefixes})-(?:\\[var\\(--[^\\]]+\\)\\]|\\(--[^)]+\\))${OPACITY}${CLASS_END}`,
        'g',
      ),
    },
    {
      kind: 'token',
      // A colour property set straight from a token: color: 'var(--text-body)'.
      regex: new RegExp(
        `(?<![\\w-])${COLOUR_PROPERTY}\\s*:\\s*['"\`]?\\s*var\\(--[\\w-]+\\)`,
        'g',
      ),
    },
  ];
  matchers.push(
    {
      kind: 'token',
      // A colour function around a token: rgba(var(--blue-400-rgb), 0.2).
      regex:
        /(?<![\w-])(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch)\(\s*var\([^)]*\)[^)]*\)/g,
    },
    {
      kind: 'token',
      // Any other reference to a colour token: var(--white), var(--ink-900).
      regex: /var\(--([\w-]+)\)/g,
      keep: (match) => isColourVar(match[1], colourVars, families),
    },
  );
  if (tokens.length > 0) {
    matchers.push({
      kind: 'token',
      regex: new RegExp(
        `${CLASS_START}-?(?:${tokenPrefixes})-(?:${alternation(tokens)})${OPACITY}${CLASS_END}`,
        'g',
      ),
    });
  }
  return matchers;
}

/** Blank out comments, keeping line breaks and column positions. */
function stripComments(source, isCss) {
  let out = '';
  let index = 0;
  let quote = null;
  while (index < source.length) {
    const char = source[index];
    const next = source[index + 1];
    if (quote) {
      out += char;
      if (char === '\\' && quote !== '`') {
        out += next ?? '';
        index += 2;
        continue;
      }
      if (char === quote || (char === '\n' && quote !== '`')) {
        quote = null;
      }
      index += 1;
      continue;
    }
    if (char === '/' && next === '*') {
      const end = source.indexOf('*/', index + 2);
      const stop = end === -1 ? source.length : end + 2;
      out += source.slice(index, stop).replace(/[^\n]/g, ' ');
      index = stop;
      continue;
    }
    // `//` starts a comment, except in a URL (https://).
    if (!isCss && char === '/' && next === '/' && source[index - 1] !== ':') {
      const end = source.indexOf('\n', index);
      const stop = end === -1 ? source.length : end;
      out += ' '.repeat(stop - index);
      index = stop;
      continue;
    }
    // Quotes in CSS and in JSX text (don't, it's) are too loose to track;
    // only JS string quotes guard `//` and `/*` inside strings.
    if (!isCss && (char === '"' || char === "'" || char === '`')) {
      const prev = source[index - 1];
      if (char === '`' || !/\w/.test(prev ?? '')) {
        quote = char;
      }
    }
    out += char;
    index += 1;
  }
  return out;
}

/** Lines of styles/tailwind.css that belong to the token layer:
 *  custom-property declarations and @theme blocks. */
function tokenLayerLines(lines) {
  const skip = new Set();
  let depth = 0;
  let inTheme = false;
  lines.forEach((line, index) => {
    if (!inTheme && /^\s*@theme\b/.test(line)) {
      inTheme = true;
      depth = 0;
    }
    if (inTheme) {
      skip.add(index);
      depth += (line.match(/{/g) || []).length;
      depth -= (line.match(/}/g) || []).length;
      if (depth <= 0 && line.includes('}')) {
        inTheme = false;
      }
      return;
    }
    if (/^\s*--[\w-]+\s*:/.test(line)) {
      skip.add(index);
    }
  });
  return skip;
}

/** An SVG picture: every colour in it is an svg hit. */
function scanPicture(relative) {
  const source = fs.readFileSync(path.join(ROOT, relative), 'utf8');
  const lines = source
    .replace(/<!--[\s\S]*?-->/g, (comment) => comment.replace(/[^\n]/g, ' '))
    .split('\n');
  return lines.flatMap((line, index) =>
    scanSvgMarkup(line, relative, index + 1),
  );
}

function scanFile(relative, matchers) {
  if (TOKEN_LAYER_FILES.has(relative)) {
    return [];
  }
  if (relative.endsWith(PICTURE_EXTENSION)) {
    return scanPicture(relative);
  }
  const isCss = relative.endsWith('.css');
  const source = fs.readFileSync(path.join(ROOT, relative), 'utf8');
  const lines = stripComments(source, isCss).split('\n');
  const skip = relative === SPEC_FILE ? tokenLayerLines(lines) : new Set();
  const namesTokens = TOKEN_NAMING_LAYERS.some((layer) =>
    relative.startsWith(layer),
  );
  const hits = [];
  lines.forEach((line, index) => {
    if (skip.has(index)) {
      return;
    }
    const found = [];
    // An inline SVG picture is reported as svg, not as the line's code.
    const dataUrls = svgDataUrls(line);
    for (const url of dataUrls) {
      hits.push(...scanSvgMarkup(url.markup, relative, index + 1));
    }
    const inDataUrl = (start) =>
      dataUrls.some((url) => start >= url.start && start < url.end);
    for (const { kind, regex, keep, pieces } of matchers) {
      if (kind === 'token' && namesTokens) {
        continue;
      }
      regex.lastIndex = 0;
      for (const match of line.matchAll(regex)) {
        if (keep && !keep(match)) {
          continue;
        }
        if (pieces) {
          for (const piece of pieces(match)) {
            found.push({ ...piece, end: piece.start + piece.text.length });
          }
          continue;
        }
        found.push({
          kind,
          start: match.index,
          end: match.index + match[0].length,
          text: match[0],
        });
      }
    }
    // Keep the widest match where two overlap (bg-[#fff] over #fff).
    found.sort((a, b) => a.start - b.start || b.end - a.end);
    let reach = -1;
    for (const hit of found) {
      if (hit.start < reach || inDataUrl(hit.start)) {
        continue;
      }
      reach = hit.end;
      hits.push({
        file: relative,
        line: index + 1,
        kind: hit.kind,
        text: hit.text,
      });
    }
  });
  return hits;
}

function walk(relative, files) {
  const absolute = path.join(ROOT, relative);
  if (!fs.existsSync(absolute)) {
    return;
  }
  const stat = fs.statSync(absolute);
  if (stat.isFile()) {
    // Tests don't render, so a colour in an assertion isn't a hit.
    const file = toPosix(relative);
    const isTest = /\.test\.[jt]sx?$/.test(file);
    const extension = path.extname(file);
    // Only SVG pictures count under public/; its scripts aren't the site's code.
    const inPictureDir = PICTURE_DIRS.some((dir) => file.startsWith(`${dir}/`));
    const isCode = EXTENSIONS.has(extension) && !isTest && !inPictureDir;
    if (isCode || extension === PICTURE_EXTENSION) {
      files.push(file);
    }
    return;
  }
  if (SKIP_PATHS.has(toPosix(relative))) {
    return;
  }
  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    if (entry.isDirectory() && SKIP_DIRS.has(entry.name)) {
      continue;
    }
    walk(path.join(relative, entry.name), files);
  }
}

function readAllowFile(file) {
  let entries;
  try {
    entries = JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
  } catch (error) {
    throw new Error(`${file}: not valid JSON (${error.message})`);
  }
  if (!Array.isArray(entries)) {
    throw new Error(`${file}: must be a list of entries`);
  }
  for (const entry of entries) {
    if (!entry.file || !entry.pattern || !entry.reason) {
      throw new Error(
        `${file}: every entry needs file, pattern and reason (${JSON.stringify(entry)})`,
      );
    }
  }
  return entries.map((entry) => ({ ...entry, source: file }));
}

/** The shared allow file plus one file per slice in the allow directory. */
function readAllowlist() {
  const files = [];
  if (fs.existsSync(path.join(ROOT, ALLOW_FILE))) {
    files.push(ALLOW_FILE);
  }
  const dir = path.join(ROOT, ALLOW_DIR);
  if (fs.existsSync(dir)) {
    for (const name of fs.readdirSync(dir).sort()) {
      if (name.endsWith('.json')) {
        files.push(`${ALLOW_DIR}/${name}`);
      }
    }
  }
  return files.flatMap(readAllowFile);
}

function parseArgs(argv) {
  const options = {
    count: false,
    depth: DEFAULT_DEPTH,
    failOnSvg: false,
    paths: [],
  };
  for (const arg of argv) {
    if (arg === '--') {
      continue;
    }
    if (arg === '--count') {
      options.count = true;
    } else if (arg === '--fail-on-svg') {
      options.failOnSvg = true;
    } else if (arg.startsWith('--depth=')) {
      options.depth = Number(arg.slice('--depth='.length)) || DEFAULT_DEPTH;
    } else if (arg.startsWith('--')) {
      throw new Error(`Unknown option ${arg}`);
    } else {
      options.paths.push(toPosix(path.normalize(arg)).replace(/\/$/, ''));
    }
  }
  return options;
}

/** `hits` counts the hits that fail; svg hits get their own column unless
 *  --fail-on-svg makes them fail too. */
function printCount(hits, depth, fails) {
  const groups = new Map();
  for (const hit of hits) {
    const parts = hit.file.split('/');
    const folder = parts.slice(0, Math.min(depth, parts.length - 1)).join('/');
    const group = groups.get(folder) ?? {
      total: 0,
      files: new Set(),
      ...Object.fromEntries(KINDS.map((kind) => [kind, 0])),
    };
    if (fails(hit)) {
      group.total += 1;
    }
    group[hit.kind] += 1;
    group.files.add(hit.file);
    groups.set(folder, group);
  }
  const header = ['folder', 'hits', 'files', ...KINDS];
  const rows = [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([folder, group]) => [
      folder,
      group.total,
      group.files.size,
      ...KINDS.map((kind) => group[kind]),
    ]);
  const widths = header.map((title, column) =>
    Math.max(title.length, ...rows.map((row) => String(row[column]).length)),
  );
  const format = (row) =>
    row
      .map((cell, column) =>
        column === 0
          ? String(cell).padEnd(widths[column])
          : String(cell).padStart(widths[column]),
      )
      .join('  ');
  console.log(format(header));
  rows.forEach((row) => {
    console.log(format(row));
  });
  const failing = hits.filter(fails);
  const soft = hits.filter((hit) => !fails(hit));
  const byKind = KINDS.filter(
    (kind) => failing.some((hit) => hit.kind === kind) || !SOFT_KINDS.has(kind),
  )
    .map(
      (kind) => `${failing.filter((hit) => hit.kind === kind).length} ${kind}`,
    )
    .join(', ');
  const fileCount = new Set(failing.map((hit) => hit.file)).size;
  console.log(
    `\nTotal: ${failing.length} hits in ${fileCount} files (${byKind})`,
  );
  if (soft.length > 0) {
    const pictureCount = new Set(soft.map((hit) => hit.file)).size;
    console.log(
      `Pictures: ${soft.length} svg colours in ${pictureCount} files (not in the total; --fail-on-svg counts them)`,
    );
  }
}

function formatHit(hit) {
  return `${hit.file}:${hit.line}  ${hit.text}`;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const matchers = buildMatchers(readTokenLayerNames());
  const allowlist = readAllowlist();
  const roots =
    options.paths.length > 0 ? options.paths : [...SCAN_DIRS, ...PICTURE_DIRS];
  const files = [];
  for (const root of roots) {
    // A mistyped fence path must not pass as clean.
    if (options.paths.length > 0 && !fs.existsSync(path.join(ROOT, root))) {
      throw new Error(`No such path: ${root}`);
    }
    walk(root, files);
  }
  const hits = files.flatMap((file) => scanFile(file, matchers));
  const allowedBy = (hit) =>
    allowlist.find(
      (entry) => entry.file === hit.file && entry.pattern === hit.text,
    );
  const fails = (hit) => options.failOnSvg || !SOFT_KINDS.has(hit.kind);
  const allowed = hits.filter(allowedBy);
  const reported = hits.filter((hit) => !allowedBy(hit));
  const failing = reported.filter(fails);
  const soft = reported.filter((hit) => !fails(hit));

  if (options.count) {
    printCount(reported, options.depth, fails);
    if (allowed.length > 0) {
      console.log(`Allowed: ${allowed.length} (not counted)`);
    }
    return 0;
  }

  for (const hit of failing) {
    console.log(formatHit(hit));
  }
  // Site-wide, the pictures would bury the failing hits: list them only for
  // the paths asked for.
  if (soft.length > 0 && options.paths.length > 0) {
    console.log('\nsvg (pictures, not failing; --fail-on-svg fails on them):');
    for (const hit of soft) {
      console.log(`  ${formatHit(hit)}`);
    }
  }
  if (allowed.length > 0) {
    console.log('\nallowed:');
    for (const hit of allowed) {
      console.log(`  ${formatHit(hit)}  (${allowedBy(hit).source})`);
    }
  }
  console.log(
    `\n${failing.length} colours outside the token layer in ${files.length} files scanned` +
      (soft.length > 0
        ? `, ${soft.length} svg colours not failing${options.paths.length > 0 ? '' : ' (list them with -- public)'}`
        : '') +
      (allowed.length > 0 ? `, ${allowed.length} allowed` : ''),
  );
  return failing.length > 0 ? 1 : 0;
}

try {
  process.exitCode = main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 2;
}
