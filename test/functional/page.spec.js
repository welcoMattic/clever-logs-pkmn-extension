'use strict';

// Functional tests running the content script in the page context, on all
// three engines (Chromium, Firefox, WebKit). The real-extension path is
// covered by extension.spec.js (Chromium only: the other engines cannot
// side-load MV3 extensions under Playwright).

const path = require('node:path');
const { test, expect } = require('@playwright/test');
const { ROOT, CONSOLE_URL, routeConsole } = require('./helpers');

test.beforeEach(async ({ context, page }) => {
  await routeConsole(context);
  await page.goto(CONSOLE_URL);
  await page.addScriptTag({ content: 'window.chrome = { runtime: { getURL: (p) => "/" + p } };' });
  await page.addScriptTag({ path: path.join(ROOT, 'pkmn-names.js') });
  await page.addScriptTag({ path: path.join(ROOT, 'content.js') });
});

test('injects a sprite for each known instance name, none for unknown', async ({ page }) => {
  const imgs = page.locator('label.instance > img');
  await expect(imgs).toHaveCount(2);
  await expect(imgs.nth(0)).toHaveAttribute('alt', 'rotom-heat');
  await expect(imgs.nth(1)).toHaveAttribute('alt', 'stantler');

  const loaded = await imgs.nth(0).evaluate((img) => img.complete && img.naturalWidth === 96);
  expect(loaded).toBe(true);

  const rows = page.locator('label.instance');
  await expect(rows.nth(2).locator('img')).toHaveCount(0);
});

test('sprite sits at the right edge of the panel, 32px, row-centered', async ({ page }) => {
  const img = page.locator('label.instance > img').first();
  const [imgBox, containerBox, labelBox] = await Promise.all([
    img.boundingBox(),
    page.locator('div.instances').boundingBox(),
    page.locator('label.instance').first().boundingBox(),
  ]);
  expect(Math.round(imgBox.width)).toBe(32);
  expect(Math.round(imgBox.height)).toBe(32);
  expect(Math.round(imgBox.x + imgBox.width)).toBe(Math.round(containerBox.x + containerBox.width));
  const imgCenter = imgBox.y + imgBox.height / 2;
  const rowCenter = labelBox.y + labelBox.height / 2;
  expect(Math.abs(imgCenter - rowCenter)).toBeLessThanOrEqual(1);
});

test('sprite zooms to x3 on hover and shrinks back on mouse out', async ({ page }) => {
  const img = page.locator('label.instance > img').first();
  await img.hover();
  await expect.poll(async () => (await img.boundingBox()).width, { timeout: 3000 }).toBeGreaterThan(90);
  await page.mouse.move(5, 5);
  await expect.poll(async () => (await img.boundingBox()).width, { timeout: 3000 }).toBeLessThan(40);
});

test('instances appearing after a deployment get their sprite', async ({ page }) => {
  await page.evaluate(() => window.addInstance('Icy beautifly'));
  const img = page.locator('label.instance > img[alt="beautifly"]');
  await expect(img).toHaveCount(1);
});
