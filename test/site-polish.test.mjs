import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('technical SEO exposes crawl directives and an indexable canonical sitemap', () => {
  const robots = read('src/pages/robots.txt.ts');
  const sitemap = read('src/pages/sitemap.xml.ts');

  assert.match(robots, /User-agent:\s*\*/);
  assert.match(robots, /Allow:\s*\//);
  assert.match(robots, /const siteUrl = 'https:\/\/www\.ocarecadev\.com\.br'/);
  assert.match(robots, /Sitemap: \$\{siteUrl\}\/sitemap\.xml/);
  assert.match(sitemap, /const siteUrl = 'https:\/\/www\.ocarecadev\.com\.br'/);
  assert.match(sitemap, /<loc>\$\{siteUrl\}<\/loc>|<loc>\$\{siteUrl\}\/<\/loc>/);
  assert.match(sitemap, /application\/xml/);
});

test('layout provides canonical social metadata and structured business data', () => {
  const layout = read('src/layouts/Layout.astro');

  assert.match(layout, /rel="canonical"/);
  assert.match(layout, /name="robots" content="index, follow"/);
  assert.match(layout, /application\/ld\+json/);
  assert.match(layout, /ProfessionalService/);
  assert.match(layout, /FAQPage/);
  assert.match(layout, /sameAs/);
});

test('AI discovery document identifies the site and its primary service', () => {
  const llms = read('public/llms.txt');
  const indexMd = read('public/index.md');
  const layout = read('src/layouts/Layout.astro');

  assert.match(llms, /# OCARECADEV/);
  assert.match(llms, /https:\/\/www\.ocarecadev\.com\.br\//);
  assert.match(llms, /landing pages/i);
  // llmstxt.org specification compliance: structured with Markdown hyperlinks
  assert.match(llms, /\[.+?\]\(https?:\/\/.+?\)/);
  assert.match(llms, /## Páginas/);

  // Markdown alternate version
  assert.match(indexMd, /# OCARECADEV/);
  assert.match(indexMd, /landing pages/i);

  // Layout discovery tags
  assert.match(layout, /<link rel="describedby" href="\/llms\.txt"/);
  assert.match(layout, /<link rel="alternate" type="text\/markdown" href="\/index\.md"/);
});

test('FAQ defines a native collapsed disclosure for each answer', () => {
  const faq = read('src/components/sections/FAQ.astro');

  assert.match(faq, /<GlassCard as="details" class=/);
  assert.match(faq, /<summary(?: class="faq-summary")?>/);
  assert.equal((faq.match(/q:\s*'/g) ?? []).length, 9, 'FAQ deve conter exatamente 9 perguntas obrigatórias');
  assert.doesNotMatch(faq, /<GlassCard as="details"[^>]*\sopen(?:\s|>)/);
});

test('FAQ replaces the browser disclosure marker with an aligned custom control', () => {
  const faq = read('src/components/sections/FAQ.astro');

  assert.match(faq, /<summary class="faq-summary">/);
  assert.match(faq, /class="faq-chevron"/);
  assert.match(faq, /:global\(\.faq-summary::marker\)/);
  assert.match(faq, /:global\(\.faq-summary::-webkit-details-marker\)/);
  assert.match(faq, /:global\(\.faq-item\.is-open \.faq-chevron\)[\s\S]*rotate\(180deg\)/);
});

test('FAQ answers animate smoothly when their disclosure state changes', () => {
  const faq = read('src/components/sections/FAQ.astro');

  assert.match(faq, /class="faq-answer"/);
  assert.match(faq, /grid-template-rows:\s*minmax\(0, 0fr\)/);
  assert.match(faq, /:global\(\.faq-item\.is-open \.faq-answer\)[\s\S]*grid-template-rows:\s*minmax\(0, 1fr\)/);
  assert.match(faq, /classList\.remove\('is-open'\)/);
  assert.match(faq, /item\.open = false/);
});

test('pricing cards present the approved payment options', () => {
  const pricing = read('src/components/sections/Pricing.astro');

  assert.match(pricing, /OCARECADEV EXPRESS[\s\S]*R\$ 597[\s\S]*6x de R\$ 113,75/);
  assert.match(pricing, /LANDING QUE VENDE[\s\S]*R\$ 997[\s\S]*6x de R\$ 189,96/);
  assert.match(pricing, /SITE PROFISSIONAL[\s\S]*<span class="price-prefix">A partir de<\/span> R\$ 2\.497[\s\S]*proposta personalizada/);
});

test('side pricing cards share a fixed desktop height', () => {
  const pricing = read('src/components/sections/Pricing.astro');

  assert.match(pricing, /@media\s*\(min-width:\s*768px\)[\s\S]*:global\(\.pricing-card:not\(\.highlight-card\)\)\s*\{\s*height:\s*39rem/);
});

test('mobile reveal animations do not move content outside the viewport', () => {
  const css = read('src/styles/global.css');

  assert.match(css, /@media\s*\(max-width:\s*767px\)[\s\S]*\.scroll-animate\.anim-left[\s\S]*translateY\(24px\)/);
  assert.match(css, /@media\s*\(max-width:\s*767px\)[\s\S]*\.scroll-animate\.anim-right[\s\S]*translateY\(24px\)/);
  assert.match(css, /@media\s*\(max-width:\s*767px\)[\s\S]*\.scrolly-step\.from-left[\s\S]*animation-name:\s*scrolly-rise/);
  assert.match(css, /@media\s*\(max-width:\s*767px\)[\s\S]*\.scrolly-step\.from-right[\s\S]*animation-name:\s*scrolly-rise/);
});

test('mobile scrollytelling tracks are shorter to reduce empty scroll space', () => {
  const problem = read('src/components/sections/Problem.astro');
  const agitation = read('src/components/sections/Agitation.astro');
  const solution = read('src/components/sections/Solution.astro');
  const how = read('src/components/sections/HowItWorks.astro');
  const about = read('src/components/sections/About.astro');

  assert.match(problem, /--scrolly-track-mobile:\s*180vh/);
  assert.match(agitation, /--scrolly-track-mobile:\s*180vh/);
  assert.match(solution, /--scrolly-track-mobile:\s*190vh/);
  assert.match(how, /--scrolly-track-mobile:\s*210vh/);
  assert.match(about, /--scrolly-track-mobile:\s*260vh/);
  assert.match(solution, /@media\s*\(max-width:\s*767px\)[\s\S]*\.solution-mockup-col\s*\{\s*max-width:\s*none/);
  assert.match(solution, /@media\s*\(min-width:\s*768px\)[\s\S]*\.solution-mockup-col\s*\{[\s\S]*align-self:\s*stretch/);
  assert.match(read('src\/components\/ui\/HeroMockup.astro'), /\.conversion-mockup--compact\s*\{[\s\S]*height:\s*100%/);
});

test('specialist stat cards are not clipped after their reveal animation', () => {
  const about = read('src/components/sections/About.astro');

  assert.match(
    about,
    /\.section-about \.scrolly__stage\s*\{[^}]*overflow:\s*visible/,
  );
  assert.match(
    about,
    /@keyframes about-reveal\s*\{\s*from\s*\{[^}]*\}\s*to\s*\{[^}]*overflow:\s*visible/,
  );
  assert.match(
    about,
    /@keyframes about-reveal-scale\s*\{\s*from\s*\{[^}]*\}\s*to\s*\{[^}]*overflow:\s*visible/,
  );
});

test('specialist social links have their own mobile reveal state', () => {
  const about = read('src/components/sections/About.astro');

  assert.equal(
    (about.match(/class="about-social scrolly-step about-reveal s-5"/g) ?? []).length,
    2,
  );
  assert.match(
    about,
    /\.about-social\s*\{[^}]*position:\s*relative;[^}]*z-index:\s*11/,
  );
  assert.match(
    about,
    /\.about-mobile-stack \.social-link\s*\{[^}]*background:\s*rgba\(255, 255, 255, 0\.1\)/,
  );
});

test('proof section keeps testimonials in a normal responsive flow without artificial mockups', () => {
  const socialProof = read('src/components/sections/SocialProof.astro');

  assert.match(socialProof, /class="proof-grid"/);
  assert.match(socialProof, /Vinicius Oliveira/);
  assert.match(socialProof, /Grupo Carrera Consórcio/);
  assert.doesNotMatch(socialProof, /Roberto Almeida/);
  assert.doesNotMatch(socialProof, /Mariana Costa/);
  assert.match(socialProof, /class="stars" role="img" aria-label="Avaliação: 5 de 5 estrelas"/);
  assert.doesNotMatch(socialProof, /BeforeAfterMockup/);
  assert.doesNotMatch(socialProof, /scrolly-step/);
  assert.doesNotMatch(socialProof, /proof-mobile/);
});

test('mockups use concrete conversion UI instead of skeleton-only blocks', () => {
  const beforeAfter = read('src/components/ui/BeforeAfterMockup.astro');
  const heroMockup = read('src/components/ui/HeroMockup.astro');

  assert.match(beforeAfter, /Hero sem oferta clara/);
  assert.match(beforeAfter, /Oferta clara/);
  assert.match(heroMockup, /Visita na pagina/);
  assert.match(heroMockup, /Clique no WhatsApp/);
  assert.match(heroMockup, /Lead qualificado/);
  assert.doesNotMatch(heroMockup, /Tratamento odontologico/);
});

test('agitation mockup makes the cost of traffic without leads tangible', () => {
  const frustration = read('src/components/ui/FrustrationChart.astro');

  assert.match(frustration, /Visitas sem conversao/);
  assert.match(frustration, /0 contatos/);
  assert.match(frustration, /Nenhum lead nesta semana/);
  assert.match(frustration, /CTA pouco visivel/);
  assert.doesNotMatch(frustration, /class="bar w-28"/);
});

test('problem section closes with a concrete page audit mockup', () => {
  const problem = read('src/components/sections/Problem.astro');
  const problemMockup = read('src/components/ui/ProblemMockup.astro');

  assert.match(problem, /import ProblemMockup/);
  assert.match(problem, /<ProblemMockup compact \/>/);
  assert.match(problem, /class="problem-mockup-col(?:\s|\")/);
  assert.match(problem, /class="problem-mockup-col scrolly-step from-right s-7"/);
  assert.match(problemMockup, /problem-website-mockup\.webp/);
  assert.match(problemMockup, /<Image/);
  assert.match(problemMockup, /o que você faz sem jargão/);
  assert.match(problemMockup, /diferenciais perceptíveis/);
  assert.match(problemMockup, /botão de ação óbvio/);
});

test('problem audit aligns beside the pain list on desktop and fills the mobile container', () => {
  const problem = read('src/components/sections/Problem.astro');
  const problemMockup = read('src/components/ui/ProblemMockup.astro');

  assert.match(problem, /class="container problem-container"/);
  assert.match(problem, /@media\s*\(min-width:\s*768px\)[\s\S]*\.problem-container\s*\{[\s\S]*max-width:\s*1200px/);
  assert.match(problem, /grid-template-columns:\s*minmax\(0, 0\.9fr\) minmax\(0, 1\.1fr\)/);
  assert.match(problem, /class="problem-left"/);
  assert.match(problem, /\.problem-left\s*\{[\s\S]*grid-column:\s*1/);
  assert.match(problem, /\.problem-mockup-col\s*\{[\s\S]*grid-column:\s*2/);
  assert.match(problemMockup, /\.problem-mockup--compact\s*\{[\s\S]*height:\s*100%/);
  assert.match(problem, /@media\s*\(max-width:\s*767px\)[\s\S]*\.problem-mockup-col\s*\{\s*max-width:\s*none/);
  assert.match(problemMockup, /\.problem-mockup--compact\s*\{[\s\S]*max-width:\s*none/);
});

test('solution and agitation mockups prioritize the available desktop width', () => {
  const solution = read('src/components/sections/Solution.astro');
  const agitation = read('src/components/sections/Agitation.astro');
  const frustration = read('src/components/ui/FrustrationChart.astro');

  assert.match(solution, /\.container\s*\{[\s\S]*max-width:\s*1200px/);
  assert.match(solution, /grid-template-columns:\s*minmax\(0, 0\.9fr\) minmax\(0, 1\.1fr\)/);
  assert.match(agitation, /grid-template-columns:\s*minmax\(0, 0\.9fr\) minmax\(0, 1\.1fr\)/);
  assert.match(agitation, /@media\s*\(min-width:\s*768px\)[\s\S]*\.frustration-img-container\s*\{[\s\S]*max-width:\s*none/);
  assert.match(agitation, /@media\s*\(max-width:\s*767px\)[\s\S]*\.frustration-img-container\s*\{\s*max-width:\s*none/);
  assert.match(frustration, /\.frustration-mockup--compact\s*\{[\s\S]*max-width:\s*none/);
});

test('scrollytelling stage and tracks are configured universally with accessible fallback padding', () => {
  const css = read('src/styles/global.css');
  const scrollScript = read('src/scripts/scrollAnimations.js');

  // Universal layout properties outside of @supports for cross-browser parity (Safari/Firefox/Chrome)
  assert.match(css, /\.scrolly\s*\{\s*height:\s*var\(--scrolly-track,\s*300vh\);/);
  assert.match(css, /\.scrolly__stage\s*\{[\s\S]*position:\s*sticky;[\s\S]*top:\s*var\(--header-offset\);/);

  // Fallback CSS rules for browsers without native scroll-driven animations
  assert.match(css, /\.scrolly-fallback\s+\.scrolly-step\s*\{[\s\S]*opacity:\s*0;/);

  // Reduced motion provides explicit vertical padding so sections never lack spacing
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*\.scrolly-section\s*\{\s*padding:\s*4rem\s+0;/);

  // JS provides runtime interpolation when native timeline is absent
  assert.match(scrollScript, /scrollyFallbackActive/);
  assert.match(scrollScript, /updateScrollytelling/);
});

test('primary CTA buttons use emerald glassmorphism styling with high contrast and fallback', () => {
  const button = read('src/components/ui/Button.astro');

  // Button background has emerald glassmorphism with blur
  assert.match(button, /\.btn-primary\s*\{[\s\S]*backdrop-filter:\s*blur\(12px\)/);
  assert.match(button, /\.btn-primary\s*\{[\s\S]*-webkit-backdrop-filter:\s*blur\(12px\)/);

  // Text color is high contrast with text-shadow (G1 accessibility)
  assert.match(button, /\.btn-primary\s*\{[\s\S]*color:\s*#ffffff;/);
  assert.match(button, /\.btn-primary\s*\{[\s\S]*font-weight:\s*700;/);

  // Cross-browser fallback is present for browsers without backdrop-filter
  assert.match(button, /@supports not \(backdrop-filter:\s*blur\(1px\)\)/);
});

test('header implements mobile-only smart hide-on-scroll to free viewport for storytelling (G1, G2, G3)', () => {
  const header = read('src/components/sections/Header.astro');

  // Mobile-only hidden state via transform
  assert.match(header, /@media\s*\(max-width:\s*767px\)\s*\{[\s\S]*\.header--hidden\s*\{[\s\S]*transform:\s*translateY\(-120%\)/);

  // Desktop keeps fixed header visible
  assert.match(header, /@media\s*\(min-width:\s*768px\)\s*\{[\s\S]*\.main-header\s*\{[\s\S]*transform:\s*none\s*!important/);

  // Motion reduction support (G2)
  assert.match(header, /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*\.main-header\s*\{[\s\S]*transition:\s*none\s*!important/);

  // Script registers passive scroll listener and rAF
  assert.match(header, /setupSmartHeader/);
  assert.match(header, /header--hidden/);
  assert.match(header, /passive:\s*true/);
});


