# SPEC-014: Revisão de Fluidez de Scroll e Desmonte de Scrollytelling

**Status:** [ ] Pendente | [ ] Em Progresso | [x] Implementada

> **⚠️ INSTRUÇÃO PARA AGENTES DE IA:**
> Durante a execução desta especificação, você deve consultar este arquivo. Ao finalizar a
> implementação técnica, é sua obrigação retornar a este documento, marcar as caixas do
> `Definition of Done` (DoD) que foram concluídas e atualizar o **Status** no topo para
> `[x] Implementada`.

---

## 1. Contexto e Objetivo

- **Referência de Negócio:** `docs/prd/PRD-003-animacoes-e-scroll.md`
- **Decisão Arquitetural:** `docs/adr/ADR-014-descontinuacao-pinned-scroll-e-revisao-fluidez.md` (supersede `docs/adr/ADR-011-scrollytelling-pinned-scroll.md`)

O objetivo desta especificação é eliminar todo e qualquer travamento de rolagem (*scroll-jacking / pinned scroll*) e trilhos de altura artificial (`300vh`, `180vh`, etc.) na landing page, restaurando uma navegação contínua, rápida e natural. As seções afetadas (Problema, Agitação, Solução, Como Funciona e Sobre) passarão a ter alturas correspondentes ao seu conteúdo real, exibindo os elementos de forma direta ou com transições suaves e não-bloqueantes.

---

## 2. Requisitos Técnicos

### Guardrails Afetados
Guardrails afetados: **G1, G2, G3, G4, G6**.

### 2.1 Desmonte Estrutural do Scrollytelling Pinned em CSS
- Em `src/styles/global.css`:
  - Remover a propriedade de altura artificial de `.scrolly` (ex: `height: var(--scrolly-track, 300vh)`). A classe `.scrolly` deve ter altura natural (`height: auto`).
  - Desativar `position: sticky` em `.scrolly__stage`. O contêiner de palco deve se comportar como um bloco normal com fluxo padrão (`position: relative; height: auto;`).
  - Remover regras de timelines estendidas e scrubbing amarrado a múltiplos viewports vazios.
  - As classes de animação `.scrolly-step` devem ter visibilidade natural imediata (`opacity: 1; transform: none;`) ou utilizar entrada suave baseada em viewport (Intersection Observer com `.scroll-animate`), sem jamais reter conteúdos em `opacity: 0` para quem rola a página.

### 2.2 Ajuste dos Componentes de Seção
- **`src/components/sections/Problem.astro`:**
  - Remover variáveis de estilo inline `--scrolly-track` e `--scrolly-track-mobile`.
  - Garantir que a lista de dores e o mockup de auditoria sejam exibidos lado a lado no desktop e empilhados no mobile de forma limpa, estável e sem espaçamentos gigantescos.
- **`src/components/sections/Agitation.astro`:**
  - Remover variáveis de estilo inline de trilho.
  - Apresentar a copy de agitação, a lista de impactos e o mockup de custo de tráfego em sequência legível e dinâmica.
- **`src/components/sections/Solution.astro`:**
  - Remover trilhos estendidos.
  - Exibir a headline da solução, o fluxo do mecanismo persuasivo (AIDA/PAS), os passos do processo e o mockup do WhatsApp com espaçamento harmônico e direto.
- **`src/components/sections/HowItWorks.astro`:**
  - Remover trilho estendido.
  - Exibir os cards de passos do processo (`step-card`) em grade ou fluxo contínuo fluido, sem exigir múltiplos scrolls para ver o passo 2, 3 ou 4.
- **`src/components/sections/About.astro`:**
  - Garantir altura natural, sem trilhos vazios de scroll.

### 2.3 Ajuste do Script de Scroll e Fallbacks (`src/scripts/scrollAnimations.js`)
- Desativar o loop de cálculo de progresso de scrollytelling (`updateScrollytelling`) que monitorava contêineres `.scrolly` com posições de scroll e percentuais de etapas travadas.
- Preservar o Intersection Observer limpo para revelações convencionais de entrada (`.scroll-animate`), sem impacto na thread principal (G4).
- Garantir que o comportamento do script continue 100% isolado de tracking de vendas e consentimento (G6).

### 2.4 Comportamento do Header no Mobile (`src/components/sections/Header.astro`)
- O header com comportamento inteligente (ocultação após a Hero para dar espaço na tela móvel) deve continuar operando suavemente sem quebras.

### 2.5 Atualização dos Testes Automatizados de Conformidade
- Atualizar `test/site-polish.test.mjs` para:
  - Substituir a asserção que exigia trilhos estendidos (`--scrolly-track-mobile: 180vh`, `height: 300vh`) por asserções que comprovam a **ausência de scroll-jacking e alturas naturais/fluidas**.
  - Garantir que nenhum elemento `.scrolly-step` permaneça invisível ou dependente de scroll travado.
  - Validar que a altura total da página no viewport mobile seja drasticamente reduzida.

---

## 3. Definition of Done (DoD)

*(Nota: Conforme protocolo deste repositório, o preenchimento e aprovação destes itens é exclusivo do `quality-assurance-validation-agent`.)*

- [x] **G1:** Semântica HTML, hierarquia de headings (`<h1>` único, sem pulos) e landmarks preservados em todas as seções.
- [x] **G2:** Sob `prefers-reduced-motion: reduce`, nenhum elemento fica oculto (`opacity: 0`), sem animações bloqueantes.
- [x] **G3:** Sem layout shift (CLS = 0) e sem transbordamento horizontal nos viewports de 390px, 768px e 1200px+.
- [x] **G3:** Trilhos de altura artificial (`300vh`, `180vh`) removidos; seções operam com altura natural de conteúdo.
- [x] **G4:** Zero novas dependências adicionadas; CSS vanilla mantido; sem scripts bloqueantes.
- [x] **G6:** Disparos de scroll depth (25%, 50%, 75%, 90%) e rastreamento de cliques nos CTAs de WhatsApp continuam disparando corretamente conforme consentimento LGPD.
- [x] Script de scroll simplificado e sem cálculos pesados de pinning na thread principal.
- [x] `npm run check` conclui com 0 erros.
- [x] `npm run build` conclui com sucesso.
- [x] `npm test` conclui com 0 falhas.
