---
name: briefing-intake-analysis
description: Use when an agent needs to read one or more project briefings before creating UX or product design documentation.
---

# Briefing Intake Analysis

## Objetivo

Transformar briefings de referencia em uma base clara de entendimento para documentacao de UX/design.

## Entradas

- Um ou mais arquivos em `docs/briefing/BRIEFING-*.md`.
- Contexto adicional do usuario, quando existir.

Se o usuario nao apontar um briefing especifico, use o briefing mais recente pelo maior numero `BRIEFING-###`.

## Extrair

- Objetivo percebido do projeto.
- Site, produto ou experiencia de referencia analisada.
- Publico-alvo confirmado, inferido ou ausente.
- Padroes visuais e estruturais que devem orientar o design.
- Padroes de interacao, responsividade e animacao.
- Conteudo, tom de voz, CTAs e hierarquia editorial.
- Restricoes, riscos, lacunas e pontos nao confirmados.

## Como Registrar

Use marcadores de confianca:

- `Confirmado:` quando o briefing declara diretamente.
- `Inferido:` quando a conclusao vem de padroes descritos no briefing.
- `Nao confirmado:` quando a informacao nao aparece ou depende de decisao futura.

## Saida Esperada

Antes de escrever documentacao de UX/design, tenha uma sintese operacional com:

- premissas de experiencia;
- decisoes herdadas do briefing;
- lacunas que afetam UX, conteudo ou produto;
- itens que o futuro agente PO deve transformar em requisito.

## Erros Comuns

- Reanalisar o site original quando o escopo e ler o briefing.
- Tratar inferencias como requisitos confirmados.
- Copiar o briefing inteiro em vez de sintetizar implicacoes para UX/design.
- Inventar funcionalidades que nao aparecem no briefing nem no contexto do usuario.
