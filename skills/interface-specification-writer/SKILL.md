---
name: interface-specification-writer
description: Use when an agent needs to document screens, sections, components, states, responsive behavior, and accessibility for UX/design handoff.
---

# Interface Specification Writer

## Objetivo

Escrever especificacoes de interface suficientes para orientar design visual, prototipacao e traducao futura em PRDs.

## Especificar

### Telas e Secoes

Para cada tela ou secao relevante, registre:

- objetivo da tela/secao;
- prioridade na experiencia;
- conteudo obrigatorio;
- conteudo opcional;
- hierarquia visual;
- componentes usados;
- CTAs primarios e secundarios;
- dependencias ou lacunas.

### Componentes

Documente componentes reutilizaveis:

- nome;
- finalidade;
- anatomia;
- variantes;
- propriedades de conteudo;
- estados: default, hover, focus, active, disabled, loading, empty, error e success quando fizer sentido;
- regras responsivas;
- observacoes de acessibilidade.

### Responsividade

Registre mudancas entre desktop, tablet e mobile:

- ordem de conteudo;
- comportamento de grids e colunas;
- menu e navegacao;
- tamanhos minimos de areas clicaveis;
- tratamento de midia;
- conteudo que deve ser preservado ou condensado.

### Acessibilidade

Inclua requisitos praticos:

- contraste esperado;
- ordem de foco;
- labels e nomes acessiveis;
- texto alternativo para imagens relevantes;
- feedback nao dependente apenas de cor;
- reducao de movimento quando houver animacoes.

## Nivel de Detalhe

Escreva para outro agente agir sem pedir o briefing original, mas sem fechar decisoes de produto que pertencem ao PO.

## Erros Comuns

- Descrever componentes apenas visualmente, sem estados.
- Ignorar conteudo real necessario.
- Omitir acessibilidade.
- Misturar especificacao de interface com criterio formal de PRD.
