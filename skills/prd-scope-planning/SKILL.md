---
name: prd-scope-planning
description: Use when a product owner agent needs to decide how many PRDs to create and how to group product requirements from briefing and UX docs.
---

# PRD Scope Planning

## Objetivo

Definir um recorte coerente de PRDs antes da escrita, agrupando requisitos por valor de usuario, jornada ou capacidade de produto.

## Como Agrupar

Prefira criar PRDs separados quando houver:

- jornadas de usuario independentes;
- entregas que possam ser implementadas ou priorizadas separadamente;
- areas com regras, estados ou dependencias proprias;
- diferencas claras entre experiencia publica, administracao, conteudo, integracoes ou analitica.

Prefira juntar em um unico PRD quando:

- o projeto for uma experiencia pequena;
- as funcionalidades compartilharem a mesma jornada principal;
- separar criaria documentos superficiais;
- a implementacao provavelmente sera uma entrega unica de MVP.

## Classificacao de Escopo

Classifique cada item candidato como:

- `MVP`: necessario para cumprir o objetivo principal.
- `Desejavel`: aumenta qualidade ou conversao, mas nao bloqueia o MVP.
- `Futuro`: valido, mas dependente de decisao, dados ou fase posterior.
- `Fora de escopo`: citado para evitar interpretacao incorreta.

## Plano de PRDs

Antes de escrever, defina:

- lista de PRDs a criar;
- objetivo de cada PRD;
- usuarios ou audiencia cobertos;
- fontes que sustentam cada PRD;
- dependencias entre PRDs;
- ordem sugerida de leitura para o futuro tech lead.

## Limites

- Nao crie backlog tecnico.
- Nao escolha arquitetura, stack, banco, APIs internas ou estimativas.
- Nao transforme decisoes pendentes em escopo fechado.
- Quando houver duvida, escolha o menor recorte coerente e marque a lacuna.

## Erros Comuns

- Criar um PRD por tela sem valor de produto claro.
- Criar um PRD unico grande demais para ser usado pelo tech lead.
- Misturar requisitos confirmados, inferidos e pendentes sem sinalizacao.
- Priorizar pela complexidade tecnica em vez de valor e jornada.
