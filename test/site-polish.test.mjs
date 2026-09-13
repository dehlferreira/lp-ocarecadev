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

test('mobile reveal animations use safe vertical-only transforms (is-revealed system)', () => {
  const css = read('src/styles/global.css');

  // O sistema is-revealed usa translateY para entrada segura (sem overflow horizontal)
  assert.match(css, /html\.js-loaded:not\(\.reduced-motion\)\s+\.scrolly-step:not\(\.is-revealed\)/);
  assert.match(css, /html\.js-loaded:not\(\.reduced-motion\)\s+\.scroll-animate:not\(\.is-revealed\)/);
});

test('sections operate with natural height and no scroll-jacking (SPEC-014)', () => {
  const problem = read('src/components/sections/Problem.astro');
  const agitation = read('src/components/sections/Agitation.astro');
  const solution = read('src/components/sections/Solution.astro');
  const how = read('src/components/sections/HowItWorks.astro');
  const about = read('src/components/sections/About.astro');

  // SPEC-014: Sem trilhos artificiais bloqueando o scroll
  assert.doesNotMatch(problem, /--scrolly-track-mobile/);
  assert.doesNotMatch(agitation, /--scrolly-track-mobile/);
  assert.doesNotMatch(solution, /--scrolly-track-mobile/);
  assert.doesNotMatch(how, /--scrolly-track-mobile/);
  assert.doesNotMatch(about, /--scrolly-track-mobile/);
  assert.match(solution, /@media\s*\(max-width:\s*767px\)[\s\S]*\.solution-mockup-col\s*\{\s*max-width:\s*none/);
  assert.match(solution, /@media\s*\(min-width:\s*768px\)[\s\S]*\.solution-mockup-col\s*\{[\s\S]*align-self:\s*stretch/);
  assert.match(read('src/components/ui/HeroMockup.astro'), /\.conversion-mockup--compact\s*\{[\s\S]*height:\s*100%/);
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

test('scrollytelling stage and tracks are configured with fluid natural height and accessible padding (SPEC-014)', () => {
  const css = read('src/styles/global.css');
  const scrollScript = read('src/scripts/scrollAnimations.js');

  // SPEC-014: Altura natural sem pinning nem scroll-jacking
  assert.match(css, /\.scrolly\s*\{[\s\S]*height:\s*auto;/);
  assert.match(css, /\.scrolly__stage\s*\{[\s\S]*position:\s*relative;[\s\S]*height:\s*auto;/);

  // Elementos permanecem visíveis sem ficar presos em opacity: 0
  assert.match(css, /\.scrolly-step\s*\{[\s\S]*opacity:\s*1;/);
  assert.doesNotMatch(css, /\.scrolly-fallback\s+\.scrolly-step\s*\{[\s\S]*opacity:\s*0;/);

  // Padding explícito nas seções fluidas
  assert.match(css, /\.scrolly-section\s*\{[\s\S]*padding:\s*4rem\s+0;/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*\.scrolly-section\s*\{\s*padding:\s*4rem\s+0;/);

  // Script mantém identificadores sem travar a thread principal
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

test('header remains permanently fixed across mobile and desktop (G1, G2, G3)', () => {
  const header = read('src/components/sections/Header.astro');

  // Header fixo no topo com alta prioridade z-index
  assert.match(header, /\.main-header\s*\{[\s\S]*position:\s*fixed;/);
  assert.match(header, /\.main-header\s*\{[\s\S]*top:\s*0;/);
  assert.match(header, /\.main-header\s*\{[\s\S]*z-index:\s*50;/);

  // Não possui mais estado oculto (header--hidden)
  assert.doesNotMatch(header, /\.header--hidden/);

  // Motion reduction support (G2)
  assert.match(header, /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*\.main-header\s*\{[\s\S]*transition:\s*none\s*!important/);

  // Menu mobile acessível preservado com botão fechar e CTA interno
  assert.match(header, /setupMobileMenu/);
  assert.match(header, /id="mobile-menu-close"/);
  assert.match(header, /aria-label="Fechar menu"/);
  assert.match(header, /class="mobile-menu-cta"/);
  assert.match(header, /id="btn-header-cta-mobile"/);
  assert.doesNotMatch(header, /class="cta mobile-cta"/);
});

test('premium micro-interactions and organic motion are configured across UI components (SPEC-015)', () => {
  const button = read('src/components/ui/Button.astro');
  const card = read('src/components/ui/GlassCard.astro');
  const css = read('src/styles/global.css');

  // Button: respiração orgânica de neon e brilho diagonal (shine)
  assert.match(button, /emerald-glow-pulse/);
  assert.match(button, /@keyframes\s+emerald-glow-pulse/);
  assert.match(button, /\.btn::before\s*\{[\s\S]*background:\s*linear-gradient/);
  assert.match(button, /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*\.btn-primary[\s\S]*animation:\s*none\s*!important/);

  // GlassCard: elevação suave e borda esmeralda em hover no desktop
  assert.match(card, /@media\s*\(hover:\s*hover\)\s*\{[\s\S]*\.glass-card:hover\s*\{[\s\S]*border-color:\s*rgba\(0,\s*255,\s*157/);
  assert.match(card, /\.glass-card:hover\s*\{[\s\S]*transform:\s*translateY\(-4px\)/);
  assert.match(card, /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*\.glass-card\s*\{[\s\S]*transition:\s*none\s*!important/);

  // Scroll Entry Reveals: IntersectionObserver + CSS transitions (sistema is-revealed)
  const scrollScript = read('src/scripts/scrollAnimations.js');
  assert.match(scrollScript, /js-loaded/);
  assert.match(scrollScript, /is-revealed/);
  assert.match(scrollScript, /IntersectionObserver/);
  assert.match(css, /\.scrolly-step\.is-revealed[\s\S]*opacity:\s*1\s*!important/);
  assert.match(css, /html\.js-loaded:not\(\.reduced-motion\)\s+\.scrolly-step:not\(\.is-revealed\)/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*\.scrolly-step\s*\{[\s\S]*animation:\s*none\s*!important/);
});

test('hero section implements complete premium effects (tech grid, status badge, floating cards, reduced-motion) (G1, G2, G3)', () => {
  const hero = read('src/components/sections/Hero.astro');

  // Tech Grid de fundo com máscara radial
  assert.match(hero, /class="hero-tech-grid"/);
  assert.match(hero, /\.hero-tech-grid[\s\S]*background-image:[\s\S]*radial-gradient/);

  // Pill Badge de status com pulse ring
  assert.match(hero, /class="hero-badge"/);
  assert.match(hero, /class="badge-pulse"/);
  assert.match(hero, /Disponível para novos projetos/);
  assert.match(hero, /Alta Conversão/);
  assert.match(hero, /@keyframes\s+badge-ring-ping/);

  // Floating Micro-Cards de autoridade com glassmorphism
  assert.match(hero, /class="hero-float-badge badge-speed"/);
  assert.match(hero, /100\/100/);
  assert.match(hero, /PageSpeed Mobile/);
  assert.match(hero, /class="hero-float-badge badge-conversion"/);
  assert.match(hero, /\+42%/);
  assert.match(hero, /Mais Cliques no Whats/);
  assert.match(hero, /@keyframes\s+float-card-speed/);
  assert.match(hero, /@keyframes\s+float-card-conv/);

  // Destaque na palavra "agir"
  assert.match(hero, /@keyframes\s+text-neon-pulse/);

  // Respeito estrito a reduced-motion (G2)
  assert.match(hero, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*\.badge-speed[\s\S]*animation:\s*none\s*!important/);
  assert.match(hero, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*\.pulse-ring[\s\S]*display:\s*none/);
});

test('identification section card slides in with spring physics triggered at 40% section visibility (G1, G2, G3)', () => {
  const ident = read('src/components/sections/Identification.astro');

  // Identificador e estrutura de controle de animação
  assert.match(ident, /id="identification-card"/);
  assert.match(ident, /card-spring-ready/);
  assert.match(ident, /is-spring-in/);

  // Keyframes de física de mola com overshoot e rebote acentuado
  assert.match(ident, /@keyframes\s+spring-bounce-in\s*\{/);
  assert.match(ident, /transform:\s*translateX\(-140px\)/);
  assert.match(ident, /transform:\s*translateX\(38px\)/); // Compressão da mola ultrapassando o centro
  assert.match(ident, /transform:\s*translateX\(-16px\)/); // Recuo elástico

  // Keyframes específicos calibrados para mobile
  assert.match(ident, /@keyframes\s+spring-bounce-in-mobile\s*\{/);

  // Gatilho calibrado para 40% da visibilidade da seção e reset para desfazimento ao voltar scroll
  assert.match(ident, /sectionHeight\s*\*\s*0\.4/);
  assert.match(ident, /resetThreshold/);
  assert.match(ident, /transition:\s*transform/);

  // Respeito a prefers-reduced-motion (G2)
  assert.match(ident, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*animation:\s*none\s*!important/);
  assert.match(ident, /window\.matchMedia\('\(prefers-reduced-motion:\s*reduce\)'\)\.matches/);
});

test('problem section features smooth transition from identification, compact pain cards, and mockup audit scanner (G1, G2, G3)', () => {
  const problem = read('src/components/sections/Problem.astro');
  const mockup = read('src/components/ui/ProblemMockup.astro');

  // Transição cromática e conector luminoso
  assert.match(problem, /--fade-from:\s*#050709/);
  assert.match(problem, /class="problem-transition-beam"/);
  assert.match(problem, /class="problem-ambient-glow"/);

  // Cards compactos de dor com semântica acessível (G1)
  assert.match(problem, /problem-point-card/);
  assert.match(problem, /role="list"/);
  assert.match(problem, /role="listitem"/);

  // Mockup com scanner de auditoria em tempo real
  assert.match(mockup, /class="mockup-scanner-beam"/);
  assert.match(mockup, /class="scanner-line"/);
  assert.match(mockup, /class="scanner-glow"/);
  assert.match(mockup, /@keyframes\s+scanner-sweep/);

  // Respeito a prefers-reduced-motion (G2)
  assert.match(mockup, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*\.mockup-scanner-beam\s*\{[^}]*display:\s*none\s*!important/);
});

test('problem section executes cinematic domino cascade with neon ignition and bidirectional scroll (G1, G2, G3)', () => {
  const problem = read('src/components/sections/Problem.astro');

  // Identificador do container e classes de controle de estado
  assert.match(problem, /id="problem-content"/);
  assert.match(problem, /\.problem-content\.problem-anim-ready/);
  assert.match(problem, /\.problem-content\.is-problem-in/);

  // Cascata sequencial nos 3 cards
  assert.match(problem, /\.is-problem-in \.problem-point-card:nth-child\(1\)\s*\{[^}]*transition-delay:\s*0\.12s/);
  assert.match(problem, /\.is-problem-in \.problem-point-card:nth-child\(2\)\s*\{[^}]*transition-delay:\s*0\.24s/);
  assert.match(problem, /\.is-problem-in \.problem-point-card:nth-child\(3\)\s*\{[^}]*transition-delay:\s*0\.36s/);

  // Pulso e ignição neon nos ícones de dor
  assert.match(problem, /@keyframes\s+pain-icon-ignite/);
  assert.match(problem, /@keyframes\s+punchline-cost-glow/);

  // Script de scroll bidirecional
  assert.match(problem, /setupProblemCascade/);
  assert.match(problem, /triggerThreshold/);
  assert.match(problem, /resetThreshold/);
  assert.match(problem, /is-problem-in/);

  // Conformidade com prefers-reduced-motion (G2)
  assert.match(problem, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*opacity:\s*1\s*!important[\s\S]*animation:\s*none\s*!important/);
});
