# Especificação: Tracking, consentimento e preparação para mídia

**Data:** 2026-08-30  
**Status:** aprovada para planejamento

## Objetivo

Medir visitas, origem de tráfego e intenção de contratação na landing page, criando uma conversão confiável para campanhas de Google Ads e Meta Ads. O site deve continuar rápido, funcionar sem rastreadores quando o visitante recusar cookies e permitir a inclusão dos IDs das plataformas sem alterar código.

## Decisão de arquitetura

Usar integração direta com GA4, Google Ads e Meta Pixel, com carregamento não bloqueante por Partytown, já adotado no projeto. Não usar Google Tag Manager nem infraestrutura server-side nesta fase.

Os scripts de medição somente podem ser ativados depois do consentimento do visitante para cookies de análise e marketing. A preferência deve ficar armazenada no navegador e poder ser alterada posteriormente por um controle no rodapé.

## Configuração

As integrações são opcionais e configuradas por variáveis de ambiente públicas:

- `PUBLIC_GA_ID`: ID da propriedade/stream GA4 (`G-...`).
- `PUBLIC_GOOGLE_ADS_ID`: ID da conta Google Ads (`AW-...`).
- `PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`: rótulo da conversão de lead no Google Ads.
- `PUBLIC_META_PIXEL_ID`: ID do Pixel Meta.

Valores ausentes ou placeholders desativam somente a respectiva integração, sem erro de build ou falha na landing. Os valores reais não são versionados; um arquivo de exemplo documenta os nomes necessários.

## Componentes

### Gerenciador de consentimento

Exibe um banner com ações equivalentes de aceitar e recusar. Não há aceite tácito, opções pré-marcadas ou carregamento antecipado de tags de marketing. Registra a preferência localmente; um botão no rodapé reabre o painel para revogação ou alteração.

### Camada de tracking

Centraliza carregamento das plataformas, normalização dos eventos e proteção contra configurações ausentes. Oferece uma função de envio de evento independente das bibliotecas de cada fornecedor.

Os CTAs declaram a intenção por atributos `data-track-*` (por exemplo, tipo, local e plano). A camada lê esses atributos; não depende de nomes de classes ou IDs de aparência.

### Layout e CTAs

O layout hospeda scripts e a camada de consentimento. Os CTAs recebem metadados consistentes para que qualquer novo botão possa entrar na medição com uma alteração declarativa.

## Funil de eventos

| Ação | GA4 | Google Ads | Meta Pixel | Observações |
| --- | --- | --- | --- | --- |
| Visita após consentimento | `page_view` | elegível para remarketing | `PageView` | mede audiência e origem UTM/gclid/fbclid |
| Visualização da seção de planos | `view_item_list` | — | `ViewContent` | disparada uma vez por visita quando a seção entra em tela |
| CTA que rola até os planos | `select_content` | — | — | mede navegação; não é lead |
| CTA de plano que abre WhatsApp | `select_item` e `generate_lead` | conversão `Lead` | `Lead` | envia nome/local/valor de referência do plano |
| CTA genérico que abre WhatsApp | `generate_lead` | conversão `Lead` | `Lead` | conversão principal sem plano |
| Scroll 25%, 50%, 75%, 90% | `scroll_depth` customizado | — | — | diagnóstico de conteúdo, uma vez por marco |

`generate_lead` é o único evento marcado como evento-chave no GA4 e como conversão primária no Google Ads. O Google Ads deve contar **uma** conversão por clique de anúncio, prática indicada para leads. `select_item`, scroll e cliques internos não otimizam lances.

O clique de plano gera tanto a intenção (`select_item`) quanto o lead (`generate_lead`), antes de encaminhar ao WhatsApp. O botão que somente leva até a seção de planos nunca dispara lead.

Parâmetros permitidos incluem `cta_location`, `plan_name`, `plan_value`, `currency` e `event_id` para diagnóstico/deduplicação. Não enviar telefone, nome, mensagem do WhatsApp, e-mail ou outro dado pessoal aos pixels.

## Fluxo

1. A página abre sem carregar tags de análise/marketing.
2. O visitante escolhe aceitar ou recusar no banner.
3. Ao aceitar, a camada inicializa apenas as plataformas configuradas e registra a visita.
4. Interações qualificadas chamam a camada central de tracking.
5. A camada envia o equivalente compatível a cada plataforma e evita repetição do mesmo evento.
6. Em um clique que abre WhatsApp, o envio é iniciado antes da navegação, com fallback que não retém a navegação por tempo perceptível.

## Configuração de anúncios

### Google

1. Criar propriedade GA4 e stream web para o domínio publicado.
2. Criar e informar `PUBLIC_GA_ID`.
3. Vincular GA4 ao Google Ads.
4. Marcar `generate_lead` como evento-chave no GA4 e importar/criar a conversão no Google Ads com categoria Lead e contagem Uma.
5. Informar ID e label da conversão nas variáveis de ambiente.
6. Habilitar auto-tagging e manter UTMs nas campanhas quando aplicável.

### Meta

1. Criar Pixel no Events Manager e informar `PUBLIC_META_PIXEL_ID`.
2. Validar `PageView`, `ViewContent` e `Lead` em Test Events.
3. Criar público de visitantes e de leads, excluindo leads das campanhas de prospecção quando houver volume suficiente.
4. Usar `Lead` como evento de otimização; não tratar clique de rolagem ou visualização de plano como conversão.

## Falhas e privacidade

- Recusa ou revogação de consentimento impede novos envios aos provedores de marketing.
- Bloqueadores de anúncio, rede indisponível e bibliotecas de terceiros falham silenciosamente: CTAs e navegação continuam normais.
- A primeira versão mede o clique que abre WhatsApp, não a conversa iniciada ou venda concluída. A qualificação e venda podem ser integradas depois por CRM/Conversões Offline, caso exista uma fonte autorizada e confiável.
- A política de privacidade deve informar finalidades, fornecedores e como revisar a preferência de cookies.

## Validação e critérios de aceite

1. Sem consentimento, nenhuma requisição a GA, Google Ads ou Meta é efetuada.
2. Com consentimento, uma visita registra exatamente um `page_view`/`PageView` por carregamento.
3. CTA de rolagem emite somente `select_content`.
4. CTA genérico de WhatsApp emite somente o lead correspondente.
5. CTA de plano emite `select_item` e uma conversão Lead, com o plano correto.
6. Marcos de scroll não se repetem na mesma visita.
7. Eventos são observáveis em GA4 DebugView, Meta Test Events/Pixel Helper e diagnóstico de conversões do Google Ads.
8. `npm run check`, testes existentes e build passam; a revisão de performance confirma que o carregamento de terceiros permanece não bloqueante.

## Fora de escopo

- Google Tag Manager, server-side GTM e Meta Conversions API.
- CRM, atribuição de conversas do WhatsApp, qualificação de lead e importação de vendas offline.
- Criação, publicação ou gestão de campanhas e orçamento de mídia.
