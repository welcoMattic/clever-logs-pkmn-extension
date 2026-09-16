'use strict';

// End-to-end test with the real unpacked extension loaded in Chromium:
// manifest matching, isolated-world content script, web_accessible_resources.

const { test: base, chromium, expect } = require('@playwright/test');
const { ROOT, CONSOLE_URL, routeConsole } = require('./helpers');

const test = base.extend({
  context: async ({}, use) => {
    const context = await chromium.launchPersistentContext('', {
      channel: 'chromium',
      args: [
        `--disable-extensions-except=${ROOT}`,
        `--load-extension=${ROOT}`,
      ],
    });
    await use(context);
    await context.close();
  },
});

test('the packed extension injects working sprites on the console URL', async ({ context }) => {
  await routeConsole(context);
  const page = await context.newPage();
  await page.goto(CONSOLE_URL);

  const img = page.locator('label.instance > img').first();
  await expect(img).toHaveAttribute('alt', 'rotom-heat');
  expect(await img.getAttribute('src')).toMatch(/^chrome-extension:\/\/.+\/sprites\/rotom-heat\.png$/);
  await expect
    .poll(() => img.evaluate((el) => el.complete && el.naturalWidth), { timeout: 5000 })
    .toBe(96);

  const styles = page.locator('style[data-pkmn-style]');
  await expect(styles).toHaveCount(1);
});
