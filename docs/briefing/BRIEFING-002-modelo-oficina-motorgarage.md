# BRIEFING-002 - Modelo de nicho: oficina premium (demo MotorGarage / Performance Garage)

## 1. Resumo Executivo

LP-demo da BrainArt em [https://brainartsolucoes.com.br/portfolio/oficina](https://brainartsolucoes.com.br/portfolio/oficina). Serve de **template Express** automotivo de alto padrão: dark industrial, H1 em caixa alta, serviços numerados, prova de donos de importados, FAQ técnico, CTA de agendamento. **Não é cliente real confirmado.** No carrossel da agência o card chama **MotorGarage**; no rodapé da página a marca é **Performance Garage**. Tratar como demo.

Para a OCARECADEV: copiar a **receita de nicho** (atmosfera de oficina de luxo + WhatsApp), não a marca, o telefone da BrainArt, nem o endereço fictício.

## 2. Fontes Analisadas

| Identificador | Tipo | Confiança | Limitações |
| --- | --- | --- | --- |
| `https://brainartsolucoes.com.br/portfolio/oficina` | Site-demo HTML | Parcial (SSR + classes) | Sem Playwright; hover/scroll não exercitados |
| Card no array `PortfolioSlider` | JS da home | Completa | title “Oficina Premium”, subtitle “MotorGarage”, img `/portfolio/oficina/hero.jpg` |
| BRIEFING-001 | Contexto do showroom | Completa | FAB/cookie globais iguais à agência |

Data: **2026-09-01**. Status: **template de referência**, não case verificado.

## 3. Objetivo Percebido do Site

Converter dono de veículo premium (Porsche, BMW M, V8/V10, blindado) em **avaliação técnica** via âncora `#agendar` / WhatsApp. Promessa: manutenção como “arte”, precisão OEM, transparência em vídeo.

## 4. Mapa de Páginas e Seções

Página única. IDs confirmados: `diferenciais`, `servicos`, `depoimentos`, `faq`, `galeria`. Header `sticky top-0 z-50 bg-[#0a0a0a]/90`. Nav: Serviços, Diferenciais, Clientes, FAQ. Sem `id="agendar"` no HTML capturado — CTAs apontam para `#agendar` (**possível âncora ausente / gerada no cliente; Não confirmado** se o jump funciona).

Ordem aproximada: Header → Hero full-bleed (`min-h-[90vh]`) → `#diferenciais` (“O Padrão Performance”, 01–03) → `#servicos` (4 cards) → `#depoimentos` → `#faq` → bloco “Onde a Mecânica Encontra a Arte” + `#galeria` (foto `tools.jpg`) → CTA final → Footer.

Overlays globais da agência: `WhatsAppWidget`, `CookieBanner`. **Sem** `UrgencyToast` nesta rota (confirmado ausência no HTML).

## 5. Estrutura de Conteúdo

**H1 (literal):** `PRECISÃO SUÍÇA. POTÊNCIA BRUTA.`

**Lead:** `Elevamos a manutenção automotiva à categoria de arte. Seu veículo de alta performance merece equipamentos de última geração e especialistas apaixonados.`

**Diferenciais 01–03:** Diagnóstico Avançado (scanners OEM); Peças Genuínas; Transparência Total (relatórios e vídeo).

**Serviços:** Revisão Preventiva (150+ itens); Mecânica Pesada (V8/V10); Performance Tuning (ECU, turbo); Detailing & Estética (PPF, vitrificação).

**Depoimentos (demo):** Roberto M. — Porsche 911 Carrera S; Carlos E. — BMW M3 Competition; terceiro sobre atendimento VIP e translado. Não tratar como reviews reais.

**FAQ:** carros blindados; garantia 1 ano / 10.000 km OEM; updates WhatsApp com vídeo; leva-e-traz 30 km em plataforma sider.

**CTA copy:** “Agendar Revisão”, “Falar com Consultor”, “Agendar Avaliação Agora”, H2 final “Pronto para elevar o nível?”.

**Marca no footer:** Performance Garage; Av. das Nações Unidas, 1000 (fictício típico); horário comercial; “Criado por BrainArt”.

**Pricing:** nenhum valor de serviço (**Confirmado** ausência de `R$`).

**Form:** nenhum `<form>`. Conversão = âncora + `wa.me`.

## 6. Sistema Visual

### 6.1 Cores

**Confirmado em classes:** fundo `#111111` / `bg-[#0a0a0a]` header; texto `text-zinc-300`; branco no H1; acento **amarelo** (`selection:bg-yellow-500`, cards `bg-[#1a1a1a] border-zinc-800`); footer `bg-zinc-900`. WhatsApp verde só no FAB global.

Paleta de nicho: preto carvão + zinc + amarelo “corrida”, não o amber `#c39738` da home da agência.

### 6.2 Tipografia

Stack compartilhado Geist / Plus Jakarta (`font-sans`). H1: `text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight`. Tom: caixa alta no título, corpo técnico.

**Inferido:** sem serif de luxo (diferente da advocacia).

### 6.3 Layout e Grid

Hero 90vh, overlay gradiente `from-[#111111]`. Cards de serviço com hover `-translate-y-2` 300ms. Seções `py-24` no footer band. Galeria: foto de bancada `tools.jpg`.

### 6.4 Imagens, Videos e Iconografia

- `/portfolio/oficina/hero.jpg` (hero + thumb do carrossel)
- `/portfolio/oficina/tools.jpg` (bancada)
- Sem Unsplash nesta rota (**Confirmado**)
- Sem `<video>` no HTML
- Ícones Lucide / SVG de seção; números 01 02 03

### 6.5 Componentes

Botões escuros com hover amarelo; header blur; cards borda zinc; FAQ accordion; FAB verde herdado da agência (não é “marca da oficina”).

## 7. Interações e Animações

| Padrão | Gatilho | Tipo | Confiança |
| --- | --- | --- | --- |
| Card serviço sobe | hover | `-translate-y-2` 300ms | confirmado (classe) |
| Header sticky | scroll | blur 90% preto | confirmado classe; comportamento de shrink **não confirmado** |
| FAB pulse | contínuo | Framer Motion (chunk global) | confirmado código da agência |
| Reduced-motion | — | **não** visto nesta página | não confirmado |

## 8. Responsividade

H1 escala `4xl → 7xl`. Hero `min-h-[90vh]` (G3: fonte usa `vh`, não `svh`). Nav desktop visível no HTML; **não confirmado** hamburger. FAB `bottom-6 right-6` igual à agência.

## 9. Tom de Voz e Conteúdo

Masculino-premium, jargão (OEM, ECU, V8, sider). Exclusividade e “não somos trocadores de peças”. Endereço e e-mail `contato@performancegarage.com.br` são **figurativos**.

## 10. Padrões Reutilizáveis para o Designer

Receita Express oficina:

1. Dark industrial + um acento quente (amarelo/âmbar).
2. H1 curto em duas sentenças de impacto.
3. Três pilares numerados (diagnóstico / peças / transparência).
4. Grade de 4 serviços (preventiva, pesada, tuning, estética).
5. Depoimentos com **modelo do carro** no cargo (prova de nicho).
6. FAQ de operação (garantia, blindado, leva-e-traz).
7. CTA único: agendar avaliação no WhatsApp.
8. Foto de hero = carro ou oficina realista; foto 2 = ferramentas/organização.

Plug no carrossel OCARECADEV: label “Oficina Premium”, título do modelo nosso, subtítulo tipo “Luxo e performance”, link futuro — **não** MotorGarage.

## 11. Pontos de Atenção

- Nome triplo: MotorGarage (card) vs Performance Garage (página) vs “Oficina Premium” (overlay). Unificar na nossa versão.
- `#agendar` pode estar quebrado (**Não confirmado**).
- Mesmo WhatsApp da agência em todos os demos.
- Título HTML da página é o da **agência**, não da oficina (SEO de demo fraco).

## 12. Limitações da Análise

Sem screenshot; sem medir contraste amarelo/preto; galeria e hover só por classe; âncora agendar não verificada.

## 13. Checklist para o Próximo Agente

- [ ] Especificar marca-demo **nossa** (não Performance Garage / MotorGarage).
- [ ] Fotos originais (hero + bancada); dimensões explícitas (G3).
- [ ] CTA WhatsApp via env; copy de agendamento automotivo.
- [ ] Preferir `100svh` no hero se o padrão for adotado.
- [ ] Não vender este HTML como case real.
- [ ] Ligar o card do carrossel só quando o template existir.
