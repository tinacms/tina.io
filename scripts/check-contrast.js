#!/usr/bin/env node
/**
 * check:contrast — every text and edge pair, in light and dark, against the
 * #5015 contrast bar (WCAG 2.x contrast ratio).
 *
 *   pnpm check:contrast                     both modes
 *   pnpm check:contrast -- --mode=light     one mode (light | dark | both)
 *   pnpm check:contrast -- --pairs=<file> --allow=<file>
 *
 * The bar (D7): text 4.5:1, large text 3:1 (24px+, or 18.66px+ bold),
 * interactive edges 3:1 (field borders, button outlines, focus rings, toggle
 * states). Decorative dividers and table lines, disabled states and the
 * shimmer are exempt: they print their ratio but never fail.
 *
 * Token values come from app/global.css: `:root` for light, `.dark` for dark
 * (falling back to `:root`, as CSS does). Until app/global.css has a `.dark`
 * block, every dark pair prints `pending` and the run doesn't fail on dark.
 *
 * scripts/check-contrast.pairs.json lists what to check:
 *   backdrop  what a translucent fill sits on when it names nothing else
 *   fills     named paints, each a list of stops (a gradient checks every
 *             stop), with an optional `over` and the `source` it comes from
 *   pairs     { fg, bg, kind, context, exempt? }. fg and bg are a fill name,
 *             a colour or a list of either; kind is text, large-text or edge
 *
 * A stop written as `--name` is a token. Anything else (a hex, a palette
 * primitive through var(), a color-mix) has no semantic token yet and prints
 * `[no token]`, so the slices that add tokens can find it.
 *
 * scripts/check-contrast.allow.json lists agreed misses:
 *   { fg, bg, mode, stop?, reason }. `stop` limits the entry to one stop of
 *   a gradient (as written in the fill); without it the entry covers every
 *   stop of that pair. An allowed miss prints `exception: <reason>`.
 *
 * Exit codes: 0 clean, 1 a miss not in the allowlist, 2 a file or colour the
 * script can't read.
 */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = process.cwd();
const TOKEN_FILE = 'app/global.css';
const DEFAULT_PAIRS = 'scripts/check-contrast.pairs.json';
const DEFAULT_ALLOW = 'scripts/check-contrast.allow.json';
const MODES = ['light', 'dark'];
const BAR = { text: 4.5, 'large-text': 3, edge: 3 };
const DARK_SELECTORS = new Set(['.dark', ':root.dark', 'html.dark']);
const NAMED = {
  transparent: [0, 0, 0, 0],
  white: [255, 255, 255, 1],
  black: [0, 0, 0, 1],
};
const MAX_VAR_DEPTH = 20;

class ReadError extends Error {}

// ── Reading app/global.css ──────────────────────────────────────────────

/** Top-level and nested rule bodies, keyed by selector, comments removed. */
function readRules(css) {
  const text = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const rules = [];
  const stack = [];
  let start = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '{') {
      stack.push({ selector: text.slice(start, i).trim(), body: i + 1 });
      start = i + 1;
    } else if (text[i] === '}') {
      const open = stack.pop();
      if (open) {
        const selector = open.selector.split(/[;}]/).pop().trim();
        rules.push({ selector, body: text.slice(open.body, i) });
      }
      start = i + 1;
    } else if (text[i] === ';' && stack.length === 0) {
      start = i + 1;
    }
  }
  return rules;
}

/** `--name: value;` declarations directly inside a rule body. */
function readProperties(body) {
  const props = {};
  let depth = 0;
  let current = '';
  const flush = () => {
    const match = current.trim().match(/^(--[\w-]+)\s*:\s*([\s\S]+)$/);
    if (match) {
      props[match[1]] = match[2].trim();
    }
    current = '';
  };
  for (const ch of body) {
    if (ch === '(') {
      depth++;
    } else if (ch === ')') {
      depth--;
    }
    if (ch === ';' && depth === 0) {
      flush();
    } else if (ch === '{' || ch === '}') {
      current = '';
    } else {
      current += ch;
    }
  }
  flush();
  return props;
}

function readTokens(file) {
  const rules = readRules(fs.readFileSync(path.join(ROOT, file), 'utf8'));
  const light = {};
  const dark = {};
  let hasDark = false;
  for (const rule of rules) {
    if (rule.selector === ':root') {
      Object.assign(light, readProperties(rule.body));
    } else if (DARK_SELECTORS.has(rule.selector)) {
      hasDark = true;
      Object.assign(dark, readProperties(rule.body));
    }
  }
  return { light, dark: { ...light, ...dark }, hasDark };
}

// ── Colours ─────────────────────────────────────────────────────────────

/** Split on commas (or spaces) outside parentheses. */
function splitArgs(text, separator) {
  const parts = [];
  let depth = 0;
  let current = '';
  for (const ch of text) {
    if (ch === '(') {
      depth++;
    } else if (ch === ')') {
      depth--;
    }
    const splits = separator === ',' ? ch === ',' : /\s/.test(ch);
    if (splits && depth === 0) {
      if (current.trim()) {
        parts.push(current.trim());
      }
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) {
    parts.push(current.trim());
  }
  return parts;
}

function inner(value, name) {
  return value.slice(name.length + 1, value.lastIndexOf(')')).trim();
}

function number(text, scale = 1) {
  const value = Number.parseFloat(text);
  return text.trim().endsWith('%') ? (value / 100) * scale : value;
}

function parseHex(hex) {
  let digits = hex.slice(1);
  if (digits.length === 3 || digits.length === 4) {
    digits = [...digits].map((d) => d + d).join('');
  }
  if (!/^[0-9a-f]{6}([0-9a-f]{2})?$/i.test(digits)) {
    return null;
  }
  const channel = (i) => Number.parseInt(digits.slice(i, i + 2), 16);
  const alpha = digits.length === 8 ? channel(6) / 255 : 1;
  return [channel(0), channel(2), channel(4), alpha];
}

/** Channel lists like `255 0 0 / 50%` or `255, 0, 0, 0.5`. */
function channels(args) {
  const [main, slash] = args.split('/');
  const parts = main.includes(',') ? splitArgs(main, ',') : splitArgs(main);
  if (slash !== undefined) {
    parts.push(slash.trim());
  }
  return parts;
}

function parseRgb(args) {
  const parts = channels(args);
  const [r, g, b] = parts.slice(0, 3).map((p) => number(p, 255));
  const alpha = parts[3] === undefined ? 1 : number(parts[3]);
  return [r, g, b, alpha];
}

function parseHsl(args) {
  const parts = channels(args);
  const h = Number.parseFloat(parts[0]);
  const s = number(parts[1]);
  const l = number(parts[2]);
  const alpha = parts[3] === undefined ? 1 : number(parts[3]);
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0) * 255, f(8) * 255, f(4) * 255, alpha];
}

/** OKLCH to sRGB (Tailwind v4's default palettes are written in OKLCH). */
function parseOklch(args) {
  const parts = channels(args);
  const l = number(parts[0]);
  const c = number(parts[1], 0.4);
  const h = (Number.parseFloat(parts[2]) * Math.PI) / 180;
  const alpha = parts[3] === undefined ? 1 : number(parts[3]);
  const a = c * Math.cos(h);
  const b = c * Math.sin(h);
  const l1 = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m1 = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s1 = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const linear = [
    4.0767416621 * l1 - 3.3077115913 * m1 + 0.2309699292 * s1,
    -1.2684380046 * l1 + 2.6097574011 * m1 - 0.3413193965 * s1,
    -0.0041960863 * l1 - 0.7034186147 * m1 + 1.707614701 * s1,
  ];
  const gamma = (v) => {
    const clamped = Math.min(1, Math.max(0, v));
    return clamped <= 0.0031308
      ? 12.92 * clamped
      : 1.055 * clamped ** (1 / 2.4) - 0.055;
  };
  return [...linear.map((v) => gamma(v) * 255), alpha];
}

/** color-mix(in srgb, A p%, B q%), premultiplied, per CSS Color 5. */
function parseColorMix(args, resolve) {
  const [space, first, second] = splitArgs(args, ',');
  if (space.replace(/\s+/g, ' ') !== 'in srgb') {
    throw new ReadError(`color-mix only in srgb, got "${space}"`);
  }
  const part = (text) => {
    const match = text.match(/^([\s\S]+?)(?:\s+([\d.]+)%)?$/);
    return {
      colour: resolve(match[1]),
      weight: match[2] === undefined ? null : Number(match[2]) / 100,
    };
  };
  const a = part(first);
  const b = part(second);
  let pa = a.weight;
  let pb = b.weight;
  if (pa === null && pb === null) {
    pa = 0.5;
    pb = 0.5;
  } else if (pa === null) {
    pa = 1 - pb;
  } else if (pb === null) {
    pb = 1 - pa;
  }
  const total = pa + pb;
  const scale = total < 1 ? total : 1;
  pa /= total;
  pb /= total;
  const alpha = a.colour[3] * pa + b.colour[3] * pb;
  const mix = (i) =>
    alpha === 0
      ? 0
      : (a.colour[i] * a.colour[3] * pa + b.colour[i] * b.colour[3] * pb) /
        alpha;
  return [mix(0), mix(1), mix(2), alpha * scale];
}

/** Resolve a CSS value (a token name, var(), or a colour) to [r, g, b, a]. */
function makeResolver(tokens) {
  const resolve = (raw, depth = 0) => {
    if (depth > MAX_VAR_DEPTH) {
      throw new ReadError(`var() loop at "${raw}"`);
    }
    const value = raw.trim();
    const next = (v) => resolve(v, depth + 1);
    if (value.startsWith('--')) {
      if (!(value in tokens)) {
        throw new ReadError(`no token ${value} in ${TOKEN_FILE}`);
      }
      return next(tokens[value]);
    }
    if (value.startsWith('var(')) {
      const [name, fallback] = splitArgs(inner(value, 'var'), ',');
      if (name in tokens) {
        return next(tokens[name]);
      }
      if (fallback !== undefined) {
        return next(fallback);
      }
      throw new ReadError(`no token ${name} in ${TOKEN_FILE}`);
    }
    const lower = value.toLowerCase();
    if (lower in NAMED) {
      return NAMED[lower];
    }
    if (lower.startsWith('#')) {
      const hex = parseHex(lower);
      if (hex) {
        return hex;
      }
    }
    if (/^rgba?\(/.test(lower)) {
      return parseRgb(inner(lower, lower.startsWith('rgba') ? 'rgba' : 'rgb'));
    }
    if (/^hsla?\(/.test(lower)) {
      return parseHsl(inner(lower, lower.startsWith('hsla') ? 'hsla' : 'hsl'));
    }
    if (lower.startsWith('oklch(')) {
      return parseOklch(inner(lower, 'oklch'));
    }
    if (lower.startsWith('color-mix(')) {
      return parseColorMix(inner(value, 'color-mix'), next);
    }
    throw new ReadError(`can't read the colour "${value}"`);
  };
  return resolve;
}

/** Paint a possibly translucent colour over an opaque one. */
function over(top, bottom) {
  const a = top[3];
  return [0, 1, 2].map((i) => top[i] * a + bottom[i] * (1 - a)).concat(1);
}

function luminance([r, g, b]) {
  const lin = (v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function ratio(fg, bg) {
  const a = luminance(fg);
  const b = luminance(bg);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

// ── Pairs ───────────────────────────────────────────────────────────────

function list(value) {
  return Array.isArray(value) ? value : [value];
}

function label(name) {
  return name.startsWith('--') ? name.slice(2) : name;
}

/** A short name for a stop: `blue-800` for var(--blue-800), `#4ba8ff 45%`
 *  for color-mix(in srgb, #4ba8ff 45%, transparent). */
function shortStop(stop) {
  const value = stop.trim();
  if (value.startsWith('var(')) {
    return label(splitArgs(inner(value, 'var'), ',')[0]);
  }
  if (value.startsWith('color-mix(')) {
    return splitArgs(inner(value, 'color-mix'), ',')
      .slice(1)
      .filter((part) => part !== 'transparent')
      .map(shortStop)
      .join(' + ');
  }
  const weighted = value.match(/^(var\([^)]*\)|\S+)\s+([\d.]+%)$/);
  if (weighted) {
    return `${shortStop(weighted[1])} ${weighted[2]}`;
  }
  return label(value);
}

/** A fill name or a bare colour, as { name, stops, over }. */
function paint(ref, fills) {
  if (fills[ref]) {
    return { name: ref, ...fills[ref], stops: list(fills[ref].stops) };
  }
  return { name: ref, stops: [ref] };
}

/** Every fg × bg × stop combination a pairs entry asks for. */
function expand(pairs, fills) {
  const checks = [];
  for (const pair of pairs) {
    if (!BAR[pair.kind]) {
      throw new ReadError(
        `pair ${JSON.stringify(pair.fg)} on ${JSON.stringify(pair.bg)}: kind must be text, large-text or edge`,
      );
    }
    for (const fgRef of list(pair.fg)) {
      for (const bgRef of list(pair.bg)) {
        const fg = paint(fgRef, fills);
        const bg = paint(bgRef, fills);
        fg.stops.forEach((fgStop, fi) => {
          bg.stops.forEach((bgStop, bi) => {
            checks.push({ pair, fg, bg, fgStop, bgStop, fi, bi });
          });
        });
      }
    }
  }
  return checks;
}

function describe(check) {
  const { fg, bg, fgStop, bgStop, fi, bi } = check;
  const stopNote = (p, stop, i) =>
    p.stops.length > 1
      ? ` (stop ${i + 1}/${p.stops.length} ${shortStop(stop)})`
      : '';
  const noToken = [fgStop, bgStop].some((s) => !s.startsWith('--'))
    ? ' [no token]'
    : '';
  return `${label(fg.name)}${stopNote(fg, fgStop, fi)} on ${label(bg.name)}${stopNote(bg, bgStop, bi)}${noToken}`;
}

function findAllowed(allow, check, mode) {
  return allow.find(
    (entry) =>
      entry.mode === mode &&
      entry.fg === check.fg.name &&
      entry.bg === check.bg.name &&
      (entry.stop === undefined ||
        entry.stop === check.fgStop ||
        entry.stop === check.bgStop),
  );
}

function measure(check, resolve, backdrop) {
  const base = over(resolve(check.bg.over ?? backdrop), [255, 255, 255, 1]);
  const bg = over(resolve(check.bgStop), base);
  const fg = over(resolve(check.fgStop), bg);
  return ratio(fg, bg);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
  } catch (error) {
    throw new ReadError(`can't read ${file}: ${error.message}`);
  }
}

function parseArgs(argv) {
  const options = { mode: 'both', pairs: DEFAULT_PAIRS, allow: DEFAULT_ALLOW };
  for (const arg of argv) {
    const match = arg.match(/^--(mode|pairs|allow)=(.+)$/);
    if (!match) {
      throw new ReadError(`unknown argument "${arg}"`);
    }
    options[match[1]] = match[2];
  }
  if (!['light', 'dark', 'both'].includes(options.mode)) {
    throw new ReadError('--mode must be light, dark or both');
  }
  return options;
}

function main() {
  const options = parseArgs(process.argv.slice(2).filter((a) => a !== '--'));
  const tokens = readTokens(TOKEN_FILE);
  const config = readJson(options.pairs);
  const allow = readJson(options.allow);
  const checks = expand(config.pairs ?? [], config.fills ?? {});
  const modes = options.mode === 'both' ? MODES : [options.mode];
  const used = new Set();
  const rows = [];
  const totals = {};
  let failed = 0;

  for (const mode of modes) {
    const count = { pass: 0, fail: 0, exception: 0, exempt: 0, pending: 0 };
    totals[mode] = count;
    if (mode === 'dark' && !tokens.hasDark) {
      count.pending = checks.length;
      rows.push([
        `${checks.length} pairs`,
        mode,
        '',
        `pending: no .dark block in ${TOKEN_FILE}`,
      ]);
      continue;
    }
    const resolve = makeResolver(tokens[mode]);
    for (const check of checks) {
      const value = measure(check, resolve, config.backdrop ?? 'white');
      const shown = `${value.toFixed(2)}:1`;
      const bar = BAR[check.pair.kind];
      let result;
      if (check.pair.exempt) {
        result = `exempt: ${check.pair.exempt}`;
        count.exempt++;
      } else if (value >= bar) {
        result = 'pass';
        count.pass++;
      } else {
        const entry = findAllowed(allow, check, mode);
        if (entry) {
          used.add(entry);
          result = `exception: ${entry.reason}`;
          count.exception++;
        } else {
          result = `FAIL (needs ${bar}:1 for ${check.pair.kind})`;
          count.fail++;
          failed++;
        }
      }
      rows.push([describe(check), mode, shown, result]);
    }
  }

  const widths = [0, 1, 2].map((i) =>
    Math.max(...rows.map((r) => r[i].length)),
  );
  for (const row of rows) {
    console.log(
      row.map((cell, i) => (i < 3 ? cell.padEnd(widths[i]) : cell)).join('  '),
    );
  }
  console.log('');
  for (const [mode, c] of Object.entries(totals)) {
    console.log(
      `${mode}: ${c.pass} pass, ${c.exception} exception, ${c.exempt} exempt, ${c.fail} fail${c.pending ? `, ${c.pending} pending` : ''}`,
    );
  }
  const unused = allow.filter(
    (entry) => modes.includes(entry.mode) && !used.has(entry),
  );
  for (const entry of unused) {
    const isPending = entry.mode === 'dark' && !tokens.hasDark;
    if (!isPending) {
      console.log(
        `unused allow entry: ${label(entry.fg)} on ${label(entry.bg)} ${entry.mode}`,
      );
    }
  }
  if (failed > 0) {
    console.log(
      `\n${failed} pair(s) below the bar and not in ${options.allow}.`,
    );
    return 1;
  }
  return 0;
}

if (require.main === module) {
  try {
    process.exitCode = main();
  } catch (error) {
    if (!(error instanceof ReadError)) {
      throw error;
    }
    console.error(`check:contrast: ${error.message}`);
    process.exitCode = 2;
  }
}

module.exports = { ratio, makeResolver };
