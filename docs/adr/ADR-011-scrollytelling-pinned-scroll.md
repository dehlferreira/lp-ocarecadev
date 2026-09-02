# ADR-011: Scrollytelling (Pinned Scroll) via CSS Scroll-Driven Animations

## Status
Aceito

## Data
2026-06-13

## Contexto

O cliente pediu um efeito em que **a seção "trava" na tela e, conforme o usuário rola, os
elementos internos vão sendo revelados em sequência, liberando a seção ao terminar**.

Glossário do conceito (registrado aqui para referência futura):
- **Scrollytelling** — narrativa conduzida pelo scroll (scroll + storytelling); o termo
  guarda-chuva para o efeito pedido.
- **Scroll pinning** — a técnica de "travar" a seção enquanto o conteúdo avança
  (a seção fica *sticky*/*pinned*).
- **Scroll scrubbing / scroll-driven animation** — o progresso das animações é amarrado
  diretamente à posição do scroll (avança e reverte ao subir).
- **Scroll-jacking** — o nome (pejorativo) quando a página "prende" a rolagem do usuário de
  forma agressiva. É o risco a evitar/dosar.

O efeito deve ser aplicado em **4 seções** (Como Funciona, Agitação, Solução, Problema),
**inclusive no mobile**, com a exigência explícita do cliente de que o **mobile seja fluido e
de carregamento leve/rápido**.

Este ADR **estende/refina o ADR-003** (que escolheu Vanilla JS + Intersection Observer +
`requestAnimationFrame` para as animações de scroll). Para o caso específico de
*pin + scrubbing*, um driver de scroll em JS é inadequado (ver alternativas reprovadas).

## Decisão

Implementar o pinning **100% em CSS nativo**, combinando:
- **`position: sticky`** para travar o "palco" da seção (`.scrolly__stage`) dentro de um
  trilho alto (`.scrolly`, ex.: `height: 320vh`);
- **CSS Scroll-Driven Animations** (`view-timeline-name` no trilho + `animation-timeline` +
  `animation-range: contain …` nos elementos) para o scrubbing dos reveals durante o pin.

O JavaScript existente (`src/scripts/scrollAnimations.js`) permanece **apenas como fallback**
para o reveal simples (`.scroll-animate`); ele **não** dirige o pinning.

### Justificativa
1. **Mobile fluido:** animações scroll-driven nativas rodam no **compositor/GPU** (apenas
   `transform`/`opacity`), fora da main thread — atende ao requisito de fluidez no celular.
2. **Carregamento leve:** **zero KB de JS adicional** e nenhuma imagem nova — preserva o LCP
   (mesma motivação do ADR-003).
3. **Degradação graciosa:** todo o pin vive dentro de
   `@media (prefers-reduced-motion: no-preference) { @supports (animation-timeline: view()) { … } }`.
   Sem suporte (Safari/Firefox antigos) ou com "reduzir movimento", a seção **não trava** e o
   conteúdo aparece normalmente — o conteúdo nunca fica preso em `opacity: 0`.

## Alternativas Consideradas

### 1. Driver de scroll em JavaScript (extensão do `scrollAnimations.js`)
- **Prós:** controle total do progresso; funciona em qualquer navegador.
- **Contras (reprovado):** amarrar o pin a `scroll` + `rAF` na main thread engasga no mobile,
  especialmente com a barra dinâmica do Safari/Chrome que dispara reflows. Conflita
  diretamente com o requisito "mobile fluido". Custo de CPU/bateria.

### 2. GSAP ScrollTrigger
- **Prós:** scrubbing e pin maduros e robustos.
- **Contras (reprovado):** +30–50KB de JS (já reprovado no ADR-003 pelo peso); desproporcional
  para o efeito desejado e contra o objetivo de carregamento leve.

### 3. CSS Scroll-Driven Animations nativas — **APROVADO**
- Zero KB, roda no compositor, degrada gracioso. Já é o padrão usado no projeto para os
  reveals (`@supports (animation-timeline: view())` em `global.css`).

## Consequências

### Positivas
- Efeito "pinned" fluido no mobile sem nenhum JS novo nem impacto de carregamento.
- Padrão reutilizável (`.scrolly` / `.scrolly__stage` / `.scrolly-step` / `.scrolly-progress`)
  centralizado em `global.css`, parametrizado por contagem de passos (`.scrolly--4/5/7`).
- Acessível por padrão (respeita `prefers-reduced-motion`).

### Negativas
- **Página fica bem mais longa** (cada seção pinada consome ~3× a altura da viewport em
  scroll). Em LP de conversão isso aumenta o caminho até o CTA. **Mitigação:** trilhos curtos,
  mais curtos ainda no mobile (`--scrolly-track-mobile`), e a seção Problema (cedo na página)
  com o trilho mais curto. Se medir queda de conversão, reduzir trilhos ou remover o pin de
  Problema.
- Conteúdo do palco precisa **caber em `100svh`**; seções "cheias" (Solução, Como Funciona)
  exigiram layout compacto no mobile (grid 2×2, margens/mockup reduzidos) para não cortar.
- Suporte pleno depende de navegador moderno (Chrome/Edge; Safari 26+). Demais caem no
  fallback sem pin (aceitável).

## Relacionados
- ADR-003 (Biblioteca de Animações — Vanilla JS): refinado por este ADR para o caso de pin.
- SPEC-009 (implementação).
