# BRIEFING-007 - Modelo de nicho: advocacia / boutique jurídica (demo Martins & Associados)

## 1. Resumo Executivo

LP-demo em [https://brainartsolucoes.com.br/portfolio/advocacia](https://brainartsolucoes.com.br/portfolio/advocacia). Única com **serif no H1** (`font-serif`) e hero **slate-900** sobre página `bg-slate-50`: autoridade corporativa, M&A, patrimônio, discrição. Naming: carrossel **Law Firm**; página **Martins & Associados**. Title próprio: `Martins & Associados | Escritório de Advocacia | BrainArt`. **Não é cliente real confirmado.** Typo no lead: `Disrição` em vez de Discrição.

## 2. Fontes Analisadas

| Identificador | Tipo | Confiança | Limitações |
| --- | --- | --- | --- |
| `https://brainartsolucoes.com.br/portfolio/advocacia` | Site-demo | Parcial | Sem browser; HTML ~58 KB |
| Card home | JS | Completa | title “Advocacia”, subtitle “Law Firm”, desc “Autoridade Corporativa”, img `advogado1.jpg`, color terracotta |
| BRIEFING-001 | Showroom | Completa | |

Data: **2026-09-01**. Template, não case.

## 3. Objetivo Percebido do Site

Agendar **consultoria reservada** com sócios (não “orçamento de site”). Público: empresas e famílias de alto patrimônio. OAB/ética: a demo **não** mostra número de registro — template OCARECADEV precisará de dados reais do cliente.

## 4. Mapa de Páginas e Seções

IDs: `atuacao`, `diferenciais`, `equipe`, `contato`. Header `absolute top-0` `z-50 py-6` (sobre o hero escuro). Nav: Áreas de Atuação, Diferenciais, Nossa Equipe, Contato.

Fluxo: Hero `pt-32 pb-20 lg:pt-48` `bg-slate-900 text-white` → `#atuacao` (3 áreas) → `#diferenciais` (lista + “25+ Anos”) → `#equipe` (2 sócios + quote anônima “CEO, Grupo Multinacional…”) → FAQ → `#contato` “Assegure Seu Legado”.

Overlays: FAB + Cookie. Sem UrgencyToast. CTAs: “Consultoria Sigilosa”, “Agendar Consulta”, “Conheça Nossas Áreas”, “Solicitar Contato Confidencial” — mix de `#contato` e botões.

## 5. Estrutura de Conteúdo

**H1:** `Proteção Patrimonial e Estratégia Empresarial`

**Lead:** alta complexidade, corporações e famílias; “Disrição” (erro).

**Áreas:** Direito Societário e M&A; Planejamento Patrimonial; Contencioso Estratégico.

**Diferenciais:** sócios no atendimento; 20+ anos; sigilo; visão de negócios. Badge “25+ Anos De Tradição Jurídica”.

**Equipe:** Dr. Roberto Martins (M&A); Dra. Helena Costa (sucessório/holdings). Fotos `advogado1.jpg` / `advogado2.jpg`.

**Quote:** atribuição genérica (CEO multinacional de logística) — **não** nomeado; risco de parecer prova falsa.

**FAQ:** foco corporativo; clientes internacionais; sigilo “nível militar” (hiperbólico).

**Sem preços.** Sem form. WhatsApp da agência no FAB.

## 6. Sistema Visual

### 6.1 Cores

**Confirmado:** `bg-slate-50 text-slate-800`; hero `bg-slate-900 text-white`; selection `bg-amber-600 text-white`; acento amber Tailwind (não o `#c39738` da home, mas família âmbar). Sóbrio institucional.

### 6.2 Tipografia

H1 `text-5xl lg:text-7xl font-serif leading-tight mb-8` — único demo com serif explícito. Corpo sans. Tom editorial jurídico.

**Inferido:** serif = Georgia/sistema ou face não extraída além de `font-serif`.

### 6.3 Layout e Grid

Hero com padding alto (header absoluto). Áreas em cards. Equipe 2 colunas **inferido**. Página clara após o hero (não dark full-page).

### 6.4 Imagens, Videos e Iconografia

- `/portfolio/advocacia/advogado1.jpg` (carrossel + sócio)
- `advogado2.jpg`
- `og-image.jpg`
- Sem Unsplash, sem vídeo
- Ícones de área (não extraídos um a um)

### 6.5 Componentes

Header overlay no hero. Botões “sigilosos”. Cards de área. FAQ. FAB verde (tensão com paleta slate/amber — advocacia costuma evitar verde WhatsApp no chrome; ainda assim a fonte usa).

## 7. Interações e Animações

Poucas classes de hover agressivo vs tattoo/pet. FAB global. Accordion FAQ. Reduced-motion pouco relevante nesta página (pouco motion próprio).

## 8. Responsividade

Hero `lg:pt-48`. H1 `5xl/7xl`. Header absoluto: risco de overlap em mobile — **não confirmado**. `min-h-screen` no wrapper.

## 9. Tom de Voz e Conteúdo

Formal, legado, discrição, “boutique”, anti-escala industrial. Hiperbole de segurança da informação. Pessoas com Dr./Dra. (no Brasil, uso de “Doutor” é cultural; OAB real exigiria nome e inscrição).

## 10. Padrões Reutilizáveis para o Designer

Receita Express advocacia:

1. Hero escuro + corpo claro (autoridade → leitura).
2. H1 serif, benefício jurídico (patrimônio/estratégia), não “somos o melhor escritório”.
3. 3 áreas no máximo no Express.
4. Bloco de sócios com foto + bio curta (nicho exige face).
5. Depoimento **anônimo ou com autorização** — não inventar CEO multinacional.
6. FAQ de sigilo e público-alvo (filtra causa trabalhista/consumidor se o escritório não atende).
7. CTA “consulta reservada” WhatsApp, linguagem sóbria.
8. Paleta slate + um metal (âmbar/ouro velho), não roxo pet.

Carrossel: label “Advocacia”, não “Law Firm”; nome do modelo nosso.

## 11. Pontos de Atenção

- Law Firm vs Martins & Associados.
- Quote sem pessoa identificável.
- “Nível militar” e “25+ anos” são claims de demo.
- Regulamentação publicitária da advocacia (provimento OAB) — o PO deve restringir superlativos no PRD do template.
- Typo Disrição.

## 12. Limitações da Análise

Sem screenshot do hero. Família serif exata não confirmada. Fotos de “advogados” podem ser stock.

## 13. Checklist para o Próximo Agente

- [ ] Nomes, OAB e fotos **do cliente**, nunca os da demo.
- [ ] Corrigir tom: sem claims militares inventados.
- [ ] WhatsApp env; CTA discreto.
- [ ] Contraste H1 branco em slate-900 (provavelmente ok).
- [ ] Não usar “Law Firm” em português da UI OCARECADEV.
