# SPEC-004: Animações e Lógica de Scroll (Vanilla JS)

**Status:** [x] Pendente | [x] Em Progresso | [x] Implementada

> **⚠️ INSTRUÇÃO PARA AGENTES DE IA:**
> Durante a execução desta especificação, você deve consultar este arquivo. Ao finalizar a implementação técnica, é sua obrigação retornar a este documento, marcar as caixas do `Definition of Done` (DoD) que foram concluídas e atualizar o **Status** no topo para `[x] Implementada`.

## 1. Contexto e Objetivo
O engajamento da landing page depende diretamente das animações atreladas ao scroll do usuário (conforme PRD-003 e ADR-003). Como decidimos usar **Vanilla JS nativo**, o objetivo aqui é criar um script leve e performático que monitore o Scroll da página usando Intersection Observer e modifique variáveis CSS ou atributos `transform`/`opacity` baseados na posição da rolagem.

## 2. Requisitos Técnicos

### 2.1. Lógica do Observer e Scroll (Script Central)
- Criar um script global (ou em linha no `Layout.astro` dentro de uma tag `<script>`) ou arquivo `src/scripts/scrollAnimations.js` se achar melhor organizar.
- O script deve iniciar um `IntersectionObserver` para detectar quais seções entram e saem da viewport.
- Para os elementos que requerem animação amarrada ao progresso (Scrubbing), usar `window.addEventListener('scroll', callback)` atrelado a um `requestAnimationFrame`.
- Dentro da animação frame a frame, calcular o deslocamento relativo (ex: `scrollY / windowHeight`) e repassar isso como uma variável CSS (ex: `document.documentElement.style.setProperty('--scroll-y', scrollY)`).

### 2.2. Efeitos Visuais
- **Fades e Escalas na Hero:** Quando o usuário começa a rolar para baixo, a Hero section deve fazer um leve 'fade out' ou escalar levemente o conteúdo para dar profundidade.
- **Entrada Progressiva (Cards e Prints):** Ao rolar para as áreas de Prova Social e Pricing, os cards podem ser ativados individualmente (staggering) modificando uma classe CSS ligada ao `IntersectionObserver`.
- Performance: Somente alterar `transform` e `opacity` para evitar saltos (Layout shift) durante a animação (PRD-003).

## 3. Definition of Done (DoD)
- [x] O script Vanilla JS para captura de scroll + Intersection Observer foi implementado sem o uso de bibliotecas pesadas externas (ex: GSAP).
- [x] O scroll funciona e repassa valores variáveis/classes sem causar gargalo de performance no navegador.
- [x] Os cards de Preço e elementos de Prova Social realizam animação leve (entrada/fade) ao entrar na tela.
- [x] A animação atende a diretriz estrita de alterar somente `transform` e/`opacity` e contém o css `will-change: transform` nos alvos principais.
