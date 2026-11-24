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
 * The toggle and index tests are fixme until the /design toggle and sticky
 * index land (PBI-5015-07). That slice turns them on and points the locators
 * below at its markup.
 */

const ROUTE = '/design';
const MODES = ['light', 'dark'] as const;
type Mode = (typeof MODES)[number];

const WIDTHS = { desktop: 1440, phone: 375 } as const;
const VIEWPORT_HEIGHT = 900;
const NAVIGATION_TIMEOUT_MS = 90_000;

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
 * The toggle and index contract from the PBI-5015-07 plan. Round C still
 * decides C1 (the mode root: <html>, or the style guide wrapper) and G2 (the
 * toggle's name: a "Dark mode" button with aria-pressed, or a "Colour mode"
 * group of Light and Dark options). 07 sets these two when it lands.
 */
const MODE_ROOT_SELECTOR = 'html';
const TOGGLE_NAME = /^(dark mode|colour mode)$/i;
const STORAGE_KEY = 'tina-design-mode';
const INDEX_LABEL = 'Style guide sections';
const PHONE_INDEX_BUTTON = 'On this page';
const DARK_CLASS = /\bdark\b/;

const modeRoot = (page: Page): Locator =>
  page.locator(MODE_ROOT_SELECTOR).first();
const toggleLocator = (page: Page): Locator =>
  page
    .getByRole('button', { name: TOGGLE_NAME })
    .or(page.getByRole('group', { name: TOGGLE_NAME }));
const indexLocator = (page: Page): Locator =>
  page.getByRole('navigation', { name: INDEX_LABEL });
const isDark = (page: Page) =>
  modeRoot(page).evaluate((root) => root.classList.contains('dark'));

/** Picks a mode with the toggle: a pressed button, or a Light/Dark option. */
const chooseMode = async (page: Page, mode: Mode) => {
  const toggle = toggleLocator(page);
  const option = toggle.getByRole('button', { name: new RegExp(mode, 'i') });
  if ((await option.count()) > 0) {
    await option.click();
    return;
  }
  if ((await isDark(page)) !== (mode === 'dark')) {
    await toggle.click();
  }
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
 * Puts the page in a mode. Until the toggle exists, dark is the .dark class
 * on the mode root; PBI-5015-07 switches this to chooseMode.
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
      await page.setViewportSize({ width, height: VIEWPORT_HEIGHT });
      const consoleErrors = collectConsoleErrors(page);
      await openDesign(page);
      await setMode(page, mode);

      const reports = await inspectSections(page, EDGE_TOLERANCE_PX);
      expect(reports.length, 'sections on /design').toBeGreaterThan(0);

      for (const report of reports) {
        await test.step(`#${report.id}`, async () => {
          const section = page.locator(`section#${report.id}`);
          await section.scrollIntoViewIfNeeded();
          await section.screenshot({
            path: testInfo.outputPath(`${report.id}-${mode}-${width}.png`),
          });

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

// Today's /design repeats #links (the Typography "Links" group and the
// "Links and navigation" section), so this stays fixme until PBI-5015-07's
// G1 id fix lands. Turn it on with the toggle and index tests.
test.fixme(
  'no DOM id repeats on /design, waiting on PBI-5015-07 (duplicate #links today)',
  async ({ page }) => {
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
  },
);

/** Each assertion's number is its item in the PBI-5015-07 plan's contract. */
test.describe.fixme('toggle (D5), waiting on PBI-5015-07', () => {
  test('1. first frame follows the system setting, with no flash', async ({
    browser,
  }) => {
    for (const colorScheme of MODES) {
      const context = await browser.newContext({ colorScheme });
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
      expect(firstFrameDark, `first frame under system ${colorScheme}`).toBe(
        colorScheme === 'dark',
      );
      await context.close();
    }
  });

  test('2. a choice persists across reload and beats the system', async ({
    browser,
  }) => {
    const darkSystem = await browser.newContext({ colorScheme: 'dark' });
    const page = await darkSystem.newPage();
    await openDesign(page);
    await chooseMode(page, 'light');
    await page.reload();
    await expect(modeRoot(page)).not.toHaveClass(DARK_CLASS);
    expect(
      await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY),
    ).toBe('light');
    await darkSystem.close();

    const lightSystem = await browser.newContext({ colorScheme: 'light' });
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

  test('4. the toggle is named, keyboard-operable, outlined and visible', async ({
    page,
  }) => {
    const MAX_TABS = 40;
    await openDesign(page);
    const toggle = toggleLocator(page);
    await expect(toggle).toHaveAccessibleName(TOGGLE_NAME);

    // A group's first option takes focus; a button takes it itself.
    const focusTarget = toggle.getByRole('button').or(toggle).first();
    for (let tab = 0; tab < MAX_TABS; tab++) {
      await page.keyboard.press('Tab');
      if (
        await focusTarget.evaluate(
          (element) => element === document.activeElement,
        )
      ) {
        break;
      }
    }
    await expect(focusTarget).toBeFocused();
    expect(
      await focusTarget.evaluate(
        (element) => getComputedStyle(element).outlineStyle,
      ),
      'focus outline',
    ).not.toBe('none');

    for (const key of ['Space', 'Enter']) {
      const before = await isDark(page);
      await page.keyboard.press(key);
      await expect.poll(() => isDark(page), `${key} switches`).toBe(!before);
    }

    for (const width of Object.values(WIDTHS)) {
      await page.setViewportSize({ width, height: VIEWPORT_HEIGHT });
      await expect(toggle, `toggle at ${width}px`).toBeInViewport();
    }
  });

  test('5. no console error, hydration included, in either mode', async ({
    browser,
  }) => {
    for (const colorScheme of MODES) {
      const context = await browser.newContext({ colorScheme });
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

  test('6. leaving /design leaves nothing dark (D8)', async ({ page }) => {
    await openDesign(page);
    await chooseMode(page, 'dark');
    await page.locator('a[href="/"]').first().click();
    await page.waitForURL('/');
    expect(await page.locator('.dark').count(), '.dark after leaving').toBe(0);
  });
});

test.describe.fixme('index (D6), waiting on PBI-5015-07', () => {
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

  test('7. every section and group has one index link, and every link a target', async ({
    page,
  }) => {
    await openDesign(page);
    const result = await page.evaluate((label) => {
      const index = document.querySelector(`nav[aria-label="${label}"]`);
      const hrefs = Array.from(
        index?.querySelectorAll('a[href^="#"]') ?? [],
      ).map((link) => link.getAttribute('href')?.slice(1) ?? '');
      const targets = Array.from(
        document.querySelectorAll(
          'main section[id], main section[id] > div[id]',
        ),
      ).map((element) => element.id);
      return {
        unlinked: targets.filter(
          (id) => hrefs.filter((href) => href === id).length !== 1,
        ),
        dangling: hrefs.filter((href) => !document.getElementById(href)),
      };
    }, INDEX_LABEL);
    expect(result.unlinked, 'targets without exactly one link').toEqual([]);
    expect(result.dangling, 'links without a target').toEqual([]);
  });

  test('8. scrolling marks one section current, opens its groups and folds the rest', async ({
    page,
  }) => {
    await openDesign(page);
    const index = indexLocator(page);
    const ids = await sectionIds(page);
    for (const id of ids) {
      await page.locator(`section#${id}`).scrollIntoViewIfNeeded();
      await expect(index.locator(`a[href="#${id}"]`)).toHaveAttribute(
        'aria-current',
        'location',
      );
      const groupIds = await page
        .locator(`section#${id} > div[id]`)
        .evaluateAll((groups) => groups.map((group) => group.id));
      for (const groupId of groupIds) {
        await expect(index.locator(`a[href="#${groupId}"]`)).toBeVisible();
      }
      for (const otherId of ids.filter((other) => other !== id)) {
        const otherGroups = index
          .locator(`a[href="#${otherId}"]`)
          .locator('xpath=ancestor::li[1]')
          .locator('ul');
        await expect(otherGroups).toHaveAttribute('hidden', '');
      }
    }

    const group = page.locator('main section[id] > div[id]').last();
    const groupId = await group.getAttribute('id');
    await group.scrollIntoViewIfNeeded();
    await expect(index.locator(`a[href="#${groupId}"]`)).toHaveAttribute(
      'aria-current',
      'location',
    );
    await expect(
      index.locator(':scope > ul > li > a[aria-current="location"]'),
      'one current section',
    ).toHaveCount(1);
  });

  test('9. a deep link marks its section and group current', async ({
    page,
  }) => {
    await page.goto(`${ROUTE}#tabs`, { timeout: NAVIGATION_TIMEOUT_MS });
    await expect(currentLinks(page)).toHaveText([
      'Links and navigation',
      'Tabs',
    ]);
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

  test('11. at phone width the index is an "On this page" dropdown', async ({
    page,
  }) => {
    await page.setViewportSize({
      width: WIDTHS.phone,
      height: VIEWPORT_HEIGHT,
    });
    await openDesign(page);
    await expect(
      page.locator('header').getByRole('link'),
      'no row of section links',
    ).toHaveCount(0);

    const button = page.getByRole('button', { name: PHONE_INDEX_BUTTON });
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(button).toBeFocused();

    await button.click();
    const [firstId] = await sectionIds(page);
    await indexLocator(page).locator(`a[href="#${firstId}"]`).click();
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator(`section#${firstId}`)).toBeInViewport();
  });
});
