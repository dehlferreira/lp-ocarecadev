---
name: astro-implementation
description: Use ao implementar uma SPEC aprovada da landing Astro da OCARECADEV, ou uma correção de sustentação já triada — componentes .astro, CSS em global.css, scripts em src/scripts/, testes em test/. NÃO use sem SPEC ou triagem, para decidir arquitetura (ver technical-design) ou para aprovar Definition of Done (ver landing-quality-assurance).
---

# Implementação Astro

Menor mudança coesa que satisfaz a SPEC. Nada além dela.

## Antes de editar

Leia `AGENTS.md`, a SPEC **inteira** (inclusive a DoD), os ADRs que ela referencia, os testes em `test/` e os arquivos que vai tocar. Para scroll-driven animations, `guide.md` é normativo.

## Onde cada coisa mora

| Caminho                    | Conteúdo                                                     |
| -------------------------- | ------------------------------------------------------------ |
| `src/components/sections/` | seção da landing (Hero, Problem, Pricing…)                   |
| `src/components/ui/`       | componente reutilizável (Button, GlassCard, Icon…)           |
| `src/layouts/Layout.astro` | shell, `<head>`, meta, canonical                             |
| `src/pages/`               | rotas (`index.astro`, `robots.txt.ts`, `sitemap.xml.ts`)     |
| `src/scripts/`             | comportamento isolado (`scrollAnimations.js`, `tracking.js`) |
| `src/styles/global.css`    | tema, variáveis, `scroll-animate`, scrollytelling            |
| `src/assets/images/`       | assets otimizados (WebP), entregues pelo image-specialist    |
| `test/`                    | `node:test` em `.test.mjs`                                   |

Componente novo usado em 1 lugar → `sections/`. Usado em 2+ → `ui/`.

## Guardrails G1–G8 — como implementar

A enumeração canônica está em `AGENTS.md §Guardrails G1–G8`. Aqui está o que cada um exige **do código**:

| G | No código |
|---|---|
| **G1** | elemento semântico antes de `div`; `:focus-visible` com outline real, nunca `outline: none` sem substituto; `alt` em imagem informativa e `alt=""` em decorativa |
| **G2** | todo bloco de animação tem par em `@media (prefers-reduced-motion: reduce)` que restaura `opacity: 1` e neutraliza `transform` |
| **G3** | `width`/`height` (ou `aspect-ratio`) em toda imagem; `min-height: 100svh`, nunca `100vh`; conferir 390px antes de entregar |
| **G4** | sem `client:*` sem SPEC; CSS antes de JS; nenhum `<script>` sem `defer`/`type="module"` |
| **G5** | `<head>` só via `src/layouts/Layout.astro`; rota nova entra em `sitemap.xml.ts` |
| **G6** | tracking só atrás do gate de consentimento em `src/scripts/tracking.js`; valor real só via `PUBLIC_*` do env — placeholder no código, no teste e no relatório |
| **G7** | dependência nova = pare e devolva ao `tech-lead` |
| **G8** | não commita, não faz push, não faz deploy sem autorização explícita do usuário |

## Testes

`node:test`, arquivos `test/*.test.mjs`. Adicione ou atualize teste sempre que a SPEC criar contrato verificável (comportamento de tracking, presença de meta tag, estrutura de rota, invariante de CSS).

## Verificação obrigatória

```bash
npm run check   # astro check — tipos e diagnósticos
npm run build   # build de produção
npm test        # node --test test/*.test.mjs
```

Os três, sempre, antes do handoff. Reporte a saída real — inclusive falha. Nunca afirme "passou" sem ter visto a saída.

## Erros comuns

| Erro                                             | Correção                                         |
| ------------------------------------------------ | ------------------------------------------------ |
| Corrigir algo fora do escopo "já que estava ali" | Registrar em `Riscos/Bloqueios`, não implementar |
| Adicionar lib para resolver o que CSS resolve    | Verificar `guide.md` e os ADRs primeiro          |
| `100vh` em seção full-screen                     | `100svh`                                         |
| Animação sem guard de `prefers-reduced-motion`   | Adicionar o guard e garantir conteúdo visível    |
| Marcar a DoD como concluída                      | Só o `qa-engineer` marca                         |
| Dizer "tudo funcionando" sem rodar os comandos   | Rodar os três e colar o resultado                |

## Handoff

Arquivos alterados, comando + resultado, regressões manuais verificadas, limitações → `qa-engineer`, no formato de `skills/compact-agent-communication/SKILL.md`. Teste que falhou vai em texto completo, não comprimido.

Assinale apenas "implementado". Aceite é do QA.
