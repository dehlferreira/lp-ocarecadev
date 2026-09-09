---
name: implementation-source-intake
description: Use when a development agent needs to read tech lead specs, architecture, ADRs, and project code before implementing.
---

# Implementation Source Intake

## Objetivo

Ler e consolidar os insumos tecnicos criados pelo tech lead antes de qualquer implementacao, garantindo rastreabilidade entre specs, arquitetura, ADRs e codigo existente.

## Entradas Prioritarias

Leia nesta ordem quando existirem:

1. `docs/specs/SPEC-INDEX-*.md`
2. `docs/specs/SPEC-*.md`
3. `docs/adr/ARCH-*.md`
4. `docs/adr/ADR-*.md`
5. `docs/prd/PRD-*.md` somente quando a spec apontar lacuna de produto ou criterio de aceite.
6. `docs/design/UXD-*.md` somente quando a spec apontar lacuna visual, responsiva, interativa ou de acessibilidade.

Se houver varios indices, use o maior numero `SPEC-INDEX-###` como entrada principal e confira se ele referencia indices anteriores.

## Inspecao do Projeto

Antes de editar codigo:

- identifique stack, scripts, dependencias, rotas, componentes e padroes de estilo;
- leia arquivos de configuracao relevantes como `package.json`, configs de build/teste/lint, roteamento e design system;
- localize os modulos citados nas specs;
- verifique se os caminhos propostos pelo tech lead existem ou se sao apenas nomes sugeridos;
- trate nomes de arquivos/componentes sugeridos como proposta quando o codigo atual indicar outro padrao mais apropriado.

## Mapa de Execucao

Monte internamente um mapa curto com:

- specs que serao implementadas nesta rodada;
- arquivos provaveis a editar;
- dependencias entre specs;
- criterios de aceite e verificacao;
- decisoes pendentes bloqueantes e nao bloqueantes;
- partes explicitamente fora de escopo.

Nao publique um plano longo por padrao. Informe ao usuario apenas o suficiente para alinhar a execucao, a menos que ele peca um plano detalhado.

## Sinais de Divergencia

Acione `techlead-clarification-loop` quando encontrar:

- conflito entre spec, arquitetura, ADR, PRD ou UXD;
- requisito impossivel ou inseguro com a stack atual;
- ausencia de contrato, conteudo, asset, rota, dado ou decisao necessaria para implementar corretamente;
- proposta tecnica que contradiz convencao consolidada do codigo;
- criterio de aceite que nao pode ser verificado como escrito.

Se a divergencia tiver uma solucao conservadora e nao afetar contrato, escopo, arquitetura, conteudo critico ou UX principal, continue com a melhor inferencia e registre a decisao no resumo final.

## Limites

- Nao implemente antes de ler os insumos tecnicos disponiveis.
- Nao reescreva arquitetura, ADR ou spec como parte do intake.
- Nao amplie escopo alem das specs selecionadas.
- Nao trate lacuna documental como permissao para inventar comportamento central.
