#!/usr/bin/env node
/**
 * check:colour-tokens — fails when a colour is set outside the token layer.
 *
 *   pnpm check:colour-tokens                 scan the whole site, exit 1 on any hit
 *   pnpm check:colour-tokens -- <paths…>     scan only these files or folders
 *   pnpm check:colour-tokens -- --count      hits per folder, never fails
 *   pnpm check:colour-tokens -- --count --depth=3
 *
 * A hit is one of:
 *   raw      a hex value or a colour function (rgb, hsl, oklch…), including
 *            Tailwind arbitrary values like bg-[#fff]
 *   palette  a Tailwind palette class (text-gray-500, bg-white, dark:from-blue-400)
 *   named    a CSS named colour in a colour property (color: 'white')
 *   token    a component naming a colour token directly (text-body,
 *            bg-neutral-surface, text-[var(--blue-500)]) instead of a role,
 *            SURFACE.* or ON_DARK. The role layer (components/styles) and the
 *            specs (styles/) may name tokens, so this kind skips them.
 *
 * The token layer is never reported: app/global.css, tailwind.config.js, and
 * the custom-property lines and @theme blocks of styles/tailwind.css.
 * Comments are skipped, so issue numbers like `#4964` don't count as hex.
 *
 * Agreed exceptions live in scripts/check-colour-tokens.allow.json, one entry
 * per exception: { "file", "pattern", "reason" }. `pattern` is the exact text
 * of the hit. Allowed hits are listed under "allowed" and never fail the check.
 */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = process.cwd();
const SCAN_DIRS = ['app', 'components', 'styles', 'utils'];
const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.css']);
const SKIP_DIRS = new Set(['node_modules', '.next', '__generated__']);
const ALLOW_FILE = 'scripts/check-colour-tokens.allow.json';
const CONFIG_FILE = 'tailwind.config.js';
const SPEC_FILE = 'styles/tailwind.css';
const DEFAULT_DEPTH = 2;

// The whole file is the token layer.
const TOKEN_LAYER_FILES = new Set(['app/global.css', CONFIG_FILE]);
// Files that may name tokens (the role and spec layers), so `token` hits
// are skipped there. Raw, palette and named hits still count.
const TOKEN_NAMING_LAYERS = ['components/styles/', 'styles/'];

const KINDS = ['raw', 'palette', 'named', 'token'];

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
      regex:
        /(?<![\w&/#-])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![\w-])/g,
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

function scanFile(relative, matchers) {
  if (TOKEN_LAYER_FILES.has(relative)) {
    return [];
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
    for (const { kind, regex, keep } of matchers) {
      if (kind === 'token' && namesTokens) {
        continue;
      }
      regex.lastIndex = 0;
      for (const match of line.matchAll(regex)) {
        if (keep && !keep(match)) {
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
      if (hit.start < reach) {
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
    const isTest = /\.test\.[jt]sx?$/.test(relative);
    if (EXTENSIONS.has(path.extname(relative)) && !isTest) {
      files.push(toPosix(relative));
    }
    return;
  }
  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    if (entry.isDirectory() && SKIP_DIRS.has(entry.name)) {
      continue;
    }
    walk(path.join(relative, entry.name), files);
  }
}

function readAllowlist() {
  const allowPath = path.join(ROOT, ALLOW_FILE);
  if (!fs.existsSync(allowPath)) {
    return [];
  }
  const entries = JSON.parse(fs.readFileSync(allowPath, 'utf8'));
  for (const entry of entries) {
    if (!entry.file || !entry.pattern || !entry.reason) {
      throw new Error(
        `${ALLOW_FILE}: every entry needs file, pattern and reason (${JSON.stringify(entry)})`,
      );
    }
  }
  return entries;
}

function parseArgs(argv) {
  const options = { count: false, depth: DEFAULT_DEPTH, paths: [] };
  for (const arg of argv) {
    if (arg === '--') {
      continue;
    }
    if (arg === '--count') {
      options.count = true;
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

function printCount(hits, depth) {
  const groups = new Map();
  for (const hit of hits) {
    const parts = hit.file.split('/');
    const folder = parts.slice(0, Math.min(depth, parts.length - 1)).join('/');
    const group = groups.get(folder) ?? {
      total: 0,
      files: new Set(),
      ...Object.fromEntries(KINDS.map((kind) => [kind, 0])),
    };
    group.total += 1;
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
  const byKind = KINDS.map(
    (kind) => `${hits.filter((hit) => hit.kind === kind).length} ${kind}`,
  ).join(', ');
  const fileCount = new Set(hits.map((hit) => hit.file)).size;
  console.log(`\nTotal: ${hits.length} hits in ${fileCount} files (${byKind})`);
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const matchers = buildMatchers(readTokenLayerNames());
  const allowlist = readAllowlist();
  const roots = options.paths.length > 0 ? options.paths : SCAN_DIRS;
  const files = [];
  for (const root of roots) {
    // A mistyped fence path must not pass as clean.
    if (options.paths.length > 0 && !fs.existsSync(path.join(ROOT, root))) {
      throw new Error(`No such path: ${root}`);
    }
    walk(root, files);
  }
  const hits = files.flatMap((file) => scanFile(file, matchers));
  const isAllowed = (hit) =>
    allowlist.some(
      (entry) => entry.file === hit.file && entry.pattern === hit.text,
    );
  const allowed = hits.filter(isAllowed);
  const failing = hits.filter((hit) => !isAllowed(hit));

  if (options.count) {
    printCount(failing, options.depth);
    if (allowed.length > 0) {
      console.log(`Allowed: ${allowed.length} (not counted)`);
    }
    return 0;
  }

  for (const hit of failing) {
    console.log(`${hit.file}:${hit.line}  ${hit.text}`);
  }
  if (allowed.length > 0) {
    console.log('\nallowed:');
    for (const hit of allowed) {
      console.log(`  ${hit.file}:${hit.line}  ${hit.text}`);
    }
  }
  console.log(
    `\n${failing.length} colours outside the token layer in ${files.length} files scanned` +
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
