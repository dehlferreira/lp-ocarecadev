# OCARECADEV — Landing Page

Landing page de conversão da OCARECADEV, construída com **Astro 6** (SSG estático), CSS vanilla e animações scroll-driven nativas.

## Documentação

A documentação técnica do projeto está em [`docs/`](docs/):

| Pasta                        | Conteúdo                                                        |
| ---------------------------- | --------------------------------------------------------------- |
| [`docs/prds/`](docs/prds/)   | Requisitos de produto (negócio, design, animações, performance) |
| [`docs/adrs/`](docs/adrs/)   | Decisões arquiteturais (Astro, CSS, scrollytelling, tracking)   |
| [`docs/specs/`](docs/specs/) | Especificações de implementação com Definition of Done          |
| [`guide.md`](guide.md)       | Referência de boas práticas para CSS Scroll-Driven Animations   |

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

Para configurar o ambiente local, copie `.env.example` para `.env` e preencha os valores autorizados para o ambiente que será testado. No provedor de hospedagem, cadastre essas mesmas quatro variáveis como variáveis públicas do projeto antes de criar o build e confirme que os valores estão disponíveis no preview ou na produção correspondente. Os valores deste repositório são placeholders seguros; nunca registre credenciais reais, dados pessoais ou rótulos reais em commits.

No GA4, crie ou selecione a propriedade e o fluxo Web, depois vincule a propriedade ao Google Ads. Marque `generate_lead` como evento principal (key event) no GA4. No Google Ads, importe esse evento do GA4 como conversão com categoria `Lead` e contagem `One`.

No Meta Events Manager, crie o Meta Pixel e configure a otimização para o evento padrão `Lead`. Preserve os parâmetros de atribuição UTM (`utm_*`), `gclid` e `fbclid` na navegação e nos links de campanha; eles são necessários para validar a origem dos leads.

Validação manual no navegador:

```text
1. Open a private window and load the production or preview URL.
2. Reject cookies; confirm DevTools Network has no requests to googletagmanager.com, google-analytics.com, googleadservices.com or connect.facebook.net.
3. Reopen preferences, accept cookies and reload once.
4. In GA4 DebugView, confirm page_view, view_item_list, scroll_depth and generate_lead.
5. Click each plan; confirm select_item includes its plan and exactly one generate_lead occurs.
6. In Meta Test Events or Pixel Helper, confirm PageView, ViewContent and Lead.
7. In Google Ads conversion diagnostics, confirm the Lead action receives test activity after account linking.
```

Execute essa sequência primeiro com os placeholders em um preview seguro. Repita com IDs reais somente em um ambiente de preview ou produção autorizado. Registre no pull request ou na release note o resultado (passou/falhou) da recusa e aceitação de cookies, de cada CTA, dos três valores de plano e de cada debugger de provedor. Antes de ativar anúncios, confirme que a rota e o link da política de privacidade de produção estão disponíveis. A validação deve mostrar um lead por CTA de WhatsApp e nenhum tráfego de fornecedor após a recusa de consentimento.
