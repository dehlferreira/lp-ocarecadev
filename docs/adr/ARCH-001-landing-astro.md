# ARCH-001 — Arquitetura da landing OCARECADEV

Mapa da arquitetura **já decidida**. Não abre decisão nova. Detalhe normativo está nos ADRs listados.

## Decisões vigentes

| ADR | Decisão |
| --- | --- |
| `docs/adr/ADR-001-framework-frontend.md` | Astro (SSG estático) |
| `docs/adr/ADR-002-estilizacao.md` | CSS vanilla |
| `docs/adr/ADR-003-biblioteca-animacoes.md` | scroll-driven nativo; `guide.md` normativo |
| `docs/adr/ADR-004-hospedagem-deploy.md` | hospedagem estática |
| `docs/adr/ADR-005-gerenciamento-tracking.md` | consentimento + GA4 / Ads / Meta |
| `docs/adr/ADR-006-arquitetura-pastas.md` | `src/components/{sections,ui}`, `layouts`, `pages`, `scripts`, `styles`, `assets` |
| `docs/adr/ADR-007-tema-projeto.md` | tema dark, acento `#00FF9D` |
| `docs/adr/ADR-008-estrutura-funil-pas.md` | funil PAS |
| `docs/adr/ADR-009-destaque-palavras-chave.md` | destaque de palavras-chave na copy |
| `docs/adr/ADR-010-geracao-imagens-ia.md` | imagens WebP, sem texto embutido |
| `docs/adr/ADR-011-scrollytelling-pinned-scroll.md` | scrollytelling pinned |

## Código

Landing em `src/pages/index.astro`. Shell em `src/layouts/Layout.astro`. Tema e movimento em `src/styles/global.css`. Tracking em `src/scripts/tracking.js`.

## Features posteriores (sem ADR novo)

| SPEC | Aplica |
| --- | --- |
| `docs/specs/SPEC-011-modelos-fab-escassez.md` | PRD-007; ADR-001, 002, 003, 005, 006. Sem ADR-012. |

## Próximo número

Novo ADR: `ADR-012`. Nova SPEC: `SPEC-012`. Ver `docs/specs/SPEC-INDEX-001-landing-existente.md`.
