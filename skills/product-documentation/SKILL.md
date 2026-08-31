---
name: product-documentation
description: Use ao criar ou atualizar um PRD da OCARECADEV — feature nova, mudança de escopo, nova seção da landing, ajuste de oferta ou de copy. Use também quando um pedido chegar vago e precisar virar requisito observável. NÃO use para decisão de arquitetura (ver technical-design), bug/regressão (ver maintenance-triage) ou implementação.
---

# Documentação de produto (PRD)

O PRD explica **por que** e **o que**. Nunca **como**.

## Antes de escrever

| Ler | Por quê |
|---|---|
| `AGENTS.md` | fluxo, numeração, handoff |
| `docs/prds/` | reaproveitar PRD existente em vez de criar duplicata |
| `docs/referencias/copy-completa-landing.md` | copy oficial aprovada |
| `src/components/sections/` | o que já existe hoje |

Tema já coberto por um PRD → **atualize aquele PRD**. Só crie `PRD-NNN` novo para tema novo, com o próximo número livre.

## Estrutura

Os PRDs deste repo usam headings com emoji. Este é o padrão-alvo — os PRDs antigos não têm todas as seções:

```markdown
# PRD-NNN: <Título>

## 🧠 Contexto
## 🎯 Objetivo
## 👥 Público-Alvo
## 🛤️ Fluxo do Usuário (Jornada)   ← quando houver interação
## 📋 Requisitos
## 🚫 Fora de Escopo
## ✅ Critérios de Aceite
## 📈 Métricas de Sucesso
## ⚠️ Riscos e Premissas
```

**`✅ Critérios de Aceite` e `🚫 Fora de Escopo` são obrigatórios.** Sem o primeiro, Tech Lead e QA adivinham; sem o segundo, o Dev expande a entrega. Todo PRD que você tocar sai com os dois — se o PRD antigo não tiver, acrescente antes de entregar. Estado atual da dívida: `AGENTS.md §Dívida documental`.

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

- Escreve só em `docs/prds/`. Não cria ADR/SPEC, não edita `src/`.
- Marca hipótese como hipótese. `Premissa (não validada): ...`
- Não inventa número, depoimento, cliente ou métrica de mercado.
- Preserva posicionamento, copy aprovada, funil PAS e CTA de WhatsApp. Mudar isso exige confirmação do usuário, não decisão sua.

## Erros comuns

| Erro | Correção |
|---|---|
| Prescrever solução ("usar um accordion") | Descrever a necessidade ("usuário precisa comparar planos sem perder o CTA de vista") |
| Aceite subjetivo ("mais claro", "melhor") | Comportamento observável ou número |
| PRD novo para tema já coberto | Atualizar o PRD existente |
| Escopo aberto, sem "Fora de Escopo" | Listar explicitamente o que não entra |
| Inventar dado para preencher métrica | `Premissa (não validada)` ou pergunta ao usuário |

## Handoff

Entregue ao `tech-lead` no formato de `skills/compact-agent-communication/SKILL.md`.

Requisito, público, definição de sucesso ou prioridade indefinidos → **pare e pergunte**. Não preencha por conta própria.
