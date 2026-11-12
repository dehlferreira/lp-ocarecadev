import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const pagePath = 'src/pages/criacao-de-sites-sao-bernardo-do-campo.astro';

test('São Bernardo page has its own title, h1 and WhatsApp message (SPEC-021)', () => {
  const page = read(pagePath);
  assert.match(page, /title="Criação de Sites em São Bernardo do Campo \| Landing Pages que Vendem \| OCARECADEV"/);
  assert.doesNotMatch(page, /<h1[\s>]/);
  assert.match(page, /<Fragment slot="title">[\s\S]*São Bernardo do Campo[\s\S]*<\/Fragment>/);
  assert.match(page, /Olá! Vi a página de São Bernardo do Campo e quero um orçamento\./);
  assert.match(page, /<FAQ items=\{faqItems\}/);
  assert.match(page, /local_sao_bernardo_final_cta/);
});

test('São Bernardo page never promises in-person service nor a local office (SPEC-021)', () => {
  const page = read(pagePath);
  assert.equal((page.match(/presencia\w*/gi) || []).length, 1);
  assert.match(page, /O atendimento é presencial\?',\s*\n\s*a: 'Não\./);
  assert.doesNotMatch(page, /aqui de São Bernardo/);
});

test('footer, sitemap, llms.txt and index.md list the São Bernardo page (SPEC-021)', () => {
  const url = 'criacao-de-sites-sao-bernardo-do-campo/';
  assert.match(read('src/components/sections/Footer.astro'), new RegExp(`href="/${url}"`));
  assert.match(read('src/pages/sitemap.xml.ts'), new RegExp(`\\$\\{siteUrl\\}/${url}</loc>`));
  assert.match(read('public/llms.txt'), new RegExp(url));
  assert.match(read('public/index.md'), new RegExp(url));
});
