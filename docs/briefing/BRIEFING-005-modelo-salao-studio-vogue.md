# BRIEFING-005 - Modelo de nicho: salão / visagismo (demo Studio Vogue)

## 1. Resumo Executivo

LP-demo em [https://brainartsolucoes.com.br/portfolio/salao](https://brainartsolucoes.com.br/portfolio/salao). Estética **minimal nude**: fundo `#FDFBF9`, rose gold `#B76E79`, bege `#E3D0C1`, H1 light, foto de salão com grayscale no hover. Naming quase estável: carrossel **Studio Vogue**; footer **VOGUE STUDIO**. **Não é cliente real confirmado.** Title HTML genérico da agência.

## 2. Fontes Analisadas

| Identificador | Tipo | Confiança | Limitações |
| --- | --- | --- | --- |
| `https://brainartsolucoes.com.br/portfolio/salao` | Site-demo | Parcial | Sem browser |
| Card home | JS | Completa | title “Salão de Beleza”, subtitle “Studio Vogue”, desc “Estética Minimalista”, img `hero.jpg`, color terracotta |
| BRIEFING-001 | Showroom | Completa | |

Data: **2026-09-01**. Template, não case.

## 3. Objetivo Percebido do Site

Agendar horário de corte/cor/penteado. Promessa: visagismo, saúde capilar, “essência”, exclusividade (valet, cromoterapia).

## 4. Mapa de Páginas e Seções

IDs: `servicos`, `espaco`, `depoimentos`, `faq`, `contato`. Header `fixed` `bg-[#FDFBF9]/80 backdrop-blur-md border-[#E3D0C1]/30`. Nav: Serviços, Espaço, Depoimentos, FAQ.

Fluxo: Hero `min-h-screen pt-20` (H1 branco no mobile / preto no `md`) → 3 serviços → `#espaco` (“Onde o Luxo encontra a Calma”) + métricas `10+` / `5k+` **sem labels visíveis no texto extraído** (significado **Não confirmado**: anos? clientes?) → `#depoimentos` → `#faq` → Footer `#contato`.

Overlays: FAB + Cookie. Sem toast de escassez.

## 5. Estrutura de Conteúdo

**H1:** `A Arte de Realçar sua Essência.`

**Lead:** minimalismo sofisticado; visagismo, colorimetria, saúde capilar.

**Serviços:** Corte & Visagismo; Mechas & Iluminação; Penteados (eventos).

**Espaço:** preto + rose gold + nude; pausa/autocuidado; lavatório com cromoterapia.

**Depoimentos:** Mariana S.; Camila R. (loiro); Juliana T. (visagismo). Iniciais, sem foto necessariamente.

**FAQ:** antecedência 1 semana; teste de mecha obrigatório; marcas Keune, Wella, Truss; valet.

**CTAs:** “Agendar”, “Agendar Avaliação” → `#agendar` (id **não** na lista — **Não confirmado**).

**Footer:** Av. T-63, 1000 Setor Bueno Goiânia; Ter–Sáb; “Desenvolvido por BrainArt”.

**Pricing / form:** ausentes. Sem tabela de preços de serviços (típico de salão high-end: preço na consulta).

## 6. Sistema Visual

### 6.1 Cores

**Confirmado:** página `bg-[#FDFBF9] text-black`; rose `#B76E79` (selection e títulos); borda nude `#E3D0C1`; FAB verde (estranho neste mood). H1 `text-white md:text-black` — no mobile o hero provavelmente tem foto full-bleed escura.

### 6.2 Tipografia

H1 `text-5xl md:text-7xl font-light leading-[1.1]`. Subtítulos `font-light tracking-widest text-[#B76E79]`. Editorial fashion, não black/extrabold.

### 6.3 Layout e Grid

Hero tela cheia. Serviços em 3 colunas **inferido**. Foto `aspect-[3/4] translate-y-8 grayscale hover:grayscale-0 duration-700` — retrato fashion.

### 6.4 Imagens, Videos e Iconografia

- `/portfolio/salao/hero.jpg`
- `/portfolio/salao/salon.jpg`
- Sem Unsplash, sem vídeo
- Métricas 10+ / 5k+ sem unidade no extract de texto

### 6.5 Componentes

Header nude glass. Links “Agendar”. Cards de serviço minimal. FAQ. FAB global.

## 7. Interações e Animações

Foto: grayscale 700ms no hover (**confirmado**). Header blur. FAB. Reduced-motion não tratado na foto (G2: grayscale animation).

## 8. Responsividade

H1 muda de cor `white → black` em `md` — layout hero **dois mundos**. `min-h-screen` (não svh). Header `px-6 py-5`.

## 9. Tom de Voz e Conteúdo

Sofisticado, curto, “essência”, “sem esforço”. Segunda pessoa. Marcas de produto citadas (Keune/Wella/Truss) — no template Express só usar se o cliente autorizar.

## 10. Padrões Reutilizáveis para o Designer

Receita Express salão:

1. Off-white + um rose + um bege; muito espaço negativo.
2. H1 light, uma linha, ponto final.
3. Três serviços-âncora (corte, cor, evento) — não catálogo de 20 itens.
4. Bloco “o espaço” com sensorial (luz, cheiro, cromoterapia) — diferencia o nicho.
5. FAQ de protocolo (teste de mecha, antecedência).
6. CTA agendar WhatsApp; preços só se o cliente quiser.
7. Foto 3:4 de ambiente ou modelo, tratamento editorial (não stock sorriso genérico).

Carrossel: label “Salão de Beleza”, nome do modelo nosso, subtítulo “Estética minimalista”.

## 11. Pontos de Atenção

- Studio Vogue vs Vogue Studio.
- Métricas órfãs 10+ / 5k+.
- `#agendar` duvidoso.
- FAB verde vs rose gold.
- Citar marcas de cosmético pode ser restrição legal/comercial.

## 12. Limitações da Análise

Sem screenshot do hero mobile (H1 branco). Labels das métricas não extraídas. Hover grayscale não visto.

## 13. Checklist para o Próximo Agente

- [ ] Nome único do modelo.
- [ ] Hero com contraste H1 mobile (G1).
- [ ] Fotos próprias; se grayscale, respeitar G2.
- [ ] WhatsApp env; horário e bairro só com dados do cliente.
- [ ] Não copiar Keune/Wella/Truss como default do template.
