'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const { PKMN_NAMES } = require('../pkmn-names.js');

test('pkmn-names.js contains the full Clever Cloud list', () => {
  assert.equal(PKMN_NAMES.size, 811);
  for (const known of ['pikachu', 'nidoran-f', 'rotom-heat', 'beedrill-mega', 'zygarde']) {
    assert.ok(PKMN_NAMES.has(known), `missing slug: ${known}`);
  }
});

test('every slug has a non-empty bundled sprite', () => {
  for (const slug of PKMN_NAMES) {
    const file = path.join(ROOT, 'sprites', `${slug}.png`);
    const stat = fs.statSync(file);
    assert.ok(stat.size > 0, `empty sprite: ${slug}.png`);
  }
});

test('no orphan sprite files', () => {
  const files = fs.readdirSync(path.join(ROOT, 'sprites')).filter((f) => f.endsWith('.png'));
  assert.equal(files.length, PKMN_NAMES.size);
});

test('manifest is valid and references existing files', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest.json'), 'utf8'));
  assert.equal(manifest.manifest_version, 3);

  for (const script of manifest.content_scripts) {
    assert.deepEqual(script.matches, ['https://console.clever-cloud.com/*']);
    for (const file of script.js) {
      assert.ok(fs.existsSync(path.join(ROOT, file)), `missing content script: ${file}`);
    }
  }
  for (const icon of Object.values(manifest.icons)) {
    assert.ok(fs.existsSync(path.join(ROOT, icon)), `missing icon: ${icon}`);
  }
  assert.deepEqual(manifest.web_accessible_resources[0].resources, ['sprites/*.png']);
  assert.ok(!manifest.permissions, 'extension must not require permissions');
  assert.ok(!manifest.background, 'extension must not have a background script');
});

test('manifest declares no data collection (required by AMO)', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest.json'), 'utf8'));
  assert.deepEqual(
    manifest.browser_specific_settings.gecko.data_collection_permissions,
    { required: ['none'] },
  );
});

test('manifest version matches package.json', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest.json'), 'utf8'));
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  assert.equal(manifest.version, pkg.version);
});

test('pkmn-names.js and content.js are loaded in the right order', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest.json'), 'utf8'));
  const js = manifest.content_scripts[0].js;
  assert.ok(
    js.indexOf('pkmn-names.js') < js.indexOf('content.js'),
    'pkmn-names.js must load before content.js',
  );
});
