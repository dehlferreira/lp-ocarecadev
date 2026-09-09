# SPEC-INDEX-002 - Handoff para Agente Dev: modelos, FAB e escassez

## 1. Visão Geral da Implementação

Feature nova na home já publicada: carrossel de 7 modelos + FAB WhatsApp + toast Express. Uma SPEC (`SPEC-011`). Sem ADR-012. Sem rotas novas. Sem lib nova. Não implementar as 7 LPs. Não alterar os 3 planos nem a copy de Hero/Pricing.

## 2. Fontes Lidas

| Fonte | Papel |
| --- | --- |
| `docs/prd/PRD-007-modelos-fab-escassez.md` | Requisitos, CA-001…013, copy §8, D-001…007 |
| `docs/prd/PRD-INDEX-002-modelos-fab-escassez.md` | Handoff PO → Tech Lead |
| `docs/prd/PRD-INDEX-001-landing-existente.md` | Produto já aceito (001–006) |
| `docs/briefing/BRIEFING-001-brainart-landing-referencia.md` §Implicações A/B/C | Padrão a copiar; marca/RNG a evitar |
| `docs/briefing/BRIEFING-002` … `008` | Inventário de nicho (rótulo). Não são SPECs das LPs |
| `docs/adr/ARCH-001-landing-astro.md` | Mapa ADR-001…011 |
| `docs/adrs/ADR-001` … `ADR-011` | Stack vigente (não reaberta) |
| `docs/design/UXD-*.md` | **Lacuna.** Não inventar |
| Código inspecionado | `index.astro`, `Layout.astro`, Header, SocialProof, About, Pricing, CtaFinal, CookieConsent, Button, GlassCard, `tracking.js`, `global.css`, `guide.md`, testes |

## 3. Arquitetura e ADRs

| Artefato | Uso |
| --- | --- |
| `docs/adr/ARCH-001-landing-astro.md` | Astro SSG, CSS vanilla, tracking, pastas |
| ADR-001, 002, 003, 005, 006 | Aplicados; **não** supersedidos |
| **ADR-012** | **Não criado** — sem módulo JS novo em `src/scripts/`, sem `/modelos/*`, sem lib |

## 4. Specs Criadas

| Spec | Objetivo | PRD | Status |
| --- | --- | --- | --- |
| `docs/specs/SPEC-011-modelos-fab-escassez.md` | Única spec desta entrega | PRD-007 | Pendente |

SPEC-001 a SPEC-010 **não** foram editadas. Índice legado: `docs/specs/SPEC-INDEX-001-landing-existente.md` (linha SPEC-011).

## 5. Ordem Recomendada de Execução

1. Ler `SPEC-011` inteira (restrições §2.2 e DoD §3).
2. Overlay: `WhatsAppFab.astro` + `ScarcityToast.astro` em `Layout.astro` **antes** de `CookieConsent`; CSS `:has(#cookie-consent:not([hidden]))` oculta FAB/toast.
3. Seção `ModelsShowcase.astro`: 7 cards, trilho CSS + snap, setas desktop com JS inline, “Em breve”, copy §2.3.
4. Encaixar em `index.astro` após `SocialProof`, antes de `About`.
5. Nav “Modelos” → `#modelos` no Header (desktop + mobile).
6. Testes em `test/modelos-fab-escassez.test.mjs`.
7. `npm run verify`. Não marcar DoD. Não commit (G8).

## 6. Mapa de Dependências

```
ADR-001/002/003/005/006 (vigentes)
    └── SPEC-011 (única)
            ├── Layout overlays (FAB, toast, cookie z-index 100)
            ├── index.astro + ModelsShowcase
            └── Header #modelos
PRD-007 §8 copy
    └── cards / headline / toast literais
tracking.js existente
    └── FAB data-track-event="lead" (não reescrever o runtime)
```

Não há SPEC-012 nesta entrega. `image-creator-agent` não entra.

## 7. Decisões Pendentes

Nenhuma bloqueante. Tech Lead fechou os defaults do PRD §15:

| ID | Escolha na SPEC-011 |
| --- | --- |
| D-004 | Incluir “Modelos” no nav (desktop + mobile) |
| D-005 | Após SocialProof, antes de About |
| D-006 | Aria-label `Fale conosco pelo WhatsApp` |
| D-007 | “Em breve” na home; sem rota |

## 8. Riscos Técnicos

- Cookie full-bleed inferior (`CookieConsent` z-index 100) vs FAB direita + toast esquerda → mitigado: overlays **só depois** de `#cookie-consent[hidden]`.
- Overflow-x da **página** se o trilho não for o scroller (G3).
- Clones tabuláveis (não copiar o loop da fonte).
- `test/tracking.test.mjs` conta `lead` **por arquivo existente** — FAB em arquivo novo.
- Preço Express no código (`R$ 597`) ≠ menção R$297 no PRD-007: **não “corrigir”** nesta entrega (CA-013 = não reescrever Pricing).
- `:has()` residual: fallback = cookie continua z-index 100.

## 9. Plano de Verificação Consolidado

- Dev: `npm run verify`.
- QA: `npm run check` + `npm run build` + `npm test` separados; DoD de `SPEC-011` §3; viewports 390 / 768 / 1200+; `prefers-reduced-motion: reduce`; Aceitar/Recusar com cookie visível; FAB sem consentimento não dispara provider.
- Contratos de fonte: `test/modelos-fab-escassez.test.mjs` (SPEC-011 §2.11).
- Não alterar `test/agent-protocol.test.mjs`.

## 10. Checklist para o Futuro Agente Dev

- [ ] Ler `docs/specs/SPEC-011-modelos-fab-escassez.md` (não só este índice).
- [ ] Não criar ADR, rota `/modelos/*`, lib, nem módulo em `src/scripts/`.
- [ ] Copy literal: §8 do PRD / §2.3 e §2.7 da SPEC.
- [ ] Clínica ≠ odonto (lentes só no odonto).
- [ ] FAB: env Header; `data-track-event="lead"`; `data-track-location="fab"`.
- [ ] FAB/toast invisíveis e sem clique enquanto o cookie não estiver `[hidden]`.
- [ ] Sem Framer Motion, sem RNG, sem fotos BrainArt, sem segundo `h1`, sem autoplay.
- [ ] Não marcar DoD. Não commit. Próximo após implementação: `quality-assurance-validation-agent`.
