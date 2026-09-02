# PRD-004: Marketing, Ads e Tracking

## 🎯 Objetivo
A landing page OCARECADEV é o início de um funil de vendas. Para mensurar corretamente o Custo por Aquisição (CPA) e o Custo por Lead (CPL), a página precisa estar 100% instrumentada para plataformas de Ads e Analytics.

## ⚙️ Variáveis de Ambiente (Segurança e Manutenção)
Todas as credenciais de serviços de terceiros devem ser parametrizadas via variáveis de ambiente (`.env`). Não devem existir IDs hardcoded no código.

Variáveis esperadas:
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` (ou equivalente na stack escolhida)
- `NEXT_PUBLIC_GOOGLE_ADS_AW_ID`
- `NEXT_PUBLIC_META_PIXEL_ID`
- `WHATSAPP_NUMBER` e `WHATSAPP_MESSAGE_DEFAULT`

## 📊 Integrações Necessárias

### 1. Google Analytics (GA4)
- **Função:** Construção de funil e análise de comportamento.
- **Eventos a Mapear:** 
  - `page_view`
  - `scroll_depth` (25%, 50%, 75%, 100%)
  - `click_cta` (Identificando qual botão foi clicado: Ex: Express, Vende, Maquina)
  - `time_on_page` (Usuários que ficaram mais de 30 segundos).

### 2. Meta Ads (Facebook Pixel)
- **Função:** Otimização de campanhas no Instagram/Facebook e remarketing.
- **Eventos a Mapear:**
  - `PageView`
  - `Lead` / `Contact` (Disparado no clique final de redirecionamento para o WhatsApp).

### 3. Google Ads Tag
- **Função:** Otimização de campanhas de pesquisa e display (conversões).
- **Eventos a Mapear:**
  - Tag global do site configurada.
  - Evento de conversão específico (Snippet de evento) acionado nos botões do WhatsApp.

## 🔄 Fluxo de Conversão
Ao invés de formulários, o redirecionamento será para o WhatsApp. O evento de conversão ("Lead") deve ser disparado *antes* ou *simultaneamente* à abertura da nova aba do WhatsApp (usando `window.open(url, '_blank')`).
