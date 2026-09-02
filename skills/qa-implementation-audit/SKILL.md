---
name: qa-implementation-audit
description: Use when a QA agent validates whether implemented code satisfies specs, ADRs, architecture, and acceptance criteria.
---

# QA Implementation Audit

## Objetivo

Auditar a entrega implementada com rastreabilidade requisito-a-requisito, classificando divergencias como problema de desenvolvimento, problema documental, bloqueio de verificacao ou fora de escopo.

## Ordem de Comparacao

Quando fontes entrarem em conflito, use esta prioridade ate que o tech lead resolva:

1. instrucoes explicitas do usuario nesta rodada;
2. specs mais recentes e seu `SPEC-INDEX`;
3. arquitetura e ADRs mais recentes;
4. PRDs e UXDs referenciados;
5. codigo existente e convencoes do projeto.

Se a prioridade nao resolver o conflito sem mudar escopo, contrato, arquitetura ou UX principal, classifique como divergencia documental e acione `qa-divergence-escalation`.

## Auditoria

Para cada spec validada:

- confira todos os criterios de aceite, nao apenas os arquivos citados;
- compare comportamento real com o texto da spec;
- verifique contratos, rotas, dados, estados, acessibilidade, responsividade e conteudo quando aplicaveis;
- confirme se ADRs e arquitetura foram respeitados;
- confira se a implementacao nao adicionou dependencia, servico, armazenamento ou escopo sem base documental;
- procure regressao evidente em fluxos vizinhos tocados pela mudanca.

## Verificacoes

Execute verificacoes proporcionais ao risco:

- lint, typecheck, testes unitarios/integracao e build quando existirem;
- testes manuais ou automatizados de fluxo para criterios centrais;
- browser, screenshots ou inspecao responsiva quando houver interface;
- mobile e desktop quando layout, navegacao ou conteudo visual forem parte da entrega;
- estados de carregamento, vazio, erro, foco, hover, desabilitado e conteudo longo quando relevantes.

Registre comando, resultado e evidencia observavel. Se uma verificacao nao puder ser executada, marque como `nao verificavel` e explique o bloqueio.

## Classificacao

Use estas classes:

- `aprovado`: requisito atendido com evidencia suficiente.
- `divergencia de desenvolvimento`: docs estao claras, mas codigo nao cumpre.
- `divergencia documental`: docs conflitam, estao incompletas ou exigem decisao do tech lead.
- `nao verificavel`: falta ambiente, dado, credencial, asset, comando ou criterio mensuravel.
- `fora de escopo`: item nao pertence as specs desta rodada.

## Limites

- Nao aceite criterio parcialmente atendido como aprovado.
- Nao transforme gosto subjetivo em bug se specs e convencoes foram atendidas.
- Nao abra correcao para dev quando a origem real e documento ambiguo ou contraditorio.
