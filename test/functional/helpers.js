'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..', '..');
const FIXTURE = fs.readFileSync(path.join(__dirname, 'fixture.html'), 'utf8');
const CONSOLE_URL = 'https://console.clever-cloud.com/organisations/orga_x/applications/app_y/logs';

// No Clever Cloud account in CI: intercept the console origin and serve the
// fixture page (and sprite files for the stubbed runtime.getURL). Content
// scripts match on the committed URL, so the real extension injects itself.
async function routeConsole(context) {
  await context.route('https://console.clever-cloud.com/**', (route) => {
    const url = new URL(route.request().url());
    if (url.pathname.startsWith('/sprites/')) {
      const file = path.join(ROOT, 'sprites', path.basename(url.pathname));
      if (fs.existsSync(file)) {
        return route.fulfill({ contentType: 'image/png', body: fs.readFileSync(file) });
      }
      return route.fulfill({ status: 404, body: 'not found' });
    }
    return route.fulfill({ contentType: 'text/html', body: FIXTURE });
  });
}

module.exports = { ROOT, CONSOLE_URL, routeConsole };
