# SPEC-015: Animações de Entrada Suaves e Micro-interações Premium

**Status:** [ ] Pendente | [ ] Em Progresso | [x] Implementada

> **⚠️ INSTRUÇÃO PARA AGENTES DE IA:**
> Durante a execução desta especificação, você deve consultar este arquivo. Ao finalizar a
> implementação técnica, é sua obrigação retornar a este documento, marcar as caixas do
> `Definition of Done` (DoD) que foram concluídas e atualizar o **Status** no topo para
> `[x] Implementada`.

---

## 1. Contexto e Objetivo

- **Referência de Negócio:** `docs/prd/PRD-003-animacoes-e-scroll.md`
- **Decisão Arquitetural:** `docs/adr/ADR-015-animacoes-premium-e-micro-interacoes.md`

O objetivo desta especificação é aplicar uma camada de animações modernas de entrada e micro-interações de design premium em toda a landing page, eliminando o aspecto visual "parado" sem gerar qualquer travamento de rolagem (*zero scroll-jacking*) e preservando o desempenho no mobile (60fps, GPU compositing).

---

## 2. Requisitos Técnicos

### Guardrails Afetados
Guardrails afetados: **G1, G2, G3, G4, G6**.

### 2.1 Animações de Entrada ao Scroll (Scroll Entry Reveals)
- Em `src/styles/global.css`:
  - Para elementos com a classe `.scroll-animate` e cards de destaque:
    - Utilizar `@supports ((animation-timeline: view()) and (animation-range: entry))` nativo.
    - Animação de revelação fluida vinculada à entrada na viewport (`animation-timeline: view(); animation-range: entry 5% cover 25%;`).
    - Transição suave: `opacity` de `0.2` para `1`, e `translateY` de `18px` para `0` (GPU only, sem reflow).
    - Suporte para classes de direção/efeito existentes: `.anim-left`, `.anim-right`, `.anim-scale`.
  - Em navegadores sem suporte a CSS Scroll-Driven Animations:
    - O fallback existente em `src/scripts/scrollAnimations.js` (Intersection Observer) assume com suavidade.

### 2.2 Micro-interações em Cards (`GlassCard.astro`)
- Em `src/components/ui/GlassCard.astro`:
  - Efeito refinado de hover no desktop (`@media (hover: hover)`):
    - Transição suave de elevação (`transform: translateY(-4px)`).
    - Destaque elegante na borda esmeralda (`border-color: rgba(0, 255, 157, 0.4)` e suave glow `box-shadow: 0 8px 30px rgba(0, 255, 157, 0.08)`).
    - `transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;`.

### 2.3 CTA Primário com Respiração Orgânica (`Button.astro`)
- Em `src/components/ui/Button.astro`:
  - Botão principal `.btn-primary` recebe keyframe de respiração suave de brilho:
    - `@keyframes emerald-glow-pulse`: oscilação sutil do `box-shadow` esmeralda (`0 0 15px rgba(0, 255, 157, 0.2)` para `0 0 28px rgba(0, 255, 157, 0.45)`).
    - Ciclo orgânico e elegante de 3.5s sem qualquer layout shift (CLS = 0).
    - Sob `@media (prefers-reduced-motion: reduce)`, a animação é desligada (`animation: none !important`).

### 2.4 Testes Automatizados de Conformidade
- Em `test/site-polish.test.mjs`:
  - Adicionar teste validando a presença da animação de pulso no CTA primário, o efeito de hover com borda esmeralda nos cards e o respeito à redução de movimento (G2).

---

## 3. Definition of Done (DoD)

*(Nota: Conforme protocolo deste repositório, o preenchimento e aprovação destes itens é exclusivo do `quality-assurance-validation-agent`.)*

- [x] **G1:** Acessibilidade, foco visível (`:focus-visible`) e semântica preservados em botões e cards.
- [x] **G2:** Sob `prefers-reduced-motion: reduce`, todas as animações contínuas e transições são neutralizadas e o conteúdo permanece 100% visível.
- [x] **G3:** Sem layout shift (CLS = 0) e sem transbordamento horizontal nos viewports de 390px, 768px e 1200px+.
- [x] **G4:** Zero novas dependências adicionadas; animações restritas à GPU (`opacity`, `transform`, `box-shadow`).
- [x] **G6:** Rastreamento de cliques em CTAs de WhatsApp e scroll depth funcionando normalmente.
- [x] Cards possuem micro-interações de hover e border-glow no desktop.
- [x] Botão primário exibe respiração orgânica sutil.
- [x] `npm run check` conclui com 0 erros.
- [x] `npm run build` conclui com sucesso.
- [x] `npm test` conclui com 0 falhas.
