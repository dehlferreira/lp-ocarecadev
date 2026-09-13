# PRD-003: Animações, Movimento e Fluidez de Scroll

## 🎯 Problema e Objetivo
Visitantes relataram atrito significativo na experiência de navegação devido ao excesso de rolagem necessário para revelar conteúdos sequenciais. O uso de *scrollytelling* com travamento de tela (*pinning*) e trilhos artificiais extensos (180vh a 360vh por seção) gera fadiga motora (*scroll fatigue*), sensação de lentidão e risco de abandono (*drop-off*) antes que o visitante chegue às seções de prova social, oferta e conversão (WhatsApp).

O objetivo desta revisão é **priorizar a velocidade de leitura, a fluidez contínua e a conversão direta**, eliminando o travamento mecânico da rolagem e assegurando que todo o conteúdo textual e visual seja consumido sem fricção.

---

## 🎢 Nova Diretriz de Animação e Scroll

### Princípios de Experiência
1. **Rolagem Natural e Sem Travamento (Zero Scroll-Jacking):** Nenhuma seção deve congelar a rolagem da página ou obrigar o usuário a realizar múltiplos scrolls consecutivos no mesmo ponto apenas para revelar o parágrafo ou elemento seguinte.
2. **Consumo Imediato de Conteúdo:** Textos, argumentos do funil PAS, provas e mockups devem estar imediatamente visíveis ou surgir com transições sutis e rápidas conforme entram na viewport, sem exigir esforço mecânico extra.
3. **Descontinuação do Scrollytelling Pinned:** Seções que utilizavam trilhos estendidos com `position: sticky` e scrubbing de opacidade sequencial (Problema, Agitação, Solução, Como Funciona, Sobre) devem ser simplificadas para fluxos naturais de leitura com alturas proporcionais ao seu conteúdo real.
4. **Respeito à Acessibilidade e Movimento (G1 e G2):** Sob `prefers-reduced-motion: reduce`, todas as transições permanecem desligadas e o conteúdo 100% visível desde o primeiro render.

---

## ⚡ Diretrizes Técnicas de Produto
Para manter a landing page ultra-rápida, leve e responsiva (especialmente em dispositivos móveis):
- **Sem dependências adicionais:** Nenhuma biblioteca externa de animação (G7).
- **CSS Nativo e Propriedades Econômicas:** Animações restritas exclusivamente a `opacity` e `transform` (GPU compositing), sem disparar reflows ou layout shifts (G3 e G4).
- **Redução Drástica da Altura da Página:** A altura total do documento (especialmente no mobile) deve diminuir sensivelmente com a remoção dos trilhos de scroll estendidos, acelerando o tempo até o CTA final.

---

## 📍 Comportamento Esperado por Seção
- **Hero Section:** Apresentação imediata da proposta de valor com micro-interações elegantes que não bloqueiam a rolagem.
- **Problema, Agitação e Solução:** Fim do pinning sequencial; apresentação clara e fluida dos tópicos de dor, mockups de auditoria e mecanismo da oferta.
- **Como Funciona:** Passos do processo visíveis em fluxo contínuo e ordenado (cards e conexões sem exigência de scroll travado).
- **Sobre e Provas Sociais:** Leitura direta da autoridade e casos reais sem telas presas.
- **Cards de Planos e CTA:** Destaque visual claro, prontamente acessível para ação de clique para WhatsApp.

---

## ✅ Critérios de Aceite

1. **Eliminação de Travamento:** Nenhuma seção da landing page mantém a tela fixada (*sticky/pinned*) exigindo múltiplos gestos de rolagem para completar a exibição de conteúdos da mesma seção.
2. **Redução da Altura Vertical da Página:** A altura total da página no viewport mobile (393×852) é reduzida substancialmente (mínimo de 35% de redução em relação aos ~11.200px da versão com scrollytelling pinned), aproximando o visitante da oferta.
3. **Visibilidade Sem Fricção:** Todo o conteúdo de texto, títulos, listas e mockups torna-se visível naturalmente com a rolagem normal, sem requerer parada forçada do usuário.
4. **Contratos de Acessibilidade (G1 e G2):** Todo o conteúdo permanece totalmente legível por leitores de tela e navegável por teclado; sob `prefers-reduced-motion: reduce`, nenhum elemento permanece oculto (`opacity: 0`).
5. **Estabilidade de Layout (G3):** Nenhuma alteração gera layout shift (CLS = 0) nem transbordamento horizontal em viewports de 390px, 768px e 1200px+.
6. **Preservação do Tracking (G6):** Os disparos de profundidade de rolagem (scroll depth 25%, 50%, 75%, 90%) e rastreamento de cliques nos CTAs continuam operando de forma íntegra e idêntica às especificações de tracking aceitas.

---

## 🚫 Fora de Escopo

- Alteração do texto da copy oficial aprovada (`docs/referencias/copy-completa-landing.md`).
- Alteração da ordem das seções ou da estrutura persuasiva do funil PAS (Hero → Problema → Agitação → Solução → Provas → Como Funciona → Planos → Sobre → FAQ → Footer).
- Inclusão de frameworks JS de animação de terceiros (GSAP, Framer Motion, etc.).
- Modificação na política de consentimento LGPD ou credenciais de tracking (`PRD-004`).

