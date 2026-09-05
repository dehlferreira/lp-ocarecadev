import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const zIndexValue = (source) => {
  const match = source.match(/z-index:\s*(\d+)/);
  assert.ok(match, 'expected a numeric z-index');
  return Number(match[1]);
};

test('index places models after SocialProof and before About and Pricing', () => {
  const index = read('src/pages/index.astro');
  const social = index.indexOf('SocialProof');
  const models = index.indexOf('ModelsShowcase');
  const about = index.indexOf('<About');
  const pricing = index.indexOf('<Pricing');

  assert.ok(social >= 0 && models >= 0 && about >= 0 && pricing >= 0);
  assert.ok(social < models, 'SocialProof must appear before ModelsShowcase');
  assert.ok(models < about, 'ModelsShowcase must appear before About');
  assert.ok(models < pricing, 'ModelsShowcase must appear before Pricing');
});

test('models section uses the canonical landmark, headings and seven cards', () => {
  const section = read('src/components/sections/ModelsShowcase.astro');

  assert.match(section, /id="modelos"/);
  assert.match(section, /<p class="models-eyebrow">Modelos por nicho<\/p>/);
  assert.match(section, /<h2[^>]*>Veja uma página feita para o seu tipo de negócio<\/h2>/);
  assert.doesNotMatch(section, /<h1[\s>]/);

  const names = [
    'Modelo Oficina',
    'Modelo Clínica estética',
    'Modelo Pet',
    'Modelo Salão',
    'Modelo Tatuagem',
    'Modelo Advocacia',
    'Modelo Odonto',
  ];
  const focuses = [
    'Luxo e performance automotiva',
    'Harmonização facial e corporal',
    'Cuidado para o melhor amigo',
    'Visagismo e estética minimalista',
    'Estilo e marcas permanentes',
    'Proteção patrimonial e estratégia',
    'Sorriso e lentes de contato',
  ];

  for (const name of names) assert.match(section, new RegExp(name));
  for (const focus of focuses) assert.match(section, new RegExp(focus));

  assert.equal((section.match(/placeholderName:/g) ?? []).length, 7);
  assert.match(section, /models\.map\(\(model\)/);
  assert.doesNotMatch(section, /\[\s*\.\.\.models/);
  assert.doesNotMatch(section, /models\.concat/);
  assert.match(section, /class="model-card /);
  assert.match(section, /<h3 class="model-name">\{model\.name\}<\/h3>/);
  assert.match(section, />Em breve</);

  const clinicaBlock = section.match(
    /niche: 'Clínica estética'[\s\S]*?placeholderName: 'Clínica estética'/,
  );
  const odontoBlock = section.match(
    /niche: 'Odontologia e lentes'[\s\S]*?placeholderName: 'Odonto'/,
  );
  assert.ok(clinicaBlock, 'expected the clínica estética card data');
  assert.ok(odontoBlock, 'expected the odonto card data');
  assert.doesNotMatch(clinicaBlock[0], /lentes/i);
  assert.match(odontoBlock[0], /lentes/i);
  assert.doesNotMatch(odontoBlock[0], /estética corporal|estetica corporal/i);
});

test('models section has no BrainArt destinations, clones or vacancy RNG, and configures external links safely', () => {
  const section = read('src/components/sections/ModelsShowcase.astro');

  assert.doesNotMatch(section, /brainartsolucoes/i);
  assert.doesNotMatch(section, /\/portfolio\//);
  assert.doesNotMatch(section, /Math\.random/);
  assert.doesNotMatch(section, /brainart_urgency/);
  assert.doesNotMatch(section, /localStorage/);
  assert.doesNotMatch(section, /Restam/);

  // Exactly 4 models have live external URLs on Vercel
  assert.equal((section.match(/url:\s*'https:\/\/lp-modelo-/g) ?? []).length, 4);
  assert.match(section, /https:\/\/lp-modelo-oficina-motorgarage\.vercel\.app\//);
  assert.match(section, /https:\/\/lp-modelo-clinica-estetica\.vercel\.app\//);
  assert.match(section, /https:\/\/lp-modelo-petshop\.vercel\.app\//);
  assert.match(section, /https:\/\/lp-modelo-salao-studio\.vercel\.app\//);

  // External links require security and accessibility attributes
  assert.match(section, /target="_blank"/);
  assert.match(section, /rel="noopener noreferrer"/);
  assert.match(section, /aria-label=\{`Ver demonstração do \$\{model\.name\} \(abre em nova aba\)`\}/);

  // Fallback remains for models in progress
  assert.match(section, /<p class="model-status">Em breve<\/p>/);
});

test('header adds Modelos between Resultados and Planos on desktop and mobile', () => {
  const header = read('src/components/sections/Header.astro');

  assert.equal((header.match(/href="#modelos"/g) ?? []).length, 2);
  assert.match(
    header,
    /<nav class="nav">[\s\S]*href="#social-proof">Resultados<\/a>[\s\S]*href="#modelos">Modelos<\/a>[\s\S]*href="#pricing">Planos<\/a>/,
  );
  assert.match(
    header,
    /<nav class="mobile-nav">[\s\S]*href="#social-proof" class="mobile-nav-link">Resultados<\/a>[\s\S]*href="#modelos" class="mobile-nav-link">Modelos<\/a>[\s\S]*href="#pricing" class="mobile-nav-link">Planos<\/a>/,
  );
});

test('WhatsApp FAB uses Header env fallbacks, lead tracking and a safe rel', () => {
  const fab = read('src/components/ui/WhatsAppFab.astro');
  const icon = read('src/components/ui/Icon.astro');

  assert.match(fab, /WHATSAPP_NUMBER/);
  assert.match(fab, /WHATSAPP_MESSAGE_DEFAULT/);
  assert.match(fab, /5511999999999/);
  assert.match(fab, /Olá, tenho interesse\./);
  assert.match(fab, /data-track-event="lead"/);
  assert.match(fab, /data-track-location="fab"/);
  assert.match(fab, /aria-label="Fale conosco pelo WhatsApp"/);
  assert.match(fab, /rel="noopener noreferrer"/);
  assert.doesNotMatch(fab, /target="_blank"/);
  assert.doesNotMatch(fab, /5564981040722/);
  assert.doesNotMatch(fab, /data-track-plan/);
  assert.match(icon, /whatsapp:/);
  assert.match(fab, /name="whatsapp"/);
});

test('scarcity toast uses literal Express copy, pricing CTA and dismiss label', () => {
  const toast = read('src/components/ui/ScarcityToast.astro');

  assert.match(toast, /Express em até 48h/);
  assert.match(
    toast,
    /O plano Express entrega em até 48h, com capacidade limitada\. Confirme a próxima janela pelo WhatsApp ou veja os planos\./,
  );
  assert.match(toast, /Ver o plano Express/);
  assert.match(toast, /href="#pricing"/);
  assert.match(toast, /data-track-event="select_content"/);
  assert.match(toast, /data-track-location="scarcity_toast"/);
  assert.match(toast, /aria-label="Fechar alerta"/);
  assert.doesNotMatch(toast, /Restam/);
  assert.doesNotMatch(toast, /Math\.random/);
  assert.doesNotMatch(toast, /brainart_urgency/);
  assert.doesNotMatch(toast, /localStorage/);
});

test('FAB and toast stay below the cookie and hide while it is not hidden', () => {
  const fab = read('src/components/ui/WhatsAppFab.astro');
  const toast = read('src/components/ui/ScarcityToast.astro');
  const consent = read('src/components/ui/CookieConsent.astro');

  const fabZ = zIndexValue(fab);
  const toastZ = zIndexValue(toast);
  const cookieZ = zIndexValue(consent);

  assert.equal(cookieZ, 100);
  assert.ok(fabZ < 100, `FAB z-index ${fabZ} must be below 100`);
  assert.ok(toastZ < 100, `toast z-index ${toastZ} must be below 100`);
  assert.match(fab, /body:has\(#cookie-consent:not\(\[hidden\]\)\)/);
  assert.match(toast, /body:has\(#cookie-consent:not\(\[hidden\]\)\)/);
  assert.match(fab, /visibility:\s*hidden/);
  assert.match(toast, /visibility:\s*hidden/);
  assert.match(fab, /pointer-events:\s*none/);
  assert.match(toast, /pointer-events:\s*none/);
});

test('layout mounts FAB and toast before the cookie banner', () => {
  const layout = read('src/layouts/Layout.astro');
  const fabImport = layout.indexOf('WhatsAppFab');
  const toastImport = layout.indexOf('ScarcityToast');
  const fabMount = layout.indexOf('<WhatsAppFab');
  const toastMount = layout.indexOf('<ScarcityToast');
  const cookieMount = layout.indexOf('<CookieConsent />');

  assert.ok(fabImport >= 0 && toastImport >= 0);
  assert.ok(fabMount >= 0 && toastMount >= 0 && cookieMount >= 0);
  assert.ok(fabMount < cookieMount);
  assert.ok(toastMount < cookieMount);
});
