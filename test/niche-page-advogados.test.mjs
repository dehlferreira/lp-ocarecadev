import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const pagePath = 'src/pages/landing-page-para-advogados.astro';

test('advogados page has its own title, h1 and WhatsApp message (SPEC-022)', () => {
  const page = read(pagePath);
  assert.match(page, /title="Landing Page para Advogados \| Site para Escritório de Advocacia \| OCARECADEV"/);
  assert.doesNotMatch(page, /<h1[\s>]/);
  assert.match(page, /<Fragment slot="title">[\s\S]*advogados[\s\S]*<\/Fragment>/);
  assert.match(page, /Olá! Vi a página de landing page para advogados e quero um orçamento\./);
  assert.match(page, /<FAQ items=\{faqItems\}/);
  assert.match(page, /lp_advogados_final_cta/);
});

test('advogados page covers OAB rules without claiming OAB approval (SPEC-022)', () => {
  const page = read(pagePath);
  assert.match(page, /Provimento 205\/2021 da OAB\?'/);
  assert.match(page, /responsabilidade ética pelo conteúdo é do advogado/);
  assert.doesNotMatch(page, /aprovad[ao] pela OAB/i);
  assert.doesNotMatch(page, /presencial/i);
  assert.match(page, /Modelo de demonstração/);
});

test('footer, sitemap, llms.txt and index.md list the advogados page (SPEC-022)', () => {
  const url = 'landing-page-para-advogados/';
  assert.match(read('src/components/sections/Footer.astro'), new RegExp(`href="/${url}"`));
  assert.match(read('src/pages/sitemap.xml.ts'), new RegExp(`\\$\\{siteUrl\\}/${url}</loc>`));
  assert.match(read('public/llms.txt'), new RegExp(url));
  assert.match(read('public/index.md'), new RegExp(url));
});
