import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('price article has its own title, OG image and WhatsApp message (SPEC-020)', () => {
  const page = read('src/pages/quanto-custa-um-site.astro');
  assert.match(page, /title="Quanto custa um site em 2026\? Preços reais e o que muda o valor \| OCARECADEV"/);
  assert.match(page, /ogImagePath="\/images\/og-quanto-custa-um-site\.jpg"/);
  assert.match(page, /Olá! Li o artigo sobre quanto custa um site e quero um orçamento\./);
  assert.match(page, /faqItems=\{faqItems\}/);
});

test('price article only uses the real plan prices shown in Pricing (SPEC-020)', () => {
  const page = read('src/pages/quanto-custa-um-site.astro');
  const pricing = read('src/components/sections/Pricing.astro');
  for (const price of ['R$ 597', 'R$ 997', 'R$ 2.497', 'R$ 113,75', 'R$ 189,96']) {
    assert.ok(pricing.includes(price), `${price} deve existir em Pricing.astro`);
    assert.ok(page.includes(price), `${price} deve aparecer no artigo`);
  }
});

test('price article is linked from footer, sitemap and llms.txt (SPEC-020)', () => {
  assert.match(read('src/components/sections/Footer.astro'), /href="\/quanto-custa-um-site\/"/);
  assert.match(read('src/pages/sitemap.xml.ts'), /\/quanto-custa-um-site\//);
  assert.match(read('public/llms.txt'), /quanto-custa-um-site\//);
});
