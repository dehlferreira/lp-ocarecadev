---
name: techlead-clarification-loop
description: Use when a development agent finds a blocking divergence or documentation gap that should be resolved by the tech lead before implementation continues.
---

# Tech Lead Clarification Loop

## Objetivo

Formalizar perguntas do agente dev para o tech lead quando specs, arquitetura, ADRs ou codigo entram em conflito, permitindo que o tech lead corrija a documentacao necessaria e devolva uma base implementavel.

## Quando Bloquear

Pare a implementacao afetada e questione o tech lead quando a divergencia:

- muda contrato publico, rota, dados persistidos, integracao, permissao ou seguranca;
- altera escopo MVP, criterio de aceite ou comportamento principal;
- exige escolher entre duas fontes documentais conflitantes;
- depende de conteudo, asset, credencial, configuracao ou decisao humana ausente;
- torna um teste ou criterio de aceite impossivel de verificar;
- levaria a uma implementacao especulativa dificil de desfazer.

Nao bloqueie por detalhe local que pode ser resolvido com convencao existente sem mudar escopo ou contrato. Nesses casos, continue e registre a inferencia no resumo final.

## Documento de Pergunta

Quando houver bloqueio, crie ou atualize um arquivo em:

```text
docs/specs/
```

Use o padrao:

```text
DEV-QUESTION-001-descricao-curta.md
```

Incremente o numero quando ja houver perguntas anteriores.

## Estrutura Recomendada

```markdown
# DEV-QUESTION-001 - Titulo Curto

## 1. Contexto
## 2. Fontes em Conflito ou Lacuna
## 3. Impacto na Implementacao
## 4. Opcoes Possiveis
## 5. Recomendacao do Dev
## 6. Pergunta para o Tech Lead
## 7. Documentos que Provavelmente Precisam de Ajuste
```

## Conteudo Esperado

Inclua:

- arquivos e secoes envolvidos;
- trecho resumido do conflito, sem copiar grandes blocos;
- por que a decisao bloqueia ou arrisca a implementacao;
- uma recomendacao tecnica quando houver base suficiente;
- documentos que o tech lead deve revisar, como `ARCH-*`, `ADR-*`, `SPEC-*` ou `SPEC-INDEX-*`.

## Retorno do Tech Lead

Depois que o tech lead corrigir a documentacao:

- releia os arquivos alterados;
- confirme se a pergunta foi resolvida;
- continue a implementacao somente da parte desbloqueada;
- se a resposta criar nova divergencia, abra uma nova pergunta ou atualize a existente com historico curto.

## Limites

- Nao corrija arquitetura, ADR ou spec em nome do tech lead, exceto se o usuario pedir explicitamente.
- Nao continue implementando a parte bloqueada com suposicao propria.
- Nao transforme pergunta em backlog generico; mantenha a decisao concreta e acionavel.
