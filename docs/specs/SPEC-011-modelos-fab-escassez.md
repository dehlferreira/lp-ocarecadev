# SPEC-011: Modelos, FAB WhatsApp e alerta Express

**Status:** [x] Pendente | [ ] Em Progresso | [ ] Implementada

> **⚠️ INSTRUÇÃO PARA AGENTES DE IA:**
> Durante a execução desta especificação, você deve consultar este arquivo. Ao finalizar a
> implementação técnica, é sua obrigação retornar a este documento, marcar as caixas do
> `Definition of Done` (DoD) que foram concluídas e atualizar o **Status** no topo para
> `[x] Implementada`.

**Quem marca a DoD é o `quality-assurance-validation-agent`, nunca o Tech Lead nem o Dev.**

## 1. Contexto e Objetivo

Acrescentar na **home existente** três capacidades do `docs/prd/PRD-007-modelos-fab-escassez.md`, sem reconstruir a landing e sem alterar a oferta já aceita:

1. Seção-showroom com carrossel de **7 modelos de nicho**, visível **antes** dos planos.
2. FAB de WhatsApp persistente, mesmo canal já usado pelo Header/Pricing/CtaFinal.
3. Toast dismissível de escassez **estática e honesta** do plano Express (48h), sem número de vagas.

`Confirmado:` D-001, D-002 e D-003 fechados pelo usuário em 2026-09-01 (`PRD-007` §8 e §15). Copy dos cards, headline e toast **não se reabrem**.

`Confirmado:` não há `docs/design/UXD-*.md`. Não inventar UXD. Visual = marca OCARECADEV já aprovada (glass, dark, acento `#00FF9D` — ADR-007).

**Sem ADR-012.** Esta entrega aplica decisões vigentes: Astro SSG (ADR-001), CSS vanilla (ADR-002), scroll-driven nativo / `guide.md` (ADR-003), consentimento + `src/scripts/tracking.js` (ADR-005), pastas `sections` / `ui` / `layouts` / `pages` (ADR-006). Não introduz lib cliente, módulo JS novo em `src/scripts/`, nem rotas `/modelos/*`.

## 2. Requisitos Técnicos

Guardrails afetados: **G1, G2, G3, G4, G6, G7**. **G5 não afetado** (D-007 default: sem rota nova). **G8** é processo (sem commit sem autorização) — não entra na DoD de produto.

Enumeração canônica: `AGENTS.md` §Guardrails G1–G8. Não reescrever a lista aqui.

### 2.1. Arquivos impactados

| Papel | Caminho proposto | Ação |
| --- | --- | --- |
| Ordem da jornada | `src/pages/index.astro` | Inserir a seção **depois de `SocialProof`, antes de `About`** (D-005 default). |
| Seção nova | `src/components/sections/ModelsShowcase.astro` | Criar. `id="modelos"`. |
| FAB overlay | `src/components/ui/WhatsAppFab.astro` | Criar. Montar no layout, não na seção. |
| Toast overlay | `src/components/ui/ScarcityToast.astro` | Criar. Montar no layout. |
| Shell | `src/layouts/Layout.astro` | Renderizar FAB + toast **antes** de `<CookieConsent />` (cookie permanece o overlay de consentimento). |
| Nav | `src/components/sections/Header.astro` | Incluir âncora “Modelos” → `#modelos` (ver §2.6). |
| Ícone WhatsApp | `src/components/ui/Icon.astro` | Acrescentar glifo `whatsapp` (SVG local, `currentColor` ou fill da marca WhatsApp). Sem pacote de ícones. |
| Estilos globais só se necessário | `src/styles/global.css` | Preferir `<style>` nos componentes. Se houver regra de empilhamento `:has()`, pode viver no layout/componente. |
| Tracking | `src/scripts/tracking.js` | **Não alterar** salvo bug que impeça `data-track-event` no FAB. O contrato existente já cobre lead após consentimento. |
| Cookie | `src/components/ui/CookieConsent.astro` | **Não alterar** z-index `100`, `position: fixed`, `left` + `right` + `bottom`. |
| Testes novos | `test/modelos-fab-escassez.test.mjs` | Contratos de copy, ordem, âncora, FAB/env, ausência de BrainArt/RNG. |
| Testes existentes | `test/tracking.test.mjs`, `test/site-polish.test.mjs` | Estender **só** se o Dev quebrar um assert atual; não reescrever o teste de protocolo G1–G8 (`test/agent-protocol.test.mjs`). |

Nomes de arquivo acima são proposta técnica alinhada a ADR-006. Equivalente (`Modelos.astro`) é aceitável se `id="modelos"` e os imports em `index.astro` / `Layout.astro` permanecerem óbvios.

### 2.2. Restrições — o que **não** muda

- Três planos e copy de `src/components/sections/Pricing.astro` (incluindo valores e CTAs já no código). Esta SPEC **não** “corrige” divergência histórica de preço vs PRD-001.
- Copy de Hero, FAQ, CtaFinal e demais seções em `docs/referencias/copy-completa-landing.md`.
- Funil PAS e ordem das seções já existentes, **exceto** a inserção da nova seção na posição §2.4.
- `CookieConsent.astro` (texto, IDs `#cookie-consent`, `#cookie-consent-accept`, `#cookie-consent-reject`, z-index 100).
- Variáveis `PUBLIC_*` e lógica de `bootTracking` / `hasCurrentConsent`.
- Nenhuma dependência, framework cliente ou telemetria nova (G7). Framer Motion **reprovado**.
- Sem commit, push ou deploy (G8).

### 2.3. Seção de modelos (RF-001…007, RF-009, CA-001…006)

**Posição (D-005 default, Confirmado pelo Tech Lead):** em `index.astro`, imediatamente após `<SocialProof />` e antes de `<About />`. Isso satisfaz CA-001 (antes de `#pricing`).

**Landmark e headings (G1):**

- `<section id="modelos">` com heading acessível.
- Eyebrow **não** é heading: elemento de texto (`<p>`). Texto literal: `Modelos por nicho`.
- Título da seção: **um `<h2>`**, literal: `Veja uma página feita para o seu tipo de negócio`.
- **Proibido:** segundo `<h1>` (o único `h1` permanece no Hero).
- Nomes dos modelos nos cards: `<h3>` (sem pular de `h2` para `h4`).

**Âncora (RF-009):** `id="modelos"`. Não usar `#portfolio` (vocabulário da fonte). `scroll-margin-top` já existe em `section[id]` em `global.css`.

**Sete cards, copy canônica (`PRD-007` §8.1) — ordem fixa:**

| # | Rótulo de nicho | Nome do modelo | Linha de foco | Desambiguação |
| --- | --- | --- | --- | --- |
| 1 | Oficina premium | Modelo Oficina | Luxo e performance automotiva | — |
| 2 | Clínica estética | Modelo Clínica estética | Harmonização facial e corporal | **Sem** lentes / sorriso |
| 3 | Pet shop e veterinária | Modelo Pet | Cuidado para o melhor amigo | — |
| 4 | Salão de beleza | Modelo Salão | Visagismo e estética minimalista | — |
| 5 | Estúdio de tatuagem | Modelo Tatuagem | Estilo e marcas permanentes | — |
| 6 | Advocacia | Modelo Advocacia | Proteção patrimonial e estratégia | — |
| 7 | Odontologia e lentes | Modelo Odonto | Sorriso e lentes de contato | **Não** estética corporal; lentes só aqui |

Ajuste editorial fino no rótulo (ex. “Pet shop / vet”) é aceitável **somente** se RF-005 / CA-003 se mantiverem. Nomes e linhas de foco da tabela **não** mudam.

**Anatomia do card (simultaneamente visível):**

1. Visual com dimensão explícita (G3): placeholder de marca (painel CSS / logo existente em `src/assets/images/`). `width`+`height` ou `aspect-ratio` com largura definida. Sem fotos BrainArt / Unsplash.
2. Rótulo de nicho.
3. Nome do modelo.
4. Linha de foco.
5. Estado **Em breve** visível (ver §2.4).

`alt` / `aria-label` do visual: nicho + que é modelo + que a imagem é provisória. Ex.: `Placeholder do modelo Oficina — imagem provisória`. Nunca “foto de cliente”.

Rótulo de “modelo” / “template” no card (eyebrow do card ou o próprio nome “Modelo …”) mitiga o risco de parecer case real.

**Trilho (G3, G4):**

- Lista horizontal: `overflow-x: auto` (ou `scroll`) **só no trilho**, não na página.
- `scroll-snap-type: x mandatory`; cada card `scroll-snap-align: start` (ou `center`, desde que um card por snap).
- Largura do card em `rem` / `svw` (ex. `min(85vw, 22rem)`). **Não** copiar passo mágico `380px` da fonte.
- **Exatamente 7** nós de card no DOM. **Proibido** clonar o array para loop infinito (CA-006: sem dezenas de clones tabuláveis).
- Swipe nativo no trilho. Scrollbar do trilho pode ser discreta; a página não pode ganhar overflow-x em 390 / 768 / 1200+.
- A página já usa `overflow-x: clip` em `html`/`body` — não remover. O trilho precisa ser o único scroller horizontal.

**Setas (RF-007, RF-UX-006):**

- Visíveis a partir de `min-width: 768px`. Em viewport menor, o gesto no trilho é o caminho principal; setas podem `display: none`.
- `<button type="button">` com nome acessível (`Modelo anterior` / `Próximo modelo`), alvo de toque ≥ 48×48px (RF-UX-004).
- Clique faz `scrollBy` / `scrollTo` no **trilho** (não na `window`), alinhado ao snap. Passo = largura do card + gap, em px medido no runtime — não constante 380.

**JS mínimo justificado (G4):** CSS não consegue avançar um scroller por snap no clique da seta. O script fica **inline no componente da seção** (padrão do Header), não em `src/scripts/`. Sem `setInterval`. Sem arquivo `carousel.js`.

**Autoplay: não implementar neste MVP.** RF-007 só exige pausa **se** autoplay existir. Omitir autoplay evita JS de intervalo e cumpre G4. CA-005 (“hover/toque pausam autoplay se autoplay existir”) fica vacuamente verdadeira.

**Microcopy de setas (RF-011, desejável — incluir):** texto estático visível no desktop, ex. `Use as setas para ver os outros modelos`. Sem pulse contínuo. Sem copy BrainArt (“Páginas que geram milhões.”).

**Teclado (G1 / CA-006):** Tab alcança as setas (quando visíveis) e os 7 cards. Foco visível (`:focus-visible`) em setas, cards e controles. Sem armadilha de foco. Sem listener obrigatório de setas do teclado se Tab já percorre os 7.

### 2.4. Destino dos cards (D-007 default, CA-004)

`Confirmado` pelo Tech Lead: estado **“em breve” na home**. Sem `src/pages/modelos/`. Sem href BrainArt. Sem 404.

- O card **não** é um `<a href>` para outra origem ou rota.
- Controle, se existir, é `<button type="button">` (ou o card inteiro como botão) **sem** mudar `location`.
- Texto visível `Em breve` (ou `Modelo em breve`) em cada card.
- `Inferido:` não é necessário `alert()`, modal nem `aria-live` agressivo; o estado já está no card.

#### 2.4.1. Aditivo de Evolução (2026-09-05) — Ativação dos 3 Primeiros Modelos

Conforme disponibilização dos 3 primeiros modelos funcionais em produção na Vercel pelo usuário:
- **Modelo Oficina (MotorGarage):** `https://lp-modelo-oficina-motorgarage.vercel.app/`
- **Modelo Clínica estética:** `https://lp-modelo-clinica-estetica.vercel.app/`
- **Modelo Pet (HappyPet):** `https://lp-modelo-petshop.vercel.app/`

Regras de negócio e técnicas aplicadas:
1. Os 3 modelos prontos recebem link de ação (`.model-action-btn`) abrindo a demonstração em nova aba (`target="_blank"` com `rel="noopener noreferrer"`).
2. Cada link possui `aria-label="Ver demonstração do [Nome do Modelo] (abre em nova aba)"` para acessibilidade (G1) e foco visível `:focus-visible`.
3. Atributos de evento declarativo `data-track-event="select_content"` e `data-track-location="models_showcase"` sem coleta de dados pessoais (G6).
4. Os 4 modelos restantes (Salão, Tatuagem, Advocacia e Odonto) permanecem com o badge `Em breve` até sua respectiva conclusão.
5. Permanece expressamente proibido qualquer link para domínios BrainArt ou rotas inexistentes.

### 2.5. Navegação “Modelos” (D-004)

`Confirmado` pelo Tech Lead: **incluir** o item no MVP.

- Desktop (`.nav`) e overlay mobile (`.mobile-nav`): `Modelos` → `#modelos`, **entre** `Resultados` e `Planos`.
- Justificativa: quatro âncoras curtas; o hamburger já é lista vertical (não lotar); a âncora da seção existiria de qualquer forma (RF-009).
- Se o pill do header transbordar entre 768px e 1023px, reduzir `gap` do `.nav` nesse intervalo. **Não** esconder o item e **não** acrescentar quinto link.

### 2.6. FAB WhatsApp (RF-012…018, CA-008…010)

- Overlay global em `Layout.astro`, visível na home (única página pública desta jornada).
- Posição: `position: fixed`; canto **inferior direito**.
- `z-index: 40` (`Inferido:` abaixo do header `50`/`51` e **abaixo** do cookie `100`).
- Destino: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE_DEFAULT)}` com os **mesmos fallbacks** do Header (`5511999999999` / `Olá, tenho interesse.`).
- **Proibido:** número `(64) 98104-0722`, `wa.me/5564981040722`, qualquer `wa.me` da BrainArt, ID real de analytics.
- `rel="noopener noreferrer"`. Mesma janela que os CTAs atuais (sem `target="_blank"`), para o delay de 250ms de `tracking.js` continuar válido quando houver consentimento.
- Nome acessível **literal:** `Fale conosco pelo WhatsApp` (D-006 default). Ícone com `aria-hidden`.
- Tracking: `data-track-event="lead"` e `data-track-location="fab"`. Sem `data-track-plan`. O listener existente em `tracking.js` só dispara se `hasCurrentConsent()`.
- Área de toque ≥ 48×48px.
- Pulse / float / anel: **opcional** (RF-018). Se existir, **somente** dentro de `@media (prefers-reduced-motion: no-preference)`. Com `reduce`, o botão permanece opaco, no lugar, clicável — sem `opacity: 0` (G2). Sem Framer Motion.
- Visual: reconhecível como WhatsApp (verde da marca WhatsApp no botão é aceitável). Não copiar paleta âmbar/terracota da fonte.

### 2.7. Toast Express (RF-019…023, RF-025, CA-011…012)

Copy **literal** (`PRD-007` §8.3):

- Título: `Express em até 48h`
- Corpo: `O plano Express entrega em até 48h, com capacidade limitada. Confirme a próxima janela pelo WhatsApp ou veja os planos.`
- CTA: `Ver o plano Express` → `href="#pricing"` (`id="pricing"` já existe). Tracking: `data-track-event="select_content"` e `data-track-location="scarcity_toast"` (padrão Hero → planos, **não** `lead`).
- **Proibido:** `Restam N vagas`, `Capacidade Quase Atingida`, qualquer N, `Math.random`, decremento, reset 24h, chave `localStorage` de vagas / `brainart_urgency`.

Comportamento:

- Toast compacto, `position: fixed`, **não** modal, **não** tela cheia, **não** bloqueia scroll da página.
- Posição: inferior **esquerdo** (oposto ao FAB), `z-index: 45`.
- Dismiss: botão com `aria-label="Fechar alerta"`, alvo ≥ 48×48px. Fecha com `hidden` (ou equivalente) **na sessão de visualização**. Recarregar a página **pode** mostrar de novo. Sem persistir “fechou” em `localStorage`.
- Não roubar foco na carga (G1).
- Visual: glass / dark / acento OCARECADEV. **Não** o vermelho de emergência da fonte.
- Ping decorativo: só se `prefers-reduced-motion: no-preference`. Com `reduce`, toast visível e estático.
- JS de dismiss: inline no componente. Sem módulo em `src/scripts/`. HTML `popover` nativo é alternativa aceitável se o dismiss e o CTA `#pricing` permanecerem observáveis.

### 2.8. Empilhamento vs cookie (RF-015, RF-UX-005, CA-009)

`Confirmado` no código: `#cookie-consent` é `position: fixed; z-index: 100; left: 1rem; right: 1rem; bottom: 1rem` (faixa inferior; `max-width: 42rem` centrado; em viewport estreito quase full-bleed). Controles `Aceitar` / `Recusar` **não** podem ser cobertos.

**Regra desta SPEC:** FAB e toast **não pintam nem recebem clique enquanto o banner de consentimento estiver visível.**

Implementação prescrita (CSS, sem novo script de tracking):

- Enquanto `#cookie-consent` **não** tiver o atributo `hidden` (estado inicial e ao reabrir `data-open-cookie-preferences` no Footer), FAB e toast: `visibility: hidden` (ou `display: none`) **e** `pointer-events: none`.
- Quando o banner estiver `[hidden]` (aceito ou recusado), FAB e toast aparecem nas posições §2.6 / §2.7.
- Seletor sugerido: `body:has(#cookie-consent:not([hidden]))` sobre as classes do FAB e do toast.
- Cookie permanece `z-index: 100`. FAB `40`. Toast `45`. Nunca elevar FAB acima do cookie.

Offset vertical acima do banner **não** é o caminho primário: a altura do cookie varia (coluna no mobile). Esconder até consentimento resolvido é o critério observável de CA-009.

O **link** WhatsApp pode existir no DOM desde o primeiro paint (RF-016); só a pintura/clique do overlay é adiada enquanto o cookie estiver aberto. Tracking continua bloqueado por `tracking.js` até aceite.

### 2.9. Tracking, env e privacidade (G6)

- Número e mensagem: **somente** `import.meta.env.WHATSAPP_NUMBER` e `WHATSAPP_MESSAGE_DEFAULT`, iguais ao Header.
- FAB: `data-track-event="lead"`; o runtime **já** ignora clique sem consentimento e para na revogação. Não chamar `gtag`/`fbq` no componente.
- Toast CTA não é conversão WhatsApp.
- Sem IDs `PUBLIC_*` hardcoded. Sem IDs da BrainArt.
- Placeholder de teste `5511999999999` (já usado) é ok. Número real de produção só via env, nunca no PRD/SPEC/teste como “o número da conta”.

### 2.10. Movimento, performance e fallback (G2, G3, G4)

- Carrossel: CSS nativo. Sem `guide.md` / `animation-timeline` obrigatório neste trilho (`Inferido:` snap + overflow basta; scroll-driven no eixo inline é opcional e, se usado, deve estar em `prefers-reduced-motion: no-preference` como o restante de `global.css`).
- Qualquer animação nova: par em `@media (prefers-reduced-motion: reduce)` que deixa conteúdo em `opacity: 1` e sem transform contínuo. Nada preso em `opacity: 0`.
- FAB/toast `position: fixed` **fora** do fluxo: não alteram altura do documento; sem CLS da página (G3). Thumbs com caixa reservada **antes** de qualquer asset.
- Sem script bloqueante no `<head>`. Component scripts Astro no padrão já usado.
- Fallback: se `:has()` falhar (navegadores muito antigos, `Inferido:` residual), o cookie ainda ganha pelo z-index 100 — Aceitar/Recusar permanecem o topo da pilha. Dev não adiciona polyfill JS para `:has()`.

### 2.11. Estratégia de teste

Arquivo novo `test/modelos-fab-escassez.test.mjs` (asserts em fonte, estilo `site-polish.test.mjs` / trechos de `tracking.test.mjs`):

- `index.astro`: `SocialProof` aparece no arquivo **antes** do componente de modelos, e modelos **antes** de `About` e `Pricing`.
- Seção: `id="modelos"`; eyebrow e `h2` literais; os 7 nomes e as 7 linhas de foco; clínica sem “lentes”; odonto com lentes; exatamente 7 cards; `h1` ausente no componente.
- Destino: componente **não** contém `brainartsolucoes`, `/portfolio/`, `Math.random`, `brainart_urgency`, `localStorage` de vagas, `Restam`.
- Header: `href="#modelos"` e texto `Modelos` no nav desktop e no mobile.
- FAB: `WHATSAPP_NUMBER`, `WHATSAPP_MESSAGE_DEFAULT`, `data-track-event="lead"`, `data-track-location="fab"`, aria-label literal, `rel` com `noopener` e `noreferrer`; não contém `5564981040722`.
- Toast: título, corpo e CTA literais; `href="#pricing"`; dismiss com `Fechar alerta`.
- Empilhamento: FAB `z-index` numérico **menor** que `100`; toast idem; presença de regra que oculta overlays quando o cookie não está `[hidden]`.
- Layout: importa FAB + toast; `<CookieConsent />` permanece.

`test/tracking.test.mjs`: **não** mudar a contagem de `lead` por arquivo existente (Header 2, Pricing 3, CtaFinal 1). O FAB vive em arquivo novo. Se o Dev colocar o FAB dentro de um arquivo já contado, o teste atual quebra — não faça isso.

Não alterar `test/agent-protocol.test.mjs`.

Verificação de implementação (Dev): `npm run verify`.  
Verificação de DoD (QA): `npm run check`, `npm run build` e `npm test` **separados**. Critério: 0 falhas.

### 2.12. Fora de escopo (desta SPEC)

- Sete LPs-modelo e rotas `/modelos/*`.
- `image-creator-agent` / thumbs originais (placeholder de marca ok).
- Fotos BrainArt / Unsplash da fonte.
- Framer Motion ou qualquer lib cliente nova.
- Reduzir para 2 planos; reescrever Hero/Pricing; IDs de analytics da fonte.
- `localStorage` de vagas; toast nos planos R$997 / R$2497.
- Inventário real de vagas (RF-024, futuro).
- Patch em SPEC-003 / SPEC-008 / SPEC-005 (não misturar DoD antiga).

## 3. Definition of Done (DoD)

Nenhuma caixa abaixo deve ser marcada pelo Dev nem pelo Tech Lead.

- [ ] CA-001: em `index.astro`, a seção de modelos está depois de `SocialProof` e antes de `About`/`Pricing`; `Pricing.astro` e a copy do Hero **não** foram reescritos por esta entrega.
- [ ] CA-002: os 7 cards exibem visual com caixa reservada, rótulo, nome da tabela §2.3 e linha de foco, simultaneamente visíveis.
- [ ] CA-003: card 2 fala em harmonização facial/corporal **sem** lentes; card 7 fala em sorriso/lentes e **não** em estética corporal.
- [ ] CA-004: ativar um card não abre URL BrainArt, não 404, não entra em LP-modelo; o estado visível é “Em breve” (ou equivalente na home).
- [ ] CA-005: trilho com overflow-x + snap; setas no desktop (`min-width: 768px`); gesto no mobile; a **página** sem overflow horizontal em 390px, 768px e 1200px+.
- [ ] CA-006: teclado alcança setas (desktop) e os 7 modelos com foco visível; exatamente 7 cards no DOM; a seção usa `<h2>`, sem segundo `<h1>`.
- [ ] CA-007 / G2: com `prefers-reduced-motion: reduce`, sem autoplay, pulse, float ou ping; 7 cards, FAB e toast (quando aplicável) visíveis e usáveis; nada preso em `opacity: 0`.
- [ ] CA-008: FAB inferior direito, aria-label `Fale conosco pelo WhatsApp`, `wa.me` montado com `WHATSAPP_NUMBER` + `WHATSAPP_MESSAGE_DEFAULT` (fallbacks iguais ao Header), `rel` seguro.
- [ ] CA-009: com o banner de consentimento visível, Aceitar e Recusar são clicáveis; FAB e toast não cobrem esses controles (ocultos até `#cookie-consent[hidden]`).
- [ ] CA-010 / G6: clique no FAB sem consentimento abre WhatsApp e **não** dispara gtag/fbq; após recusar ou revogar (`Preferências de cookies`), os disparos permanecem parados; com aceite, `data-track-event="lead"` segue o contrato existente.
- [ ] CA-011: toast com copy literal §2.7; CTA vai a `#pricing`; dismiss fecha o toast; a página por baixo continua usável.
- [ ] CA-012: código da entrega sem RNG de vagas, sem reset teatral, sem `localStorage` de estoque, sem “Restam N vagas”.
- [ ] CA-013: os três cards de plano em `Pricing.astro` permanecem (Express, Landing que Vende, Máquina de Clientes) com a copy de preço já existente.
- [ ] G1: landmarks/headings corretos; contraste e `:focus-visible` em cards, setas, FAB, CTA e dismiss do toast; alvo de toque ≥ 48×48px nesses controles.
- [ ] G3: thumbs com dimensão explícita; FAB e toast `position: fixed` sem CLS da página; sem overflow-x da página em 390 / 768 / 1200+.
- [ ] G4: nenhum módulo novo em `src/scripts/`; JS só inline nas setas e no dismiss (ou Popover nativo); zero autoplay.
- [ ] G7: `package.json` sem dependência cliente nova; sem Framer Motion.
- [ ] Cookie: `#cookie-consent` continua `z-index: 100`; FAB e toast com `z-index` menor que 100.
- [ ] Item de nav “Modelos” → `#modelos` no desktop e no menu mobile, entre Resultados e Planos.
- [ ] `npm run verify` (Dev: `astro check && astro build && node --test test/*.test.mjs`) conclui sem erro.
- [ ] QA: `npm run check`, `npm run build` e `npm test` **separados**, cada um sem erro (0 falhas).
