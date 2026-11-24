// biome-ignore-all lint/style/useNodejsImportProtocol: Jest 25 cannot load node: builtin specifiers.
import { spawnSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

const SCRIPT = path.resolve(__dirname, 'check-colour-tokens.js');

const BASE_FILES: Record<string, string> = {
  'tailwind.config.js': `module.exports = {
    theme: {
      extend: {
        colors: {
          body: 'var(--text-body)',
          seafoam: { 50: 'var(--seafoam-50)', 500: 'var(--seafoam-500)' },
        },
      },
    },
  };`,
  'app/global.css':
    ':root {\n  --text-body: #333333;\n  --seafoam-50: rgb(230 250 248);\n}\n',
  'styles/tailwind.css': [
    ':root {',
    '  --spec-token: #abcdef;',
    '}',
    '@theme inline {',
    '  --color-thing: #fff;',
    '}',
    '@utility role-body {',
    '  @apply text-body;',
    '}',
    '',
  ].join('\n'),
  'scripts/check-colour-tokens.allow.json': '[]',
};

let root: string;

function write(file: string, content: string) {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}

function run(...args: string[]) {
  const result = spawnSync('node', [SCRIPT, ...args], {
    cwd: root,
    encoding: 'utf8',
  });
  return { status: result.status, out: result.stdout + result.stderr };
}

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'colour-tokens-'));
  Object.entries(BASE_FILES).forEach(([file, content]) => {
    write(file, content);
  });
});

afterEach(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

describe('check:colour-tokens', () => {
  it('fails on a planted palette class and hex, and passes once they are gone', () => {
    write(
      'components/Planted.tsx',
      [
        'export const Planted = () => (',
        '  <p className="text-gray-500" style={{ color: "#ff0000" }} />',
        ');',
        '',
      ].join('\n'),
    );
    const failing = run();
    expect(failing.status).toBe(1);
    expect(failing.out).toContain('components/Planted.tsx:2  text-gray-500');
    expect(failing.out).toContain('components/Planted.tsx:2  #ff0000');

    write('components/Planted.tsx', 'export const Planted = () => <p />;\n');
    expect(run().status).toBe(0);
  });

  it('never reports the token layer, but still checks the specs', () => {
    expect(run().status).toBe(0);

    write(
      'styles/tailwind.css',
      `${BASE_FILES['styles/tailwind.css']}@utility role-x {\n  color: #ff0000;\n}\n`,
    );
    const result = run();
    expect(result.status).toBe(1);
    expect(result.out).toContain('styles/tailwind.css:11  #ff0000');
    expect(result.out).not.toContain('#abcdef');
    expect(result.out).not.toContain('app/global.css');
  });

  it('reports variants, arbitrary values, named colours and config scales', () => {
    write(
      'components/Mixed.tsx',
      [
        'const a = "md:hover:bg-white/10 dark:from-seafoam-500 bg-[#f9fafb]";',
        'const b = { backgroundColor: "white" };',
        'const c = "rgba(0, 0, 0, 0.5)";',
        '',
      ].join('\n'),
    );
    const { out } = run();
    expect(out).toContain('components/Mixed.tsx:1  bg-white/10');
    expect(out).toContain('components/Mixed.tsx:1  from-seafoam-500');
    expect(out).toContain('components/Mixed.tsx:1  bg-[#f9fafb]');
    expect(out).not.toContain('components/Mixed.tsx:1  #f9fafb');
    expect(out).toContain('components/Mixed.tsx:2  backgroundColor: "white');
    expect(out).toContain('components/Mixed.tsx:3  rgba(0, 0, 0, 0.5)');
  });

  it('flags token names in components but not in the role layer', () => {
    write(
      'components/Card.tsx',
      'const a = "text-body bg-[var(--seafoam-50)]";\n',
    );
    write(
      'components/styles/typography.ts',
      'export const BODY = "text-body";\n',
    );
    const { out } = run();
    expect(out).toContain('components/Card.tsx:1  text-body');
    expect(out).toContain('components/Card.tsx:1  bg-[var(--seafoam-50)]');
    expect(out).not.toContain('components/styles/typography.ts');
  });

  it('skips comments, and token wrappers in the role layer', () => {
    write(
      'components/Quiet.tsx',
      [
        '// Fixes #4964, see https://example.com/#abc',
        '/* <div className="bg-white" /> */',
        '',
      ].join('\n'),
    );
    write('components/styles/menu.ts', 'const a = "hsl(var(--border))";\n');
    expect(run().status).toBe(0);

    write('components/Wrapped.tsx', 'const a = "hsl(var(--border))";\n');
    expect(run().out).toContain('components/Wrapped.tsx:1  hsl(var(--border))');
  });

  it('scans only the given paths in fence mode', () => {
    write('components/Inside.tsx', 'const a = "text-gray-500";\n');
    write('app/Outside.tsx', 'const a = "text-gray-500";\n');
    const result = run('--', 'components/Inside.tsx');
    expect(result.status).toBe(1);
    expect(result.out).toContain('components/Inside.tsx:1');
    expect(result.out).not.toContain('app/Outside.tsx');

    const typo = run('--', 'components/Insid.tsx');
    expect(typo.status).toBe(2);
    expect(typo.out).toContain('No such path: components/Insid.tsx');
  });

  it('skips allowlisted entries and lists them under allowed', () => {
    write('components/Logo.tsx', 'const a = "#5865f2";\n');
    write(
      'scripts/check-colour-tokens.allow.json',
      JSON.stringify([
        {
          file: 'components/Logo.tsx',
          pattern: '#5865f2',
          reason: 'Brand colour',
        },
      ]),
    );
    const result = run();
    expect(result.status).toBe(0);
    expect(result.out).toMatch(
      /allowed:\n {2}components\/Logo\.tsx:1 {2}#5865f2/,
    );
  });

  it('stops when tailwind.config.js cannot load', () => {
    write('tailwind.config.js', "require('not-installed');\n");
    const result = run();
    expect(result.status).toBe(2);
    expect(result.out).toContain('Could not load tailwind.config.js');
  });

  it('prints per-folder totals without failing in count mode', () => {
    write('components/blocks/A.tsx', 'const a = "text-gray-500 #ff0000";\n');
    write('components/ui/B.tsx', 'const a = "bg-white";\n');
    const result = run('--', '--count');
    expect(result.status).toBe(0);
    expect(result.out).toMatch(/components\/blocks\s+2\s+1\s+1\s+1/);
    expect(result.out).toMatch(/components\/ui\s+1\s+1\s+0\s+1/);
    expect(result.out).toContain('Total: 3 hits in 2 files');
  });
});
