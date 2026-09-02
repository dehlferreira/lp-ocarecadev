# PRD-INDEX-002 - Handoff para Tech Lead: modelos, FAB e escassez

`Objetivo` Discovery técnico de PRD-007 (carrossel de 7 modelos + FAB WhatsApp + toast Express) sem alterar os 3 planos nem a copy já aprovada.
`Artefatos` `docs/prd/PRD-007-modelos-fab-escassez.md`; `docs/briefing/BRIEFING-001-brainart-landing-referencia.md` §Implicações A/B/C; `docs/briefing/BRIEFING-002`–`008` (só inventário de nicho); `docs/prd/PRD-INDEX-001-landing-existente.md`.
`Decisões` Landing já existe — não reconstruir. BrainArt = padrão, não marca. 7 LPs-modelo = futuro. Toast sim; contador RNG/fake **não** é requisito. Sem UXD (`docs/design/UXD-*.md` inexistente — não inventar).
`Riscos/Bloqueios` D-001, D-002 e D-003 fechados pelo usuário 2026-09-01 (`PRD-007` §8 e §15). Restam D-004 (nav), D-005 (ordem), D-006 (aria FAB), D-007 (destino dos cards). Não bloqueiam SPEC.
`Próximo responsável` `teachlead-architecture-agent`

---

## 1. Visão Geral do Produto

A home OCARECADEV já vende três planos (Express R$297, Landing que Vende R$997, Máquina R$2497) com conversão por WhatsApp. PRD-007 **acrescenta** três capacidades na mesma jornada: showroom de 7 modelos de nicho, atalho flutuante de WhatsApp, alerta dismissível de capacidade do Express 48h.

Não é redesign. Não é redução para 2 planos. Não é implementação das 7 LPs descritas em BRIEFING-002 a 008.

## 2. Fontes Lidas

| Fonte | Papel |
| --- | --- |
| `docs/briefing/BRIEFING-001-brainart-landing-referencia.md` | Referência de padrões; recorte = §Implicações A/B/C |
| `docs/briefing/BRIEFING-002` … `008` | Inventário dos 7 nichos (rótulo). Não são SPECs das LPs |
| Pedido do usuário 2026-09-01 | Priorizou A+B+C; manteve 3 planos; LPs depois; fake countdown fora |
| `docs/prd/PRD-001-visao-geral-e-negocios.md` | 3 planos, WhatsApp — **não reescrito** |
| `docs/prd/PRD-002-design-e-interface.md` | Glass/mobile; “portfólio” lá = prova social ≠ PRD-007 |
| `docs/prd/PRD-004-marketing-e-tracking.md` | Env WhatsApp, consentimento (G6) |
| `docs/referencias/copy-completa-landing.md` | Copy oficial; esta feature **não está** nela |
| `docs/design/UXD-*.md` | **Lacuna.** Não bloquear. Não inventar UXD |
| Playwright na análise da fonte | Indisponível (registrado no BRIEFING-001) |

## 3. PRDs Criados

| PRD | Objetivo | Prioridade |
| --- | --- | --- |
| `docs/prd/PRD-007-modelos-fab-escassez.md` | Único PRD desta entrega: carrossel + FAB + toast na home | MVP da feature |

PRD-001 a PRD-006 **não** foram tocados. Índice legado: `docs/prd/PRD-INDEX-001-landing-existente.md` (linha nova na tabela + próximo responsável).

Não há PRD-008+ para as 7 LPs neste ciclo.

## 4. Ordem Recomendada de Leitura

1. `docs/prd/PRD-INDEX-001-landing-existente.md` — o que já está aceito.
2. `docs/prd/PRD-007-modelos-fab-escassez.md` — requisitos, aceite, fora de escopo, pendências.
3. `docs/prd/PRD-001-visao-geral-e-negocios.md` — confirmar que 3 planos e WhatsApp não mudam.
4. `docs/briefing/BRIEFING-001-brainart-landing-referencia.md` §Implicações A/B/C — anatomia da referência (copiar padrão, não marca).
5. `docs/briefing/BRIEFING-002` a `008` — **só** para conferir os 7 rótulos e a desambiguação estética vs odonto.
6. `docs/prd/PRD-004-marketing-e-tracking.md` — env e G6 no FAB.
7. `docs/referencias/copy-completa-landing.md` — o que **não** reescrever; §8 do PRD-007 é proposta nova.

## 5. Mapa de Dependências

```
PRD-001 (3 planos, WhatsApp)
    └── PRD-007 MVP (não altera oferta)
PRD-002 visual / prova social
    └── PRD-007 seção nova (não substitui SocialProof)
PRD-004 env + consentimento
    └── FAB e tracking do FAB
BRIEFING-002–008
    └── rótulos dos 7 cards agora
    └── LPs reais = futuro (fora deste MVP)
UXD
    └── inexistente; SPEC sai do PRD-007 + briefing
image-creator-agent
    └── thumbs originais = futuro; placeholder ok no MVP
```

As três capacidades do PRD-007 compartilham a home e os overlays (consentimento, FAB, toast): uma SPEC (ou um conjunto estreito) é mais coerente do que três entregas isoladas — decisão de corte técnico é do Tech Lead.

## 6. Decisões Pendentes que Afetam Tecnologia

Não fechar no lugar do negócio. Detalhe em `PRD-007` §15.

| ID | Estado | Efeito técnico típico (investigar, não assumir) |
| --- | --- | --- |
| D-001 | **Fechado:** nomes “Modelo …” §8.1 | Copy dos cards fechada |
| D-002 | **Fechado:** eyebrow + H2 §8.2 | Bloco de título no MVP |
| D-003 | **Fechado:** toast estático §8.3 | Sem fonte de vagas; sem `localStorage` de estoque |
| D-004 | Aberto (desejável) | Nav + âncora vs só âncora |
| D-005 | Aberto; default após SocialProof | Ordem na home; CA-001 só exige “antes dos planos” |
| D-006 | Default §8.4 | Aria-label do FAB |
| D-007 | Aberto; default “em breve” na home | G5 (canonical, sitemap, 404, indexação) |

G7: se a implementação quiser dependência cliente nova para movimento, isso **não** está no PRD — exige ADR.

## 7. Riscos de Produto

- Cards lidos como cases reais (mitigar: “modelo” / “template”, nunca depoimento BrainArt).
- Dois cards “lentes” (clínica vs odonto) — PRD-007 RF-005 / CA-003.
- Toast com número de vagas mentiroso — **proibido** (CA-012).
- FAB cobrindo consentimento full-width no mobile — CA-009.
- Copiar loop com dezenas de clones tabuláveis da fonte — falha G1 (CA-006).
- Reconstruir a landing ou “alinhar” copy do Hero/Pricing de passagem.

## 8. Requisitos Transversais

Declarar na SPEC quais G toca. Enumeração canônica: `AGENTS.md`. Este índice **não** reescreve a lista.

- **G1** — teclado, foco visível, contraste, um `h1`, carrossel e overlays.
- **G2** — reduced-motion desliga autoplay/pulse/float/ping; conteúdo visível.
- **G3** — dimensão em thumbs; sem CLS de FAB/toast; sem overflow 390/768/1200+.
- **G4** — JS só se CSS não cumprir o comportamento.
- **G5** — rotas placeholder não quebram canonical/sitemap; sem 404.
- **G6** — FAB não trackeia antes do consentimento; revogação para.
- **G7** — sem dep nova sem ADR.
- **G8** — sem commit sem autorização do usuário.

Acessibilidade e honestidade da escassez são critérios de produto, não “polimento”.

## 9. Fora de Escopo Consolidado

Ver `PRD-007` seção **Fora de Escopo**. Em resumo: 2 planos; preços/copy/marca/depoimentos BrainArt; “Risco Zero”; IDs e WhatsApp da fonte; 7 LPs agora; UXD inventado; formulário diagnóstico; tráfego pago; mudar copy Hero/Pricing; lib cliente nova como requisito; RNG de vagas; thumbs da fonte.

## 10. Checklist para o Futuro Agente Tech Lead

- [ ] Ler PRD-007 inteiro (RFs, CA, Fora de Escopo, §15).
- [ ] Confirmar que a SPEC **não** altera os 3 planos nem a copy oficial.
- [ ] Mapear A/B/C para a home existente (seção nova + overlays), sem novo site.
- [ ] Tratar BRIEFING-002–008 como inventário, não como 7 implementações.
- [ ] Registrar lacuna UXD; não criar UXD.
- [ ] Decidir ADR só se a decisão durar (G7, rotas, movimento).
- [ ] SPEC com DoD observável a partir dos CA-001…013. QA marca DoD.
- [ ] Destino dos cards: sem BrainArt, sem 404, sem 7 LPs.
- [ ] Escassez: toast + copy Express honesta; zero RNG.
- [ ] FAB: env existente; G6; não cobrir consentimento.
- [ ] Não acionar Dev antes da SPEC. Não commit (G8).
