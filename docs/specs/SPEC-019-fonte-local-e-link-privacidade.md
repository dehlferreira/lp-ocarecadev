# SPEC-019: Fonte Outfit local e link canônico da privacidade

**Status:** [ ] Pendente | [ ] Em Progresso | [x] Implementada

## 1. Contexto e Objetivo

Diagnóstico de 09/11/2026 (PageSpeed via Ubersuggest, celular): LCP 3,8 s e FCP 2,9 s. O único CSS externo é o do Google Fonts (`Outfit:400;600;700`), que bloqueia a renderização e exige conexão a dois domínios (`fonts.googleapis.com` e `fonts.gstatic.com`). O rodapé aponta para `/politica-de-privacidade` sem barra, gerando um redirecionamento até a URL canônica do sitemap.

Trilha: sustentação/performance sem PRD novo (`skills/maintenance-triage/SKILL.md`). Aprovado pelo André em 09/11/2026. Não muda copy, layout, oferta nem tracking. G7: nenhuma dependência nova (arquivos de fonte estáticos).

## 2. Requisitos Técnicos

1. `public/fonts/outfit-{400,600,700}.woff2`: gerados a partir dos TTF oficiais do brandkit V7 (Outfit 1.100, licença OFL), subset Latin + Latin-1 (cobre português), ~13 KB cada.
2. `src/styles/global.css`: `@font-face` para os 3 pesos com `font-display: swap`. Mesmos pesos de antes, então a renderização de 500/800/900 segue igual (o navegador usa o peso mais próximo, como já fazia).
3. `src/layouts/Layout.astro`: remover os `preconnect` e o `<link rel="stylesheet">` do Google Fonts; adicionar `preload` de `outfit-700.woff2` (títulos) e `outfit-400.woff2` (texto).
4. `src/components/sections/Footer.astro`: `href="/politica-de-privacidade/"`.
5. `test/local-font.test.mjs`: garante que não há Google Fonts, que os 3 arquivos existem com `@font-face` e que o rodapé usa a URL com barra.

## 3. Definition of Done

- [x] Nenhuma requisição a `fonts.googleapis.com` / `fonts.gstatic.com`
- [x] Visual igual (mesma família e pesos)
- [x] `npm run verify` sem falhas
- [ ] Medir LCP no celular de novo depois do deploy
