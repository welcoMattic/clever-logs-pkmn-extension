'use strict';

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: 'test/functional',
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] }, testMatch: /page\.spec\.js/ },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] }, testMatch: /page\.spec\.js/ },
    { name: 'webkit', use: { ...devices['Desktop Safari'] }, testMatch: /page\.spec\.js/ },
    // Real unpacked extension: only Chromium can side-load MV3 extensions.
    { name: 'chromium-extension', testMatch: /extension\.spec\.js/ },
  ],
});
