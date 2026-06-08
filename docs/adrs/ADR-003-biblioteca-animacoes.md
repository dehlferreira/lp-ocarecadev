# ADR-003: Biblioteca de Animações (Scroll-Driven)

## Contexto
O design propõe engajar o usuário através de interações orientadas a rolagem de página (Scroll), onde o progresso de animações é rigorosamente amarrado ao scroll da página e ocorre em ambas as direções (scrubbing), conforme estabelecido no PRD-003. As animações devem rodar lisas (60fps), especialmente em mobile, preferindo alterar apenas propriedades baratas como `transform` e `opacity` para evitar saltos (Layout/Reflow e Paint).

## Opções Analisadas

1. **Vanilla JS (Intersection Observer API + requestAnimationFrame)**
2. **GSAP (ScrollTrigger)**
3. **Framer Motion**
4. **AOS (Animate On Scroll)**

## Decisão Aprovada: Vanilla JS (Intersection Observer API + requestAnimationFrame)

### Motivos da Aprovação:
- **Zero KB Adicional:** Por usar a API nativa dos navegadores (Intersection Observer para entrar/sair do viewport e `requestAnimationFrame` para amarrar progressivamente o valor do Scroll), evitamos totalmente adicionar KBs na rede, cumprindo o critério absoluto de LCP rápido.
- **Micro-Performance Mobile:** Animações orquestradas nativamente permitem manipular Custom Properties de CSS atreladas a transformações, permitindo o uso imediato de aceleração de hardware (GPU) (`will-change: transform`) de forma estrita, poupando a bateria e o CPU do dispositivo móvel do usuário.

## Opções Reprovadas

### 1. GSAP (com plugin ScrollTrigger)
- **Motivo da Reprovação:** GSAP é a ferramenta mais madura e completa do mercado para amarrar animações a eventos de scroll (com Scrubbing nativo de altíssima qualidade). Porém, seu pacote core mais o plugin de ScrollTrigger introduzem mais de 30KB~50KB (minified e gzipped) de JavaScript na página. Como nosso caso de uso restringe-se a animações mais sutis (escalas, fades e parcerias simples), o peso da biblioteca é desproporcional ao benefício para a meta de "abrir em menos de 3s".

### 2. Framer Motion
- **Motivo da Reprovação:** Framework voltado explicitamente para o ecossistema React. Considerando a decisão tomada na ADR-001 (utilizar Astro visando HTML estático puro com ilhas isoladas), atrelar animações de rolagem que percorrem toda a página a uma árvore de componentes React com `framer-motion` forçaria a hidratação de quase toda a estrutura da página, arruinando a performance. O bundle do `framer-motion` é também notoriamente pesado.

### 3. AOS (Animate On Scroll)
- **Motivo da Reprovação:** Embora o AOS seja muito leve e focado em animações atreladas ao scroll, ele funciona majoritariamente com "disparo condicional" (ao entrar na tela, joga uma classe `.aos-animate` com uma transição de CSS pré-definida de tempo fixo). O PRD-003 exige expressamente **"Scroll Vinculado (Scrubbing)"**, isto é, o progresso reverso caso o usuário suba o scroll. O AOS não atende essa premissa mecânica de negócio.
