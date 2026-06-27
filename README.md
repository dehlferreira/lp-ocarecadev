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

Copie `.env.example` para `.env` e configure `WHATSAPP_NUMBER`, `GA_MEASUREMENT_ID` e `META_PIXEL_ID` conforme necessário.
