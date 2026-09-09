# PRD-008 - Substituição por Provas Sociais Reais

## 1. Problema e Oportunidade

A landing page da OCARECADEV atualmente exibe três depoimentos sintéticos em texto ("Roberto Almeida", "Mariana Costa", "Carlos Moura") com iniciais fictícias. Embora o layout cumpra a função visual básica, a falta de provas palpáveis e verificáveis reduz a taxa de conversão entre visitantes qualificados que buscam desenvolvimento de landing pages de alta performance.

A pasta `docs/referencias/prova-social/` forneceu 4 ativos autênticos (2 prints e 2 vídeos de áudio WhatsApp). Substituir os dados fictícios por essas provas reais aumentará substancialmente a credibilidade, taxa de clique nos CTAs de WhatsApp e a percepção de valor dos serviços prestados.

---

## 2. Insumos e Referências

- `docs/briefing/BRIEFING-009-provas-sociais-reais.md`
- `docs/design/UXD-001-layout-provas-sociais.md`
- `docs/referencias/prova-social/` (arquivos brutos)
- `AGENTS.md` (Guardrails canônicos G1 a G8)

---

## 3. Requisitos Funcionais

1. **Substituição Integral das Provas Fakes**:
   - Nenhuma referência a "Roberto Almeida", "Mariana Costa", "Carlos Moura" ou iniciais sintéticas deve permanecer em produção.
2. **Exibição dos 4 Casos Reais**:
   - **Caso 1 (Print Instagram / Autoridade)**: Menção e elogio público do Grupo Carrera Consórcio (`@grupocarreraconsorcio`) qualificando a landing construída pelo `@ocarecadev` como "extraordinário", com imagem de prévia e recurso de ampliação (lightbox).
   - **Caso 2 (Print WhatsApp / Agilidade)**: Mensagem do cliente verificado Vinicius Oliveira atestando que o site voltou ao ar com alterações ótimas em minutos e que iniciará campanhas no Google AdWords, com imagem de prévia e recurso de ampliação (lightbox).
   - **Caso 3 (Áudio WhatsApp #1 / Recomendação espontânea)**: Gravação em vídeo (~30s) reproduzindo áudio real com menção de agradecimento ao André, acompanhado de transcrição textual legível.
   - **Caso 4 (Áudio WhatsApp #2 / Parceria e Execução)**: Gravação em vídeo (~54s) reproduzindo áudio real de parceiro de negócios elogiando o serviço executado, acompanhado de transcrição textual legível.
3. **Interatividade de Lightbox**:
   - Ao interagir com qualquer um dos prints (clique ou teclado), um modal deve exibir a imagem em resolução legível, permitindo fechamento por botão `✕`, tecla `Escape` ou clique fora do diálogo.
4. **Player Multimídia Acessível**:
   - Os elementos de mídia de áudio/vídeo devem permitir reprodução e pausa sob demanda do usuário.
   - Não deve haver autoplay com som ativado (respeito aos padrões de navegação e acessibilidade).

---

## 4. Requisitos Não Funcionais (Guardrails G1–G8)

- **G1 (Acessibilidade)**: Navegação completa por teclado no lightbox e players; tags `alt` descritivas nas imagens; transcrição textual dos áudios disponível no DOM para leitores de tela; contraste de texto em conformidade WCAG AA.
- **G2 (Movimento)**: Respeito a `prefers-reduced-motion: reduce`, desabilitando transições e zooms automáticos sem ocultar conteúdo.
- **G3 (Estabilidade de layout)**: `aspect-ratio`, `width` e `height` explícitos em todas as imagens e vídeos para zelar por CLS = 0. Zero overflow horizontal em 390px, 768px e 1200px+.
- **G4 (Performance)**: Vídeos com `preload="metadata"` para preservar a banda do usuário e não impactar o LCP da página. Imagens otimizadas via Astro.
- **G5 (SEO)**: Sem quebra na hierarquia semântica de headings (`<h2>` mantido como título da seção).
- **G6 (Privacidade e Consentimento)**: Nenhum script invasivo ou telemetria de terceiros disparada pela interação sem o consentimento prévio do usuário.
- **G7 (Dependências)**: Utilização de CSS e Vanilla JS padrão sem adição de bibliotecas externas pesadas (sem sliders de terceiros ou bibliotecas de modal infladas).
- **G8 (Entrega)**: Sem commits ou deploys automáticos sem aprovação humana.

---

## 5. Fora de Escopo

- Alteração da headline principal da seção ("Resultados falam mais que qualquer promessa") e da lista de 3 benefícios do topo.
- Criação de sistema de upload dinâmico ou backend/CMS para novos depoimentos (a landing permanece estática em Astro 6).
- Adição de novos depoimentos além dos 4 comprovados nas fontes fornecidas.
- Inclusão de números de telefone reais ou dados sensíveis (PII não autorizada).

---

## 6. Critérios de Aceite

1. **CA-001 (Remoção total de dados sintéticos)**: O arquivo de teste e o bundle de produção não contêm os nomes fictícios "Roberto Almeida", "Mariana Costa" ou "Carlos Moura".
2. **CA-002 (Presença dos 4 ativos reais)**: A seção `#social-proof` renderiza exatamente 4 cards correspondentes aos 4 ativos de `docs/referencias/prova-social/`.
3. **CA-003 (Lightbox funcional)**: Clicar ou acionar via teclado qualquer miniatura de print abre o `<dialog>` com a imagem expandida, e pressionar `Escape` ou o botão de fechar fecha o modal.
4. **CA-004 (Transcrições presentes)**: Ambos os depoimentos em áudio possuem sua transcrição em texto acessível no DOM.
5. **CA-005 (Mídia não bloqueante)**: Todos os elementos `<video>` contêm os atributos `preload="metadata"` e `playsinline`.
6. **CA-006 (Zero Layout Shift)**: Mídias declaram dimensões e `aspect-ratio`, mantendo CLS = 0.
7. **CA-007 (Responsividade e overflow)**: Nenhuma barra de rolagem horizontal é gerada em viewports de 390px, 768px e 1200px.
8. **CA-008 (Testes e Build)**: `npm run verify` e a suíte completa de testes executam com 0 falhas.
