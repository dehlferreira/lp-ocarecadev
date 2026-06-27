# SPEC-010: Auditoria de Layout e Scrollytelling (Mobile + Desktop)

**Status:** [ ] Pendente | [ ] Em Progresso | [x] Implementada

> **⚠️ INSTRUÇÃO PARA AGENTES DE IA:**
> Durante a execução desta especificação, você deve consultar este arquivo. Ao finalizar a
> implementação técnica, é sua obrigação retornar a este documento, marcar as caixas do
> `Definition of Done` (DoD) que foram concluídas e atualizar o **Status** no topo para
> `[x] Implementada`.

## 1. Contexto e Objetivo

Auditoria pós-**SPEC-009** para corrigir gaps de layout e scrollytelling em mobile e desktop,
mantendo performance (CSS nativo para pin, zero JS novo — **ADR-011**). Referências:
**PRD-003** (scrubbing, transform/opacity), **PRD-005** (LCP, CLS).

## 2. Requisitos Técnicos

### 2.1. Scrollytelling (4 seções)

- Compactação mobile em `Problem.astro` e `Agitation.astro` (padrão de HowItWorks/Solution).
- Classe `.scrolly-section` em `global.css` para zerar padding vertical externo das seções pinadas.
- Trilhos mobile reduzidos: Problem/Agitation ~220vh, Solution/HowItWorks ~260vh.
- Desabilitar animações infinitas (floaty) do mockup dentro de `.scrolly__stage` no mobile.

### 2.2. Hero e performance JS

- Hero: `min-height: 100svh` (não `100vh`).
- Remover `filter: blur()` do dissolve no scroll (apenas opacity + transform).
- `scrollAnimations.js`: remover `--scroll-y` não usado; mouse tracking só em `(pointer: fine)`.

### 2.3. Layout das demais seções

- Revisar responsividade: SocialProof, About, Pricing, FAQ, CtaFinal, Header (320px–1440px).
- Utilitário `.container` / `.container--narrow` / `.container--medium` em `global.css`; migrar seções.

### 2.4. Restrições

- Zero JS novo para scrollytelling; sem GSAP.
- Manter `overflow-x: clip` e `overflow: clip` em Solution.

## 3. Definition of Done (DoD)

- [x] SPEC-010 criada e README aponta para `docs/`.
- [x] Problem e Agitation com compactação mobile; padding/trilhos ajustados nas 4 seções scrolly.
- [x] Hero em `100svh` sem blur no scroll; scrollAnimations.js otimizado.
- [x] Seções restantes responsivas (mobile + desktop).
- [x] Utilitário `.container` em global.css e seções migradas.
- [x] `npm run build` conclui sem erros.
