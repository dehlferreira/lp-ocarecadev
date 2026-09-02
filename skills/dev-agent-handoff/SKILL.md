---
name: dev-agent-handoff
description: Use when a tech lead agent needs to create an index and execution handoff for a future development agent after architecture, ADRs, and specs are written.
---

# Dev Agent Handoff

## Objetivo

Criar um indice consolidado para o futuro agente dev entender a ordem de leitura, dependencias, riscos e sequencia sugerida de implementacao.

## Local de Saida

Sempre grave o handoff em:

```text
docs/specs/
```

Use o padrao:

```text
SPEC-INDEX-001-descricao-curta.md
```

Incremente o numero quando ja houver indices anteriores.

## Estrutura Recomendada

```markdown
# SPEC-INDEX-001 - Handoff para Agente Dev

## 1. Visao Geral da Implementacao
## 2. Fontes Lidas
## 3. Arquitetura e ADRs
## 4. Specs Criadas
## 5. Ordem Recomendada de Execucao
## 6. Mapa de Dependencias
## 7. Decisoes Pendentes
## 8. Riscos Tecnicos
## 9. Plano de Verificacao Consolidado
## 10. Checklist para o Futuro Agente Dev
```

## Conteudo Esperado

Inclua:

- lista de arquivos `ARCH-*`, `ADR-*` e `SPEC-*`;
- relacao entre specs e PRDs;
- ordem sugerida para implementacao;
- dependencias que devem ser resolvidas antes de cada spec;
- testes e verificacoes esperadas;
- perguntas que precisam de decisao humana;
- itens fora de escopo para evitar implementacao acidental.

## Checklist Final

Antes de finalizar, confirme:

- o indice esta em `docs/specs`;
- todas as specs criadas aparecem listadas;
- arquitetura e ADRs relevantes aparecem referenciadas;
- a ordem de execucao esta clara;
- riscos e decisoes pendentes nao foram escondidos;
- o agente dev recebe contexto suficiente sem reler todos os briefings primeiro.
