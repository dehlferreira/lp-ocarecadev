import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('Santo André page has its own title, h1 and WhatsApp message (SPEC-017)', () => {
  const page = read('src/pages/criacao-de-sites-santo-andre.astro');

  assert.match(page, /title="Criação de Sites em Santo André \| Landing Pages que Vendem \| OCARECADEV"/);
  // O h1 vem do Hero compartilhado; a página só fornece o texto do slot.
  assert.doesNotMatch(page, /<h1[\s>]/);
  assert.match(page, /<Fragment slot="title">[\s\S]*Santo André[\s\S]*<\/Fragment>/);
  assert.match(page, /Olá! Vi a página de Santo André e quero um orçamento\./);
  assert.match(page, /faqItems=\{faqItems\}/);
  assert.match(page, /<FAQ items=\{faqItems\}/);
});

test('Santo André page never promises in-person service (SPEC-017)', () => {
  const page = read('src/pages/criacao-de-sites-santo-andre.astro');
  const mentions = page.match(/presencia\w*/gi) || [];
  // Única ocorrência permitida: a pergunta do FAQ respondida com "Não".
  assert.equal(mentions.length, 1);
  assert.match(page, /O atendimento é presencial\?',\s*\n\s*a: 'Não\./);
});

test('home links to the local page and sitemap lists it (SPEC-017)', () => {
  const footer = read('src/components/sections/Footer.astro');
  const sitemap = read('src/pages/sitemap.xml.ts');

  assert.match(footer, /href="\/criacao-de-sites-santo-andre\/"/);
  assert.match(sitemap, /\$\{siteUrl\}\/criacao-de-sites-santo-andre\/<\/loc>/);
});

test('shared components stay backwards compatible (SPEC-017)', () => {
  const faq = read('src/components/sections/FAQ.astro');
  const layout = read('src/layouts/Layout.astro');
  const header = read('src/components/sections/Header.astro');

  assert.match(faq, /items = defaultFaqs/);
  assert.match(layout, /faqItems\s*\n?\s*\?/);
  assert.match(header, /anchorBase = Astro\.url\.pathname === '\/' \? '' : '\/'/);
  assert.doesNotMatch(header, /href="#(hero|modelos|social-proof|pricing)"/);
});

test('Hero keeps the official home copy when used without props (SPEC-017)', () => {
  const hero = read('src/components/sections/Hero.astro');

  assert.match(hero, /<slot name="title">[\s\S]*Precisa fazer o visitante <span class="text-neon">agir<\/span>[\s\S]*<\/slot>/);
  assert.match(hero, /text: "Quero uma landing page para meu negócio"/);
  assert.match(hero, /trackLocation: "hero_primary"/);
  assert.equal((hero.match(/<h1[\s>]/g) || []).length, 1);
});
