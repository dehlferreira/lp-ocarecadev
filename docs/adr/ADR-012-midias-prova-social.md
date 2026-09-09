# ADR-012: Estratégia de Mídia e Interatividade para Provas Sociais Reais

## Status
Aceito

## Data
2026-09-08

## Contexto
A substituição das provas sociais fakes por conteúdos reais em `docs/referencias/prova-social/` envolve a ingestão e exibição de 2 imagens de alta resolução (prints de WhatsApp e Instagram) e 2 gravações de áudio em formato de vídeo MP4 (30s e 54s).

O projeto é regido pelos Guardrails canônicos G1–G8 (`AGENTS.md`), que impõem:
- Performance sem scripts bloqueantes e LCP preservado (G4);
- Estabilidade de layout sem CLS (G3);
- Acessibilidade e navegação sem barreira (G1);
- Nenhuma dependência externa desnecessária de framework cliente ou bibliotecas pesadas (G7).

Precisamos definir como armazenar, servir e reproduzir esses ativos multimídia na landing page estática em Astro 6.

## Decisão Aprovada: Mídias Otimizadas Nativas (Astro Image + HTML5 Video + HTML5 Dialog Lightbox)

1. **Localização e Otimização de Imagens**:
   - Os prints serão otimizados e colocados em `src/assets/images/proof-whatsapp-vinicius.webp` e `src/assets/images/proof-instagram-carrera.webp`.
   - Utilização do componente nativo `<Image>` do Astro (`astro:assets`) para geração automática de dimensões intrínsecas, formatos modernos e lazy loading.
2. **Localização e Entrega de Vídeos**:
   - Os vídeos MP4 serão otimizados (compressão h.264/aac com taxa de bits otimizada para web) e servidos estaticamente a partir de `public/videos/social-proof-audio-1.mp4` e `public/videos/social-proof-audio-2.mp4`.
   - Tags `<video controls playsinline preload="metadata">` com proporção declarada (`aspect-ratio: 836 / 538`), garantindo que os vídeos não sejam baixados antecipadamente antes da intenção do usuário e não causem layout shift.
3. **Lightbox sem Dependências**:
   - Utilização do elemento nativo do navegador `<dialog>` com script inline ultra-leve (Vanilla JS) para abrir e fechar o modal, garantindo gerenciamento nativo de foco, tecla `Escape` e backdrop sem nenhuma dependência npm externa.
4. **Acessibilidade e Transcrição**:
   - Cada card de áudio/vídeo terá a transcrição textual renderizada semântica e diretamente acessível no DOM.

## Opções Analisadas

1. **Opção A (Aprovada)**: `<Image>` do Astro + `<video>` HTML5 com `preload="metadata"` + `<dialog>` nativo.
2. **Opção B (Reprovada)**: Extrair apenas o áudio para `.mp3` e descartar os vídeos.
3. **Opção C (Reprovada)**: Embutir biblioteca externa de carrossel/lightbox (ex.: Swiper, Fancybox, Plyr).
4. **Opção D (Reprovada)**: Hospedar vídeos no YouTube ou Vimeo com `<iframe>`.

## Opções Reprovadas

- **Opção B (Apenas MP3)**: Reprovada porque a gravação de tela do WhatsApp com o visual do player, a forma de onda se movendo e a transcrição original na tela do celular é um gatilho de autenticidade visual muito mais forte do que um player genérico de áudio.
- **Opção C (Libs externas de Lightbox/Slider)**: Reprovada por violar G4 e G7 (adicionaria dezenas de KB de JavaScript e CSS de terceiros ao bundle de uma landing que deve ser estática e ultraleve).
- **Opção D (YouTube / Vimeo embed)**: Reprovada por violar G4, G5 e G6 (carrega rastreadores externos, iframes pesados que degradam LCP/TBT e anúncios/recomendações não controlados).

## Consequências

### Positivas
- Zero novas dependências npm no `package.json` (conformidade total com G7).
- Preservação da nota de performance e LCP (vídeos não bloqueiam o carregamento inicial por terem `preload="metadata"`).
- Zero layout shift (dimensões e `aspect-ratio` fixos em CSS e atributos HTML).
- Acessibilidade nativa com suporte de teclado e leitores de tela em conformidade com G1.
- Total autonomia sobre o visual e estilização em harmonia com o tema dark/neon da OCARECADEV.

### Negativas
- Adição de arquivos de vídeo ao diretório `public/` aumenta o tamanho final do build estático em alguns megabytes (mitigado por compressão com `ffmpeg`).
- Manutenção manual das transcrições caso o áudio seja alterado no futuro.

## Relacionados
- `PRD-008`: `docs/prd/PRD-008-provas-sociais-reais.md`
- `BRIEFING-009`: `docs/briefing/BRIEFING-009-provas-sociais-reais.md`
- `UXD-001`: `docs/design/UXD-001-layout-provas-sociais.md`
- `SPEC-012`: `docs/specs/SPEC-012-provas-sociais-reais.md`
- `ARCH-001`: `docs/adr/ARCH-001-landing-astro.md`
