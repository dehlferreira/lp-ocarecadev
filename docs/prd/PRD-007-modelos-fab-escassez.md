# PRD-007 - Modelos, FAB WhatsApp e alerta de escassez

## 1. Resumo

A landing OCARECADEV **já está no ar**. Esta entrega acrescenta três capacidades na **mesma jornada da home**, copiando **padrões de interação** observados em [https://brainartsolucoes.com.br/](https://brainartsolucoes.com.br/) — não a marca, os preços, os depoimentos nem o modelo de dois planos da fonte.

1. **Showroom de modelos:** carrossel horizontal com 7 cards de nicho, para o visitante ver exemplos Express **antes** de comparar os 3 planos.
2. **FAB WhatsApp:** atalho persistente de conversão, usando o mesmo canal já aprovado (número e mensagem só via env).
3. **Alerta de escassez:** toast dismissível alinhado ao **Express 48h**, sem urgência fabricada.

Os três planos (Express R$297 / Landing que Vende R$997 / Máquina de Clientes R$2497), a copy oficial e o funil PAS **não mudam**.

Não há `docs/design/UXD-*.md`. A lacuna está registrada; este PRD não inventa UXD.

## 2. Fontes e Rastreabilidade

| Fonte | Uso nesta entrega | Confiança |
| --- | --- | --- |
| `docs/briefing/BRIEFING-001-brainart-landing-referencia.md` §Implicações A/B/C | Anatomia dos três padrões; o que copiar / adaptar / evitar | Confirmado (referência); pedido OCARECADEV é do usuário, não fato da página fonte |
| `docs/briefing/BRIEFING-002` a `008` | Inventário dos 7 nichos (rótulo). **Não** especificam LPs a implementar agora | Confirmado como referência de nicho |
| Pedido do usuário, 2026-09-01 | Adaptar A/B/C; manter 3 planos; 7 LPs depois; FAB igual ao padrão; toast sim, contador fake não | Confirmado |
| `docs/prd/PRD-001-visao-geral-e-negocios.md` | 3 planos; WhatsApp como conversão | Confirmado — **não reescrito** |
| `docs/prd/PRD-002-design-e-interface.md` | Glass, mobile-first. “Portfólio” lá = prova social, **não** esta seção | Confirmado — **não reescrito** |
| `docs/prd/PRD-004-marketing-e-tracking.md` | `WHATSAPP_NUMBER` / `WHATSAPP_MESSAGE_DEFAULT`; consentimento | Confirmado — **não reescrito** |
| `docs/prd/PRD-INDEX-001-landing-existente.md` | Landing existente; não reconstruir 001–006 | Confirmado |
| `docs/referencias/copy-completa-landing.md` | Copy oficial. **Esta feature não está nela** | Confirmado |
| `docs/design/UXD-*.md` | Inexistente | Lacuna |
| Playwright / viewport ao vivo da fonte | Indisponível na análise do briefing | Limitação |

**Marcadores:** `Confirmado` = fonte ou usuário declara. `Inferido` = deriva de padrão documentado. `Não confirmado` = falta decisão humana ou evidência.

## 3. Problema e Objetivo

**Problema.** A home vende Express com “template validado”, mas o visitante **não vê** exemplos de nicho antes dos planos. A conversão WhatsApp existe nos CTAs de seção, sem atalho persistente. Não há lembrete de capacidade do Express 48h.

**Objetivo.** Sem alterar oferta nem copy já aprovada: (1) mostrar 7 modelos de nicho em carrossel; (2) manter WhatsApp a um toque via FAB; (3) avisar escassez do Express de forma **honesta**.

**Não é objetivo:** reconstruir a landing; copiar a marca BrainArt; desenvolver as 7 LPs-modelo neste ciclo.

## 4. Usuários e Contexto

- **Visitante** (PRD-001): empreendedor / prestador que compara planos na home, sobretudo mobile.
- **Momento:** depois de entender a oferta (Solution / prova) e **antes** de escolher plano.
- **Conversão:** continua sendo WhatsApp com mensagem pré-preenchida — o FAB reforça o canal; o toast aponta para **planos**, não substitui o CTA de WhatsApp.

A seção de prova social existente **não** é este showroom. PRD-002 trata “portfólio” como prints/depoimentos. Esta entrega é uma **seção nova** de modelos.

## 5. Escopo

### 5.1 MVP

**A. Seção de modelos na home**

- Nova seção na jornada da home, encontrada **antes** da seção de planos.
- Carrossel horizontal com **7 cards**, um por nicho (inventário abaixo).
- Anatomia do card: foto (ou placeholder da marca) + rótulo de nicho + nome do modelo + linha de foco.
- Headline **Confirmada** §8.2: eyebrow “Modelos por nicho”; título “Veja uma página feita para o seu tipo de negócio”.
- Trilho scrollável, encaixe (snap) por card, setas no desktop, pausa de movimento contínuo/autoplay em hover e toque.
- Sem overflow horizontal da **página** em 390px, 768px e 1200px+ (G3).
- Teclado e foco visível (G1). `prefers-reduced-motion` desliga autoplay e movimento contínuo **sem esconder** os cards (G2).

**B. Destino dos cards neste ciclo**

- **Não** URLs BrainArt. **Não** 7 LPs novas.
- Aceitável: estado “modelo em breve”, âncora interna, ou rota placeholder que **não** 404.
- Links reais entram quando os templates existirem (futuro).

**C. FAB WhatsApp**

- Persistente, canto inferior direito, ícone reconhecível, nome acessível, `rel` seguro em destino externo.
- Número e mensagem **somente** via env já usados (`WHATSAPP_NUMBER` / mensagem padrão).
- Não dispara tracking antes do consentimento explícito (G6).
- Não cobre o banner de consentimento.
- Reduced-motion desliga pulse/float.

**D. Alerta de escassez**

- Toast dismissível; não bloqueia a página.
- CTA para a seção de planos.
- Copy alinhada ao **Express 48h**, não aos três planos.
- Sem countdown aleatório, sem reset 24h teatral, sem fingir estoque.
- Sem dado real de vagas: copy **estática honesta** (prazo Express / capacidade limitada **sem número que minta**). Inventário real fica pendente.

### 5.2 Desejável

- Anel/pulse do FAB só se `prefers-reduced-motion` permitir.
- Microcopy de setas no carrossel (padrão da fonte: orientar o visitante a usar as setas).
- Item de navegação “Modelos” (ou equivalente) no header, se não lotar desktop/mobile. A âncora da seção existe no MVP mesmo sem o item.

### 5.3 Futuro

- Desenvolver as 7 LPs-modelo (`BRIEFING-002`–`008`) e plugar hrefs reais nos cards.
- Thumbs originais via `image-creator-agent` (não reusar fotos BrainArt / Unsplash da fonte).
- Inventário real de vagas Express (dado de negócio) se o negócio confirmar capacidade.

## Fora de Escopo

Itens abaixo **não** entram nesta entrega. Qualquer um deles exige PRD novo ou confirmação explícita do usuário.

- Reduzir a oferta para 2 planos, ou alterar preços, nomes ou benefícios dos 3 planos já aprovados.
- Alterar a copy já aprovada do Hero, Pricing, FAQ, CTA final ou demais seções em `docs/referencias/copy-completa-landing.md`.
- Reconstruir a landing; tratar ausência de UXD como projeto vazio.
- Copiar marca, paleta âmbar/terracota, tipografia, depoimentos, “Risco Zero”, formulário diagnóstico, IDs de analytics ou número WhatsApp da BrainArt.
- Usar depoimentos da fonte (demo clonado) ou inventar depoimento, métrica, cliente ou número de vagas.
- Tratar os 7 cards como cases de clientes reais.
- Desenvolver as 7 LPs-modelo agora; criar PRD-008+ para cada template neste ciclo.
- Reusar fotos da fonte (BrainArt / Unsplash dos demos) como thumbs de produção.
- Contador RNG, `localStorage` de “vagas” teatrais, reset 24h, decremento aleatório.
- Aplicar o toast de escassez aos planos R$997 e R$2497.
- UXD: não existe `docs/design/UXD-*.md`; **não inventar**.
- Tráfego pago, campanhas, ou mudança de funil.
- Framework cliente novo / lib de animação como **requisito de produto**. Animação desta entrega **não** pode depender de dependência cliente nova sem ADR (G7) — isso é decisão do Tech Lead, não deste PRD.
- Confundir esta seção com o “portfólio” de prova social do PRD-002.

## 6. Jornada e Fluxo Principal

Jornada atual (home): Header → Hero → Problem → Agitation → Solution → HowItWorks → SocialProof → About → Pricing → FAQ → CtaFinal → Footer. Overlays já existentes: consentimento.

**Inferido (posição da seção de modelos):** depois de SocialProof ou de Solution, **sempre antes de Pricing**. Candidato preferencial: após SocialProof e antes de About/Pricing, para o visitante ver prova + showroom e só então comparar planos. O Tech Lead **não** fecha layout técnico neste PRD; o requisito observável é: modelos visíveis no fluxo **antes** dos planos.

Fluxo desta entrega:

1. Visitante percorre a home.
2. Encontra a seção de modelos; percorre o carrossel (swipe, setas no desktop, teclado).
3. Cada card comunica nicho + modelo + foco. Clique neste ciclo **não** abre LP BrainArt nem LP nova; comunica “em breve” ou equivalente sem 404.
4. FAB permanece visível (exceto quando reduzido/deslocado para não cobrir consentimento) e abre WhatsApp com o mesmo número/mensagem dos CTAs atuais.
5. Toast de escassez pode aparecer sem bloquear; aponta para planos / Express; o visitante fecha ou segue o CTA.
6. Em Pricing, os **3 planos** permanecem inalterados.

## 7. Requisitos Funcionais

### 7.1 Seção e carrossel de modelos

- **RF-001:** [Confirmado] A home deve exibir uma seção nova de modelos/portfólio de nicho, distinta da prova social existente.
  - Fonte: pedido do usuário 2026-09-01; BRIEFING-001 §Implicações A; distinção PRD-002 (prova social ≠ esta seção).
  - Prioridade: MVP.

- **RF-002:** [Confirmado] O visitante deve encontrar essa seção **antes** da seção de planos na jornada da home.
  - Fonte: pedido do usuário (modelos como showroom pré-preço); BRIEFING-001 §10 padrão 1 e §Implicações A (posição candidata).
  - Prioridade: MVP.

- **RF-003:** [Confirmado] A seção deve apresentar **exatamente 7** cards, um para cada nicho do inventário em §8.1.
  - Fonte: BRIEFING-001 §Implicações A (7 itens); BRIEFING-002 a 008 (inventário); pedido do usuário.
  - Prioridade: MVP.

- **RF-004:** [Confirmado] Cada card deve exibir, de forma simultaneamente visível no card: (1) imagem ou placeholder com dimensão explícita; (2) rótulo de nicho; (3) nome do modelo; (4) linha de foco.
  - Fonte: BRIEFING-001 §Implicações A anatomia do card; pedido do usuário.
  - Prioridade: MVP.

- **RF-005:** [Confirmado] Clínica estética e odontologia **não** podem parecer o mesmo produto: rótulos e linhas de foco devem desambiguar estética facial/corporal vs odonto/lentes.
  - Fonte: BRIEFING-003 (lentes na demo de estética); BRIEFING-008 (lentes no odonto); pedido do usuário.
  - Prioridade: MVP.

- **RF-006:** [Confirmado] Nomes visíveis dos modelos são **OCARECADEV**, não MotorGarage, HappyPet, Studio Vogue, InkMaster, Law Firm, Aurora/Sorrir & Cuidar, Odonto Boutique da fonte. Enquanto o usuário não nomear: placeholder “Modelo [nicho]” (§8.1).
  - Fonte: pedido do usuário; BRIEFING-001 §Implicações A “Evitar”.
  - Prioridade: MVP.

- **RF-007:** [Confirmado] O trilho é horizontal, scrollável (incluindo gesto), com encaixe por card. Setas de avançar/voltar visíveis no desktop. Movimento contínuo/autoplay, se existir, **pausa** em hover e em toque.
  - Fonte: BRIEFING-001 §Implicações A; pedido do usuário.
  - Prioridade: MVP.

- **RF-008:** [Confirmado] Destino de cada card neste ciclo: **não** URL BrainArt; **não** LP-modelo nova. Estado aceitável: “modelo em breve”, âncora interna, ou rota placeholder **sem 404**.
  - Fonte: pedido do usuário; BRIEFING-001 §Implicações A “Como os 7 itens viram templates”.
  - Prioridade: MVP.

- **RF-009:** [Inferido] A seção deve ter âncora estável (identificador de região) para a navegação e para o CTA do toast não dependerem de posição absoluta na página.
  - Fonte: BRIEFING-001 `#portfolio` na fonte; header OCARECADEV já usa âncoras (`#hero`, `#social-proof`, `#pricing`).
  - Prioridade: MVP.

- **RF-010:** [Não confirmado] Incluir item “Modelos” (ou “Portfólio”) no header desktop e no menu mobile.
  - Fonte: pedido do usuário (MVP se não lotar; senão desejável). Header atual tem 3 itens + CTA.
  - Prioridade: Desejável.

- **RF-011:** [Não confirmado] Microcopy visível orientando o uso das setas no carrossel.
  - Fonte: BRIEFING-001 §Implicações A / §7 (“Use as setas para mover”).
  - Prioridade: Desejável.

### 7.2 FAB WhatsApp

- **RF-012:** [Confirmado] Deve existir um controle flutuante persistente de WhatsApp no canto inferior direito, com ícone reconhecível como WhatsApp, durante a visita à home (e páginas da mesma jornada pública, se o FAB for global).
  - Fonte: pedido do usuário; BRIEFING-001 §Implicações B.
  - Prioridade: MVP.

- **RF-013:** [Confirmado] O destino usa **somente** `WHATSAPP_NUMBER` e a mensagem padrão já parametrizada (`WHATSAPP_MESSAGE_DEFAULT` / equivalente já usado pelos CTAs). Nenhum número ou texto da BrainArt.
  - Fonte: PRD-004; BRIEFING-001 §Implicações B; pedido do usuário.
  - Prioridade: MVP.

- **RF-014:** [Confirmado] O controle tem nome acessível em português (não só ícone). Link externo com `rel` que não exponha a página de origem de forma insegura (equivalente a noopener + noreferrer).
  - Fonte: BRIEFING-001 §Implicações B (`aria-label`, `rel`).
  - Prioridade: MVP.

- **RF-015:** [Confirmado] O FAB **não** cobre o banner de consentimento nem impede Aceitar/Recusar. Na landing atual o banner ocupa a faixa inferior; o FAB deve ceder espaço ou o empilhamento deve manter o consentimento operável.
  - Fonte: pedido do usuário; G6; BRIEFING-001 §Implicações B (empilhamento overlays); consentimento existente na home.
  - Prioridade: MVP.

- **RF-016:** [Confirmado] Clique no FAB **não** dispara tracking de terceiros antes do consentimento explícito. Revogação deixa de disparar. O link WhatsApp em si pode existir desde o primeiro paint.
  - Fonte: G6; PRD-004; BRIEFING-001 §Implicações B (fonte dispara analytics sem cookie — evitar).
  - Prioridade: MVP.

- **RF-017:** [Confirmado] Com `prefers-reduced-motion: reduce`, pulse, float e anel contínuos do FAB **não** animam. O botão permanece visível e clicável.
  - Fonte: G2; BRIEFING-001 §Implicações B; pedido do usuário.
  - Prioridade: MVP.

- **RF-018:** [Não confirmado] Anel/pulse decorativo do FAB quando o visitante **não** pede reduced-motion.
  - Fonte: BRIEFING-001 §Implicações B (anel verde); pedido do usuário (desejável).
  - Prioridade: Desejável.

### 7.3 Alerta de escassez

- **RF-019:** [Confirmado] Deve existir um alerta no padrão **toast** (compacto, não modal, não tela cheia), dismissível, que **não** bloqueie leitura nem CTAs da página.
  - Fonte: pedido do usuário; BRIEFING-001 §Implicações C.
  - Prioridade: MVP.

- **RF-020:** [Confirmado] O CTA do toast leva o visitante à seção de **planos**.
  - Fonte: BRIEFING-001 §Implicações C (`#planos`); Pricing OCARECADEV já é a âncora de planos.
  - Prioridade: MVP.

- **RF-021:** [Confirmado] A copy do alerta refere-se ao **Express (até 48h / R$297)**, não a “capacidade” dos planos R$997 ou R$2497.
  - Fonte: pedido do usuário; BRIEFING-001 §Implicações C “Encaixe nos 3 planos”; copy oficial Express 48h.
  - Prioridade: MVP.

- **RF-022:** [Confirmado] É **proibido** como requisito: contador aleatório, decremento no cliente, reset periódico teatral, estoque fingido, persistência que simule “vagas que acabam”.
  - Fonte: pedido do usuário; BRIEFING-001 §Implicações C (RNG / `localStorage` da fonte = urgência fabricada).
  - Prioridade: MVP (restrição).

- **RF-023:** [Confirmado] Enquanto não houver dado real de vagas, o texto é **estático e honesto**: prazo Express e/ou capacidade limitada **sem número inventado**.
  - Fonte: pedido do usuário; ética em BRIEFING-001 §Implicações C.
  - Prioridade: MVP.

- **RF-024:** [Não confirmado] Ligar o toast a um inventário real de vagas Express (CMS, env ou operação).
  - Fonte: BRIEFING-001 §Implicações C “se a vaga for real”; pedido (futuro se o negócio confirmar).
  - Prioridade: Futuro.

- **RF-025:** [Inferido] Fechar o toast (controle explícito) remove-o da sessão de visualização; não pode ser um overlay que volte imediatamente a bloquear. Recorrência agressiva (ex.: a cada reload em segundos) não é requisito.
  - Fonte: BRIEFING-001 §Implicações C (dismiss + “não mostra se fechou”); adaptar **sem** copiar a janela teatral de 12h/24h da fonte.
  - Prioridade: MVP.

## 8. Requisitos de Conteúdo

Copy oficial em `docs/referencias/copy-completa-landing.md` **não cobre** esta seção. Nada abaixo substitui Hero/Pricing já aprovados.

**Ética (Confirmado):** não inventar depoimento, métrica, cliente ou número de vagas. Depoimentos BrainArt são demo clonado — não usar. Cards não são cases verificados.

### 8.1 Inventário dos 7 cards (MVP)

Nomes de modelo: **Confirmado** (usuário 2026-09-01) — usar os nomes “Modelo …” da tabela abaixo. Não substituir por marcas próprias neste ciclo.

Linhas de foco: **Confirmado** (usuário 2026-09-01) — usar a coluna “Linha de foco” da tabela.

| # | Rótulo de nicho (MVP) | Nome do modelo (Confirmado) | Linha de foco (Confirmado) | Briefing (inventário) | Desambiguação |
| --- | --- | --- | --- | --- | --- |
| 1 | Oficina premium | Modelo Oficina | Luxo e performance automotiva | BRIEFING-002 | — |
| 2 | Clínica estética | Modelo Clínica estética | Harmonização facial e corporal | BRIEFING-003 | **Sem** lentes / sorriso |
| 3 | Pet shop e veterinária | Modelo Pet | Cuidado para o melhor amigo | BRIEFING-004 | — |
| 4 | Salão de beleza | Modelo Salão | Visagismo e estética minimalista | BRIEFING-005 | — |
| 5 | Estúdio de tatuagem | Modelo Tatuagem | Estilo e marcas permanentes | BRIEFING-006 | — |
| 6 | Advocacia | Modelo Advocacia | Proteção patrimonial e estratégia | BRIEFING-007 | — |
| 7 | Odontologia e lentes | Modelo Odonto | Sorriso e lentes de contato | BRIEFING-008 | **Não** estética corporal; lentes ficam aqui |

Rótulos de nicho da coluna 2 são o texto **mínimo** do card. Ajuste editorial fino (ex. “Pet shop / vet”) é aceitável se a desambiguação 2 vs 7 se mantiver.

### 8.2 Headline da seção (Confirmado — usuário 2026-09-01)

Copy oficial não cobria esta seção. Usuário escolheu a proposta do PRD (primeira opção de cada lista).

- **Eyebrow:** “Modelos por nicho”
- **Título:** “Veja uma página feita para o seu tipo de negócio”
- **Proibido:** “Páginas que geram milhões.” e qualquer superlativo da BrainArt.

### 8.3 Toast Express (MVP — Confirmado, copy estática honesta)

Usuário 2026-09-01: incluir o toast com o wording da proposta. Sem número de vagas.

- **Título:** “Express em até 48h”
- **Corpo:** “O plano Express entrega em até 48h, com capacidade limitada. Confirme a próxima janela pelo WhatsApp ou veja os planos.”
- **CTA:** “Ver o plano Express” (destino: seção de planos)
- **Proibido:** “Restam N vagas”, “Capacidade Quase Atingida” literal da fonte, qualquer N que não venha de operação real.

### 8.4 FAB

- Nome acessível (proposta, alinhada à fonte adaptada): “Fale conosco pelo WhatsApp” — **Não confirmado** o wording final; deve ser compreensível sem o ícone.
- Não usar o número `(64) 98104-0722` nem qualquer `wa.me` da fonte.

### 8.5 Imagens dos cards

- **MVP:** cada card tem visual com dimensão explícita (G3). Placeholder da marca é aceitável.
- **Fora de escopo:** fotos da BrainArt / Unsplash dos demos.
- **Futuro:** thumbs originais via `image-creator-agent`.
- Alt informativo: nicho + que é um modelo (não “foto de cliente”). Placeholder: deixar explícito que a imagem é provisória.

## 9. Requisitos de UX, Interface e Acessibilidade

Visual da **marca OCARECADEV** (glass, dark, acento já aprovado no PRD-002). Copiar comportamento da referência, **não** a paleta âmbar/terracota da BrainArt.

- **RF-UX-001:** [Confirmado] G1 — HTML semântico na seção (heading da seção no nível correto da home: um único `h1` na página, esta seção não introduz segundo `h1`). Landmarks. Contraste adequado em cards, setas, toast, FAB e overlays. Foco visível em cards, setas, dismiss do toast e FAB. Navegação por teclado: chegar aos 7 modelos sem armadilha; clones infinitos tabuláveis da fonte **não** são aceitáveis como experiência.
  - Fonte: G1; BRIEFING-001 §7 (42 links) e §Implicações A.

- **RF-UX-002:** [Confirmado] G2 — `prefers-reduced-motion: reduce` desliga autoplay do carrossel, pulse de microcopy, ping do toast, pulse/float do FAB. Conteúdo permanece visível (nada preso em opacidade 0).
  - Fonte: G2; BRIEFING-001 (slider da fonte **não** respeita reduced-motion).

- **RF-UX-003:** [Confirmado] G3 — thumbs/placeholder com dimensão explícita; FAB e toast **sem** layout shift da página; sem overflow horizontal em 390 / 768 / 1200+.
  - Fonte: G3; pedido do usuário.

- **RF-UX-004:** [Confirmado] Área de toque adequada no FAB, nas setas e no dismiss do toast (PRD-002: mínimo 48×48px em mobile).
  - Fonte: PRD-002; BRIEFING-001 overlays.

- **RF-UX-005:** [Inferido] Toast e FAB não devem competir com o consentimento na mesma região até o visitante decidir. Consentimento prevalece enquanto estiver visível.
  - Fonte: G6; BRIEFING-001 z-index da fonte (cookie cobria o toast); landing OCARECADEV já tem banner inferior.

- **RF-UX-006:** [Inferido] Setas do carrossel: visíveis em desktop; em mobile o gesto no trilho é o caminho principal (setas podem ocultar-se, como na fonte).
  - Fonte: BRIEFING-001 §8 (setas `md+`).

- **RF-UX-007:** [Confirmado] G4 — movimento e carrossel não exigem, como requisito de produto, um framework cliente novo. Se JS for necessário, só onde CSS não cumprir o comportamento (G4). Lib nova = G7 + ADR, fora deste PRD.
  - Fonte: G4, G7; BRIEFING-001 (FAB da fonte usa lib de movimento — **evitar como requisito**).

## 10. Estados, Erros e Feedback

| Estado | Comportamento observável |
| --- | --- |
| Cards sem LP real | Visitante não cai em 404 nem em site BrainArt. Vê “em breve” / placeholder / âncora interna. |
| Autoplay (se houver) | Pausa em hover e toque; desliga com reduced-motion. |
| Toast visível | Página usável por baixo; dismiss remove o alerta. |
| Toast fechado | Não reaparece de imediato a bloquear; não há requisito de “sempre visível”. |
| Consentimento visível | FAB/toast não impedem Aceitar/Recusar. |
| Sem consentimento | FAB abre WhatsApp; **nenhum** pixel/gtag no clique. |
| Reduced-motion | Sem autoplay, pulse, ping, float; cards, FAB e toast continuam visíveis. |
| Destino WhatsApp | Mesma mensagem padrão dos CTAs atuais, número só de env. |

## 11. Regras de Negócio

1. Permanecem **3 planos** e preços PRD-001. BrainArt tem 2 — irrelevante.
2. WhatsApp continua o único canal de conversão desta landing (sem formulário diagnóstico da fonte).
3. Express é o único plano associado ao alerta de escassez.
4. Showroom é de **templates de nicho**, não de clientes verificados.
5. Não há estoque numérico nesta entrega, salvo decisão futura do negócio (RF-024).

## 12. Dados e Eventos Necessários

- Número e mensagem WhatsApp: **somente** env já previstos no PRD-004. Sem ID real, label real ou PII neste PRD (G6).
- Tracking do clique do FAB: mesmos eventos de lead/CTA já definidos no PRD-004, **somente após** consentimento; revogação para.
- **Não** copiar IDs de analytics da BrainArt.
- **Não** exigir `localStorage` de vagas como dado de produto.
- Se rotas placeholder existirem: G5 — não quebrar canonical, `robots`, sitemap; placeholders não devem parecer páginas de produto indexáveis como se as LPs já existissem (**Inferido:** noindex ou fora do sitemap até as LPs reais). Decisão de SEO é do Tech Lead; o requisito de produto é: não 404 e não mentir que o modelo já está no ar.

## 13. Critérios de Aceite

- **CA-001:** Dado que a home carrega, quando o visitante percorre a página até os planos, então ele encontra a seção de 7 modelos **antes** da seção de planos, sem alteração dos 3 planos nem da copy oficial de Hero/Pricing.

- **CA-002:** Dado que a seção de modelos está visível, quando o visitante inspeciona cada card, então vê foto ou placeholder com tamanho reservado, rótulo de nicho, nome (ou “Modelo [nicho]”) e linha de foco, para os 7 nichos da tabela §8.1.

- **CA-003:** Dado os cards de clínica estética e odonto, quando o visitante os compara, então os rótulos distinguem estética facial/corporal de odontologia/lentes (não dois cards “lentes” iguais).

- **CA-004:** Dado um card do carrossel, quando o visitante ativa o destino, então **não** abre URL BrainArt, **não** recebe 404, e **não** entra numa das 7 LPs-modelo (ainda inexistentes). O estado é “em breve”, âncora interna ou placeholder equivalente.

- **CA-005:** Dado viewport 390px, 768px e 1200px+, quando o visitante usa o carrossel (swipe e, no desktop, setas), então a **página** não gera overflow horizontal; o trilho rola; há snap por card; setas existem no desktop; hover/toque pausam autoplay se autoplay existir.

- **CA-006:** Dado teclado apenas, quando o visitante percorre a seção, então alcança setas (desktop) e os 7 modelos com foco visível, sem dezenas de clones tabuláveis, e sem pular heading para um segundo `h1`.

- **CA-007:** Dado `prefers-reduced-motion: reduce`, quando a home carrega, então não há autoplay/movimento contínuo do carrossel, nem pulse/float/ping do FAB ou do toast; os 7 cards, o FAB e o toast (se aplicável) permanecem visíveis e usáveis.

- **CA-008:** Dado a home, quando o visitante vê o canto inferior direito, então há FAB de WhatsApp com nome acessível; o destino usa o mesmo número e mensagem padrão dos CTAs já existentes (env); `rel` seguro em destino externo.

- **CA-009:** Dado o banner de consentimento visível, quando o visitante tenta Aceitar ou Recusar, então o FAB e o toast **não** cobrem nem bloqueiam esses controles.

- **CA-010:** Dado ausência de consentimento, quando o visitante clica no FAB, então o WhatsApp abre e **nenhum** evento de provider de ads/analytics é disparado. Dado consentimento revogado, quando clica de novo, então os disparos pararam.

- **CA-011:** Dado o toast de escassez visível, quando o visitante lê o texto, então a mensagem fala do Express 48h (capacidade/prazo) **sem** número de vagas inventado; o CTA leva à seção de planos; o dismiss fecha o toast; a página por baixo continua usável.

- **CA-012:** Dado esta entrega, quando se busca comportamento de escassez, então **não** há contador aleatório, reset teatral diário, nem estoque fingido.

- **CA-013:** Dado a home após a entrega, quando se compara com o produto aceito, então Express R$297, Landing que Vende R$997 e Máquina R$2497 permanecem; copy oficial de Hero e Pricing não foi reescrita por esta feature.

## 14. Dependências

- Produto já aceito: PRD-001 (planos, WhatsApp), PRD-002 (visual; não confundir prova social), PRD-004 (env WhatsApp, consentimento), copy oficial.
- Briefings 002–008: só inventário de nicho até haver PRDs das LPs.
- **UXD:** inexistente. Não bloqueia o PRD; o Tech Lead trabalha com este PRD + BRIEFING-001 §Implicações, sem inventar documento de design.
- **Conteúdo humano:** D-001, D-002 e D-003 fechados em 2026-09-01 (§8.1–8.3). D-006 (aria-label do FAB) ainda pode usar a proposta §8.4.
- **Negócio (futuro):** vagas reais Express — não neste MVP.
- **Image (futuro):** thumbs originais.
- Guardrails G1–G8: `AGENTS.md` enumeração canônica — este PRD **declara** os números tocados, não reescreve a lista.

## 15. Riscos e Decisões Pendentes

Fechadas pelo usuário em 2026-09-01 (Tech Lead **não** reabre):

| ID | Decisão |
| --- | --- |
| D-001 | Nomes = tabela §8.1 (“Modelo Oficina”, “Modelo Pet”, …). |
| D-002 | Eyebrow “Modelos por nicho”; título “Veja uma página feita para o seu tipo de negócio”. |
| D-003 | Toast no MVP, copy estática §8.3. Vagas reais = futuro. |

Ainda abertas (não bloqueiam SPEC; Tech Lead escolhe o default técnico quando o PRD já deu opção A):

| ID | Tema | Default se não houver nova decisão | Alternativa |
| --- | --- | --- | --- |
| D-004 | Item “Modelos” no header | Desejável: só âncora na página | Incluir no nav se não lotar |
| D-005 | Posição no fluxo | Após SocialProof | Após Solution (ainda antes de Pricing) |
| D-006 | Aria-label do FAB | “Fale conosco pelo WhatsApp” (§8.4) | Usuário ajusta depois |
| D-007 | Destino dos cards | Estado “em breve” na home | Rota dedicada sem 404 (cuidado G5) |

**Risco:** visitor interpretar modelos como cases reais → mitigar com rótulo de “modelo” / “template”, nunca depoimento da fonte.

**Risco:** toast vermelho de “emergência” destoar da marca → visual segue OCARECADEV; o padrão é toast, não a paleta red da fonte.

**Risco:** FAB + consentimento full-width no mobile → CA-009 é obrigatório.

**Não há contradição com PRD-001:** acrescenta showroom, atalho e lembrete Express; não altera 3 planos nem WhatsApp como conversão.

## 16. Notas para o Tech Lead

- Landing **já existe**. Não reconstruir. Não reduzir planos. Não reescrever PRD-001 a 006.
- BrainArt = referência de **padrão**. BRIEFING-001 §Implicações A/B/C é o recorte. 002–008 = rótulos, não backlog de 7 sites.
- Guardrails tocados (números canônicos em `AGENTS.md`): **G1** teclado/foco/contraste de carrossel e overlays; **G2** reduced-motion; **G3** sem CLS no FAB/toast, thumbs com dimensão, sem overflow nos 3 viewports; **G4** JS só se CSS não cumprir; **G5** se houver rotas placeholder, não quebrar canonical/sitemap; **G6** consentimento; **G7** sem dependência nova sem ADR; **G8** sem commit sem autorização.
- FAB da fonte usa lib de movimento no cliente. Isso **não** é requisito. G7 se alguém quiser lib nova.
- Não prescrever stack, arquivos de implementação nem biblioteca neste PRD.
- Próximo artefato: ADR (se G7/movimento/rotas) + SPEC com DoD. Quem marca DoD é o QA.
- `image-creator-agent` **não** entra neste MVP salvo o PO/Tech Lead pedir thumbs; placeholder de marca é aceitável.
- Handoff desta entrega: `docs/prd/PRD-INDEX-002-modelos-fab-escassez.md`.
