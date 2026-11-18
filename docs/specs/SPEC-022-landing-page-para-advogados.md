# SPEC-022: Página "Landing page para advogados"

**Status:** [ ] Pendente | [x] Em Progresso | [ ] Implementada

> **⚠️ INSTRUÇÃO PARA AGENTES DE IA:** ao finalizar, marque o DoD concluído e atualize o Status. Só o QA aprova itens de DoD.

## 1. Contexto e Objetivo

Implementa PRD-013 reaproveitando a composição das páginas locais (SPEC-017 / SPEC-021). Página de nicho, não local. Sem ADR, sem dependência nova (G7).

## 2. Requisitos Técnicos

- Rota `src/pages/landing-page-para-advogados.astro`: Hero com slots, seções do nicho (busca do cliente, o que entra na landing, regras da OAB, Modelo Advocacia, processo online), Pricing, SocialProof, About, FAQ por prop, CTA final.
- Modelo Advocacia: reusa `src/assets/images/modelo-advocacia.webp` via `astro:assets` com dimensões explícitas (G3), link externo com `rel="noopener"` e rótulo "Modelo de demonstração".
- `data-track-location`: `lp_advogados_hero`, `lp_advogados_hero_secondary`, `lp_advogados_modelo`, `lp_advogados_final_cta`. G6: mesmo pipeline com consentimento.
- `Footer.astro`: link novo. `sitemap.xml.ts`: URL nova, prioridade 0.8 (G5). `public/llms.txt` e `public/index.md`: entrada nova.
- Guardrails tocados: G1, G3, G5, G6, G7.
- Testes: `test/niche-page-advogados.test.mjs`.

## 3. Definition of Done (DoD)

- [ ] Rota gerada em `dist/landing-page-para-advogados/index.html` com um único `<h1>`.
- [ ] Title, description e canonical conforme PRD-013 §4.
- [ ] `FAQPage` da rota contém as perguntas do nicho, incluindo Provimento 205/2021.
- [ ] Sitemap, rodapé, llms.txt e index.md com a URL.
- [ ] Sem overflow horizontal em 390px e 1280px.
- [ ] `npm run check` sem erros.
- [ ] `npm run build` sem erros.
- [ ] `npm test` com 0 falhas.
