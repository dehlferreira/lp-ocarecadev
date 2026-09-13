# ADR-014: Descontinuação de Pinned Scroll e Revisão da Fluidez de Navegação

## Status
Aceito

## Data
2026-09-12

## Contexto
O ADR-011 introduziu o conceito de *scrollytelling com scroll pinning* utilizando CSS Scroll-Driven Animations nativas (`position: sticky` + trilhos estendidos de 180vh a 360vh). A consequência negativa explicitamente alertada no ADR-011 se materializou em ambiente real: o excesso de rolagem artificial necessário para revelar conteúdos sequenciais gerou fadiga motora (*scroll fatigue*), sensação de lentidão e queixas diretas de visitantes de que "precisar rolar demais para ver o conteúdo incomoda e afasta potenciais clientes".

O `PRD-003` foi revisado para estabelecer o princípio de **Zero Scroll-Jacking**, ordenando a remoção de travamentos mecânicos de tela e priorizando a velocidade de leitura e a conversão direta para o WhatsApp.

Este ADR **supersede formalmente o ADR-011**.

---

## Decisão Aprovada: Descontinuação do Pinned Scroll e Adoção de Layout com Altura Natural e Revelação Contínua

1. **Remoção de Trilhos Artificiais (`--scrolly-track` e `--scrolly-track-mobile`):**
   - As seções (Problema, Agitação, Solução, Como Funciona, Sobre) deixam de ter alturas multiplicadas em viewports vazios (`300vh`, `340vh`, etc.).
   - As seções passam a ter **altura natural baseada em seu conteúdo real e padding padrão**, eliminando espaços ociosos de rolagem.

2. **Eliminação do `position: sticky` de Travamento de Tela:**
   - O contêiner de palco (`.scrolly__stage`) deixa de ficar fixado/preso durante a rolagem. O usuário rola a página continuamente sem interrupção de fluxo.

3. **Transição de Revelação:**
   - Os elementos com classes de etapa (`.scrolly-step`) passam a ser apresentados de forma direta e fluida.
   - Em vez de uma opacidade amarrada a um scrubbing longo que exige metros de rolagem, os conteúdos ficam visíveis ou usam revelação sutil e imediata de entrada (`scroll-animate` / Intersection Observer padrão do ADR-003 ou transição CSS rápida), sem bloquear a visualização das informações.

4. **Preservação Visual e Estrutural:**
   - Todo o trabalho de design, glassmorphism, mockups de conversão (WhatsApp, auditoria de página, métricas de tráfego) e hierarquia visual é 100% preservado.

---

## Opções Analisadas

### 1. Encurtar ainda mais os trilhos de scroll (ex: de 180vh para 120vh)
- **Prós:** Mantém a mecânica de pinning por alguns instantes.
- **Contras (Reprovado):** Não resolve o problema de fundo. O usuário continua sentindo que a rolagem "emperra" momentaneamente, gerando estranheza e mantendo o atrito mecânico.

### 2. Substituição por biblioteca de animação JS (GSAP ScrollTrigger, Lenis)
- **Prós:** Controle milimétrico de interpolação e efeitos visuais ricos.
- **Contras (Reprovado):** Viola gravemente o Guardrail G4 (Astro estático, CSS vanilla, sem scripts bloqueantes) e o Guardrail G7 (proibição de dependências externas não essenciais). Adiciona peso de bundle e consome thread principal no mobile.

### 3. Remoção do Pinning e Adoção de Altura Natural com Revelação Fluida — **APROVADO**
- **Prós:** Zera o scroll-jacking; reduz a altura total da página móvel de ~11.200px para ~6.500px (mais de 40% de redução); permite leitura contínua e rápida; aproxima o visitante das provas sociais, planos e CTA; mantém 0 KB de dependências novas; 100% compatível com G1 a G8.
- **Contras:** Abdica da teatralidade sequencial que expunha uma palavra/card por vez de forma isolada.

---

## Consequências

### Positivas
- **Eliminação Total do Atrito de Scroll:** O visitante navega pela landing page no seu próprio ritmo, sem barreiras de rolagem presa.
- **Melhoria Crítica em Conversão:** O percurso do usuário desde o Hero até os botões de WhatsApp é encurtado drasticamente.
- **Alívio de CPU e Bateria no Mobile:** Sem necessidade de listeners contínuos de cálculo de scrubbing ou timelines estendidas forçando renderização do compositor por longas distâncias.
- **Acessibilidade Plena (G1 e G2):** Todo o conteúdo torna-se imediatamente legível e interpretável.

### Negativas / Trade-offs
- Elementos que antes dependiam do pin para não se sobreporem (ex: passos no mesmo espaço de tela) devem ser distribuídos em fluxos verticais ou grids claros e estáveis.
- Testes automatizados que validavam expressamente os valores de `--scrolly-track-mobile` em `test/site-polish.test.mjs` precisarão ser atualizados na SPEC para validar o novo contrato de fluidez e ausência de scroll-jacking.

---

## Relacionados
- **PRD-003:** Animações, Movimento e Fluidez de Scroll (requisito de negócio revisado).
- **ADR-003:** Biblioteca de Animações (Vanilla JS / CSS nativo).
- **ADR-011:** Scrollytelling Pinned Scroll (**superseded** por este ADR-014).
- **SPEC-014:** Revisão de Fluidez de Scroll e Desmonte de Scrollytelling.
