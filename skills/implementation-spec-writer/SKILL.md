---
name: implementation-spec-writer
description: Use when a tech lead agent needs to write technical implementation specs for a future development agent from architecture, ADRs, and PRDs.
---

# Implementation Spec Writer

## Objetivo

Escrever specs tecnicas que permitam ao futuro agente dev implementar com clareza, verificabilidade e rastreabilidade, sem executar a implementacao.

## Local de Saida

Sempre grave specs em:

```text
docs/specs/
```

Use o padrao:

```text
SPEC-001-descricao-curta.md
```

Incremente o numero quando ja houver specs anteriores.

## Como Agrupar Specs

Prefira specs separadas quando houver:

- modulos ou rotas implementaveis separadamente;
- fronteiras claras entre frontend, backend, dados, integracoes ou conteudo;
- riscos tecnicos distintos;
- dependencia de ADRs diferentes;
- entregas que o futuro agente dev possa executar em sequencia.

Prefira uma spec unica quando:

- o projeto for pequeno;
- separar criaria documentos superficiais;
- a entrega tecnica for uma unidade simples de MVP.

## Estrutura Recomendada

```markdown
# SPEC-001 - Nome da Entrega Tecnica

## 1. Objetivo
## 2. Fontes e Rastreabilidade
## 3. Escopo de Implementacao
## 4. Fora de Escopo
## 5. Dependencias e ADRs
## 6. Design Tecnico
## 7. Contratos de Dados e Eventos
## 8. Estados, Erros e Acessibilidade
## 9. Requisitos de Qualidade
## 10. Plano de Implementacao Sugerido
## 11. Plano de Testes e Verificacao
## 12. Riscos, Lacunas e Perguntas
```

## Conteudo Esperado

- descreva arquivos, modulos, componentes, servicos ou contratos provaveis quando isso ajudar o dev;
- mantenha nomes como proposta tecnica se o codigo ainda nao existir;
- conecte cada item relevante a PRD, arquitetura ou ADR;
- inclua criterios de verificacao tecnicos e de produto;
- destaque dependencias entre specs;
- registre perguntas bloqueantes e nao bloqueantes separadamente.

## Limites

- Nao escrever codigo de producao.
- Nao criar commits de implementacao.
- Nao inventar APIs, schemas ou bibliotecas sem ADR ou fonte.
- Nao transformar plano de implementacao em estimativa de prazo.
