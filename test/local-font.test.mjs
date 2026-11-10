import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('Outfit is served locally, without Google Fonts (SPEC-019)', () => {
  const layout = read('src/layouts/Layout.astro');
  const css = read('src/styles/global.css');

  assert.doesNotMatch(layout, /fonts\.googleapis\.com|fonts\.gstatic\.com/);
  for (const weight of [400, 600, 700]) {
    assert.ok(existsSync(new URL(`../public/fonts/outfit-${weight}.woff2`, import.meta.url)));
    assert.match(css, new RegExp(`font-weight: ${weight};[\\s\\S]*?url\\("/fonts/outfit-${weight}\\.woff2"\\)`));
  }
  assert.match(layout, /rel="preload" href="\/fonts\/outfit-700\.woff2" as="font"/);
});

test('Footer links to the canonical privacy URL with trailing slash (SPEC-019)', () => {
  const footer = read('src/components/sections/Footer.astro');
  assert.match(footer, /href="\/politica-de-privacidade\/"/);
});
