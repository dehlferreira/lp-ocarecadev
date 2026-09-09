---
name: qa-acceptance-report
description: Use when QA needs to record final validation, retest results, open divergences, or approval status for an implemented spec.
---

# QA Acceptance Report

## Objetivo

Registrar o resultado da validacao QA de forma rastreavel, incluindo evidencias, divergencias abertas, revalidacoes e decisao final de aceite.

## Local de Saida

Crie relatorio persistente em:

```text
docs/specs/
```

Use o padrao:

```text
QA-REPORT-001-descricao-curta.md
```

Incremente o numero quando ja houver relatorios anteriores.

## Estrutura Recomendada

```markdown
# QA-REPORT-001 - Titulo Curto

## 1. Escopo Validado
## 2. Fontes Conferidas
## 3. Matriz de Criterios
## 4. Verificacoes Executadas
## 5. Evidencias Funcionais ou Visuais
## 6. Divergencias Encontradas
## 7. Encaminhamentos para Dev ou Tech Lead
## 8. Revalidacao
## 9. Resultado Final
```

## Resultado Final

Use exatamente um destes status:

- `Aprovado`: todos os criterios do escopo foram verificados e nao ha divergencia aberta.
- `Aprovado com ressalvas`: apenas itens nao bloqueantes permanecem, documentados e fora do aceite central.
- `Reprovado - correcao dev`: ha divergencia de desenvolvimento bloqueante.
- `Bloqueado - revisao tech lead`: ha divergencia documental ou decisao tecnica pendente.
- `Bloqueado - nao verificavel`: falta ambiente, dado, credencial, asset ou criterio mensuravel.

## Conteudo Esperado

Inclua:

- specs, ADRs, arquitetura, PRDs e UXDs usados;
- commits, diff ou arquivos principais verificados quando disponivel;
- comandos executados e resultado;
- navegadores, viewports ou dispositivos simulados quando houver validacao visual;
- links para `QA-DEV-FIX-*` e `QA-TECHLEAD-REVIEW-*` criados;
- o que foi revalidado depois de cada correcao;
- riscos residuais e verificacoes nao executadas.

## Limites

- Nao use `Aprovado` se qualquer criterio central ficou sem evidencia.
- Nao esconda falha de verificacao em texto narrativo; reflita no status.
- Nao misture sugestoes futuras com bloqueios da entrega atual.
