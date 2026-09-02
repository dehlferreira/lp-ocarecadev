---
name: technical-design
description: Use ao converter um PRD aprovado da OCARECADEV em ADR e/ou SPEC, ao registrar uma escolha técnica duradoura (framework, biblioteca, padrão, hospedagem, tracking), ou ao definir a Definition of Done de uma mudança. NÃO use para implementar código, para bug pontual (ver maintenance-triage) ou para decidir requisito de negócio (ver product-documentation).
---

# Design técnico (ADR + SPEC)

Overlay deste repositório, depois das skills do template (`adr-decision-writer`, `implementation-spec-writer`). ADR registra **decisão**. SPEC registra **instrução implementável**. São documentos diferentes com ciclos de vida diferentes.

Neste repo, o cabeçalho de SPEC com `Status` e Definition of Done **vence** o formato genérico do template. Sem DoD verificável a SPEC não está pronta para o Dev.

## Antes de propor

Leia `AGENTS.md`, o PRD, os ADRs relacionados em `docs/adr/`, `docs/adr/ARCH-001-landing-astro.md`, as SPECs vizinhas e os arquivos que a mudança vai tocar. Para animação de scroll, `guide.md` é normativo.

**Nunca contradiga um ADR aceito sem um novo ADR que o supersede explicitamente.** Não recrie ADR-001 a ADR-011 nem SPEC-001 a SPEC-010.

## ADR ou não?

| Situação | Artefato |
|---|---|
| Escolha que amarra tarefas futuras (lib, padrão, hospedagem, arquitetura) | ADR + SPEC |
| Reversão ou substituição de decisão anterior | ADR novo que supersede o antigo |
| Aplicação de uma decisão já registrada | só SPEC |
| Ajuste pontual, correção, refino visual | só SPEC (ou trilha de sustentação) |

Diário de implementação **não** é ADR.

## Formato do ADR

`docs/adr/ADR-NNN-<slug-kebab>.md`

```markdown
# ADR-NNN: <Título>

## Status
Aceito | Proposto | Superseded por ADR-XXX

## Data
AAAA-MM-DD

## Contexto
## Decisão Aprovada: <opção escolhida>
## Opções Analisadas
## Opções Reprovadas       ← com o motivo real da reprovação
## Consequências           ← positivas E negativas
## Relacionados            ← PRD-NNN, ADR-NNN, SPEC-NNN
```

`Status`, `Data` e `Relacionados` são obrigatórios. Todo ADR que você tocar sai com os três — se o ADR antigo não tiver, complete antes de entregar. Dívida: `AGENTS.md §Dívida documental`.

Uma opção reprovada sem motivo não é análise, é decoração. `Consequências` sem nenhum item negativo significa que você não analisou o trade-off.

## Formato da SPEC

`docs/specs/SPEC-NNN-<slug-kebab>.md`. O cabeçalho abaixo é o padrão real do repo e é **obrigatório**:

```markdown
# SPEC-NNN: <Título>

**Status:** [x] Pendente | [ ] Em Progresso | [ ] Implementada

> **⚠️ INSTRUÇÃO PARA AGENTES DE IA:**
> Durante a execução desta especificação, você deve consultar este arquivo. Ao finalizar a
> implementação técnica, é sua obrigação retornar a este documento, marcar as caixas do
> `Definition of Done` (DoD) que foram concluídas e atualizar o **Status** no topo para
> `[x] Implementada`.

## 1. Contexto e Objetivo    ← referencie PRD-NNN e ADR-NNN por identificador
## 2. Requisitos Técnicos    ← subseções 2.1, 2.2… por área afetada
## 3. Definition of Done (DoD)
```

Inclua em §2, quando aplicável: arquivos/interfaces impactados, restrições (o que **não** pode mudar), estratégia de teste e fallback/degradação.

## Definition of Done

Lista de checkboxes, cada uma verificável por comando ou observação direta.

<Bad>
- [ ] Código revisado e funcionando bem
- [ ] Performance aceitável
</Bad>

<Good>
- [ ] `.scrolly-section` zera o padding vertical externo das 4 seções pinadas.
- [ ] `prefers-reduced-motion` mantém todo o conteúdo visível, sem `opacity: 0` preso.
- [ ] Nenhum JavaScript novo adicionado.
- [ ] `npm run check`, `npm run build` e `npm test` concluem sem erro.
</Good>

Sempre inclua os três comandos na DoD. **Quem marca a DoD é o `quality-assurance-validation-agent`, nunca o Tech Lead nem o Dev.**

## Guardrails na SPEC

A enumeração canônica é `AGENTS.md §Guardrails G1–G8`. **Não a reescreva na SPEC.**

Em `## 2. Requisitos Técnicos`, declare quais guardrails a mudança toca — por número — e, na DoD, escreva o critério verificável citando o mesmo número:

```markdown
Guardrails afetados: G2, G3, G6.

- [ ] G3: `.scrolly-section` usa `100svh`; sem overflow horizontal em 390px.
- [ ] G2: `prefers-reduced-motion` mantém todo o conteúdo visível.
```

Assim o Dev implementa e o QA verifica o mesmo requisito, com o mesmo número. Guardrail que a mudança não toca não entra na DoD.

## Erros comuns

| Erro | Correção |
|---|---|
| ADR para ajuste pontual | Só SPEC |
| Alternativa listada sem motivo de reprovação | Motivo real, com trade-off |
| SPEC sem o bloco ⚠️ e sem Status | Copiar o cabeçalho padrão |
| DoD subjetiva | Comando ou observação verificável |
| SPEC que assume decisão de negócio não tomada | Escalar ao `product-owner-prd-agent` |
| Marcar DoD como aprovada | Isso é do QA |
| Recriar ADR/SPEC já aceitos no formato do template | Atualizar no lugar |

## Handoff

SPEC + limites + riscos → `development-implementation-agent`. Critérios + riscos → `quality-assurance-validation-agent`. Formato: `skills/compact-agent-communication/SKILL.md`.
