---
name: qa-source-intake
description: Use when a QA agent needs to read implemented code, specs, ADRs, architecture, PRDs, and design docs before validating delivery.
---

# QA Source Intake

## Objetivo

Reunir os insumos necessarios para validar uma entrega implementada contra a documentacao tecnica e de produto, sem assumir que codigo ou docs estao corretos por padrao.

## Entradas Prioritarias

Leia nesta ordem quando existirem:

1. `docs/specs/SPEC-INDEX-*.md`
2. `docs/specs/IMPLEMENTATION-REPORT-*.md`
3. `docs/specs/SPEC-*.md`
4. `docs/adr/ARCH-*.md`
5. `docs/adr/ADR-*.md`
6. `docs/prd/PRD-*.md` referenciados por specs ou criterios de aceite.
7. `docs/design/UXD-*.md` quando houver requisito visual, responsivo, interativo ou de acessibilidade.
8. Diff, arquivos alterados, testes existentes e scripts do projeto.

Se houver multiplos indices ou relatorios, use o maior numero como entrada principal e confira se documentos anteriores continuam relevantes.

## Mapa de Validacao

Monte internamente uma matriz com:

- spec ou ADR de origem;
- requisito ou criterio de aceite;
- local esperado no codigo;
- evidencia necessaria para validar;
- status: aprovado, divergencia de codigo, divergencia documental, nao verificavel ou fora de escopo.

Nao aceite a entrega apenas porque build ou lint passou. Comandos automatizados sao evidencia parcial; requisitos de comportamento, responsividade, acessibilidade e conteudo precisam de verificacao propria quando fazem parte da spec.

## Inspecao do Codigo

Antes de testar:

- identifique stack, scripts e caminhos alterados;
- leia componentes, rotas, estilos, assets e testes relacionados as specs;
- confira se a implementacao seguiu arquitetura, ADRs e convencoes existentes;
- diferencie alteracao intencional de mudanca incidental fora de escopo;
- preserve mudancas nao relacionadas do usuario e nao reverta arquivos.

## Sinais de Risco

Trate como risco de QA:

- criterio de aceite sem evidencia;
- comportamento implementado diferente da spec;
- spec contradizendo ADR, PRD, UXD ou codigo viavel;
- teste passando sem cobrir o fluxo principal;
- layout nao verificado em mobile e desktop quando a entrega e visual;
- estado de erro, vazio, carregamento, foco ou interacao omitido quando aplicavel.

## Limites

- Nao implemente correcao diretamente como QA, exceto se o usuario pedir explicitamente.
- Nao altere documentacao tecnica em nome do tech lead sem pedido explicito.
- Nao declare aceite final com divergencia aberta ou verificacao central nao executada.
