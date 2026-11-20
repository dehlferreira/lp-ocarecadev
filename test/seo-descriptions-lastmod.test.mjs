import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');

test('meta descriptions das páginas cabem no snippet do Google (SPEC-023)', () => {
  const pages = readdirSync('src/pages').filter((f) => f.endsWith('.astro'));
  for (const file of pages) {
    const match = read(`src/pages/${file}`).match(/\n\s*description="([^"]*)"/);
    if (!match) continue;
    assert.ok(match[1].length <= 160, `${file}: description com ${match[1].length} caracteres (máx. 160)`);
  }
});

test('toda URL do sitemap tem lastmod em data ISO (SPEC-023)', () => {
  const sitemap = read('src/pages/sitemap.xml.ts');
  const urls = sitemap.match(/<url>[\s\S]*?<\/url>/g) ?? [];
  assert.ok(urls.length >= 6);
  for (const url of urls) {
    assert.match(url, /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/, url);
  }
});
