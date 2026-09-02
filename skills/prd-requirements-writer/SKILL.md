---
name: prd-requirements-writer
description: Use when a product owner agent needs to write structured PRDs from product, briefing, and UX/design inputs.
---

# PRD Requirements Writer

## Objetivo

Escrever PRDs claros, rastreaveis e acionaveis para que um futuro agente tech lead consiga derivar arquitetura, tarefas tecnicas e plano de implementacao.

## Local de Saida

Sempre grave PRDs em:

```text
docs/prd/
```

Use o padrao:

```text
PRD-001-descricao-curta.md
```

Incremente o numero se ja houver PRDs anteriores.

## Estrutura Recomendada

Use esta estrutura, adaptando somente quando o projeto exigir:

```markdown
# PRD-001 - Nome da capacidade ou entrega

## 1. Resumo

## 2. Fontes e Rastreabilidade

## 3. Problema e Objetivo

## 4. Usuarios e Contexto

## 5. Escopo

### 5.1 MVP
### 5.2 Desejavel
### 5.3 Futuro
### 5.4 Fora de Escopo

## 6. Jornada e Fluxo Principal

## 7. Requisitos Funcionais

## 8. Requisitos de Conteudo

## 9. Requisitos de UX, Interface e Acessibilidade

## 10. Estados, Erros e Feedback

## 11. Regras de Negocio

## 12. Dados e Eventos Necessarios

## 13. Criterios de Aceite

## 14. Dependencias

## 15. Riscos e Decisoes Pendentes

## 16. Notas para o Tech Lead
```

## Requisitos Funcionais

Escreva requisitos funcionais numerados e testaveis:

```markdown
- RF-001: [Confirmado | Inferido | Nao confirmado] O sistema deve ...
  - Fonte: docs/design/UXD-001-exemplo.md, secao 8.
  - Prioridade: MVP | Desejavel | Futuro.
```

## Criterios de Aceite

Use criterios observaveis, sem amarrar tecnologia:

```markdown
- CA-001: Dado que ..., quando ..., entao ...
```

Evite criterios vagos como "deve ser moderno", "deve funcionar bem" ou "deve ser intuitivo" sem comportamento verificavel.

## Regras de Escrita

- Escreva em portugues claro e direto.
- Preserve `Confirmado`, `Inferido` e `Nao confirmado`.
- Separe requisitos de produto de sugestoes tecnicas.
- Inclua requisitos de conteudo, UX, estados, acessibilidade e responsividade quando vierem dos insumos.
- Inclua decisoes pendentes em vez de fecha-las por conta propria.
- Nao prometa implementacao, prazo, custo ou stack.

## Checklist Final

Antes de finalizar cada PRD, confirme:

- o arquivo esta em `docs/prd`;
- o nome segue `PRD-001-descricao`;
- as fontes aparecem na secao de rastreabilidade;
- requisitos funcionais estao numerados;
- criterios de aceite sao verificaveis;
- lacunas e inferencias estao marcadas;
- ha notas claras para o futuro agente tech lead.
