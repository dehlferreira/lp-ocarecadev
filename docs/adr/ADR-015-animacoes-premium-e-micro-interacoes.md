# ADR-015: Animações de Entrada Suaves (Scroll Entry Reveals) e Micro-interações Premium

## Status
Aceito

## Data
2026-09-12

## Contexto
Com a descontinuação do *pinned scroll* (ADR-014 / SPEC-014), a navegação da landing page tornou-se leve e fluida, eliminando o atrito relatado pelos visitantes. No entanto, a remoção completa de movimento causou uma impressão visual estática ("site parado"). O `PRD-003` foi atualizado para introduzir uma camada de movimento premium (inspirada nos padrões de design de tecnologia de ponta como Linear, Vercel e Stripe), com a exigência mandatória de **não reintroduzir qualquer tipo de scroll-jacking ou degradação de performance no mobile**.

---

## Decisão Aprovada: Scroll Entry Reveals no Compositor e Micro-interações CSS

1. **Scroll Entry Reveals Nativos (GPU Compositing):**
   - Utilizar CSS Scroll-Driven Animations nativas com `animation-timeline: view()` e `animation-range: entry 5% cover 25%`.
   - Elementos de destaque e cards entram suavemente na tela com transição combinada de `opacity: 0 → 1` e `translateY(20px) → 0`.
   - **Sem travamento de scroll:** O usuário mantém controle total da rolagem; o movimento ocorre organicamente durante o movimento normal da página.

2. **Fallback Progressivo via Intersection Observer:**
   - Em navegadores sem suporte a CSS Scroll-Driven Animations (como versões anteriores do Safari e Firefox), a classe `.scroll-animate` existente em `src/scripts/scrollAnimations.js` assume a revelação suave de forma leve e instantânea ao entrar na viewport.

3. **Micro-interações de Profundidade em Cards (`GlassCard`):**
   - Efeito de brilho de borda sutil (*subtle border glow*) em hover e foco no desktop.
   - Transição suave de elevação (`translateY(-3px)`) e amplificação do reflexo esmeralda translúcido, transmitindo acabamento moderno e polido.

4. **CTA com Respiração Orgânica (*Emerald Pulse*):**
   - O botão primário de ação para WhatsApp recebe uma animação contínua e suave de luminosidade no `box-shadow` esmeralda (`emerald-pulse`), conferindo vitalidade sem criar poluição visual nem layout shifts (G3).

5. **Acessibilidade e Redução de Movimento (G1 e G2):**
   - Sob `@media (prefers-reduced-motion: reduce)`, todas as animações contínuas (como o pulso do CTA) e transições de revelação são desligadas, mantendo o conteúdo 100% visível desde o carregamento inicial.

---

## Opções Analisadas

### 1. Reintroduzir timeline de pinning mais curta (ex: 120vh)
- **Contras (Reprovado):** Reintroduz o scroll-jacking que incomodava os usuários. Quebra o princípio de rolagem contínua aprovado no ADR-014.

### 2. Adoção de biblioteca externa de animação (ex: GSAP ScrollTrigger ou Motion One)
- **Contras (Reprovado):** Violação direta do Guardrail G4 (Astro estático, CSS vanilla, sem scripts bloqueantes) e Guardrail G7 (proibição de bibliotecas desnecessárias). Custo desnecessário de bundle e disputa de CPU na thread principal mobile.

### 3. Scroll Entry Reveals Nativos + Micro-interações CSS — **APROVADO**
- **Prós:** Zero KB de biblioteca externa; executado inteiramente na GPU; acelera a percepção de modernidade; respeita a liberdade de rolagem do usuário; mantém 100% de compatibilidade com os guardrails G1–G8.

---

## Consequências

### Positivas
- Elevação substancial na percepção de valor e design premium da landing page.
- Página dinâmica e viva, mantendo rolagem 100% livre e contínua.
- LCP e Core Web Vitals preservados intactos no mobile.

### Negativas / Trade-offs
- Efeitos de hover nos cards são otimizados para desktop (`@media (hover: hover)`) para não gerar comportamentos estranhos de toque em telas móveis.

---

## Relacionados
- **PRD-003:** Animações, Movimento e Fluidez de Scroll.
- **ADR-014:** Descontinuação de Pinned Scroll.
- **SPEC-015:** Implementação de Animações Premium e Micro-interações.
