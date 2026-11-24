// biome-ignore-all lint/style/useNodejsImportProtocol: Jest 25 cannot load node: builtin specifiers.
import { spawnSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

const SCRIPT = path.resolve(__dirname, 'check-contrast.js');

const LIGHT_TOKENS = [
  ':root {',
  '  --white: #ffffff;',
  '  --email-text: #e5e5e5;',
  '  --email-muted: #a3a3a3;',
  '  --email-page: #171717;',
  '  --faint: #b8b8b8;',
  '  --label: color-mix(in srgb, var(--white) 75%, transparent);',
  '  --from: #ec4815;',
  '  --to: #a5310f;',
  '}',
].join('\n');

let root: string;

function write(file: string, content: unknown) {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(
    target,
    typeof content === 'string' ? content : JSON.stringify(content),
  );
}

function setup(pairs: unknown[], allow: unknown[] = [], fills = {}) {
  write('scripts/check-contrast.pairs.json', { fills, pairs });
  write('scripts/check-contrast.allow.json', allow);
}

function run(...args: string[]) {
  const result = spawnSync('node', [SCRIPT, ...args], {
    cwd: root,
    encoding: 'utf8',
  });
  return { status: result.status, out: result.stdout + result.stderr };
}

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'contrast-'));
  write('app/global.css', LIGHT_TOKENS);
});

afterEach(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

describe('check:contrast', () => {
  it('matches the #5015 email ratios', () => {
    setup([
      {
        fg: ['--email-text', '--email-muted'],
        bg: '--email-page',
        kind: 'text',
      },
    ]);
    const { status, out } = run('--mode=light');
    expect(status).toBe(0);
    expect(out).toMatch(/email-text on email-page\s+light\s+14\.23:1\s+pass/);
    expect(out).toMatch(/email-muted on email-page\s+light\s+7\.11:1\s+pass/);
  });

  it('fails a 2:1 text pair, and passes it once allowlisted', () => {
    const pairs = [{ fg: '--faint', bg: '--white', kind: 'text' }];
    setup(pairs);
    const failing = run('--mode=light');
    expect(failing.status).toBe(1);
    expect(failing.out).toMatch(/faint on white\s+light\s+1\.98:1\s+FAIL/);

    setup(pairs, [
      { fg: '--faint', bg: '--white', mode: 'light', reason: 'planted' },
    ]);
    const allowed = run('--mode=light');
    expect(allowed.status).toBe(0);
    expect(allowed.out).toContain('exception: planted');
  });

  it('never fails an exempt pair', () => {
    setup([
      {
        fg: '--faint',
        bg: '--white',
        kind: 'edge',
        exempt: 'decorative divider (D7)',
      },
    ]);
    const { status, out } = run('--mode=light');
    expect(status).toBe(0);
    expect(out).toContain('exempt: decorative divider (D7)');
  });

  it('composites translucent colours over the background', () => {
    setup([{ fg: '--label', bg: '--email-page', kind: 'text' }]);
    const { out } = run('--mode=light');
    // White at 75% over #171717 is #c5c5c5: 10.39:1.
    expect(out).toMatch(/label on email-page\s+light\s+10\.39:1\s+pass/);
  });

  it('checks every gradient stop, and an allow entry can name one stop', () => {
    const fills = { band: { stops: ['--faint', '#eb8860'] } };
    const pairs = [{ fg: '--white', bg: 'band', kind: 'text' }];
    setup(pairs, [], fills);
    const failing = run('--mode=light');
    expect(failing.status).toBe(1);
    expect(failing.out).toMatch(/stop 1\/2 faint\)\s+light\s+1\.98:1\s+FAIL/);
    expect(failing.out).toMatch(/stop 2\/2 #eb8860\) \[no token\]/);

    setup(
      pairs,
      [
        {
          fg: '--white',
          bg: 'band',
          mode: 'light',
          stop: '--faint',
          reason: 'x',
        },
      ],
      fills,
    );
    const partly = run('--mode=light');
    expect(partly.status).toBe(1);
    expect(partly.out).toContain('exception: x');
  });

  it('lists dark pairs as pending until app/global.css has a .dark block', () => {
    setup([{ fg: '--faint', bg: '--email-page', kind: 'text' }]);
    const pending = run();
    expect(pending.status).toBe(0);
    expect(pending.out).toContain('pending: no .dark block in app/global.css');

    write(
      'app/global.css',
      `${LIGHT_TOKENS}\n.dark {\n  --faint: #404040;\n}\n`,
    );
    const dark = run();
    expect(dark.status).toBe(1);
    expect(dark.out).toMatch(/faint on email-page\s+light\s+\S+\s+pass/);
    expect(dark.out).toMatch(/faint on email-page\s+dark\s+1\.73:1\s+FAIL/);
  });

  it('exits 2 on a colour it cannot read', () => {
    setup([{ fg: '--missing', bg: '--white', kind: 'text' }]);
    const { status, out } = run('--mode=light');
    expect(status).toBe(2);
    expect(out).toContain('no token --missing');
  });
});
