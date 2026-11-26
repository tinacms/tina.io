import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';

const CHROMIUM_PREFIX = 'chromium-';
const HEADLESS_SHELL_PREFIX = 'chromium_headless_shell-';
const PLATFORM_DIR_PREFIX = 'chrome-';
const HEADLESS_SHELL_FILES = ['headless_shell', 'headless_shell.exe'];

const revisionOf = (dirName: string) =>
  Number(dirName.slice(HEADLESS_SHELL_PREFIX.length));

const headlessShellIn = (buildDir: string): string | undefined => {
  if (!fs.existsSync(buildDir)) {
    return undefined;
  }
  for (const platformDir of fs.readdirSync(buildDir)) {
    if (!platformDir.startsWith(PLATFORM_DIR_PREFIX)) {
      continue;
    }
    for (const file of HEADLESS_SHELL_FILES) {
      const candidate = path.join(buildDir, platformDir, file);
      if (fs.existsSync(candidate)) {
        return candidate;
      }
    }
  }
  return undefined;
};

/**
 * The headless Chromium for Playwright to launch, or undefined to use its own.
 *
 * 1. CHROMIUM_PATH, when set.
 * 2. Playwright's own headless shell, when it's downloaded (CI, fresh installs).
 * 3. Otherwise the nearest newer headless shell already in the browser cache,
 *    so a machine that has a newer build doesn't need a download.
 */
export function chromiumExecutablePath(): string | undefined {
  if (process.env.CHROMIUM_PATH) {
    return process.env.CHROMIUM_PATH;
  }

  // e.g. <cache>/chromium-1179/chrome-mac/Chromium.app/…: walk up to the
  // chromium-<revision> folder for the cache root and the expected revision.
  let buildDir = chromium.executablePath();
  while (
    !path.basename(buildDir).startsWith(CHROMIUM_PREFIX) &&
    path.dirname(buildDir) !== buildDir
  ) {
    buildDir = path.dirname(buildDir);
  }
  const cacheRoot = path.dirname(buildDir);
  const expectedRevision = Number(
    path.basename(buildDir).slice(CHROMIUM_PREFIX.length),
  );
  if (!Number.isFinite(expectedRevision)) {
    return undefined;
  }
  if (
    headlessShellIn(
      path.join(cacheRoot, `${HEADLESS_SHELL_PREFIX}${expectedRevision}`),
    )
  ) {
    return undefined;
  }

  const newer = (fs.existsSync(cacheRoot) ? fs.readdirSync(cacheRoot) : [])
    .filter(
      (dirName) =>
        dirName.startsWith(HEADLESS_SHELL_PREFIX) &&
        revisionOf(dirName) >= expectedRevision,
    )
    .sort((a, b) => revisionOf(a) - revisionOf(b));
  for (const dirName of newer) {
    const shell = headlessShellIn(path.join(cacheRoot, dirName));
    if (shell) {
      return shell;
    }
  }
  return undefined;
}
