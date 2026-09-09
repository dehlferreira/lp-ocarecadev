# OCARECADEV — Landing Page

Landing page de conversão da OCARECADEV, construída com **Astro 6** (SSG estático), CSS vanilla e animações scroll-driven nativas.

## Documentação

A documentação técnica do projeto está em [`docs/`](docs/):

| Pasta                          | Conteúdo                                                        |
| ------------------------------ | --------------------------------------------------------------- |
| [`AGENTS.md`](AGENTS.md)       | Protocolo de agentes, guardrails G1–G8 e ponte com o template   |
| [`docs/prd/`](docs/prd/)       | Requisitos de produto (negócio, design, animações, performance) |
| [`docs/adr/`](docs/adr/)       | Decisões arquiteturais (Astro, CSS, scrollytelling, tracking)   |
| [`docs/specs/`](docs/specs/)   | Especificações de implementação com Definition of Done          |
| [`docs/referencias/`](docs/referencias/) | Copy oficial e material de marca                       |
| [`guide.md`](guide.md)         | Referência de boas práticas para CSS Scroll-Driven Animations   |

## Estrutura

```text
src/
├── components/
│   ├── sections/   # Seções da landing (Hero, Problem, Pricing, etc.)
│   └── ui/         # Componentes reutilizáveis (Button, GlassCard, Icon)
├── layouts/        # Layout principal
├── pages/          # Rotas (index.astro)
├── scripts/        # scrollAnimations.js (Hero dissolve + fallback IO)
└── styles/         # global.css (tema, scroll-animate, scrollytelling)
```

## Comandos

| Comando           | Ação                               |
| ----------------- | ---------------------------------- |
| `npm install`     | Instala dependências               |
| `npm run dev`     | Servidor local em `localhost:4321` |
| `npm run build`   | Build de produção em `./dist/`     |
| `npm run preview` | Preview do build local             |

## Variáveis de ambiente

Copie `.env.example` para `.env` e configure os quatro identificadores públicos de tracking conforme necessário:

- `PUBLIC_GA_ID`
- `PUBLIC_GOOGLE_ADS_ID`
- `PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`
- `PUBLIC_META_PIXEL_ID`

## Tracking e anúncios

Para configurar o ambiente local, copie `.env.example` para `.env` e preencha os valores autorizados para o ambiente que será testado. No provedor de hospedagem, cadastre essas mesmas quatro variáveis como variáveis públicas do projeto antes de criar o build e confirme que os valores estão disponíveis no preview ou na produção correspondente. `replace_with_conversion_label` é somente um placeholder inválido e não dispara conversões. Nunca registre IDs reais, dados pessoais ou rótulos reais em commits.

No GA4, crie ou selecione a propriedade e o fluxo Web, informe o Measurement ID `G-...` em `PUBLIC_GA_ID`, vincule a propriedade ao Google Ads e marque `generate_lead` como evento principal (key event) para relatórios.

O caminho de conversão usado pelo runtime é a **conversão direta primária do Google Ads**. Em Google Ads, crie uma ação de conversão de site com categoria `Lead`, contagem `One` e otimização primária. Copie o Google tag ID `AW-...` para `PUBLIC_GOOGLE_ADS_ID` e somente o conversion label dessa ação para `PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`; o runtime envia `generate_lead` à GA4 e, separadamente, `gtag('event', 'conversion')` com `send_to=AW-ID/label`. Para não duplicar otimização e relatórios, não importe o mesmo `generate_lead` da GA4 como outra conversão primária. Se necessária para comparação, mantenha a conversão importada da GA4 como **secundária**, apenas para observação.

No Meta Events Manager, crie o Meta Pixel e configure a otimização para o evento padrão `Lead`. Preserve os parâmetros de atribuição UTM (`utm_*`), `gclid` e `fbclid` na navegação e nos links de campanha; eles são necessários para validar a origem dos leads.

### Proxy do Meta para o Partytown

O Pixel da Meta executa no worker do Partytown. Como `https://connect.facebook.net/en_US/fbevents.js` não oferece os cabeçalhos CORS necessários para esse carregamento direto, a configuração `resolveUrl` reescreve somente esse script para a rota same-origin `/partytown-proxy?url=...`.

Essa rota é um requisito da hospedagem e não é criada pelo build estático do Astro. Antes de habilitar o Pixel, configure no CDN/provedor um reverse proxy que:

- aceite somente `GET` para URLs HTTPS cujo host seja exatamente `connect.facebook.net`;
- encaminhe a URL recebida no parâmetro `url`, preserve o tipo de conteúdo JavaScript e devolva uma resposta same-origin utilizável pelo worker;
- rejeite outros hosts, métodos e esquemas para não criar um proxy aberto;
- não registre parâmetros de campanha ou outros dados do visitante além do mínimo operacional necessário.

Sem essa rota, apenas o Meta Pixel fica indisponível; GA4, Google Ads e a navegação da landing continuam funcionando. A criação da regra no provedor e a validação com IDs reais permanecem atividades de pré-lançamento fora deste repositório.

Validação manual no navegador:

```text
1. Open a private window and load the production or preview URL.
2. Reject cookies; confirm DevTools Network has no requests to googletagmanager.com, google-analytics.com, googleadservices.com or connect.facebook.net.
3. Reopen preferences and accept cookies; confirm `/partytown-proxy` returns the Meta script successfully, then reload once.
4. In GA4 DebugView, confirm page_view, view_item_list, scroll_depth and generate_lead.
5. Click each plan; confirm select_item includes its plan and exactly one generate_lead occurs.
6. In Meta Test Events or Pixel Helper, confirm PageView, ViewContent and Lead.
7. In Google Ads conversion diagnostics, confirm the Lead action receives test activity after account linking.
```

Execute essa sequência primeiro com os placeholders em um preview seguro. Repita com IDs reais somente em um ambiente de preview ou produção autorizado. Registre no pull request ou na release note o resultado (passou/falhou) da recusa, aceitação e revogação de cookies, de cada CTA, dos três valores de plano e de cada debugger de provedor. A publicação de uma política de privacidade que descreva finalidades, Google e Meta e a disponibilização do respectivo link são **pré-requisito de lançamento** antes de ativar anúncios. A validação deve mostrar um lead por CTA de WhatsApp, uma única `page_view` por carregamento e nenhum novo tráfego de fornecedor após a revogação de consentimento.
