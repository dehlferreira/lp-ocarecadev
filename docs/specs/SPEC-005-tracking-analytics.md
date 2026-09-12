# SPEC-005: Integração de Tracking (Partytown, Analytics & Funil Completo)

**Status:** [ ] Pendente | [ ] Em Progresso | [x] Implementada

> **⚠️ INSTRUÇÃO PARA AGENTES DE IA:**
> Durante a execução desta especificação, você deve consultar este arquivo. Ao finalizar a
> implementação técnica, é sua obrigação retornar a este documento, marcar as caixas do
> `Definition of Done` (DoD) que foram concluídas e atualizar o **Status** no topo para
> `[x] Implementada`.

## 1. Contexto e Objetivo

Para que a OCARECADEV analise com precisão o comportamento dos visitantes e construa um funil ponta a ponta no Google Analytics (GA4), a landing page precisa registrar todas as interações relevantes do usuário (Hero, navegação, prova social, FAQ, visualização de ofertas e cliques de conversão), conforme definido no **PRD-004** e sustentado pela **ADR-005**. Os scripts de terceiros permanecem isolados no Web Worker via **Partytown** para manter zero bloqueio da main thread e pontuação máxima no Core Web Vitals (PRD-005).

Guardrails afetados: **G1, G4, G6, G7**.

## 2. Requisitos Técnicos

### 2.1. Arquitetura de Injeção e Isolamento (G4, G6, G7)
- Scripts de terceiros (GA4, Google Ads e Meta Pixel) são injetados exclusivamente com `type="text/partytown"` em `src/layouts/Layout.astro`.
- Nenhum script de telemetria é executado antes do consentimento explícito registrado pelo usuário via `src/components/ui/CookieConsent.astro` (Guardrail G6).
- Os identificadores devem vir obrigatoriamente de variáveis de ambiente `PUBLIC_*`:
  - `PUBLIC_GA_ID`
  - `PUBLIC_GOOGLE_ADS_ID`
  - `PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`
  - `PUBLIC_META_PIXEL_ID`
- Não é permitida a adição de novas bibliotecas NPM de rastreamento no cliente (Guardrail G7).

### 2.2. Funil de Conversão Principal (GA4 & Ads)
No arquivo `src/scripts/tracking.js`, garantir que o funil canônico transmita os seguintes eventos:
1. `page_view`: disparado uma única vez após consentimento.
2. `scroll_depth`: marcos em 25%, 50%, 75%, 90% e 100%, deduplicados para evitar disparos repetidos.
3. `view_item_list`: disparado quando a seção de preços `#pricing` atinge 35% de visibilidade no viewport.
4. `select_item`: disparado no clique em botão de plano na tabela de preços (`trackPlan` e `trackValue`).
5. `generate_lead`: disparado no clique em qualquer botão que redireciona para o WhatsApp, transmitindo `cta_location` com o nome da seção (`hero`, `solution`, `pricing`, `faq`, `cta_final`, `whatsapp_fab`).

### 2.3. Rastreamento de Micro-Interações e Pontos de Engajamento
Instrumentar elementos com delegação de eventos (`data-track-*`) em `src/scripts/tracking.js`:
- **Hero:**
  - Botão primário "Quero uma landing page": evento `select_content`, com `cta_location="hero_primary"`.
  - Botão secundário "Ver como funciona": evento `select_content`, com `cta_location="hero_secondary"`.
- **Navegação (Header e Footer):**
  - Links de âncora: evento `select_content`, com `cta_location="header_nav"` ou `cta_location="footer_nav"` e `item_name` identificando o destino.
- **Prova Social Real (`src/components/sections/SocialProof.astro`):**
  - Reprodução de áudio: evento `select_content` com `cta_location="social_audio_play"` e `item_name` identificando o cliente do depoimento.
  - Abertura de lightbox de print: evento `select_content` com `cta_location="social_print_view"` e `item_name` identificando o print aberto.
- **FAQ (`src/components/sections/FAQ.astro`):**
  - Abertura de acordeom de pergunta: evento `select_content` com `cta_location="faq_toggle"` e `item_name` com o título/índice da pergunta.

### 2.4. Acessibilidade e Estabilidade de Navegação (G1, G3)
- As marcações de tracking utilizam atributos declarativos `data-track-*` sem interferir na acessibilidade dos links (`href`), tags semânticas ou foco do teclado.
- Cliques que abrem WhatsApp preservam a navegação garantindo o envio do evento antes da saída da página.

## 3. Definition of Done (DoD)

- [x] G6: Nenhum evento de telemetria é disparado antes do consentimento nem após a revogação de cookies.
- [x] G6: Todas as credenciais de tracking utilizam exclusivamente variáveis `PUBLIC_*` sem IDs hardcoded.
- [x] G1: Todos os elementos rastreados mantêm navegação por teclado, foco visível e atributos semânticos intactos.
- [x] G4: Scripts de terceiros executam exclusivamente via Partytown sem bloqueio na thread principal (TBT preservado).
- [x] O botão primário e o botão secundário da Hero transmitem identificadores distintos de localização (`hero_primary` vs `hero_secondary`).
- [x] Cada marco de scroll (25%, 50%, 75%, 90%, 100%) é deduplicado e transmitido ao GA4.
- [x] Aberturas de FAQ, reprodução de áudios de clientes e visualização de prints em lightbox disparam eventos de interação com identificação do item.
- [x] Todos os CTAs de WhatsApp disparam `generate_lead` com o parâmetro `cta_location` identificando a seção de origem.
- [x] `npm run check` conclui sem erro.
- [x] `npm run build` conclui sem erro.
- [x] `npm test` conclui com 0 falhas e testes cobrindo os novos pontos de interação.

