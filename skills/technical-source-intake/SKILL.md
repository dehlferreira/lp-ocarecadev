---
name: technical-source-intake
description: Use when a tech lead agent needs to read briefing, UX/design, and PRD documents before defining architecture or implementation specs.
---

# Technical Source Intake

## Objetivo

Ler todos os insumos criados pelos agentes anteriores e transformar briefing, UX/design e PRDs em uma base tecnica rastreavel para arquitetura, ADRs e specs.

## Entradas

Leia, salvo instrucao contraria do usuario:

- todos os arquivos `docs/briefing/BRIEFING-*.md`;
- todos os arquivos `docs/design/UXD-*.md`;
- todos os arquivos `docs/prd/PRD-*.md`;
- todos os arquivos `docs/prd/PRD-INDEX-*.md`;
- contexto adicional do usuario, quando existir.

Se algum grupo de documentos nao existir, registre a lacuna e continue com o que estiver disponivel. Nao invente requisitos tecnicos para compensar fonte ausente.

## Extrair

Para cada fonte, identifique:

- objetivo do produto ou experiencia;
- jornadas, telas, secoes e capacidades de produto;
- requisitos funcionais e criterios de aceite;
- requisitos de UX, acessibilidade, responsividade, conteudo e SEO;
- requisitos transversais de performance, analitica, seguranca, privacidade, operacao ou compliance quando aparecerem;
- dados, eventos, integracoes e regras de negocio citados;
- dependencias, riscos, decisoes pendentes e fora de escopo;
- nivel de confianca de cada conclusao.

## Marcadores de Confianca

Use estes marcadores em todas as notas tecnicas:

- `Confirmado:` quando a fonte declara diretamente.
- `Inferido:` quando a conclusao deriva dos documentos lidos.
- `Nao confirmado:` quando depende de decisao futura ou falta evidencia.

## Saida Intermediaria

Antes de escrever arquitetura, tenha uma sintese operacional com:

- mapa de fontes lidas;
- capacidades que precisam de decisao tecnica;
- requisitos transversais;
- lacunas que bloqueiam ou enfraquecem arquitetura;
- decisoes humanas pendentes;
- riscos que devem aparecer em ADR ou spec.

## Limites

- Nao pule PRDs em favor de briefings quando houver conflito; registre o conflito.
- Nao trate inspiracao visual como requisito tecnico obrigatorio sem fonte de PRD.
- Nao escolher stack apenas por preferencia pessoal.
- Nao iniciar implementacao.
