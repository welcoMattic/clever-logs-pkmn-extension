'use strict';

// web-ext lints the whole source dir: keep it to what build.sh actually
// packages (manifest, scripts, sprites, icons), otherwise addons-linter
// reports on the test suite, the Python tooling and the built zip.
module.exports = {
  ignoreFiles: [
    '.github',
    '.idea',
    'dist',
    'node_modules',
    'scripts',
    'store',
    'test',
    'test-results',
    'playwright-report',
    'playwright.config.js',
    'web-ext-config.cjs',
    'package.json',
    'package-lock.json',
    'README.md',
    'LICENSE',
    'icons/icon.svg',
  ],
};
