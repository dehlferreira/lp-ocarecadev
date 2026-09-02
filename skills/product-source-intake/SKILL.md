---
name: product-source-intake
description: Use when a product owner agent needs to read project briefings and UX/design docs before writing PRDs.
---

# Product Source Intake

## Objetivo

Ler todos os insumos de produto disponiveis e transformar briefing + UX/design em uma base rastreavel para PRDs.

## Entradas

Leia, salvo instrucao contraria do usuario:

- todos os arquivos `docs/briefing/BRIEFING-*.md`;
- todos os arquivos `docs/design/UXD-*.md`;
- contexto adicional do usuario, quando existir.

Se nao houver documentos suficientes, registre a lacuna e continue apenas com o que estiver disponivel. Nao invente requisitos para compensar documentos ausentes.

## Extrair

Para cada documento de origem, identifique:

- objetivo do projeto, site, produto ou campanha;
- publico-alvo e contexto de uso;
- jornadas, telas, secoes e componentes relevantes;
- funcionalidades candidatas a PRD;
- requisitos de conteudo, marca, UX, acessibilidade e responsividade;
- restricoes, dependencias e decisoes pendentes;
- itens fora de escopo;
- nivel de confianca de cada conclusao.

## Marcadores de Confianca

Use estes marcadores em todas as notas e PRDs:

- `Confirmado:` quando a fonte declara diretamente.
- `Inferido:` quando a conclusao deriva de briefing, UX ou padroes documentados.
- `Nao confirmado:` quando depende de decisao futura ou falta evidencia.

## Rastreabilidade

Cada requisito relevante deve apontar sua origem:

- nome do arquivo de origem;
- secao de origem, quando identificavel;
- marcador de confianca.

## Saida Intermediaria

Antes de escrever PRDs, tenha uma sintese operacional com:

- mapa de fontes lidas;
- lista de capacidades candidatas;
- lacunas que bloqueiam ou enfraquecem requisitos;
- dependencias para negocio, conteudo, design ou tecnologia;
- itens que o futuro agente tech lead precisa receber como contexto.

## Erros Comuns

- Ler apenas o documento mais recente quando o escopo pede todos os insumos.
- Converter toda secao de UX em funcionalidade obrigatoria.
- Perder rastreabilidade entre requisito e documento de origem.
- Tratar inferencias como decisao confirmada.
