# BRIEFING-001 - Landing da agência BrainArt (referência de padrões)

## 1. Resumo Executivo

A home [https://brainartsolucoes.com.br/](https://brainartsolucoes.com.br/) é a landing comercial da agência **BrainArt Soluções** (Goiânia, GO): vende páginas de conversão com tom de urgência, autoridade premium e prova via portfólio de **7 LPs-modelo**. Stack observada: Next.js (App Router / Turbopack), Tailwind, Framer Motion no FAB, tema dark (`html.dark`).

Este briefing descreve a **referência**, não a OCARECADEV. A landing OCARECADEV já existe (Header, Hero, Problem, Agitation, Solution, HowItWorks, SocialProof, About, Pricing, FAQ, CtaFinal, Footer). O pedido do usuário é adaptar **três padrões** — carrossel de modelos, FAB WhatsApp, alerta de escassez — **mantendo os 3 planos** (Express R$297, Landing que Vende R$997, Máquina de Clientes R$2497). BrainArt tem **2 planos**; isso **não** se copia.

**Separação explícita**

| Observado na BrainArt | Pedido OCARECADEV (não é fato da página) |
| --- | --- |
| 2 planos (LP R$449 / Site a partir de R$1499) | Manter 3 planos |
| Carrossel `#portfolio` com 7 demos da marca BrainArt | Copiar o **padrão** visual/interação; cada card vira um **modelo nosso** com link futuro |
| FAB WhatsApp com número da BrainArt | FAB com `WHATSAPP_NUMBER` via env |
| Toast de escassez com contador **simulado** em `localStorage` | Avaliar ética; Express 48h é o encaixe natural; **não** inventar urgência falsa como requisito |

## 2. Fontes Analisadas

| Identificador | Tipo | Confiança | Limitações |
| --- | --- | --- | --- |
| `https://brainartsolucoes.com.br/` (UTM/fbclid stripped) | Site (HTML SSR + chunks JS/CSS) | Parcial-técnica (HTML+JS confirmados; layout visual sem screenshot ao vivo) | Playwright MCP indisponível neste ambiente. Sem viewport 390/768/1200 renderizado. |
| `/_next/static/chunks/2jhfgbm7o34ug.js` | JS (PortfolioSlider, UrgencyToast, ContactForm) | Completa no código | Comportamento de hover/touch não exercitado no browser |
| `/_next/static/chunks/16morp9w8q7a4.js` | JS (WhatsAppWidget / Framer Motion) | Completa no código | Spring/pulse não vistos rodando |
| `/_next/static/chunks/0o07fw4fvo7yq.js` | JS (CookieBanner, Analytics) | Completa no código | Cookie/consent não clicados |
| `/_next/static/chunks/3o88s7lwswfxk.css` + `3-1-yysc-pv12.css` | CSS | Completa nos tokens | Sem inspeção DevTools de computed style |
| 7 rotas `/portfolio/{slug}` | Sites-demo | Parcial (HTML+classes) | Detalhadas em BRIEFING-002 a 008 |
| `docs/prd/PRD-001-visao-geral-e-negocios.md` | Contexto OCARECADEV | Completa | Só para comparação; produto não reanalisado |

Data da análise: **2026-09-01**.

## 3. Objetivo Percebido do Site

**Confirmado:** converter visitantes em conversa WhatsApp (CTAs `#planos`, `wa.me`, formulário que monta mensagem e abre WhatsApp). Posicionamento: “Landing Pages de Alta Conversão”, copy de perda (“perdendo vendas”, “deixando dinheiro na mesa”).

**Inferido:** o carrossel de 7 nichos funciona como **showroom de templates Express**, não como cases de clientes verificados (marcas-demo inconsistentes entre card e página — ver §11).

## 4. Mapa de Páginas e Seções

Página única da agência (`lang="pt-BR"`). Âncoras confirmadas:

| Ordem | `id` / região | Papel |
| --- | --- | --- |
| 0 | `<header class="fixed top-0 w-full z-50">` | Nav: Problema, Benefícios, Portfólio, Clientes, Planos, FAQ + CTA “Falar com Especialista” (`#contato`). Transparente no topo (`bg-transparent py-6`). |
| 1 | Hero (sem id) | Eyebrow “Agência de Soluções Digitais”, H1, subtítulo, CTAs “#planos” e “Ver Projetos” (`#portfolio`). Fundo WebGL/canvas (shader) + fade inferior. |
| 2 | `#problema` | 3 cards de dor |
| 3 | `#beneficios` | 4 diferenciais (Velocidade, SEO, Design, Mobile First) |
| 4 | `#portfolio` | Carrossel horizontal `PortfolioSlider` + microcopy “Use as setas para mover” |
| 5 | `#clientes` | Marquee de depoimentos (3 quotes repetidas no DOM) |
| 6 | `#planos` | 2 cards de preço |
| 7 | `#faq` | Accordion (3 perguntas) |
| 8 | `#contato` | WhatsApp direto + formulário diagnóstico |
| 9 | Footer | e-mail, telefone, cidade |

**Overlays globais (não são seções):** `CookieBanner`, `UrgencyToast`, `WhatsAppWidget`. `Analytics` injeta gtag/pixel.

Rotas satélite (não mapeadas em profundidade): `/politica-de-privacidade`, `/termos-de-uso` (links no cookie). Canonical no HTML aponta para `https://brainart.com.br` enquanto `og:url` usa `brainartsolucoes.com.br` — **inconsistência confirmada**.

## 5. Estrutura de Conteúdo

**Hero (literal)**

- Eyebrow: `Agência de Soluções Digitais`
- H1: `Sua empresa está perdendo vendas por não ter uma Landing Page que converte.` (parte destacada em gradiente amber→terracotta)
- Lead: `Criamos Landing Pages rápidas e otimizadas que transformam visitantes curiosos em clientes obcecados nos primeiros 3 segundos. Pare de tratar sua empresa como um hobby.`
- CTAs: âncora para `#planos` (botão sólido amber/preto) e `#portfolio` (“Ver Projetos”, glass)

**Problema:** “Por que seu negócio precisa da gente?” + 3 cards (não aparece no Google / leads de madrugada / tráfego que não converte).

**Portfólio heading:** eyebrow `Nosso Portfólio`, H2 `Páginas que geram milhões.`

**Prova social:** 3 depoimentos únicos, cada um clonado **4 vezes** no HTML (marquee). Nomes: Rafael Mendes (RM Advocacia), João Paulo (TechFix), Carlos Eduardo (Imobiliária Prime). Tratar como **copy de demo**, não cases verificados.

**Planos (observado — NÃO copiar modelo de 2 planos nem preços)**

1. **Landing Page Rápida** — de R$1.200,00 por **R$449**; 50/50; entrega 48h após conteúdo/logo; domínio+hospedagem 1 ano; garantia “Risco Zero”; CTA “Garantir Landing Page”.
2. **Site Personalizado** — a partir de **R$1499**; CMS se necessário; CTA WhatsApp “Solicitar Orçamento”.

**FAQ:** incluso no R$449; prazo 48h vs 5 dias úteis no personalizado; oferecem gestão de tráfego (Google/Meta).

**Contato:** formulário não é obrigatório. Campos: nome, empresa, segmento, já possui site, objetivo, prazo, investimento, detalhes, checkbox de autorização WhatsApp. Submit monta texto e abre `wa.me` (não há POST de API visível no chunk).

**Tom:** direto, acusatório-comercial, “máquina de vendas”, números de prazo. **Não** reutilizar esta copy na OCARECADEV (copy oficial já está em `docs/referencias/copy-completa-landing.md`).

## 6. Sistema Visual

### 6.1 Cores

**Confirmado** (`.dark` + tokens em `3o88s7lwswfxk.css`):

| Token / uso | Valor | Onde |
| --- | --- | --- |
| `--background` | `#0a0808` | Fundo da página |
| `--foreground` | `#fafafa` | Texto |
| `--accent-amber` / `.text-amber` `.bg-amber` | `#c39738` | CTAs primários, glow `rgba(195,151,56,0.3)` |
| `--accent-terracotta` | `#e8a87c` | Gradiente do H1, acentos secundários |
| `--border` | `#ffffff1a` | Bordas 10% branco |
| Toast fundo | `#120a0a` / 95% + blur | Urgency + cookie |
| WhatsApp brand | `#25D366` | Só no FAB (não é cor de marca da agência) |
| Escassez | `red-500` / `red-600` / `text-red-400` | Toast |

Contraste percebido: texto claro em fundo quase preto; CTAs amber sobre preto (bom); badge vermelho no toast (alerta, não marca).

### 6.2 Tipografia

**Confirmado:** `Plus Jakarta Sans` (variável 200–800, `--font-plus-jakarta`) e `Geist` (`--font-sans`). `html` usa `font-sans` + classes `plus_jakarta_sans_*` e `geist_*`. H1 hero: `text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]`. Eyebrows: uppercase, `tracking-widest`, amber. Corpo: `text-foreground/70`.

### 6.3 Layout e Grid

- Container recorrente: `max-w-6xl mx-auto px-6` (FAQ `max-w-4xl`).
- Header fixo `z-50`.
- Hero full-bleed com canvas absoluto `z-0` e conteúdo `z-10`.
- Cards problema: grid (não medido em px; **não confirmado** o número de colunas por breakpoint sem render).
- Portfólio: faixa full-width, overflow-x, sem max-width no trilho.
- Planos: 2 colunas no desktop (**inferido** pelo markup de dois cards irmãos).
- Contato: `grid-cols-1 lg:grid-cols-5` (copy 2 + form 3).

### 6.4 Imagens, Videos e Iconografia

- Logo: `/brainart.svg` (preload).
- OG: `/og-image.jpg` 1200×630.
- Cards do carrossel: fotos locais `/portfolio/{nicho}/…jpg` com `object-fit: cover`, opacidade 60% (80% no hover), overlay de textura `transparenttextures.com/patterns/cubes.png` a 10%.
- Hero: canvas WebGL (shader swirl) **ou** fallback radial se reduced-motion; `aria-hidden="true"`.
- Ícones: Lucide (chevron, external-link, X, clock, rocket) + SVG WhatsApp no FAB.
- Sem vídeo de produto na home (**confirmado** ausência de `<video>` no HTML da home).

### 6.5 Componentes

- **Botão primário:** `bg-amber text-black rounded-xl` (hero) ou `rounded-full` (contato), `font-bold`, sombra dourada, hover `bg-amber/90`.
- **Botão ghost/glass:** `glass-panel`, borda clara, hover `bg-white/10`.
- **Card de portfólio:** ver §Implicações A.
- **Toast de urgência:** ver §Implicações C.
- **FAB WhatsApp:** ver §Implicações B.
- **Cookie:** card `max-w-[340px]`, botão único branco “Entendi e Aceito” (sem recusar).
- **FAQ:** accordion com “+”.
- **Select custom** no form: listbox `role="listbox"`, teclado Enter/Espaço.

## 7. Interações e Animações

| Padrão | Elemento | Gatilho | Movimento | Duração / easing | Confiança | Reproduzir / adaptar |
| --- | --- | --- | --- | --- | --- | --- |
| Autoplay carrossel | Trilho `overflow-x-auto` | `setInterval` 3000ms se não pausado | `scrollBy({left:380, behavior:"smooth"})`; no fim `scrollLeft=100` (salto) | 3s entre passos | confirmado (JS) | Pausar em hover/touch; **não** há `prefers-reduced-motion` no slider |
| Pause | `group/slider` | `onMouseEnter` / `onTouchStart` | Para o interval | — | confirmado | Manter pause; no touch, `onTouchEnd` retoma |
| Setas | botões md+ | click | ±380px | smooth nativo | confirmado | `aria-label` “Rolar para a esquerda/direita”; visíveis só `group-hover/slider` |
| Hover card | `<a>` do card | hover | `-translate-y-4` 500ms; imagem `scale-105` 700ms; ícone `rotate-12` | CSS transition | confirmado | Elevação + zoom de foto |
| Snap | trilho | scroll | `snap-x snap-mandatory` / card `snap-center` | — | confirmado | |
| Shader hero | canvas | rAF contínuo | swirl WebGL | para se `prefers-reduced-motion: reduce` | confirmado | G2: este trecho **respeita** reduced-motion |
| FAB pulse | anel verde | loop | scale 1→1.5, opacity 0.4→0 | 2s easeInOut infinito | confirmado | Framer Motion; biblioteca lê reduced-motion (**provável** que suavize) |
| FAB entrada | link | mount | scale 0→1 spring bounce 0.5; y flutuante 3s | — | confirmado | |
| Toast entrada | UrgencyToast | 8s após load | `translate-y-20`→0 + opacity 700ms | — | confirmado | |
| Ping badge | bolinha red | sempre que toast visível | `animate-ping` | Tailwind | confirmado | **Sem** reduced-motion próprio |
| Microcopy setas | `#portfolio` | sempre | `animate-pulse` nas setas ← → | — | confirmado | |
| Header | `transition-all duration-300` | **não confirmado** se muda no scroll (classe inicial é transparente) | — | não confirmado | Precisa de browser |
| Depoimentos | `#clientes` | loop visual | fade nas laterais `from-background via-transparent`; conteúdo repetido 4× | — | confirmado no DOM | Marquee; nomes duplicados |

**Teclado no carrossel:** **não confirmado** handler `ArrowLeft`/`ArrowRight`. Cards são `<a>` (tabuláveis). Com 7 itens × 6 clones = **42 links** no DOM — armadilha de foco (G1).

**Gesture:** overflow-x nativo (swipe). `onTouchStart` só pausa autoplay.

## 8. Responsividade

**Confirmado no CSS/JS (sem render real):**

- Cards: `min-w-[85vw]` mobile; `md:min-w-[350px]`; `lg:min-w-[380px]`; altura `h-[350px]`.
- Setas do carrossel: `hidden md:flex`.
- H1: `text-5xl md:text-7xl`; `<br class="hidden md:block"/>` no meio do título.
- Form: 1 coluna até `lg`.
- FAB / cookie / toast: `fixed` com offsets `bottom-4`/`bottom-6` — em 390px o toast **esquerda** e o FAB **direita** competem com o cookie (também esquerda). **Não confirmado** overflow horizontal da home em 390px.

**Não confirmado:** menu hamburger (nav parece inline no HTML capturado; colapso mobile não visto).

## 9. Tom de Voz e Conteúdo

Agência B2B de páginas: perda → solução rápida → prova de portfólio → preço com desconto e 48h → WhatsApp. Superlativos (“milhões”, “obcecados”). Garantia de dinheiro de volta no plano LP.

**Para OCARECADEV:** não copiar frases, depoimentos, preços, “Risco Zero” da BrainArt, nem a estrutura de 2 planos. A copy própria já existe.

## 10. Padrões Reutilizáveis para o Designer

1. Showroom horizontal de **templates de nicho** entre prova de dor e depoimentos (ou entre Solution e Pricing, a decidir no PO).
2. Card = foto de atmosfera + **label de nicho** sobre a imagem + **nome do modelo** + **promessa de 1 linha** + seta de “abrir”.
3. FAB WhatsApp persistente, canto inferior direito, acima de tudo, com nome acessível.
4. Alerta de capacidade **só se a vaga for real**; visual de toast, não modal full-screen.
5. Cookie/consent à esquerda, FAB à direita — ainda assim planejar empilhamento (toast da BrainArt **também** é esquerda).
6. Dark luxury (âmbar + terracota) é a **marca BrainArt**. OCARECADEV já tem visual próprio (glassmorphism no PRD) — copiar **comportamento**, não paleta.

## 11. Pontos de Atenção

- Depoimentos **repetidos no DOM** (3×4) para simular volume.
- Cards do carrossel também repetidos 6× (`[...n,...n,...n,...n,...n,...n]`).
- Loop do slider é **salto** de `scrollLeft`, não infinite scroll verdadeiro — pode “pular” visualmente.
- Classes Tailwind dinâmicas `from-${e.color}/20` frequentemente **não geram CSS** se não estiverem no safelist (**inferido** risco de hover-color morto).
- Canonical ≠ domínio OG.
- Analytics (GA + Meta Pixel via env) carrega `afterInteractive` **sem** esperar o cookie — padrão a **evitar** na OCARECADEV (G6).
- Cookie só aceita; não há recusa.
- Número WhatsApp da fonte (evidência): `wa.me/5564981040722` / `(64) 98104-0722`. Implementação OCARECADEV: **somente** env `WHATSAPP_NUMBER`.
- Título de alguns demos no carrossel **não bate** com a marca na LP (ex.: card “Sorrir & Cuidar” vs página “Aurora Clinic”). São templates, não cases.

## 12. Limitações da Análise

- Sem Playwright/browser: sem screenshot desktop/mobile, sem hover real, sem medir CLS/LCP, sem testar foco visível.
- Sem clicar cookie/toast/FAB.
- Chunks de terceiros (gtag) não executados.
- IDs de medição **existem no HTML da fonte**; **não** são documentados aqui para não virarem receita de implementação.

## 13. Checklist para o Próximo Agente

- [ ] Ler este briefing + BRIEFING-002 a 008 (um por modelo de nicho).
- [ ] **Não** reescrever a landing OCARECADEV do zero; **não** reduzir 3 planos para 2.
- [ ] Decidir copy, critérios de aceite e ética do alerta no PRD (PO).
- [ ] Carrossel: links futuros para **nossos** templates, nunca URLs BrainArt.
- [ ] FAB: anatomia sim, número/analytics da BrainArt não.
- [ ] Escassez: só se vagas Express forem reais; não copiar o RNG/`localStorage` fake.
- [ ] Guardrails: G1 (foco/teclado no carrossel e overlays), G2 (desligar autoplay/ping/pulse), G4 (CSS>JS; FAB da fonte usa Framer Motion — G7 se for lib nova), G6 (nada de tracking antes do consentimento).
- [ ] Não implementar a partir deste arquivo.

---

## Implicações para OCARECADEV

Pedido do usuário (não é comportamento da BrainArt): adaptar **A** carrossel de modelos, **B** FAB WhatsApp, **C** alerta de escassez, **mantendo 3 planos**. Abaixo: anatomia observada + o que copiar / adaptar / evitar.

### A. Carrossel horizontal de modelos / portfólio

**Onde está na fonte:** `<section id="portfolio">`. Componente JS `PortfolioSlider`.

**Anatomia do card (Confirmado)**

| Camada | Conteúdo | Evidência |
| --- | --- | --- |
| Wrapper | `<a href="/portfolio/{slug}">` largura ~85vw / 350 / 380px, altura total ~350px + rodapé interno, `rounded-3xl`, borda `white/10` | chunk `2jhfgbm7o34ug.js` |
| Glow hover | gradiente `from-{amber\|terracotta}/20` blur | JS |
| Imagem | Next/Image `fill` cover, opacity 0.6→0.8, scale 1.05 no hover | JS |
| Label de nicho | `<h3>` **sobre** a foto (`title`): Oficina Premium, Clínica Estética, Petshop, Salão de Beleza, Tattoo Studio, Advocacia, Odonto Boutique | array `n` |
| Título (marca-demo) | `<h4>` no rodapé (`subtitle`): MotorGarage, Sorrir & Cuidar, HappyPet, Studio Vogue, InkMaster, Law Firm, Lentes de Contato | array `n` |
| Subtítulo / foco | `<p class="text-xs">` (`desc`): “Foco em Luxo e Performance”, etc. | array `n` |
| Ícone | círculo 40px, `aria-label="Abrir projeto externo"` (rótulo enganoso: é mesma origem) | JS |
| Alternância de acento | `color: "amber" \| "terracotta"` intercalado | array `n` |

**Trilho:** `flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar`; scrollbar escondida (`scrollbarWidth: none`). Padding `px-6 pb-12 pt-4`.

**Setas:** só `md+`, `opacity-0` até hover no slider; círculos 48px `bg-black/50`; passo **380px**.

**Loop visual:** array concatenado 6 vezes. Autoplay a cada **3s**. Perto do fim, `scrollLeft = 100` (teleporte). Pause em hover e touch.

**Gesture:** swipe nativo no overflow-x.

**Teclado:** botões das setas são `<button>` com aria-label. **Não** há listener de setas do teclado. 42 clones tabuláveis.

**Reduced-motion:** **ausente** no slider (autoplay, pulse “Use as setas”, hover translate). Conflito G2 se copiado literalmente.

**Como os 7 itens viram templates OCARECADEV**

Cada card deve apontar para **um modelo nosso a desenvolver depois** (rotas futuras tipo `/modelos/oficina`, placeholders, ou âncora “em breve”). **Não** usar `brainartsolucoes.com.br/portfolio/...`. O briefing de cada nicho (002–008) descreve o site-demo para o designer/PO especificar o template Express — **não** implementar as 7 LPs neste ciclo.

Mapeamento sugerido (rótulo de nicho nosso ≠ marca BrainArt):

| Slug fonte (só referência) | Nicho reutilizável | Briefing |
| --- | --- | --- |
| oficina | Oficina / automotivo premium | BRIEFING-002 |
| clinica | Clínica estética | BRIEFING-003 |
| petshop | Pet shop / vet | BRIEFING-004 |
| salao | Salão / visagismo | BRIEFING-005 |
| tatuagem | Estúdio de tatuagem | BRIEFING-006 |
| advocacia | Escritório jurídico | BRIEFING-007 |
| dentista | Odonto / lentes | BRIEFING-008 |

**Copiar:** layout de card (foto + nicho overlay + nome + linha de foco), overflow-x + snap, setas, pause no hover, faixa full-bleed.

**Adaptar:** 7 modelos OCARECADEV; copy e fotos nossas; número de clones (evitar 42 tabs); teclado (rotor de setas + `aria-roledescription`); `prefers-reduced-motion` desliga autoplay e translate; passo em `rem`/`svw` não 380px mágico; posição na página (OCARECADEV não tem `#portfolio` hoje — candidato: após SocialProof ou Solution).

**Evitar:** URLs e marcas BrainArt; H2 “Páginas que geram milhões.”; textura cubes de terceiro; classes Tailwind dinâmicas quebradas; depoimentos da home como se fossem dos nichos; vender os demos como cases reais.

### B. Botão flutuante WhatsApp

**Anatomia (Confirmado, `WhatsAppWidget` em `16morp9w8q7a4.js`)**

- Container: `fixed bottom-6 right-6 z-[9999]`
- Anel: círculo `bg-[#25D366]` opacity 0.4, anima scale 1→1.5 infinito (2s)
- Hit: `<a target="_blank" rel="noopener noreferrer">` `p-3 rounded-full` ícone SVG 28px, `aria-label="Fale conosco pelo WhatsApp"`
- Entrada: scale 0→1, `transition.scale.type = "spring"`, `bounce: .5`
- Idle: `y: [0, -5, 0]` loop 3s
- Hover: `scale: 1.1`; tap: `scale: 0.95`
- Href da fonte: `https://wa.me/5564981040722` (evidência; **não** copiar o número)

**Z-index vs cookie / toast (Confirmado)**

| Overlay | Posição | z-index |
| --- | --- | --- |
| CookieBanner | `bottom-4 left-4` | `z-[100]` |
| UrgencyToast | `bottom-6 left-6` | `z-50` |
| WhatsAppWidget | `bottom-6 right-6` | `z-[9999]` |

FAB **não** colide em x com o cookie (lados opostos). Toast e cookie **ambos à esquerda**: cookie cobre o toast (`100 > 50`). Em mobile, cookie 340px + toast 320px + FAB ~52px ainda podem empilhar verticalmente — **não confirmado** visualmente.

**A11y:** aria-label presente; SVG sem texto. Anel decorativo deveria ser `aria-hidden`. Foco visível **não confirmado**. Loop de scale/y é ruído para quem não quer movimento (G2).

**G6:** o FAB em si é um link; **não** dispara gtag no click neste componente. O problema G6 da fonte é o **Analytics no layout**: GA/Pixel sobem `afterInteractive` **independente** do cookie `brainart_cookie_consent`. Na OCARECADEV: FAB pode existir desde o primeiro paint; **nenhum** evento de tracking no clique antes do consentimento; número **só** `WHATSAPP_NUMBER`; mensagem pré-preenchida já é o padrão dos CTAs atuais (Header/Pricing/CtaFinal).

**Copiar:** posição inferior direita, z-index acima do conteúdo, ícone reconhecível, aria-label em português, `rel="noopener noreferrer"`.

**Adaptar:** CSS (sem Framer Motion — G4/G7); desligar pulse/float com `prefers-reduced-motion`; offset extra se o cookie/consent da OCARECADEV for canto direito; não cobrir CTA final.

**Evitar:** número da BrainArt; bounce infinito; z-index 9999 se o consent overlay precisar ficar por cima; novo framework cliente só para o botão.

### C. Alerta de escassez

**Anatomia (Confirmado, `UrgencyToast`)**

- Tipo: **toast fixo**, não modal, não sticky-header, não overlay full-page.
- Posição: `fixed bottom-6 left-6 z-50`, largura `max-w-[320px]`.
- Visual: borda `border-red-500/30`, fundo `#120a0a/95`, `backdrop-blur-xl`, `rounded-2xl`, `p-5`, sombra vermelha.
- Ícone: círculo `bg-red-500/20` + clock Lucide `text-red-500` + ping `bg-red-500`.
- Título: `Capacidade Quase Atingida`
- Corpo: `Restam apenas {n} vaga(s) para entrega expressa.` — `{n}` em badge `bg-red-500/20 text-red-400 font-bold px-1.5 py-0.5 rounded`
- CTA: `<a href="#planos">` `Garantir Minha Vaga` `bg-red-600 hover:bg-red-700` full width; o click também **fecha** o toast (`onClick: u`).
- Fechar: botão `aria-label="Fechar alerta"` canto superior direito.

**Trigger (Confirmado — crítico para ética)**

1. Lê `localStorage["brainart_urgency"]` `{ firstVisit, spotsLeft, closedAt }`.
2. Default `spotsLeft = 3`. Clamp 1–3.
3. Se passou **24h** (`864e5` ms) desde `firstVisit`: **reseta** para 3 vagas e limpa closed.
4. Senão: se `spotsLeft > 1` e minutos desde firstVisit `> 5` e `Math.random() < 0.3`, **decrementa 1** (contador **aleatório no cliente**, não estoque real).
5. Se o usuário fechou há menos de **12h** (`432e5`): **não mostra**.
6. Senão: espera **8000ms** e anima a entrada (`n` visível).

Isso **não** é um estoque de produção. É urgência **fabricada**.

**Ética / risco:** copiar o RNG viola honestidade e pode ser publicidade enganosa. Pedido OCARECADEV **não** deve virar requisito de countdown fake. Se houver capacidade real do Express 48h (vagas por semana), o alerta pode refletir **dado verdadeiro** (CMS, env, ou “agenda da semana”) e sumir quando zerar — sem reset diário teatral.

**Encaixe nos 3 planos (pedido, não fato BrainArt):** o copy da fonte fala em **“entrega expressa”**, equivalente natural do **OCARECADEV EXPRESS (R$297, até 48h)**. Não aplicar o mesmo toast aos planos R$997 / R$2497 sem decisão de negócio. Não sugerir “só 2 vagas da Máquina de Clientes” sem capacidade real.

**Copiar:** formato toast compacto, dismiss, CTA âncora para pricing, hierarquia título + número + botão, não bloquear o fluxo.

**Adaptar:** copy OCARECADEV; ligar só ao Express; G2 (sem ping se reduced-motion); G1 (foco, não roubar foco à força); z-index vs cookie (na fonte o cookie **esconde** o toast); persistência só se a vaga for real.

**Evitar:** `Math.random()` de vagas; reset 24h; chave `brainart_urgency`; copy “Capacidade Quase Atingida” literal; vermelho de “emergência” se o tom da marca OCARECADEV for outro.

---

**Lembrete final para o PO:** este arquivo é insumo de design/requisito. Não é SPEC. Não copiar marca, depoimentos, preços, 2 planos, IDs de analytics, nem o número WhatsApp da fonte para o código.
