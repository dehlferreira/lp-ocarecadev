# SPEC-020: Página do artigo "Quanto custa um site em 2026"

**Status:** [ ] Pendente | [ ] Em Progresso | [x] Implementada

## 1. Contexto
Implementa o PRD-011. Página de conteúdo única, sem criar estrutura de blog.

## 2. Requisitos Técnicos
1. `src/pages/quanto-custa-um-site.astro`: `<article>` com hero (H1, preços, foto `careca-explicando-precos`), seções Fatores, Custos, Barato que sai caro e Comparativo (tabela que vira um card por linha abaixo de 640px), `FAQ` com `faqItems` próprios e CTA final com `data-track-location="artigo_quanto_custa_final_cta"`.
2. Imagens em `src/assets/images/artigo-quanto-custa/*.webp` (1600px, via `astro:assets` com `widths`), hero com `fetchpriority="high"`.
3. `src/layouts/Layout.astro`: props opcionais `ogImagePath` e `ogImageAlt` (padrão = og-image atual). O `image` do `ProfessionalService` no JSON-LD continua sempre com a imagem padrão da marca.
4. `public/images/og-quanto-custa-um-site.jpg` (1200x630).
5. Link no rodapé, entrada no `sitemap.xml.ts` (prioridade 0.7), `llms.txt` e `index.md`.
6. `test/article-price.test.mjs`: título, OG, mensagem do WhatsApp, preços iguais aos de `Pricing.astro`, links.

Guardrails: G5 (JSON-LD só descreve dados públicos da página), G7 (sem dependência nova).

## 3. Definition of Done
- [x] Página gerada em `/quanto-custa-um-site/` com FAQPage no JSON-LD
- [x] Preços conferidos contra `Pricing.astro` por teste
- [x] `npm run verify` sem falhas
- [ ] Pedir indexação no Search Console depois do deploy
