---
name: qa-divergence-escalation
description: Use when QA finds a development mismatch, documentation conflict, missing acceptance evidence, or a blocker that must be routed to dev or tech lead.
---

# QA Divergence Escalation

## Objetivo

Encaminhar divergencias para o agente correto, preservar rastreabilidade e exigir revalidacao antes do aceite final.

## Roteamento

Acione o agente dev quando:

- a spec, arquitetura e ADR estao claras;
- o comportamento implementado nao atende criterio de aceite;
- teste, build, lint ou fluxo principal falha por causa do codigo;
- ha regressao ou mudanca fora de escopo introduzida pela implementacao;
- falta teste ou evidencia que o dev deveria ter produzido.

Acione o agente tech lead quando:

- spec, arquitetura, ADR, PRD ou UXD entram em conflito;
- criterio de aceite e ambiguo, impossivel ou nao mensuravel;
- a correcao exigiria mudar arquitetura, contrato, escopo, dados, integracao, seguranca ou UX principal;
- a documentacao nao descreve comportamento essencial para decidir a implementacao;
- uma decisao do dev parece razoavel, mas nao esta respaldada por documento.

Quando houver duvida entre dev e tech lead, prefira tech lead se a correcao puder mudar docs ou decisao tecnica. Depois que o tech lead ajustar a documentacao, repasse ao dev apenas se o codigo tambem precisar mudar.

## Artefatos

Para divergencia de desenvolvimento, crie ou atualize:

```text
docs/specs/QA-DEV-FIX-001-descricao-curta.md
```

Para divergencia documental, crie ou atualize:

```text
docs/specs/QA-TECHLEAD-REVIEW-001-descricao-curta.md
```

Incremente o numero quando ja houver arquivos do mesmo tipo. Use slug curto em minusculas e ASCII.

## Estrutura para Dev

```markdown
# QA-DEV-FIX-001 - Titulo Curto

## 1. Contexto
## 2. Specs e ADRs Validadas
## 3. Divergencia Encontrada
## 4. Evidencia de Falha
## 5. Correcao Esperada
## 6. Verificacoes que Dev Deve Rodar
## 7. Criterios para Revalidacao QA
```

## Estrutura para Tech Lead

```markdown
# QA-TECHLEAD-REVIEW-001 - Titulo Curto

## 1. Contexto
## 2. Fontes em Conflito ou Lacuna
## 3. Impacto na Validacao
## 4. Decisao Necessaria
## 5. Documentos que Podem Precisar de Ajuste
## 6. Possivel Impacto no Codigo
## 7. Criterios para Revalidacao QA
```

## Ciclo de Revalidacao

Depois que dev ou tech lead responder:

- releia os arquivos alterados;
- confirme se a divergencia original foi resolvida;
- verifique se a correcao criou nova divergencia;
- rode novamente as verificacoes afetadas;
- registre o resultado no relatorio QA.

Nao de aceite final enquanto houver `QA-DEV-FIX-*` ou `QA-TECHLEAD-REVIEW-*` aberto que afete o escopo validado.

## Limites

- Nao corrija codigo como QA se a tarefa e apenas validar.
- Nao corrija docs como QA; solicite ao tech lead, salvo pedido explicito do usuario.
- Nao acione dev para implementar decisao que ainda depende de documentacao do tech lead.
