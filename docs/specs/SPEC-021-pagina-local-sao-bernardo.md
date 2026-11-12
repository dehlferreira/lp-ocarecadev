# SPEC-021: Página local "Criação de sites em São Bernardo do Campo"

**Status:** [ ] Pendente | [x] Em Progresso | [ ] Implementada

> **⚠️ INSTRUÇÃO PARA AGENTES DE IA:** ao finalizar, marque o DoD concluído e atualize o Status. Só o QA aprova itens de DoD.

## 1. Contexto e Objetivo

Implementa PRD-012 reaproveitando a estrutura da SPEC-017. Sem ADR, sem dependência nova (G7).

## 2. Requisitos Técnicos

- Rota `src/pages/criacao-de-sites-sao-bernardo-do-campo.astro`: mesma composição da página de Santo André (Hero com slots, seções locais, Pricing, ModelsShowcase, SocialProof, About, FAQ por prop, CTA final), com copy própria.
- `data-track-location`: `local_sao_bernardo_hero`, `local_sao_bernardo_hero_secondary`, `local_sao_bernardo_final_cta`. G6: mesmo pipeline com consentimento.
- `Footer.astro`: link novo. `sitemap.xml.ts`: URL nova, prioridade 0.8 (G5). `public/llms.txt` e `public/index.md`: entrada nova.
- Guardrails tocados: G1, G3, G5, G6, G7.
- Testes: `test/local-page-sao-bernardo.test.mjs`.

## 3. Definition of Done (DoD)

- [ ] Rota gerada em `dist/criacao-de-sites-sao-bernardo-do-campo/index.html` com um único `<h1>`.
- [ ] Title, description e canonical conforme PRD-012 §4.
- [ ] `FAQPage` da rota contém as perguntas locais.
- [ ] Sitemap, rodapé, llms.txt e index.md com a URL.
- [ ] Sem overflow horizontal em 390px e 1280px.
- [ ] `npm run check` sem erros.
- [ ] `npm run build` sem erros.
- [ ] `npm test` com 0 falhas.
