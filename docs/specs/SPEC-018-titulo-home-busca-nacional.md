# SPEC-018: Título e descrição da home para busca nacional

**Status:** [ ] Pendente | [ ] Em Progresso | [x] Implementada

## 1. Contexto e Objetivo

A home atende o Brasil todo (a busca local fica com `/criacao-de-sites-santo-andre/` e o Perfil da Empresa). O título atual, "OCARECADEV | Landing Pages Estratégicas para Negócios", usa um termo que quase ninguém pesquisa. Volume mensal no Brasil (Ubersuggest, 09/11/2026): "criação de site profissional" 390, "criar site para empresa" 170, "landing page preço" 140.

Trilha: sustentação/SEO sem PRD novo (`skills/maintenance-triage/SKILL.md`). Aprovado pelo André em 09/11/2026. Não muda copy visível, oferta, preço, seções nem tracking.

## 2. Requisitos Técnicos

`src/pages/index.astro`:
- `title` → `Criação de Sites e Landing Pages para Negócios | OCARECADEV` (palavra-chave no começo, marca no fim).
- `description` → `Criação de sites e landing pages para negócios de todo o Brasil: oferta clara, página rápida e botão direto para o seu WhatsApp. Planos a partir de R$ 597.` (preço real do plano Express).

Sem região na home (decisão do André).

## 3. Definition of Done

- [x] Título e descrição alterados só na home
- [x] Página de Santo André inalterada
- [x] `npm run verify` sem falhas
