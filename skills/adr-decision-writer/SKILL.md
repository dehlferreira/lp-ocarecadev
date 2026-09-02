---
name: adr-decision-writer
description: Use when a tech lead agent needs to document architecture decisions, tradeoffs, consequences, and unresolved alternatives as ADR files.
---

# ADR Decision Writer

## Objetivo

Registrar decisoes de arquitetura de forma rastreavel para que o futuro agente dev implemente sabendo o que foi decidido, por que foi decidido e o que permanece em aberto.

## Quando Criar ADR

Crie ADR quando houver decisao tecnica que afete:

- estrutura de aplicacao, camadas, modulos ou ownership;
- stack, framework, runtime, hospedagem ou build;
- persistencia, modelos de dados, CMS, arquivos ou configuracao;
- integracoes externas, formularios, pagamentos, analytics ou APIs;
- seguranca, privacidade, permissoes ou compliance;
- estrategia de performance, SEO, acessibilidade ou observabilidade;
- tradeoff relevante entre simplicidade, flexibilidade, custo, risco ou prazo.

Nao crie ADR para detalhe pequeno de implementacao que cabe melhor em spec.

## Local de Saida

Sempre grave ADRs em:

```text
docs/adr/
```

Use o padrao:

```text
ADR-001-descricao-curta.md
```

Incremente o numero quando ja houver ADRs anteriores.

## Estrutura Recomendada

```markdown
# ADR-001 - Titulo da Decisao

## Status

Proposta | Aceita | Pendente

## Contexto

## Decisao

## Opcoes Consideradas

## Consequencias

## Riscos e Mitigacoes

## Impacto nas Specs

## Fontes
```

## Regras

- Use `Proposta` quando a decisao depende de confirmacao humana.
- Use `Aceita` apenas quando a fonte ou o usuario ja fechou a decisao.
- Inclua alternativas rejeitadas quando elas forem plausiveis.
- Liste consequencias positivas e negativas.
- Aponte PRDs, UXDs, briefings ou arquitetura de origem.
- Nao use ADR para justificar preferencia pessoal sem relacao com requisitos.
