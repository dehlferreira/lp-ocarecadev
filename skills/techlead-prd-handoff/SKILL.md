---
name: techlead-prd-handoff
description: Use when a product owner agent needs to create an index and handoff notes so a future tech lead agent can consume the PRDs.
---

# Tech Lead PRD Handoff

## Objetivo

Criar uma visao consolidada dos PRDs para que um futuro agente tech lead consiga entender o produto, ler os documentos na ordem correta e identificar decisoes que afetam arquitetura e implementacao.

## Local de Saida

Sempre grave o handoff em:

```text
docs/prd/
```

Use o padrao:

```text
PRD-INDEX-001-descricao-curta.md
```

Incremente o numero se ja houver indices anteriores.

## Estrutura Recomendada

```markdown
# PRD-INDEX-001 - Handoff para Tech Lead

## 1. Visao Geral do Produto

## 2. Fontes Lidas

## 3. PRDs Criados

## 4. Ordem Recomendada de Leitura

## 5. Mapa de Dependencias

## 6. Decisoes Pendentes que Afetam Tecnologia

## 7. Riscos de Produto

## 8. Requisitos Transversais

## 9. Fora de Escopo Consolidado

## 10. Checklist para o Futuro Agente Tech Lead
```

## Conteudo Esperado

Inclua:

- lista dos PRDs com objetivo e prioridade;
- relacao entre PRDs e documentos de origem;
- dependencias entre funcionalidades;
- requisitos transversais de UX, acessibilidade, conteudo, SEO, analitica, performance ou compliance quando aparecerem nos insumos;
- decisoes humanas pendentes;
- pontos que o tech lead deve investigar tecnicamente sem assumir como requisito fechado.

## Limites

- Nao defina arquitetura tecnica.
- Nao crie tarefas de engenharia.
- Nao estime prazo ou esforco.
- Nao escolha bibliotecas, hospedagem, banco de dados ou integracoes sem fonte confirmada.

## Checklist Final

Antes de finalizar, confirme:

- o indice esta em `docs/prd`;
- todos os PRDs criados aparecem listados;
- a ordem de leitura esta clara;
- dependencias e riscos estao separados;
- decisoes pendentes foram mantidas como pendentes;
- o tech lead recebe contexto suficiente para iniciar discovery tecnico.
