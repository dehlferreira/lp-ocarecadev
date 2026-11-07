# SPEC-016: Dados estruturados para SEO local

**Status:** [ ] Pendente | [x] Em Progresso | [ ] Implementada

> **⚠️ INSTRUÇÃO PARA AGENTES DE IA:**
> Durante a execução desta especificação, você deve consultar este arquivo. Ao finalizar a
> implementação técnica, é sua obrigação retornar a este documento, marcar as caixas do
> `Definition of Done` (DoD) que foram concluídas e atualizar o **Status** no topo para
> `[x] Implementada`.

## 1. Contexto e Objetivo

A OCARECADEV teve o Perfil da Empresa no Google verificado em 2026-11-05 (categoria Webdesigner, área de atendimento ABC + São Paulo, sem endereço público). O JSON-LD do `Layout.astro` (registrado em SPEC-013, item 11) tinha só nome, descrição genérica, `areaServed: 'Brasil'` e dois `sameAs`. Esta SPEC enriquece o `ProfessionalService` para o Google ligar site, perfil e redes à mesma entidade e associar a marca à região de Santo André.

Trilha: sustentação/SEO técnico sem PRD novo (`skills/maintenance-triage/SKILL.md`). Não muda copy visível, oferta, preço, seções nem tracking: o schema apenas descreve dados que já estão públicos na página (planos, preços, WhatsApp) ou no Perfil da Empresa (cidade, área, horário). Relacionados: SPEC-013, guardrail G5.

## 2. Requisitos Técnicos

### 2.1. `src/layouts/Layout.astro` — `ProfessionalService`

- Adicionar: `alternateName`, `telephone`, `email`, `priceRange`, `address` (só `addressLocality`/`addressRegion`/`addressCountry`), `areaServed` (8 cidades como `City` + `Country` Brasil), `openingHoursSpecification` (seg–sáb 09:00–18:00), `founder` (`Person`), `knowsAbout`, `hasOfferCatalog`.
- `logo` passa a apontar para `/images/logo-vertical.png` (antes usava a imagem OG).
- **Restrição:** não publicar `streetAddress` — negócio de área de atendimento com endereço residencial oculto no Google.
- `WebSite` e `FAQPage` permanecem inalterados.

### 2.2. Coerência com a página

- Preços do `hasOfferCatalog` espelham `src/components/sections/Pricing.astro` (597, 997, a partir de 2.497). Mudou o preço visível, muda o schema na mesma entrega.

### 2.3. Pendência

- Incluir o link público do Perfil da Empresa no Google em `officialProfiles` (`sameAs`) quando ele estiver indexado no Maps.

### 2.4. Correção 2026-11-06 — documentos para IAs (`public/llms.txt`, `public/index.md`)

- Estava errado: `index.md` anunciava "Plano Express a partir de R$ 997" e "Plano Pro R$ 1.997"; `llms.txt` citava planos "Express, Pro e Personalizado" e âncoras inexistentes (`#planos`, `#contato`). Nenhum dos dois citava a página de Santo André.
- Correção: planos, preços e prazos iguais a `Pricing.astro`/FAQ; âncoras reais (`#pricing`, `#faq`, `#modelos`, `#social-proof`); página `/criacao-de-sites-santo-andre/`; atendimento 100% online.
- Teste: `site-polish.test.mjs` exige os três preços visíveis nos dois documentos e proíbe os nomes/âncoras antigos.

### 2.5. Estratégia de teste

- `test/site-polish.test.mjs`: campos locais presentes, ausência de `streetAddress`, preços do schema iguais aos de `Pricing.astro`.
- Validação externa recomendada após deploy: Rich Results Test / Schema Markup Validator na URL de produção.

## 3. Definition of Done (DoD)

- [ ] `Layout.astro` contém os campos de §2.1 e não contém `streetAddress`.
- [ ] Teste de paridade de preços (§2.2) passa.
- [ ] `npm run check` sem erros.
- [ ] `npm run build` sem erros e `dist/index.html` contém o JSON-LD válido (parse JSON sem erro).
- [ ] `npm test` com 0 falhas.
- [ ] Link do Perfil da Empresa adicionado ao `sameAs` (§2.3).
- [ ] `llms.txt` e `index.md` com planos, preços e páginas reais (§2.4).
