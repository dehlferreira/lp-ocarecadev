# PRD-003: Animações, Movimento e Fluidez de Scroll

## 🎯 Problema e Objetivo
Visitantes relataram atrito significativo na experiência de navegação devido ao excesso de rolagem necessário para revelar conteúdos sequenciais. O uso de *scrollytelling* com travamento de tela (*pinning*) e trilhos artificiais extensos (180vh a 360vh por seção) gera fadiga motora (*scroll fatigue*), sensação de lentidão e risco de abandono (*drop-off*) antes que o visitante chegue às seções de prova social, oferta e conversão (WhatsApp).

O objetivo desta revisão é **priorizar a velocidade de leitura, a fluidez contínua e a conversão direta**, eliminando o travamento mecânico da rolagem e assegurando que todo o conteúdo textual e visual seja consumido sem fricção.

---

## 🎢 Nova Diretriz de Animação e Scroll

### Princípios de Experiência
1. **Rolagem Natural e Sem Travamento (Zero Scroll-Jacking):** Nenhuma seção deve congelar a rolagem da página ou obrigar o usuário a realizar múltiplos scrolls consecutivos no mesmo ponto apenas para revelar o parágrafo ou elemento seguinte.
2. **Consumo Imediato e Fluido de Conteúdo:** Textos, argumentos do funil PAS, provas e mockups devem estar acessíveis sem fricção, enriquecidos com uma camada de movimento estético refinado.
3. **Efeitos e Sensação de Site Premium:** A página não deve parecer um documento estático sem vida. Os elementos ganham entrada suave (fade-in + leve elevação) conforme entram no campo de visão, além de micro-interações elegantes em cards e botões.
4. **Descontinuação Definitiva do Pinning:** Pinned scroll e telas travadas permanecem descontinuados em todas as seções.
5. **Respeito à Acessibilidade e Movimento (G1 e G2):** Sob `prefers-reduced-motion: reduce`, todas as transições permanecem desligadas e o conteúdo 100% visível desde o primeiro render.

---

## ✨ Camada de Efeitos Premium (High-Tech Aesthetics)
Para elevar a percepção de valor do serviço sem comprometer velocidade nem usabilidade:
1. **Scroll Entry Reveals no Compositor:** Conforme o usuário rola, novos blocos e cards revelam-se suavemente ao ingressar na viewport (`entry 10% cover 25%`), utilizando exclusivamente aceleração de GPU (`opacity` e `transform`).
2. **Micro-interações de Profundidade:**
   - Efeito de brilho de borda (*subtle border glow / hover shimmer*) nos componentes `GlassCard` (passos de como funciona, planos, depoimentos e diferencial).
   - Efeito de elevação sutil em hover nos cards interativos (desktop).
3. **CTA Primário Vibrante:** Botão de WhatsApp principal com sutil respiração de brilho neon esmeralda (*organic pulse*), aumentando o destaque visual e a taxa de cliques sem criar poluição visual.
4. **Badges e Destaques:** Efeito sutil de brilho nos selos de autoridade e escassez.

---

## ⚡ Diretrizes Técnicas de Produto
Para manter a landing page ultra-rápida, leve e responsiva (especialmente em dispositivos móveis):
- **Sem dependências adicionais (G7):** Nenhuma biblioteca externa de animação (zero KB de bundle adicional).
- **CSS Nativo e Propriedades Econômicas (G4):** Animações restritas exclusivamente a `opacity` e `transform` (GPU compositing), sem disparar reflows ou layout shifts (G3).
- **Isenção de Bloqueio:** O movimento é acionado de forma passiva; se o usuário rolar rapidamente, o conteúdo já estará legível em sua posição final sem atrasar a leitura.

---

## 📍 Comportamento Esperado por Seção
- **Hero Section:** Headline e CTA com micro-interações de alta tecnologia, mockup com leve flutuação sutil.
- **Problema, Agitação e Solução:** Entrada suave em cascata natural conforme as seções entram na tela, mantendo os mockups em destaque visual límpido.
- **Como Funciona:** Cards de passos com reveal sequencial orgânico de entrada e brilho em foco.
- **Provas Sociais e Depoimentos:** Entrada suave e cards com destaque de leitura autêntica.
- **Cards de Planos e CTA:** Destaque vibrante com bordas energizadas e botão com respiração convidativa.

---

## ✅ Critérios de Aceite

1. **Sensação Estética Premium:** A landing page exibe transições e micro-interações elegantes em cards, botões e seções, superando a sensação de site estático ou "parado".
2. **Zero Scroll-Jacking:** Nenhuma seção congela ou desacelera a rolagem do usuário. A barra de rolagem flui com total liberdade.
3. **Aceleração por Hardware (GPU Only):** Todas as animações atuam estritamente em `opacity` e `transform`; nenhum reflow/relayout é disparado por propriedades pesadas.
4. **Desempenho Mobile Intacto (G3 e G4):** No viewport móvel (390px/393px), a rolagem mantém 60fps constantes sem engasgos; LCP ≤ 2.5s preservado no build de produção.
5. **Contratos de Acessibilidade (G1 e G2):** Foco visível preservado (`:focus-visible`); sob `prefers-reduced-motion: reduce`, nenhum elemento permanece oculto (`opacity: 0`) e todas as animações infinitas são neutralizadas.
6. **Estabilidade de Layout (G3):** CLS = 0; sem transbordamento horizontal em 390px, 768px e 1200px+.
7. **Preservação do Tracking (G6):** Disparos de scroll depth e cliques de lead no WhatsApp continuam íntegros e funcionais.

---

## 🚫 Fora de Escopo

- Alteração do texto da copy oficial aprovada (`docs/referencias/copy-completa-landing.md`).
- Alteração da ordem das seções ou da estrutura persuasiva do funil PAS (Hero → Problema → Agitação → Solução → Provas → Como Funciona → Planos → Sobre → FAQ → Footer).
- Inclusão de frameworks JS de animação de terceiros (GSAP, Framer Motion, etc.).
- Modificação na política de consentimento LGPD ou credenciais de tracking (`PRD-004`).

