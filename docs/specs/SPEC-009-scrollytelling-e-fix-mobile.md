# SPEC-009: Scrollytelling (Pinned Scroll) e Ajustes de Mobile/SVG

**Status:** [ ] Pendente | [ ] Em Progresso | [x] Implementada

> **⚠️ INSTRUÇÃO PARA AGENTES DE IA:**
> Durante a execução desta especificação, você deve consultar este arquivo. Ao finalizar a
> implementação técnica, é sua obrigação retornar a este documento, marcar as caixas do
> `Definition of Done` (DoD) que foram concluídas e atualizar o **Status** no topo para
> `[x] Implementada`.

## 1. Contexto e Objetivo

Implementar o efeito de **scrollytelling com pinning** (a seção trava e os elementos se
revelam em sequência conforme o scroll, liberando ao fim) em 4 seções, **100% em CSS nativo**
conforme **ADR-011** — sem JS novo, fluido no mobile e com carregamento leve. Em paralelo,
corrigir SVGs/mockups com dimensões erradas no mobile.

## 2. Requisitos Técnicos

### 2.1. Padrão reutilizável em `src/styles/global.css`
- Estrutura: `.scrolly` (trilho alto, define `view-timeline-name: --scrolly`) >
  `.scrolly__stage` (`position: sticky; top:0; height:100svh; overflow:hidden`, centraliza
  o conteúdo) > conteúdo com `.scrolly-step` (reveal escalonado) e `.scrolly-progress`.
- Reveal por `animation-timeline: --scrolly` + `animation-range: contain …`. As faixas se
  adaptam à contagem de passos via modificador `.scrolly--4`, `.scrolly--5`, `.scrolly--7`,
  evitando scroll "morto" no fim do pin.
- Variantes de direção: `.from-left`, `.from-right`, `.from-scale`.
- Trilhos via custom properties: `--scrolly-track` (desktop) e `--scrolly-track-mobile`.
- **Tudo dentro de** `@media (prefers-reduced-motion: no-preference) { @supports ((animation-timeline: view()) and (animation-range: contain)) { … } }`.

### 2.2. Aplicação nas 4 seções
- `HowItWorks.astro` (`.scrolly--5`): título + 4 passos (`s-1`…`s-5`) + barra `.how-progress`
  (`.scrolly-progress.is-horizontal`). Mobile: grid **2×2** compacto.
- `Agitation.astro` (`.scrolly--4`): texto → dores → gráfico → "é um custo".
- `Solution.astro` (`.scrolly--5`): título → texto → highlight → mockup → texto final.
  `neon-glow` movido para dentro do `.scrolly__stage`; seção trocada para `overflow: clip`
  (não `hidden`) para não quebrar o `position: sticky`.
- `Problem.astro` (`.scrolly--7`): título → "a verdade é simples" → 4 dores (uma a uma) →
  highlight.

### 2.3. Fallback, acessibilidade e mobile
- Fora do `@supports`/com `reduced-motion`: sem pin, conteúdo visível em fluxo normal.
- `100svh` (não `100vh`) para evitar "pulo" com a barra dinâmica do navegador no mobile.
- Trilhos menores no mobile; layouts compactados para o conteúdo caber em `100svh`.
- Nenhum JS novo: `scrollAnimations.js` continua só como fallback do reveal simples.

### 2.4. Correções de SVG/mockup no mobile
- `FrustrationChart.astro`: trocar `height:150px` + `preserveAspectRatio="none"` (que
  estica/distorce) por `.chart { aspect-ratio: 320/140; width:100% }` +
  `preserveAspectRatio="xMidYMid meet"`.
- `HeroMockup.astro`: reduzir o padding do wrapper no mobile para os badges flutuantes não
  estourarem a largura / ocuparem altura demais na seção pinada.
- `Solution.astro`: cap responsivo do `.solution-mockup-container` no mobile.

## 3. Definition of Done (DoD)
- [x] Padrão `.scrolly*` implementado em `global.css` dentro do guard `@supports` + reduced-motion.
- [x] Pin aplicado nas 4 seções (Como Funciona, Agitação, Solução, Problema) com reveal escalonado.
- [x] Barra de progresso preenche durante o pin em Como Funciona.
- [x] `overflow: clip` em `.section-solution` (não quebra o sticky) e `neon-glow` dentro do palco.
- [x] Fallback e `prefers-reduced-motion` mantêm o conteúdo visível (sem trava, sem `opacity:0` preso).
- [x] Nenhum JavaScript novo adicionado (carregamento leve preservado).
- [x] `FrustrationChart` sem distorção no mobile (aspect-ratio do viewBox respeitado).
- [x] Mockup/badges sem estourar largura no mobile.
- [x] `npm run build` conclui sem erros.
