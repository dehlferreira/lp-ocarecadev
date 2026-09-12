# PRD-004: Marketing, Ads e Tracking

## 🎯 Objetivo
A landing page OCARECADEV é o início de um funil de vendas direto para o WhatsApp. Para mensurar corretamente o Custo por Aquisição (CPA), o Custo por Lead (CPL), a taxa de abandono na jornada de leitura e a eficácia de cada elemento persuasivo, a página precisa estar 100% instrumentada no Google Analytics (GA4), Meta Ads e Google Ads, capturando com precisão onde o usuário clica, até onde rola e em que momento converte em lead.

## ⚙️ Variáveis de Ambiente (Segurança e Manutenção)
Todas as credenciais de serviços de terceiros devem ser parametrizadas via variáveis de ambiente (`.env`). Não devem existir IDs hardcoded no código nem no repositório (Guardrail G6).

Variáveis esperadas:
- `PUBLIC_GA_ID` (Measurement ID do GA4, formato `G-XXXXXXXXXX`)
- `PUBLIC_GOOGLE_ADS_ID` (ID do Google Ads, formato `AW-XXXXXXXXXX`)
- `PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` (Label da ação de conversão primária)
- `PUBLIC_META_PIXEL_ID` (ID numérico do Meta Pixel)
- `WHATSAPP_NUMBER` e `WHATSAPP_MESSAGE_DEFAULT`

## 📊 Estrutura do Funil e Eventos

### 1. Etapas do Funil de Conversão (GA4)
O funil principal de conversão no GA4 é composto pelas seguintes etapas sequenciais:
1. **Etapa 1 — Entrada / Visita:** `page_view` (carregamento inicial da página com consentimento).
2. **Etapa 2 — Engajamento / Leitura Inicial:** `scroll_depth` atingindo 25% e 50% (usuário passa da Hero e lê os problemas/solução).
3. **Etapa 3 — Interesse Aprofundado / Prova Social:** Interação com conteúdo de prova social ou scroll atingindo 75%.
4. **Etapa 4 — Consideração de Oferta:** `view_item_list` (usuário visualiza a tabela de planos/preços na seção `#pricing`) ou scroll atingindo 90%.
5. **Etapa 5 — Intenção Direta:** `select_item` (usuário clica em um plano específico na tabela de preços).
6. **Etapa 6 — Conversão / Fechamento:** `generate_lead` (clique em qualquer CTA de WhatsApp na página, encaminhando o visitante para contato comercial).

### 2. Eventos de Interação e Micro-Engajamento
Além do funil principal de lead, a página deve rastrear micro-interações para identificar pontos de interesse e abandono:
- **Hero CTA Primário vs Secundário:** Diferenciação clara entre cliques em "Quero uma landing page" (`hero_primary`) e "Ver como funciona" (`hero_secondary`).
- **Navegação do Header e Rodapé:** Rastreamento de cliques em links de ancoragem da barra superior e do rodapé (`nav_link`).
- **Prova Social Real:**
  - Clique em reprodução dos áudios de depoimentos de clientes (`social_audio_play`, com identificação do áudio/cliente).
  - Clique para abrir prints de conversa/resultados no lightbox (`social_print_view`, com identificação da imagem).
- **FAQ:** Abertura e fechamento das dúvidas frequentes (`faq_toggle`, identificando qual pergunta foi visualizada).
- **Rolagem e Abandono:** Marcos granulares de rolagem (`scroll_depth` a 25%, 50%, 75%, 90% e 100%) para diagnosticar em qual seção o visitante perde tração antes de converter.
- **Origem do Lead:** Todo evento de `generate_lead` deve identificar o ponto exato de origem na página (`hero`, `solution`, `pricing`, `quick_proof`, `cta_final`, `whatsapp_fab`).

### 3. Integrações de Anúncios (Meta e Google Ads)
- **Meta Ads (Facebook Pixel):**
  - `PageView` disparado no carregamento após consentimento.
  - `ViewContent` disparado ao visualizar os planos de preço.
  - `Lead` disparado no clique de encaminhamento para o WhatsApp.
- **Google Ads Tag:**
  - Ação de conversão primária do Google Ads disparada no clique de encaminhamento para o WhatsApp (`AW-.../label`).

## 🔄 Fluxo de Conversão
Ao invés de formulários, o redirecionamento é feito para o WhatsApp comercial. O evento de conversão (`generate_lead` / `Lead` / `conversion`) deve ser disparado de forma que o envio do dado seja garantido antes ou concorrentemente com a navegação para o WhatsApp.

## 🛡️ Critérios de Aceite
1. **Consentimento Explícito (G6):** Nenhum evento de GA4, Meta Pixel ou Google Ads dispara antes de o usuário aceitar os cookies no banner de consentimento; se o usuário recusar ou revogar, o envio cessa imediatamente.
2. **Identificação da Origem:** Todo evento de `generate_lead` transporta o parâmetro `cta_location` identificando unicamente a seção de onde o clique partiu.
3. **Diferenciação na Hero:** Cliques no botão primário e no botão secundário "Ver como funciona" na Hero são registrados como eventos observáveis distintos com identificador de localização.
4. **Interações de Prova Social e FAQ:** Reproduções de áudio, aberturas de lightbox de print e expansões de FAQ transmitem eventos de micro-engajamento com identificação do elemento interagido.
5. **Deduplicação de Scroll:** Cada marco de profundidade de rolagem (25%, 50%, 75%, 90%, 100%) dispara exatamente uma única vez por sessão/carregamento.
6. **Integridade de Variáveis (G6):** O código fonte não possui Measurement ID, Pixel ID ou IDs do Google Ads hardcoded; todos são consumidos a partir das variáveis `PUBLIC_*`.
7. **Performance e Acessibilidade (G1, G4):** A adição de listeners de rastreamento não bloqueia a thread principal, preserva a navegação por teclado e não interfere no comportamento padrão dos links.

## 🚫 Fora de Escopo
- Instalação de Google Tag Manager (GTM), rejeitado pela ADR-005 por penalizar a thread principal e os Core Web Vitals.
- Instalação de ferramentas de gravação de tela ou mapas de calor de terceiros (ex: Hotjar, Clarity, Microsoft Clarity) sem aprovação em ADR prévia.
- Coleta de dados pessoais identificáveis (PII) do visitante, tais como número de telefone digitado, endereço IP para armazenamento analítico ou geolocalização exata.
- Alteração no design visual dos componentes, layout ou copy já aprovados nas seções da landing page.

