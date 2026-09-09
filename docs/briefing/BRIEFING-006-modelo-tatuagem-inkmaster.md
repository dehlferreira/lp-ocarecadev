# BRIEFING-006 - Modelo de nicho: estúdio de tatuagem (demo InkMaster)

## 1. Resumo Executivo

LP-demo em [https://brainartsolucoes.com.br/portfolio/tatuagem](https://brainartsolucoes.com.br/portfolio/tatuagem). Visual **street/black**: `bg-zinc-950`, H1 gigante `12vw`, marquee de estilos (FINE LINE BLACKWORK…), galeria de trabalhos, tom confrontador (“sua pele não é rascunho”). Naming estável: **InkMaster** no card e na página. **Não é cliente real confirmado.** Title HTML genérico da agência. HTML é o maior das demos (~111 KB) por causa do marquee repetido.

## 2. Fontes Analisadas

| Identificador | Tipo | Confiança | Limitações |
| --- | --- | --- | --- |
| `https://brainartsolucoes.com.br/portfolio/tatuagem` | Site-demo | Parcial | Sem ids de seção (só `_R_`); estrutura inferida por headings |
| Card home | JS | Completa | title “Tattoo Studio”, subtitle “InkMaster”, desc “Estilo & Atitude”, img `tattoo-hero.jpg`, color amber |
| BRIEFING-001 | Showroom | Completa | |

Data: **2026-09-01**. Template, não case.

## 3. Objetivo Percebido do Site

Orçamento / agendar sessão. Diferenciação: desenho exclusivo, anti-catálogo Pinterest, biossegurança.

## 4. Mapa de Páginas e Seções

**Não confirmado** mapa por `id` (ausentes). Header: nav “INK MASTER” + “Agendar Sessão” (texto extraído). Sem `<header class>` no primeiro match — header pode ser overlay absoluto.

Fluxo textual: Hero H1 `MARCAS ETERNAS` → marquee estilos → H2 “Sua pele não é rascunho.” (manifesto) → 3 estilos (Realismo, Fine Line, Blackwork) → “Trabalhos Recentes” (3 fotos) → depoimentos → FAQ → “PRONTO PARA SE MARCAR?” → Footer mínimo `@inkmaster` Goiânia.

Overlays: FAB + Cookie. Sem UrgencyToast. CTAs: botões “Agendar Sessão”, “Fazer Orçamento”, “Ver mais projetos”, “Solicitar Orçamento” — href **Não confirmado**.

## 5. Estrutura de Conteúdo

**H1:** `MARCAS ETERNAS` (no HTML colado `MARCASETERNAS` por quebra de span).

**Marquee (literal, repetido dezenas de vezes):** `FINE LINE BLACKWORK REALISMO TRADICIONAL`

**Manifesto:** crítica a estúdios “fábrica”; arte do zero; iPad.

**Estilos:** Realismo (P&B foto); Fine Line; Blackwork. Numeração 02/03 visível; Realismo como 01 **inferido**.

**Galeria:** “Sua Ideia Ganha Vida” + “Ver mais projetos”.

**Depoimentos:** Lucas M. (fine line); Mariana S. (biossegurança + iPad). Poucos, tom técnico.

**FAQ:** cover-up; processo de desenho; pagamento Pix/dinheiro/cartão 12x; sinal 20%.

**Footer:** INKMASTER, @inkmaster, Goiânia. Sem endereço de rua.

**Pricing:** sem tabela; FAQ menciona sinal 20% e 12x (preço da sessão não listado).

**Form:** ausente.

## 6. Sistema Visual

### 6.1 Cores

**Confirmado:** `min-h-screen bg-zinc-950 text-zinc-300`; selection `bg-yellow-600 text-black`; acento amarelo `ca8a04` (classe Tailwind yellow-600). Preto absoluto de estúdio. FAB verde destoa (propositalmente “app”, não marca).

### 6.2 Tipografia

H1 `text-[12vw] md:text-[8vw] font-black text-white leading-none tracking-tighter drop-shadow-2xl` — display agressivo, ocupa a viewport. Marquee uppercase. CTA final também caixa alta.

### 6.3 Layout e Grid

Hero `min-h-[90vh] flex center overflow-hidden pt-20 px-6`. Marquee full-bleed (loop DOM). Galeria de trabalhos em 3 imagens. Densidade maior que o salão.

### 6.4 Imagens, Videos e Iconografia

- `/portfolio/tatuagem/tattoo-hero.jpg`
- `tattoo-work-1.jpg`, `tattoo-work-2.jpg`, `tattoo-work-3.jpg`
- Sem Unsplash. Sem vídeo.
- Marquee tipográfico como textura de movimento contínuo.

### 6.5 Componentes

Botões orçamento/agendar. Cards de estilo. FAQ. FAB. Marquee (movimento contínuo — G2 crítico).

## 7. Interações e Animações

| Padrão | Gatilho | Tipo | Confiança |
| --- | --- | --- | --- |
| Marquee estilos | contínuo | texto repetido no DOM (provável CSS translate ou overflow) | confirmado conteúdo; **mecanismo CSS/JS não extraído** (provável) |
| FAB | mount | spring + pulse | confirmado global |
| “Ver mais projetos” | click | **não confirmado** (expandir vs link) | não confirmado |

Reduced-motion: marquee **deve** parar na adaptação OCARECADEV (G2). Na fonte, **não confirmado** se para.

## 8. Responsividade

H1 em `vw` escala agressiva em 390px (`12vw` ≈ 47px em 390 — na verdade 12% de 390 ≈ 47px, pode ser pequeno; em desktop 8vw de 1200 = 96px). **Inferido** que o “gigante” aparece sobretudo em telas largas. `90vh` não svh.

## 9. Tom de Voz e Conteúdo

Confrontador, exclusividade, anti-massa. FAQ pragmático (sinal, cover-up). Instagram como prova de nicho.

## 10. Padrões Reutilizáveis para o Designer

Receita Express tattoo:

1. Fundo quase preto + um amarelo/creme de contraste.
2. H1 curto, superbold, tracking negativo.
3. Marquee ou lista de estilos como assinatura de nicho (com G2).
4. Manifesto “não somos catálogo”.
5. 3 especialidades (não 12).
6. Grid de 3 trabalhos reais (obrigatório para o nicho; stock quebra credibilidade).
7. FAQ: cover-up, sinal, forma de pagamento.
8. CTA orçamento via WhatsApp (foto da referência no chat — **pedido de produto**, não visto na demo).

Carrossel: label “Tattoo Studio”, nome nosso, “Estilo e atitude”. Fotos de pele **originais** (direito de imagem).

## 11. Pontos de Atenção

- Marquee infla o DOM (acessibilidade e performance G4).
- Trabalhos de tatuagem: licença de imagem / menores (G1 conteúdo).
- Claim “nenhuma tatuagem é copiada” é copy de demo.
- Sinal 20% e 12x são regras comerciais do demo, não default OCARECADEV.

## 12. Limitações da Análise

Sem ids; sem JS do marquee; sem screenshot do H1; botões sem href no extract.

## 13. Checklist para o Próximo Agente

- [ ] Nome do estúdio modelo nosso.
- [ ] Galeria com autorização; alt descritivo (G1).
- [ ] Marquee desligável (G2) ou substituir por chips estáticos.
- [ ] CTA `wa.me` env, não botão morto.
- [ ] Não reutilizar fotos `/portfolio/tatuagem/` da BrainArt.
