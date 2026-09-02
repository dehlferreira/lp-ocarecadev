---
name: implementation-verification-report
description: Use when a development agent finishes frontend implementation and needs to verify behavior and report what changed against the specs.
---

# Implementation Verification Report

## Objetivo

Verificar a implementacao contra as specs e entregar um resumo rastreavel do que foi feito, o que foi testado e quais riscos ou pendencias permanecem.

## Verificacao

Antes de finalizar:

- confira cada spec implementada contra seus criterios de aceite;
- rode os comandos de verificacao existentes e proporcionais ao risco, como lint, typecheck, testes e build;
- use verificacao em browser ou screenshot quando o comportamento visual, responsivo ou interativo for parte central da entrega;
- valide mobile e desktop quando a mudanca afetar layout;
- teste estados relevantes: carregamento, vazio, erro, interacao, foco, hover e conteudo longo quando aplicavel;
- registre qualquer verificacao nao executada e o motivo.

## Relato Final

No resumo ao usuario, inclua de forma concisa:

- specs implementadas;
- arquivos principais alterados;
- verificacoes executadas e resultado;
- divergencias resolvidas por inferencia;
- perguntas ou bloqueios enviados ao tech lead;
- pendencias que permanecem fora desta rodada.

## Relatorio Persistente

Crie um relatorio em `docs/specs/` somente quando o usuario pedir, quando houver handoff para outro agente, ou quando a implementacao tiver divergencias/pendencias relevantes.

Use o padrao:

```text
IMPLEMENTATION-REPORT-001-descricao-curta.md
```

Estrutura sugerida:

```markdown
# IMPLEMENTATION-REPORT-001 - Titulo Curto

## 1. Specs Implementadas
## 2. Arquivos Alterados
## 3. Decisoes de Implementacao
## 4. Verificacoes Executadas
## 5. Evidencias Visuais ou Funcionais
## 6. Divergencias e Perguntas
## 7. Pendencias e Fora de Escopo
```

## Limites

- Nao declare sucesso se build, teste ou verificacao central falhou.
- Nao esconda verificacoes puladas.
- Nao crie relatorio persistente para mudanca trivial sem necessidade de handoff.
