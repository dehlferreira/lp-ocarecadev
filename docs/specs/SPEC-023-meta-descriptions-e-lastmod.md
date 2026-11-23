# SPEC-023: Meta descriptions curtas e `lastmod` no sitemap

**Status:** [ ] Pendente | [x] Em Progresso | [ ] Implementada

> **⚠️ INSTRUÇÃO PARA AGENTES DE IA:** ao finalizar, marque o DoD concluído e atualize o Status. Só o QA aprova itens de DoD.

## 1. Contexto e Objetivo

Sustentação (sem PRD novo, `skills/maintenance-triage/`): revisão do Search Console em 20/11/2026. Os PRDs 010, 012 e 013 não fixam o texto da description, então encurtar não muda comportamento aprovado.

- Descriptions acima de ~160 caracteres são cortadas no resultado do Google: Santo André (173), São Bernardo (183) e advogados (199).
- O sitemap não tinha `<lastmod>`, então o Google não sabia quais páginas mudaram.

## 2. Requisitos Técnicos

- Descriptions de `criacao-de-sites-santo-andre.astro`, `criacao-de-sites-sao-bernardo-do-campo.astro` e `landing-page-para-advogados.astro` com até 155 caracteres, mantendo cidade/nicho, WhatsApp e "R$ 597".
- `src/pages/sitemap.xml.ts`: `<lastmod>` (AAAA-MM-DD) em cada URL, com a data da última mudança relevante no conteúdo principal da página. Quem mudar o texto de uma página atualiza a data dela.
- Guardrails tocados: G5. Sem dependência nova (G7).
- Testes: `test/seo-descriptions-lastmod.test.mjs`.

## 3. Definition of Done (DoD)

- [ ] As três descriptions com até 155 caracteres; nenhuma página com mais de 160.
- [ ] `/sitemap.xml` no build com `<lastmod>` válido em todas as URLs.
- [ ] `npm run check` sem erros.
- [ ] `npm run build` sem erros.
- [ ] `npm test` com 0 falhas.
