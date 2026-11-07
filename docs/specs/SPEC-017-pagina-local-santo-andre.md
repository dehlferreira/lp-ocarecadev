# SPEC-017: Página local "Criação de sites em Santo André"

**Status:** [ ] Pendente | [x] Em Progresso | [ ] Implementada

> **⚠️ INSTRUÇÃO PARA AGENTES DE IA:**
> Durante a execução desta especificação, você deve consultar este arquivo. Ao finalizar a
> implementação técnica, é sua obrigação retornar a este documento, marcar as caixas do
> `Definition of Done` (DoD) que foram concluídas e atualizar o **Status** no topo para
> `[x] Implementada`.

## 1. Contexto e Objetivo

Implementa PRD-010. Não exige ADR: aplica a arquitetura existente (ARCH-001, ADR-006) a uma rota estática nova, sem dependência nova (G7).

## 2. Requisitos Técnicos

### 2.1. Rota nova — `src/pages/criacao-de-sites-santo-andre.astro`

- Abertura: componente `Hero` da home com textos via props/slots (mesmo visual: foto, cartões flutuantes, fundo). Seções próprias: "para quem", processo online, "por que alguém da região", CTA final. Copy integral no arquivo, conforme aprovação de 2026-11-06.
- Reaproveita sem alteração: `Header`, `Pricing`, `ModelsShowcase`, `SocialProof`, `About`, `Footer`. `Hero.astro`: props `badgeText`, `badgeHighlight`, `primaryCta`, `secondaryCta`, `imageAlt` e slots `title`/`subtitle`; sem eles, renderiza a copy oficial da home.
- `FAQ` recebe as perguntas locais via prop.
- CTAs locais: `data-track-event="lead"` com `data-track-location` `local_santo_andre_hero` e `local_santo_andre_final_cta` (G6: nada dispara antes do consentimento, mesmo pipeline).

### 2.2. Componentes compartilhados (retrocompatíveis)

- `FAQ.astro`: props opcionais `items` e `title`; sem props, renderiza o FAQ da home sem mudança.
- `Layout.astro`: prop opcional `faqItems` alimenta o `FAQPage` do JSON-LD; sem prop, mantém o FAQ da home.
- `Header.astro`: âncoras usam `/#secao` fora da home (corrige também a política de privacidade, onde `#pricing` não existia).
- `Footer.astro`: link "Criação de sites em Santo André e região do ABC"; `.footer-links` em flex com gap.

### 2.3. SEO (G5)

- `sitemap.xml.ts`: nova URL com barra final, prioridade 0.8.
- Canonical gerado pelo `Layout` com barra final (mesmo padrão da política de privacidade).

### 2.4. Restrições

- Não alterar copy, seções ou ordem da home.
- Não prometer atendimento presencial.

### 2.5. Testes

- `test/local-page.test.mjs`: título, h1, mensagem de WhatsApp, FAQ via prop, link no rodapé, sitemap, âncoras do header.
- Verificação manual: screenshots 390 e 1280 sem overflow; `prefers-reduced-motion` sem conteúdo oculto.

## 3. Definition of Done (DoD)

- [ ] Rota gerada em `dist/criacao-de-sites-santo-andre/index.html` com um único `<h1>`.
- [ ] Title, description e canonical conforme PRD-010 §4.
- [ ] `FAQPage` da rota contém as perguntas locais; o da home continua igual.
- [ ] Home sem alteração visível além do link no rodapé.
- [ ] Sem overflow horizontal em 390px e 1280px.
- [ ] `npm run check` sem erros.
- [ ] `npm run build` sem erros.
- [ ] `npm test` com 0 falhas.
