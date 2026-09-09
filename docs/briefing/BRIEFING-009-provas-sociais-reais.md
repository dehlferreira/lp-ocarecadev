# BRIEFING-009 - Provas Sociais Reais da OCARECADEV

## 1. Resumo Executivo

Este briefing documenta a análise das fontes primárias de prova social fornecidas em `docs/referencias/prova-social/` para substituir as provas sociais sintéticas/fakes atualmente exibidas na seção `#social-proof` da landing page da OCARECADEV (`SocialProof.astro`).

As fontes consistem em 4 ativos autênticos e não-sintéticos:
1. **Print WhatsApp 1**: Vinicius Oliveira (perfil verificado com selo azul), destacando velocidade e execução imediata para campanhas de Google Ads.
2. **Print Instagram Stories 1**: Grupo Carrera Consórcio (`@grupocarreraconsorcio`), atestando a entrega extraordinária de landing page institucional com grandes administradoras de consórcio.
3. **Vídeo com Áudio WhatsApp 1**: Gravação de tela (~30s) reproduzindo áudio real encaminhado com elogio direto ao trabalho do André.
4. **Vídeo com Áudio WhatsApp 2**: Gravação de tela (~54s) reproduzindo áudio real com depoimento em tom de parceria de negócios sobre o serviço executado.

## 2. Fontes Analisadas

| Arquivo | Formato | Dimensões / Duração | Canal de Origem | Sujeito / Autor |
|---|---|---|---|---|
| `24D0E0BF-AD25-4392-B221-4D3910C50069.JPG` | JPEG | 1179x2556 (Retina mobile) | WhatsApp (iOS dark) | Vinicius Oliveira (Verificado) |
| `Captura de Tela 2026-09-08 à(s) 21.39.44.png` | PNG | 1179x2024 | Instagram Stories | Grupo Carrera Consórcio (`@grupocarreraconsorcio`) |
| `1013BC7D-20AC-4A23-B545-DB7CCB3CD859.MP4` | MP4 (H.264 / AAC) | 836x538, 30.2s (áudio 0:36 a 1.5x) | WhatsApp (player áudio) | Cliente / Indicação espontânea |
| `68C2F7CE-AD05-4C26-A69D-DBDFBAB40021.MP4` | MP4 (H.264 / AAC) | 842x504, 54.5s (áudio 1:14 a 1.5x) | WhatsApp (player áudio) | Parceiro de negócios / Cliente corporativo |

## 3. Análise Detalhada dos Conteúdos

### 3.1. Print WhatsApp — Vinicius Oliveira
- **Contexto**: André avisa que finalizou as modificações solicitadas no site às 20:34.
- **Resposta do Cliente (20:39 - 5 min depois)**:
  > *"Boa noite André, tudo bem? Maravilha, conferi agora aqui. O site voltou pro ar normal e as alterações ficaram ótimas, obrigado pela rapidez. Vou ja fazer os anúncios pro adwords!! Grande abraço, ate uma próxima!!"*
- **Gatilhos e Valor Comercial**:
  - *Velocidade extrema de resposta e entrega*;
  - *Confiabilidade técnica* (site restaurado e funcionando sem bugs);
  - *Foco em tração comercial real* (o cliente está investindo dinheiro em tráfego pago no Google Ads).

### 3.2. Print Instagram Stories — Grupo Carrera Consórcio
- **Contexto**: Repost público no Instagram com menção explícita a `@ocarecadev`.
- **Texto do Cliente no Story**:
  > *"landing Page construída Pelo excelente profissional @ocarecadev. Parabéns pelo trabalho. Ficou extraordinário."*
- **Imagem de fundo**: Demonstração da landing page no ar, exibindo selos de gigantes do mercado nacional (Âncora Consórcios, Canopus, Embracon, Volkswagen).
- **Gatilhos e Valor Comercial**:
  - *Autoridade e Prova Social Institucional*;
  - *Validação de alto padrão visual e funcional*;
  - *Chancela pública no ecossistema de consórcios e investimentos*.

### 3.3. Vídeo com Áudio 1 — Agradecimento e Recomendação
- **Formato**: Gravação de tela do player dark de áudio do WhatsApp.
- **Duração**: 30.2 segundos.
- **Texto inicial visível no player**:
  > *"E aí irmão beleza ô deixa eu te falar depois não esquece de agradecer o André lá hem pelo pelo pro..."*
- **Gatilhos e Valor Comercial**:
  - Espontaneidade inegável de mensagem de voz;
  - Elimina qualquer dúvida sobre depoimento fabricado;
  - Mostra cliente recomendando e cobrando agradecimento a terceiros pelo impacto gerado.

### 3.4. Vídeo com Áudio 2 — Feedback de Parceria e Execução
- **Formato**: Gravação de tela do player dark de áudio do WhatsApp.
- **Duração**: 54.5 segundos.
- **Texto inicial visível no player**:
  > *"Dar um feedback aí pro do serviço aí executado pelo nosso parceiro de negócios aí seu André nós fe..."*
- **Gatilhos e Valor Comercial**:
  - Tom maduro e profissional de negócios ("parceiro de negócios");
  - Avaliação detalhada da entrega do serviço;
  - Humanização máxima e conexão de confiança para quem fecha projetos de maior ticket (ex.: Landing que Vende ou Máquina de Clientes).

## 4. Recomendações para UX e Design

1. **Equilíbrio de formatos**: A seção não deve ter apenas texto, nem apenas prints estáticos. Deve combinar:
   - 2 cards visuais com prints (com suporte a expansão/zoom para leitura nítida das mensagens);
   - 2 cards interativos multimídia com os áudios gravados (players integrados de vídeo/áudio estilizados em estilo WhatsApp Dark / Glassmorphism Neon).
2. **Acessibilidade e Desempenho (G1 e G4)**:
   - Os áudios devem ter transcrições/resumos visíveis para usuários que navegam sem som ou utilizam leitores de tela.
   - Vídeos devem usar `preload="metadata"` e `playsinline`, evitando consumo desnecessário de dados antes da interação.
   - Imagens devem ser tratadas em WebP responsivo com dimensões explícitas.
3. **Estética Premium**:
   - Manter a paleta canônica (fundo `#010101`, bordas de vidro translúcidas, acentos neon `#00ff9d` e tons de WhatsApp escuro `#1f2c34` / `#0b141a` com toque moderno).
