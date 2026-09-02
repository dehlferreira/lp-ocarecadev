# BRIEFING-003 - Modelo de nicho: clínica estética (demo Aurora Clinic)

## 1. Resumo Executivo

LP-demo em [https://brainartsolucoes.com.br/portfolio/clinica](https://brainartsolucoes.com.br/portfolio/clinica). Clínica de estética **high-end**: fundo claro, verde esmeralda + ouro `#D4AF37`, H1 light enorme, protocolos numerados, depoimentos femininos, FAQ de downtime. **Não é cliente real confirmado.**

Conflito de naming: carrossel usa **Sorrir & Cuidar** / “Foco em Agendamentos”; `<title>` e página usam **Aurora Clinic**; footer mistura “odontologia estética e harmonização” com tratamentos de pele e lentes. Tratar como **colagem de demo**, não briefing clínico verdadeiro.

## 2. Fontes Analisadas

| Identificador | Tipo | Confiança | Limitações |
| --- | --- | --- | --- |
| `https://brainartsolucoes.com.br/portfolio/clinica` | Site-demo | Parcial | Sem browser; title próprio (`Aurora Clinic \| … \| BrainArt`) |
| Card home | JS | Completa | title “Clínica Estética”, subtitle “Sorrir & Cuidar”, img `luxurious_office.jpg`, color terracotta |
| BRIEFING-001 | Showroom | Completa | FAB/cookie globais |

Data: **2026-09-01**. Template de referência, não case.

## 3. Objetivo Percebido do Site

Agendar **avaliação VIP** (mulher, poder aquisitivo). Promessa: “beleza eterna”, ciência + sofisticação, lunch-time procedures.

## 4. Mapa de Páginas e Seções

IDs: `sobre`, `tratamentos`, `depoimentos`, `faq`. Header `fixed` `bg-white/80 backdrop-blur-md border-gray-100/50`. Nav: A Experiência, Protocolos, Relatos, FAQ. `main` com `pt-20` (compensa header).

Fluxo: Hero 90vh (imagem de escritório luxuoso) → 3 pilares (Tecnologia / Protocolos / High-End) → `#sobre` (“refúgio de luxo”) → `#tratamentos` 01–06 (Harmonização 3D, Fios, Lentes, Bioestimuladores, Toxina, Aurora Glow) → `#depoimentos` → `#faq` → CTA “Pronta para revelar…” → Footer.

Overlays: WhatsApp FAB + Cookie. Sem toast de escassez da agência.

## 5. Estrutura de Conteúdo

**H1:** `A Arte da Beleza Eterna`

**Lead:** protocolos de rejuvenescimento facial e corporal; ciência + sofisticação.

**Pilares:** equipamentos importados; tratamentos sob medida; valet e chás importados.

**Sobre:** mármore, iluminação circadiana, aromas, trilha sonora.

**Protocolos:** lista 01–06 (numeração pula 04 no HTML — Bioestimuladores sem número, depois 05). Inclui **lentes de porcelana** (nicho mais odonto que estética corporal).

**Depoimentos:** Isabella M. empresária; Camila T. arquiteta; Sofia R. advogada. Foco em naturalidade e “Glow”.

**FAQ:** dor, durabilidade 12–24 meses, avaliação com scanner 3D, downtime.

**CTAs:** “Agendar Sessão”, “Agendar Avaliação VIP”, “WhatsApp”. Destinos `#agendar` (âncora **não listada** nos ids — **Não confirmado**).

**Footer:** AURORA CLINIC; Av. Brigadeiro Faria Lima, 1000; `luxo@auroraclinic.com.br`; horários estendidos até 20h.

**Pricing / form:** ausentes.

## 6. Sistema Visual

### 6.1 Cores

**Confirmado:** `bg-white text-gray-800`; hero/acento **emerald** (`emerald-900/950`, `selection:bg-emerald-100`); ouro **`#D4AF37`** (botões hover, radial, bordas). Contraste: H1 `text-emerald-950` sobre foto — **não confirmado** se há overlay suficiente (risco G1).

### 6.2 Tipografia

H1 `text-5xl md:text-7xl lg:text-8xl font-light text-emerald-950 leading-tight` — editorial, não extra-bold. Nav uppercase tracking no botão ouro/esmeralda.

### 6.3 Layout e Grid

Hero centralizado `h-[90vh] overflow-hidden`. Cards de protocolo com hover `scale-105` e borda ouro. Blobs `blur-3xl` `#D4AF37/10` nos cantos.

### 6.4 Imagens, Videos e Iconografia

- `/portfolio/clinica/luxurious_office.jpg` (hero + card do carrossel)
- `/portfolio/clinica/aesthetic_treatment.jpg`
- `/portfolio/clinica/og-image.jpg`
- Sem Unsplash. Sem vídeo no HTML.
- FAQ com prefixo `✦`.

### 6.5 Componentes

Header translúcido claro (único entre os 7 a ser **light glass**). Botão `bg-emerald-900` hover ouro. Cards brancos `bg-white/70`. FAB verde herdado (contrasta com paleta esmeralda/ouro).

## 7. Interações e Animações

Hover de cards `scale-105` + sombra. Hero overflow hidden. FAB global. Reduced-motion **não** específico desta página.

## 8. Responsividade

H1 até `8xl`. Header fixo exige `pt-20` no main. Hero 90vh (não svh). Nav textual; hamburger **não confirmado**.

## 9. Tom de Voz e Conteúdo

Feminino, spa, “santuário”, “porcelana”, “milimetricamente”. Segunda pessoa “sua melhor versão”. Inconsistência editorial: footer fala de odontologia + harmonização; hero é estética ampla.

## 10. Padrões Reutilizáveis para o Designer

Receita Express clínica estética:

1. Light luxury (branco + um verde profundo + um ouro).
2. H1 light/serif-like, não condensed black.
3. Foto de interior (mármore, luz quente), não stock de seringa em close.
4. Três razões + grade de protocolos numerados.
5. Depoimentos com ocupação de status.
6. FAQ de dor / duração / recuperação (objeções do nicho).
7. CTA “avaliação” (não “comprar pacote”).
8. Unificar nicho: **ou** estética facial **ou** odonto (a demo mistura; OCARECADEV deve escolher — odonto já tem BRIEFING-008).

Card do carrossel: label “Clínica Estética”, não “Sorrir & Cuidar” / Aurora.

## 11. Pontos de Atenção

- Naming triplo (Sorrir & Cuidar / Aurora / odonto no footer).
- Lentes de porcelana duplicam o modelo dentista.
- FAB WhatsApp verde sobre clínica “joia” pode destoar — adaptar cor do FAB por template **é decisão de produto** (pedido atual é FAB na **home** OCARECADEV, não nestes demos).
- Title desta demo é o único (com advocacia) que não reutiliza o title genérico da agência.

## 12. Limitações da Análise

Sem screenshot do hero (legibilidade do H1 sobre foto). Âncora `#agendar` não verificada. Numeração 01–06 irregular.

## 13. Checklist para o Próximo Agente

- [ ] Decidir se o template Express é “estética” puro (sem lentes).
- [ ] Paleta clara + ouro; contraste do H1 sobre imagem (G1).
- [ ] Fotos próprias de ambiente, não as da BrainArt.
- [ ] CTA WhatsApp env; sem preços inventados.
- [ ] Não usar Aurora Clinic / Sorrir & Cuidar.
