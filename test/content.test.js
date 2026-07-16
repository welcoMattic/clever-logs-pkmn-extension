'use strict';

const { test, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');

// The content script resolves these globals at call time.
globalThis.chrome = { runtime: { getURL: (path) => `chrome-extension://fake-id/${path}` } };
globalThis.POKEMON_NAMES = require('../pokemon-names.js').POKEMON_NAMES;

const { deepQueryAll, slugFromInstanceName, ensureStyle, decorate, scan, PROCESSED } =
  require('../content.js');

beforeEach(() => {
  const dom = new JSDOM('<!doctype html><body></body>');
  globalThis.document = dom.window.document;
  globalThis.MutationObserver = dom.window.MutationObserver;
});

// Replicates the console Logs tab structure: the instance selector lives in
// nested open shadow roots (cc-logs-app-runtime-beta > cc-logs-instances-beta).
function buildConsoleDom(names) {
  const app = document.createElement('cc-logs-app-runtime-beta');
  const appRoot = app.attachShadow({ mode: 'open' });
  const instances = document.createElement('cc-logs-instances-beta');
  const instRoot = instances.attachShadow({ mode: 'open' });
  const container = document.createElement('div');
  container.className = 'instances';
  for (const name of names) container.append(makeInstanceRow(name));
  instRoot.append(container);
  appRoot.append(instances);
  document.body.append(app);
  return { instRoot, container };
}

function makeInstanceRow(name) {
  const label = document.createElement('label');
  label.className = 'instance';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  const span = document.createElement('span');
  span.className = 'instance-name';
  span.textContent = name;
  label.append(checkbox, span);
  return label;
}

test('slugFromInstanceName parses "Adjective pokemon"', () => {
  assert.equal(slugFromInstanceName('Tiny rhyhorn'), 'rhyhorn');
  assert.equal(slugFromInstanceName('Clever stantler'), 'stantler');
});

test('slugFromInstanceName handles hyphenated form slugs', () => {
  assert.equal(slugFromInstanceName('Petite rotom-heat'), 'rotom-heat');
  assert.equal(slugFromInstanceName('Loud nidoran-f'), 'nidoran-f');
  assert.equal(slugFromInstanceName('Creaky beedrill-mega'), 'beedrill-mega');
});

test('slugFromInstanceName is case-insensitive and trims', () => {
  assert.equal(slugFromInstanceName('  TINY PIKACHU  '), 'pikachu');
});

test('slugFromInstanceName falls back to the last word', () => {
  assert.equal(slugFromInstanceName('pikachu'), 'pikachu');
});

test('slugFromInstanceName returns null for unknown names', () => {
  assert.equal(slugFromInstanceName('Weird notapokemon'), null);
  assert.equal(slugFromInstanceName('Tiny'), null);
  assert.equal(slugFromInstanceName(''), null);
});

test('deepQueryAll pierces nested open shadow roots', () => {
  buildConsoleDom(['Tiny rhyhorn']);
  assert.equal(document.querySelectorAll('.instance-name').length, 0);
  assert.equal(deepQueryAll(document, '.instance-name').length, 1);
});

test('scan injects a sprite into each known instance row', () => {
  const { instRoot } = buildConsoleDom(['Petite rotom-heat', 'Clever stantler']);
  scan();
  const imgs = instRoot.querySelectorAll('label.instance > img');
  assert.equal(imgs.length, 2);
  assert.equal(imgs[0].src, 'chrome-extension://fake-id/sprites/rotom-heat.png');
  assert.equal(imgs[0].className, 'ccp-sprite');
  assert.equal(imgs[0].alt, 'rotom-heat');
  assert.equal(imgs[0].style.position, 'absolute');
  const container = imgs[0].closest('.instances');
  assert.equal(container.style.position, 'relative');
});

test('scan leaves unknown instance names untouched', () => {
  const { instRoot } = buildConsoleDom(['Weird notapokemon']);
  scan();
  assert.equal(instRoot.querySelectorAll('img').length, 0);
  assert.equal(instRoot.querySelector('.instance-name').hasAttribute(PROCESSED), false);
});

test('scan is idempotent: no duplicate sprites or styles', () => {
  const { instRoot } = buildConsoleDom(['Sleepy ponyta']);
  scan();
  scan();
  scan();
  assert.equal(instRoot.querySelectorAll('img').length, 1);
  assert.equal(instRoot.querySelectorAll('style[data-pokemon-style]').length, 1);
});

test('instances appearing later are decorated (MutationObserver)', async () => {
  const { instRoot, container } = buildConsoleDom(['Sleepy ponyta']);
  scan();
  assert.equal(instRoot.querySelectorAll('img').length, 1);
  container.append(makeInstanceRow('Icy beautifly'));
  await new Promise((resolve) => setTimeout(resolve, 0));
  const imgs = instRoot.querySelectorAll('img');
  assert.equal(imgs.length, 2);
  assert.equal(imgs[1].alt, 'beautifly');
});

test('ensureStyle injects the hover-zoom stylesheet once', () => {
  const { instRoot } = buildConsoleDom([]);
  ensureStyle(instRoot);
  ensureStyle(instRoot);
  const styles = instRoot.querySelectorAll('style[data-pokemon-style]');
  assert.equal(styles.length, 1);
  assert.match(styles[0].textContent, /\.ccp-sprite:hover/);
  assert.match(styles[0].textContent, /scale\(3\)/);
});

test('decorate falls back to an inline sprite when there is no label', () => {
  const { instRoot } = buildConsoleDom([]);
  const span = document.createElement('span');
  span.className = 'instance-name';
  span.textContent = 'Tiny pikachu';
  instRoot.append(span);
  decorate(span);
  const img = span.querySelector('img');
  assert.ok(img);
  assert.equal(img.className, 'ccp-sprite-inline');
  assert.equal(img.src, 'chrome-extension://fake-id/sprites/pikachu.png');
});
