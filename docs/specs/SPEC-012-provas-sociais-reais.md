# SPEC-012: Implementação de Provas Sociais Reais na Seção SocialProof

**Status:** [ ] Pendente | [ ] Em Progresso | [x] Implementada

> **⚠️ INSTRUÇÃO PARA AGENTES DE IA:**
> Durante a execução desta especificação, você deve consultar este arquivo. Ao finalizar a
> implementação técnica, é sua obrigação retornar a este documento, marcar as caixas do
> `Definition of Done` (DoD) que foram concluídas e atualizar o **Status** no topo para
> `[x] Implementada`.

---

## 1. Contexto e Objetivo

- **PRD de Origem**: `docs/prd/PRD-008-provas-sociais-reais.md`
- **ADR Relacionada**: `docs/adr/ADR-012-midias-prova-social.md`
- **Design de Referência**: `docs/design/UXD-001-layout-provas-sociais.md`
- **Objetivo**: Substituir o conjunto de depoimentos sintéticos anteriores em `src/components/sections/SocialProof.astro` por 4 cards de provas sociais autênticas em layout ultra-premium:
  1. Print WhatsApp (Vinicius Oliveira) em moldura smartphone vertical 9:16 com zoom lightbox;
  2. Print Instagram Stories (Grupo Carrera Consórcio) em moldura smartphone vertical 9:16 com zoom lightbox;
  3. Áudio WhatsApp #1 (~30s) simulando player de mensagem de voz autêntica do WhatsApp com waveform, controle play/pause, tempo decorrido, seletor de velocidade (1x/1.5x/2x) e transcrição acessível;
  4. Áudio WhatsApp #2 (~54s) simulando player de mensagem de voz autêntica do WhatsApp com waveform, controle play/pause, tempo decorrido, seletor de velocidade (1x/1.5x/2x) e transcrição acessível.

---

## 2. Requisitos Técnicos

### 2.1. Ingestão e Otimização de Assets
- Imagens otimizadas em WebP em `src/assets/images/`:
  - `proof-whatsapp-vinicius.webp`;
  - `proof-instagram-carrera.webp`.
- Áudios compactados em MP3 (96kbps) em `public/audio/` e vídeos com `+faststart` em `public/videos/`:
  - `social-proof-audio-1.mp3` (355KB) e `social-proof-audio-1.mp4`;
  - `social-proof-audio-2.mp3` (640KB) e `social-proof-audio-2.mp4`.

### 2.2. Componente `SocialProof.astro`
- Estrutura semântica: `<section id="social-proof">`.
- Header: Preserva o `<h2>` e os 3 benefícios em lista (`<ul>`).
- Grid: `.proof-grid` organizado com 2 grupos lógicos:
  1. **Mensagens de Voz Autênticas**: cards com player de áudio do WhatsApp.
  2. **Conversas & Validações Públicas**: cards com moldura de celular vertical 9:16.
- **Player de Áudio estilo WhatsApp**:
  - Balão escuro estilo WhatsApp Dark (`rgba(8, 28, 20, 0.85)` com detalhes em neon).
  - Botão Play/Pause circular acessível.
  - Avatar com ícone de microfone/WhatsApp.
  - Waveform interativa com barras de áudio que refletem o progresso e permitem scrub.
  - Temporizador (`0:00 / 0:30` e `0:00 / 0:54`).
  - Seletor de velocidade de reprodução (`1x`, `1.5x`, `2x`).
  - Transcrição expansível (`<details class="transcript-box">`).
- **Cards de Prints em Proporção 9:16**:
  - Proporção estrita `aspect-ratio: 9 / 16` e `max-width: 320px`.
  - Moldura moderna de smartphone com notch/câmera.
  - Barra inferior "Toque para ver print em tela cheia" que abre o Lightbox `<dialog>`.

### 2.3. Guardrails Declarados (G1–G8)
- **G1 (Acessibilidade)**: Botões com `aria-label`, foco visível, navegação por teclado nos players e dialog, transcrições em `<details>`.
- **G2 (Movimento)**: `prefers-reduced-motion` desativa transformações sem esconder conteúdo.
- **G3 (Estabilidade)**: Zero CLS; todas as mídias com `aspect-ratio` e dimensões definidas. Zero overflow horizontal em 390px, 768px e 1200px+.
- **G4 (Performance)**: Áudios em MP3 leves com `preload="none"` ou `metadata`. Imagens via Astro `<Image>`.
- **G5 (SEO)**: Preservação de landmarks e heading hierarchy.
- **G6 (Privacidade)**: Zero telemetria sem consentimento.
- **G7 (Dependências)**: Zero novas bibliotecas npm (Vanilla JS + CSS puro).
- **G8 (Git/Entrega)**: Sem deploys ou commits não autorizados.

### 2.4. Estratégia de Teste
- Atualizar `test/social-proof.test.mjs` testando:
  1. Ausência de dados fictícios ("Roberto Almeida", "Mariana Costa", "Carlos Moura");
  2. Presença dos 4 cards de prova social real;
  3. Presença dos players de áudio estilo WhatsApp com controles play/pause e waveform;
  4. Presença dos prints com moldura 9:16 e Lightbox `<dialog>`;
  5. Presença das transcrições dos áudios no HTML;
  6. Zero tags `<video controls>` na UI;
  7. Conformidade estrita de ARIA no ícone de verificado (`role="img"` em conjunto com `aria-label`).

### 2.5. Sustentação e Acessibilidade Agêntica (2026-09-09)
- **Problema**: Auditoria do Google Lighthouse / PageSpeed Insights reprovada em "Navegação agêntica" / "Acessibilidade do agente" com o erro `Elements must only use permitted ARIA attributes` (regra `aria-allowed-attr` do axe-core) no elemento `<span class="verified-icon" aria-label="Cliente verificado">`.
- **Causa**: Tags genéricas como `<span>` possuem role implícito `generic`, onde `aria-label` não é permitido sem uma role semântica explícita.
- **Correção**: Atribuição de `role="img"` ao `<span class="verified-icon">`, tornando `aria-label="Cliente verificado"` um atributo válido e expondo a semântica correta na accessibility tree para agentes de IA e leitores de tela.

---

## 3. Definition of Done (DoD)

- [x] Os ativos de áudio otimizados em MP3 foram gerados em `public/audio/`.
- [x] O componente `SocialProof.astro` implementa o player de áudio interativo estilo WhatsApp (play/pause, waveform, tempo e velocidade).
- [x] Os cards de prints utilizam proporção vertical 9:16 (Stories/Smartphone) e abrem no modal Lightbox (`<dialog>`).
- [x] Não há qualquer resquício de nomes e depoimentos sintéticos ("Roberto Almeida", "Mariana Costa", "Carlos Moura").
- [x] As transcrições dos áudios estão presentes e acessíveis no DOM.
- [x] Os estilos respeitam `prefers-reduced-motion: reduce` e não geram overflow horizontal em 390px, 768px e 1200px+.
- [x] O arquivo de teste `test/social-proof.test.mjs` foi atualizado e passa com 100% de sucesso.
- [x] O selo `.verified-icon` possui `role="img"` com `aria-label="Cliente verificado"`, atendendo à regra `aria-allowed-attr` do Lighthouse e auditoria de Navegação Agêntica.
- [x] O comando rápido `npm run verify` conclui com zero falhas.
