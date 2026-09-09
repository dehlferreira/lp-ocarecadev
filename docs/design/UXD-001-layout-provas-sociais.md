# UXD-001 - Layout e Experiência de Provas Sociais Reais

## 1. Contexto e Origem

- **Briefing de Origem**: `docs/briefing/BRIEFING-009-provas-sociais-reais.md`
- **Seção Alvo**: `#social-proof` (`src/components/sections/SocialProof.astro`)
- **Problema de UX Atual**: Os depoimentos anteriores utilizavam avatares com iniciais coloridas e textos genéricos ("Roberto Almeida, CEO TechGrowth"), que transmitem tom sintético/fabricado e geram menor credibilidade perante leads qualificados.
- **Objetivo de UX**: Substituir por um layout premium e crível com 4 provas reais (2 prints de impacto e 2 vídeos de áudio WhatsApp), combinando leitura rápida, escuta opcional e auditoria visual sem atrito.

---

## 2. Personas e Cenários de Uso

1. **Lead Rápido (Mobile / Tráfego Pago)**:
   - Quer bater o olho e ver que pessoas de verdade recomendam o André.
   - Lê os badges (selo azul do WhatsApp, `@grupocarreraconsorcio`), vê as frases em destaque e segue na página.
2. **Lead Cético (Desktop / Alto Ticket)**:
   - Quer inspecionar os prints para confirmar autenticidade.
   - Clica no print do Instagram ou WhatsApp para abrir o modal lightbox em tela cheia.
   - Clica no play do vídeo para ouvir o tom de voz do cliente.
3. **Usuário com Acessibilidade / Sem Som**:
   - Navega via teclado (`Tab` / `Enter` / `Esc`).
   - Não pode ouvir áudio: conta com transcrição textual e legendas/alt claras.

---

## 3. Arquitetura de Informação e Hierarquia

```
[Header da Seção]
  - Título: "Resultados falam mais que qualquer promessa"
  - Benefícios: [Mais mensagens WhatsApp] [Mais pedidos orçamento] [Mais clientes]

[Grid de Prova Social - 2x2 Desktop / 1 Coluna Mobile]
  ├── Card 1: Áudio WhatsApp #1 (Player de Voz WhatsApp - 30s)
  │     ├── Header: Ícone WhatsApp + "Áudio de Cliente" + Tag "Recomendação"
  │     ├── Player de Voz WhatsApp: Botão Play/Pause + Waveform interativa + Timer + Velocidade (1x/1.5x/2x)
  │     └── Transcrição expansível/acessível: "E aí irmão beleza ô deixa eu te falar..."
  │
  ├── Card 2: Áudio WhatsApp #2 (Player de Voz WhatsApp - 54s)
  │     ├── Header: Ícone WhatsApp + "Parceiro de Negócios" + Tag "Feedback Real"
  │     ├── Player de Voz WhatsApp: Botão Play/Pause + Waveform interativa + Timer + Velocidade (1x/1.5x/2x)
  │     └── Transcrição expansível/acessível: "Dar um feedback aí pro do serviço aí executado..."
  │
  ├── Card 3: Print Instagram Story (Grupo Carrera Consórcio - Proporção 9:16)
  │     ├── Header: Avatar / Logo + Nome + Handle + Tag "Autoridade"
  │     ├── Quote Destaque: "landing Page construída Pelo excelente profissional @ocarecadev..."
  │     ├── Moldura Smartphone 9:16 com imagem inteira sem cortes + Botão Toque para Ampliar
  │     └── Ação: abre Lightbox acessível (<dialog>)
  │
  └── Card 4: Print WhatsApp Conversa (Vinicius Oliveira - Proporção 9:16)
        ├── Header: Avatar + "Vinicius Oliveira" + Selo Azul + Tag "Agilidade"
        ├── Quote Destaque: "O site voltou pro ar normal e as alterações ficaram ótimas..."
        ├── Moldura Smartphone 9:16 com conversa inteira sem cortes + Botão Toque para Ampliar
        └── Ação: abre Lightbox acessível (<dialog>)

[Componente Modal Lightbox Global da Seção]
  - <dialog> nativo com backdrop blur, botão de fechar acessível e foco preso (trap focus)
```

---

## 4. Especificação de Interface e Estados Visuais

### 4.1. Visual System e Tokens
- **Fundo da Seção**: `#010101` com `section-fade-top` e `section-fade-bottom`.
- **Cards (GlassCard)**:
  - Background: `rgba(255, 255, 255, 0.03)` com `backdrop-filter: blur(12px)`.
  - Borda: `1px solid rgba(255, 255, 255, 0.08)`.
  - Hover: elevação de `-4px`, borda sutil neon `rgba(0, 255, 157, 0.35)` e glow sutil.
- **Pills / Badges de Categoria**:
  - Background: `rgba(0, 255, 157, 0.1)`, texto `var(--color-primary-neon)`, fonte 0.75rem, uppercase, peso 700.

### 4.2. Cards de Áudio com Player de Voz estilo WhatsApp
- **Balão de Mensagem de Áudio**:
  - Fundo escuro estilo dark mode elegante (`rgba(8, 28, 20, 0.85)` / borda `rgba(0, 255, 157, 0.2)`).
  - Botão circular de Play/Pause com ícone svg nítido e foco visível.
  - Avatar / Microfone com indicador visual verde/azul.
  - Waveform interativa estilizada com barras de áudio e progresso dinâmico sincronizado com a reprodução.
  - Indicador de tempo decorrido / duração total (`0:00 / 0:30` e `0:00 / 0:54`).
  - Seletor de velocidade acessível (`1x`, `1.5x`, `2x`).
  - Áudio executado via elemento `<audio>` com arquivos MP3 otimizados em `public/audio/`.
  - Transcrição textual expansível via `<details>` para acessibilidade completa (G1).

### 4.3. Cards de Print em Proporção Vertical 9:16
- **Moldura Smartphone / Stories**:
  - Proporção estrita `aspect-ratio: 9 / 16` com `max-width: 320px` centralizado.
  - Borda com curvatura de tela de smartphone (border-radius de 18px), notch/câmera discreto e acabamento premium.
  - Os prints (Carrera e Vinicius) são renderizados na íntegra sem cortes (`object-fit: contain` ou `cover` proporcional).
  - Barra de ação sutil na base com botão "Toque para ver print em tela cheia".
  - Ao clicar, abre um `<dialog>` modal nativo com a imagem em altíssima resolução.

---

## 5. Responsividade e Breakpoints

- **Desktop (>= 1024px)**: Grid 2x2 harmonioso, cards com altura balanceada.
- **Tablet (768px - 1023px)**: Grid de 2 colunas com padding lateral ajustado.
- **Mobile (< 768px, testado em 390px)**:
  - 1 coluna vertical empilhada, com espaçamento vertical de `1rem`.
  - Vídeos e imagens em largura de `100%`, com `aspect-ratio` fixo.
  - Zero overflow horizontal (`overflow-x: clip` no container).

---

## 6. Guardrails de UX e Acessibilidade (G1–G8)

- **G1 (Acessibilidade)**:
  - Elemento `<dialog>` nativo para modal, preservando navegação por `Tab` e tecla `Escape`.
  - Transcrição textual completa dos áudios disponível para leitores de tela (`aria-expanded` para toggle ou bloco de texto acessível).
  - Alt descritivo em todos os prints.
- **G2 (Movimento)**:
  - `@media (prefers-reduced-motion: reduce)` remove transições e elevações sem ocultar conteúdo.
- **G3 (Estabilidade)**:
  - Atributos `width`, `height` e `aspect-ratio` obrigatórios em todas as tags `<video>` e `<img>`.
- **G4 (Performance)**:
  - `preload="metadata"` nos vídeos para não baixar megabytes de vídeo sem o usuário solicitar.
  - Imagens convertidas para WebP otimizadas pelo Astro `<Image>`.
