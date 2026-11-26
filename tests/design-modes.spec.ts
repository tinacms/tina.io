import {
  type ConsoleMessage,
  expect,
  type Locator,
  type Page,
  test,
} from '@playwright/test';

/**
 * check:design-modes — the style guide at /design works in light and dark.
 *
 *   pnpm check:design-modes                          against http://localhost:3000
 *   BASE_URL=http://localhost:3010 pnpm check:design-modes
 *
 * The browser comes from playwright.config.ts: CHROMIUM_PATH, else Playwright's
 * own, else the nearest newer headless Chromium in the cache.
 *
 * Every section, in both modes, at desktop and phone width: it must render
 * content, stay inside the viewport, and log no console errors. Each section
 * is screenshotted into test-results/.
 *
 * Then the toggle, the sticky index and the map of the guide, from lg up.
 * Below lg (the phone layout is deferred) /design keeps its header row of
 * section links, with no index column and no toggle, and the mode follows the
 * stored choice or the system setting.
 */

const ROUTE = '/design';
const MODES = ['light', 'dark'] as const;
type Mode = (typeof MODES)[number];

const WIDTHS = { desktop: 1440, phone: 375 } as const;
/** The narrowest width with the index column and the toggle (lg). */
const INDEX_MIN_WIDTH = 1024;
const VIEWPORT_HEIGHT = 900;
const NAVIGATION_TIMEOUT_MS = 90_000;
/** A section run walks and screenshots every section on a dev server. */
const SECTION_RUN_TIMEOUT_MS = 240_000;
/**
 * How long a section screenshot may take before the run goes on without it.
 * Headless Chromium can stall painting /design at phone width (over 20,000px
 * tall, with fixed page backgrounds), so a screenshot is evidence for people,
 * never the check itself: the section assertions are.
 */
const SCREENSHOT_TIMEOUT_MS = 10_000;

/** Sub-pixel rounding allowed before a box counts as past the viewport edge. */
const EDGE_TOLERANCE_PX = 0.5;

/**
 * Console errors that come from site chrome in local dev, not from /design.
 * Anything not listed here fails the check.
 */
const KNOWN_CONSOLE_ERRORS: {
  matches: (message: ConsoleMessage) => boolean;
  reason: string;
}[] = [
  {
    matches: (message) =>
      message.text().startsWith('Error fetching GitHub stars') ||
      message.location().url.includes('/api/githubstar'),
    reason:
      'the nav star count: /api/githubstar returns 500 without GitHub access in local dev',
  },
];

/**
 * The toggle and index contract: .dark on <html>,
 * a "Dark mode" button pressed when dark, the choice stored under
 * tina-design-mode, and the visible "Style guide sections" nav as the index.
 * Below lg that label is on the header's row of section links instead.
 */
const MODE_ROOT_SELECTOR = 'html';
const TOGGLE_NAME = /^dark mode$/i;
const STORAGE_KEY = 'tina-design-mode';
const INDEX_LABEL = 'Style guide sections';
/** The guide's categories, in order, as the index and the map label them. */
const CATEGORY_LABELS = ['Foundations', 'Components'];
const MAP_LABEL = 'Map of the guide';
const DARK_CLASS = /\bdark\b/;

const modeRoot = (page: Page): Locator =>
  page.locator(MODE_ROOT_SELECTOR).first();
const toggleLocator = (page: Page): Locator =>
  page.getByRole('button', { name: TOGGLE_NAME });
/** Only the visible nav: the index from lg up, the header row below. */
const indexLocator = (page: Page): Locator =>
  page.getByRole('navigation', { name: INDEX_LABEL });
const isDark = (page: Page) =>
  modeRoot(page).evaluate((root) => root.classList.contains('dark'));

/**
 * Picks a mode with the toggle, from lg up. Retries the click until it takes,
 * since a click before hydration does nothing.
 */
const chooseMode = async (page: Page, mode: Mode) => {
  const toggle = toggleLocator(page);
  await expect(async () => {
    if ((await isDark(page)) !== (mode === 'dark')) {
      await toggle.click();
    }
    expect(await isDark(page)).toBe(mode === 'dark');
  }).toPass();
};

const collectConsoleErrors = (page: Page): string[] => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() !== 'error') {
      return;
    }
    if (KNOWN_CONSOLE_ERRORS.some((known) => known.matches(message))) {
      return;
    }
    errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  return errors;
};

const openDesign = async (page: Page) => {
  const response = await page.goto(ROUTE, {
    waitUntil: 'load',
    timeout: NAVIGATION_TIMEOUT_MS,
  });
  expect(response?.status(), `${ROUTE} status`).toBe(200);
  await page.locator('main section[id]').first().waitFor();
};

/**
 * Puts the page in a mode by the .dark class on the mode root, for widths
 * with no toggle (below lg, where it is deferred).
 */
const setMode = async (page: Page, mode: Mode) => {
  await modeRoot(page).evaluate(
    (root, dark) => root.classList.toggle('dark', dark),
    mode === 'dark',
  );
};

/** What's wrong with one section, or nothing. Runs in the page. */
type SectionReport = {
  id: string;
  empty: boolean;
  emptyGroups: string[];
  overflowing: string[];
};

const inspectSections = (page: Page, tolerance: number) =>
  page.evaluate((edgeTolerance): SectionReport[] => {
    const viewportWidth = document.documentElement.clientWidth;
    const hasBox = (element: Element) => {
      const box = element.getBoundingClientRect();
      return box.width > 0 && box.height > 0;
    };
    const describe = (element: Element) => {
      const label =
        element.id ||
        element.getAttribute('aria-label') ||
        element.textContent?.trim().slice(0, 40) ||
        '';
      return `${element.tagName.toLowerCase()} "${label}"`;
    };
    // Content inside a scroll or clip container may run past the edge on purpose.
    const isClippedWithin = (element: Element, section: Element) => {
      for (
        let parent = element.parentElement;
        parent && parent !== section;
        parent = parent.parentElement
      ) {
        if (getComputedStyle(parent).overflowX !== 'visible') {
          return true;
        }
      }
      return false;
    };

    return Array.from(document.querySelectorAll('main section[id]')).map(
      (section) => {
        // A Section is its heading block, then its groups.
        const [, ...groups] = Array.from(section.children);
        const emptyGroups = groups
          .filter((group) => {
            const [, ...body] = Array.from(group.children);
            return group.children.length > 1 && !body.some(hasBox);
          })
          .map((group) => group.id || describe(group));
        const overflowing = Array.from(section.querySelectorAll('*'))
          .filter(
            (element) =>
              hasBox(element) &&
              element.getBoundingClientRect().right >
                viewportWidth + edgeTolerance &&
              !isClippedWithin(element, section),
          )
          .map(describe);
        return {
          id: section.id,
          empty: !groups.some(hasBox),
          emptyGroups,
          overflowing,
        };
      },
    );
  }, tolerance);

for (const mode of MODES) {
  for (const [widthName, width] of Object.entries(WIDTHS)) {
    test(`every section renders in ${mode} at ${widthName} (${width}px)`, async ({
      page,
    }, testInfo) => {
      test.setTimeout(SECTION_RUN_TIMEOUT_MS);
      await page.setViewportSize({ width, height: VIEWPORT_HEIGHT });
      const consoleErrors = collectConsoleErrors(page);
      await openDesign(page);
      if (width >= INDEX_MIN_WIDTH) {
        await chooseMode(page, mode);
      } else {
        await setMode(page, mode);
      }

      const reports = await inspectSections(page, EDGE_TOLERANCE_PX);
      expect(reports.length, 'sections on /design').toBeGreaterThan(0);
      let screenshots = true;

      for (const report of reports) {
        await test.step(`#${report.id}`, async () => {
          // The screen at the section's top. After one stalled screenshot the
          // run skips the rest and notes it (SCREENSHOT_TIMEOUT_MS).
          await page
            .locator(`section#${report.id}`)
            .evaluate((section) =>
              section.scrollIntoView({ block: 'start', behavior: 'instant' }),
            );
          if (screenshots) {
            await page
              .screenshot({
                path: testInfo.outputPath(`${report.id}-${mode}-${width}.png`),
                timeout: SCREENSHOT_TIMEOUT_MS,
              })
              .catch(() => {
                screenshots = false;
                testInfo.annotations.push({
                  type: 'screenshots skipped',
                  description: `from #${report.id} at ${width}px in ${mode}: headless Chromium stalled painting the page`,
                });
              });
          }

          expect
            .soft(report.empty, `#${report.id} has no content in ${mode}`)
            .toBe(false);
          expect
            .soft(
              report.emptyGroups,
              `#${report.id} has empty groups in ${mode}`,
            )
            .toEqual([]);
          expect
            .soft(
              report.overflowing,
              `#${report.id} overflows ${width}px in ${mode}`,
            )
            .toEqual([]);
        });
      }

      expect(consoleErrors, `console errors on /design in ${mode}`).toEqual([]);
    });
  }
}

// Every section and group has its own id, the slug of its own title.
test('no DOM id repeats on /design', async ({ page }) => {
  await openDesign(page);
  const repeated = await page.evaluate(() => {
    const counts = new Map<string, number>();
    for (const element of Array.from(document.querySelectorAll('[id]'))) {
      counts.set(element.id, (counts.get(element.id) ?? 0) + 1);
    }
    return Array.from(counts)
      .filter(([, count]) => count > 1)
      .map(([id]) => id);
  });
  expect(repeated, 'ids that appear more than once').toEqual([]);
});

/** Each test is numbered by its item in the toggle and index contract. */
test.describe('toggle', () => {
  const desktop = { width: WIDTHS.desktop, height: VIEWPORT_HEIGHT };
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(desktop);
  });

  test('1. first frame follows the system setting, with no flash, at every width', async ({
    browser,
  }) => {
    const runs = [
      ...MODES.map((colorScheme) => ({ colorScheme, width: WIDTHS.desktop })),
      { colorScheme: 'dark' as const, width: WIDTHS.phone },
    ];
    for (const { colorScheme, width } of runs) {
      const context = await browser.newContext({
        colorScheme,
        viewport: { width, height: VIEWPORT_HEIGHT },
      });
      // Records the mode root's class on the first animation frame.
      await context.addInitScript((selector) => {
        requestAnimationFrame(() => {
          const root = document.querySelector(selector);
          (window as unknown as { firstFrameDark: boolean }).firstFrameDark =
            !!root?.classList.contains('dark');
        });
      }, MODE_ROOT_SELECTOR);
      const page = await context.newPage();
      await openDesign(page);
      const firstFrameDark = await page.evaluate(
        () => (window as unknown as { firstFrameDark: boolean }).firstFrameDark,
      );
      expect(
        firstFrameDark,
        `first frame under system ${colorScheme} at ${width}px`,
      ).toBe(colorScheme === 'dark');
      await context.close();
    }
  });

  test('2. a choice persists across reload and beats the system', async ({
    browser,
  }) => {
    const darkSystem = await browser.newContext({
      colorScheme: 'dark',
      viewport: desktop,
    });
    const page = await darkSystem.newPage();
    await openDesign(page);
    await chooseMode(page, 'light');
    await page.reload();
    await expect(modeRoot(page)).not.toHaveClass(DARK_CLASS);
    expect(
      await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY),
    ).toBe('light');
    await darkSystem.close();

    const lightSystem = await browser.newContext({
      colorScheme: 'light',
      viewport: desktop,
    });
    await lightSystem.addInitScript((key) => {
      localStorage.setItem(key, 'dark');
    }, STORAGE_KEY);
    const stored = await lightSystem.newPage();
    await openDesign(stored);
    await expect(modeRoot(stored)).toHaveClass(DARK_CLASS);
    await lightSystem.close();
  });

  test('3. the system setting is followed live only without a stored choice', async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await openDesign(page);
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(modeRoot(page)).toHaveClass(DARK_CLASS);

    await chooseMode(page, 'light');
    await page.emulateMedia({ colorScheme: 'light' });
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(modeRoot(page)).not.toHaveClass(DARK_CLASS);
  });

  for (const width of [WIDTHS.desktop, INDEX_MIN_WIDTH]) {
    test(`4. the toggle is named, keyboard-operable, outlined and visible at ${width}px`, async ({
      page,
    }) => {
      const MAX_TABS = 40;
      await page.setViewportSize({ width, height: VIEWPORT_HEIGHT });
      await openDesign(page);
      const toggle = toggleLocator(page);
      await expect(toggle).toHaveAccessibleName(TOGGLE_NAME);
      await expect(toggle, `toggle at ${width}px`).toBeInViewport();
      // Key presses before hydration do nothing, so wait for React's handlers.
      await expect
        .poll(() =>
          toggle.evaluate((element) =>
            Object.keys(element).some((key) => key.startsWith('__reactProps')),
          ),
        )
        .toBe(true);

      for (let tab = 0; tab < MAX_TABS; tab++) {
        await page.keyboard.press('Tab');
        if (
          await toggle.evaluate((element) => element === document.activeElement)
        ) {
          break;
        }
      }
      await expect(toggle).toBeFocused();
      expect(
        await toggle.evaluate(
          (element) => getComputedStyle(element).outlineStyle,
        ),
        'focus outline',
      ).not.toBe('none');

      for (const key of ['Space', 'Enter']) {
        const before = await isDark(page);
        await page.keyboard.press(key);
        await expect.poll(() => isDark(page), `${key} switches`).toBe(!before);
        await expect(toggle).toHaveAttribute('aria-pressed', String(!before));
      }
    });
  }

  test('5. no console error, hydration included, in either mode', async ({
    browser,
  }) => {
    for (const colorScheme of MODES) {
      const context = await browser.newContext({
        colorScheme,
        viewport: desktop,
      });
      const page = await context.newPage();
      const consoleErrors = collectConsoleErrors(page);
      await openDesign(page);
      await chooseMode(page, colorScheme === 'dark' ? 'light' : 'dark');
      expect(
        consoleErrors,
        `console errors under system ${colorScheme}`,
      ).toEqual([]);
      await context.close();
    }
  });

  test('6. leaving /design leaves nothing dark', async ({ page }) => {
    await openDesign(page);
    await chooseMode(page, 'dark');
    await page.locator('a[href="/"]').filter({ visible: true }).first().click();
    await page.waitForURL('/');
    expect(await page.locator('.dark').count(), '.dark after leaving').toBe(0);
  });
});

test.describe('index', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({
      width: WIDTHS.desktop,
      height: VIEWPORT_HEIGHT,
    });
  });

  const sectionIds = (page: Page) =>
    page
      .locator('main section[id]')
      .evaluateAll((sections) => sections.map((section) => section.id));
  const currentLinks = (page: Page) =>
    indexLocator(page).locator('a[aria-current="location"]');

  test('7. the index lists the category labels and every section once, in page order', async ({
    page,
  }) => {
    await openDesign(page);
    const result = await page.evaluate((label) => {
      // The header row shares the label; read the one that shows.
      const index = Array.from(
        document.querySelectorAll(`nav[aria-label="${label}"]`),
      ).find((nav) => nav.getClientRects().length > 0);
      const hrefs = Array.from(
        index?.querySelectorAll('a[href^="#"]') ?? [],
      ).map((link) => link.getAttribute('href')?.slice(1) ?? '');
      const sections = Array.from(
        document.querySelectorAll('main section[id]'),
      ).map((element) => element.id);
      const labels = Array.from(index?.querySelectorAll('p') ?? []).map(
        (element) => element.textContent?.trim() ?? '',
      );
      return { hrefs, sections, labels };
    }, INDEX_LABEL);
    expect(result.hrefs, 'one index link per section, in page order').toEqual(
      result.sections,
    );
    expect(result.labels, 'category labels').toEqual(CATEGORY_LABELS);
  });

  test('8. scrolling marks one section current', async ({ page }) => {
    await openDesign(page);
    const index = indexLocator(page);
    const ids = await sectionIds(page);
    for (const id of ids) {
      await page.locator(`section#${id}`).scrollIntoViewIfNeeded();
      await expect(index.locator(`a[href="#${id}"]`)).toHaveAttribute(
        'aria-current',
        'location',
      );
      await expect(
        currentLinks(page),
        `one current section at #${id}`,
      ).toHaveCount(1);
    }

    // Brought to the top as a jump brings it (the site's scroll padding and
    // the group's scroll margin leave it above the middle), not centred:
    // that padding pushes a centred group below the activation line.
    const group = page.locator('main section[id] > div[id]').last();
    const sectionId = await group.evaluate(
      (element) => element.closest('section')?.id,
    );
    await group.evaluate((element) =>
      element.scrollIntoView({ block: 'start', behavior: 'instant' }),
    );
    await expect(index.locator(`a[href="#${sectionId}"]`)).toHaveAttribute(
      'aria-current',
      'location',
    );
    await expect(currentLinks(page), 'one current section').toHaveCount(1);
  });

  test('9. a deep link to a part marks its section current', async ({
    page,
  }) => {
    await page.goto(`${ROUTE}#tabs`, { timeout: NAVIGATION_TIMEOUT_MS });
    await expect(currentLinks(page)).toHaveText(['Navigation']);
  });

  test('9a. the old Links and navigation anchor lands on Links', async ({
    page,
  }) => {
    await page.goto(`${ROUTE}#links-and-navigation`, {
      timeout: NAVIGATION_TIMEOUT_MS,
    });
    await expect(page.locator('section#links')).toBeInViewport();
    await expect(currentLinks(page)).toHaveText(['Links']);
  });

  test('10. the index stays in view at desktop width', async ({ page }) => {
    const SCREENS_TO_SCROLL = 3;
    await openDesign(page);
    await page.evaluate(
      (screens) => window.scrollBy(0, window.innerHeight * screens),
      SCREENS_TO_SCROLL,
    );
    await expect(indexLocator(page)).toBeInViewport();
  });

  test('11. at phone width the page keeps its row of section links, with no column or toggle', async ({
    browser,
  }) => {
    const context = await browser.newContext({
      colorScheme: 'light',
      viewport: { width: WIDTHS.phone, height: VIEWPORT_HEIGHT },
    });
    await context.addInitScript((key) => {
      localStorage.setItem(key, 'dark');
    }, STORAGE_KEY);
    const page = await context.newPage();
    await openDesign(page);
    await expect(modeRoot(page), 'a stored dark still applies').toHaveClass(
      DARK_CLASS,
    );
    await expect(toggleLocator(page), 'no toggle').toHaveCount(0);

    const row = page.locator('main header').getByRole('link');
    const ids = await sectionIds(page);
    await expect(row, 'one row link per section').toHaveCount(ids.length);
    for (const id of ids) {
      await row.and(page.locator(`a[href="#${id}"]`)).click();
      await expect(page.locator(`section#${id}`)).toBeInViewport();
    }
    await expect(
      indexLocator(page).locator('ul'),
      'no index column',
    ).toHaveCount(0);
    await context.close();
  });
});

test.describe('map', () => {
  test('12. the map shows each category in its own row, every section with a preview, its name and its parts', async ({
    page,
  }) => {
    await page.setViewportSize({
      width: WIDTHS.desktop,
      height: VIEWPORT_HEIGHT,
    });
    await openDesign(page);
    const map = page.getByRole('navigation', { name: MAP_LABEL });
    await expect(map).toBeVisible();
    const result = await map.evaluate((nav) => {
      const rows = Array.from(nav.querySelectorAll(':scope > div')).map(
        (row) => ({
          label: row.querySelector('p')?.textContent?.trim() ?? '',
          tops: Array.from(row.querySelectorAll(':scope > ul > li')).map(
            (item) => Math.round(item.getBoundingClientRect().top),
          ),
          sections: Array.from(
            row.querySelectorAll(':scope > ul > li > a'),
          ).map((link) => link.getAttribute('href')?.slice(1) ?? ''),
          emptyPreviews: Array.from(
            row.querySelectorAll(':scope > ul > li > div:first-child'),
          ).filter((preview) => !preview.firstElementChild).length,
        }),
      );
      const parts = Array.from(nav.querySelectorAll('li p a')).map(
        (link) => link.getAttribute('href')?.slice(1) ?? '',
      );
      const groups = Array.from(
        document.querySelectorAll('main section[id] > div[id]'),
      ).map((group) => group.id);
      const sections = Array.from(
        document.querySelectorAll('main section[id]'),
      ).map((section) => section.id);
      return { rows, parts, groups, sections };
    });
    expect(
      result.rows.map((row) => row.label),
      'one row per category',
    ).toEqual(CATEGORY_LABELS);
    expect(
      result.rows.flatMap((row) => row.sections),
      'every section once, in page order',
    ).toEqual(result.sections);
    for (const row of result.rows) {
      expect(new Set(row.tops).size, `${row.label} sits in one row`).toBe(1);
      expect(row.emptyPreviews, `${row.label} previews`).toBe(0);
    }
    expect(result.parts, 'every part once, in page order').toEqual(
      result.groups,
    );
  });
});
