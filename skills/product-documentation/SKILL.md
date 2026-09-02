---
name: product-documentation
description: Use ao criar ou atualizar um PRD da OCARECADEV — feature nova, mudança de escopo, nova seção da landing, ajuste de oferta ou de copy. Use também quando um pedido chegar vago e precisar virar requisito observável. NÃO use para decisão de arquitetura (ver technical-design), bug/regressão (ver maintenance-triage) ou implementação.
---

# Documentação de produto (PRD)

Overlay deste repositório, depois das skills do template (`prd-requirements-writer`, `prd-scope-planning`). O PRD explica **por que** e **o que**. Nunca **como**.

## Antes de escrever

| Ler | Por quê |
|---|---|
| `AGENTS.md` | fluxo, numeração, handoff, invariantes |
| `docs/prd/` | reaproveitar PRD existente em vez de criar duplicata |
| `docs/prd/PRD-INDEX-001-landing-existente.md` | mapa do que já existe |
| `docs/referencias/copy-completa-landing.md` | copy oficial aprovada |
| `src/components/sections/` | o que já está no ar |

Tema já coberto por um PRD → **atualize aquele PRD**. Só crie `PRD-NNN` novo para tema novo, com o próximo número livre. Não recrie PRD-001 a PRD-006.

## Formato

**PRD novo** segue a estrutura numerada de `skills/prd-requirements-writer/SKILL.md`. Neste repo, `## Critérios de Aceite` e `## Fora de Escopo` continuam obrigatórios — se o template os colocar com outro título, mantenha o conteúdo verificável; não entregue PRD sem os dois.

**PRD existente (PRD-001 a PRD-006)** não se converte de uma vez. Atualize no lugar, no formato que o arquivo já tem. Se o arquivo que você tocou ainda não tiver aceite e fora de escopo, acrescente essas seções antes de entregar. Dívida: `AGENTS.md §Dívida documental`.

## O que é um critério de aceite

Verificável sem interpretar intenção. Comportamento, estado, conteúdo ou número.

<Bad>
- O Hero deve ter uma boa primeira impressão.
- A página precisa carregar rápido.
- O CTA deve estar bem visível.
</Bad>

<Good>
- O Hero exibe a headline oficial de `copy-completa-landing.md §Hero`, sem variação.
- LCP ≤ 2.5s em 4G simulado, medido no build de produção.
- O CTA primário é visível sem scroll em viewport de 390×844.
- Clicar no CTA abre WhatsApp com a mensagem pré-preenchida definida em §3.
</Good>

Teste: outro agente consegue responder "passou ou falhou?" sem te perguntar nada? Se não, reescreva.

## Regras

- Escreve só em `docs/prd/`. Não cria ADR/SPEC, não edita `src/`.
- Marca hipótese como hipótese. `Premissa (não validada): ...`
- Não inventa número, depoimento, cliente ou métrica de mercado.
- Preserva posicionamento, copy aprovada, funil PAS, três planos e CTA de WhatsApp. Mudar isso exige confirmação do usuário, não decisão sua.

## Erros comuns

| Erro | Correção |
|---|---|
| Prescrever solução ("usar um accordion") | Descrever a necessidade ("usuário precisa comparar planos sem perder o CTA de vista") |
| Aceite subjetivo ("mais claro", "melhor") | Comportamento observável ou número |
| PRD novo para tema já coberto | Atualizar o PRD existente |
| Escopo aberto, sem "Fora de Escopo" | Listar explicitamente o que não entra |
| Inventar dado para preencher métrica | `Premissa (não validada)` ou pergunta ao usuário |
| Reescrever PRD-001..006 no formato do template | Atualizar no lugar; formato legado permanece |

## Handoff

Entregue ao `teachlead-architecture-agent` no formato de `skills/compact-agent-communication/SKILL.md`.

Requisito, público, definição de sucesso ou prioridade indefinidos → **pare e pergunte**. Não preencha por conta própria.
