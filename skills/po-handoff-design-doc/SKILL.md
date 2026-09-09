---
name: po-handoff-design-doc
description: Use when an agent needs to create a UX/design documentation file that prepares a future product owner agent to write PRDs.
---

# PO Handoff Design Doc

## Objetivo

Criar a documentacao final de UX/design que servira como insumo para um futuro agente PO escrever PRDs. O agente PO nao faz parte deste escopo.

## Local de Saida

Sempre grave o arquivo final em:

```text
docs/design/
```

Use o padrao:

```text
UXD-001-descricao-curta.md
```

Incremente o numero se ja houver documentacoes anteriores.

## Estrutura Recomendada

Use esta estrutura, adaptando somente quando o projeto exigir:

```markdown
# UXD-001 - Nome ou descricao do projeto

## 1. Resumo Executivo de UX

## 2. Briefing de Origem

## 3. Premissas e Nivel de Confianca

## 4. Publico, Contexto e Objetivos de Usuario

## 5. Principios de Experiencia

## 6. Jornadas Principais

## 7. Arquitetura de Informacao

## 8. Inventario de Telas e Secoes

## 9. Wireframes Textuais

## 10. Componentes e Padroes de Interface

## 11. Estados, Erros e Feedback

## 12. Responsividade

## 13. Acessibilidade

## 14. Conteudo e Microcopy

## 15. Direcao Visual para Design

## 16. Riscos, Lacunas e Decisoes Pendentes

## 17. Fora de Escopo

## 18. Checklist para o Futuro Agente PO
```

## Checklist para o PO

A ultima secao deve separar:

- funcionalidades candidatas a PRD;
- perguntas que precisam de decisao humana;
- requisitos derivados de UX;
- dependencias de conteudo, marca, tecnologia ou negocio;
- itens explicitamente fora de escopo.

## Regras de Escrita

- Escreva em portugues claro e direto.
- Use `Confirmado`, `Inferido` e `Nao confirmado`.
- Preserve rastreabilidade para o briefing de origem.
- Nao escreva PRDs, criterios de aceite finais, user stories completas ou backlog.
- Nao prometa implementacao.

## Checklist Final

Antes de finalizar, confirme:

- o arquivo esta em `docs/design`;
- o nome segue `UXD-001-descricao`;
- o briefing de origem aparece no documento;
- jornadas, arquitetura, telas, componentes, estados, responsividade e acessibilidade foram tratados;
- lacunas e inferencias estao marcadas;
- ha uma secao clara para o futuro agente PO.
