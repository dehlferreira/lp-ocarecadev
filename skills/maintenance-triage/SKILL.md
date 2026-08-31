---
name: maintenance-triage
description: Use quando a demanda for sustentação da OCARECADEV — bug, regressão, link quebrado, typo, imagem pesada, dívida técnica, atualização de dependência ou ajuste que não muda comportamento acordado. Use para decidir se a correção precisa de PRD/ADR/SPEC nova ou entra numa SPEC existente. NÃO use para feature nova ou mudança de escopo (ver product-documentation).
---

# Triagem de sustentação

Nem toda correção merece um PRD. Nem toda correção dispensa registro. Esta skill decide qual.

## A pergunta que resolve

**A mudança altera algum comportamento que um PRD ou uma DoD já aprovou?**

| Resposta | Trilha |
|---|---|
| Não — restaura o comportamento já acordado | **Trilha leve** |
| Sim — muda o que foi acordado | **Trilha completa**: PRD → ADR/SPEC → Dev → QA |
| Não sei | Trilha completa. A dúvida decide contra o atalho |

## Trilha leve

Para: bug, regressão, typo em copy já aprovada, link quebrado, asset mal otimizado, refactor sem mudança de comportamento, bump de dependência.

1. **Reproduza antes de corrigir.** Sem reprodução, não há correção — há palpite. Registre: passos, esperado, observado.
2. **Ache a SPEC dona do comportamento.** Grep em `docs/specs/`. É ela que descreve o que deveria acontecer.
3. **Registre na SPEC existente**, em `## 2. Requisitos Técnicos`, como subseção de correção — com a data e o que estava errado. Adicione o item correspondente à DoD. Se a SPEC já estava `[x] Implementada`, volte o Status para `[ ] Em Progresso`: ela só volta a `Implementada` quando o `qa-engineer` aprovar o item novo.
4. Se **nenhuma** SPEC cobre o comportamento, aí sim crie `SPEC-NNN` nova (ver `skills/technical-design/SKILL.md`). PRD continua dispensável.
5. Dev implementa (`skills/astro-implementation/SKILL.md`), QA valida (`skills/landing-quality-assurance/SKILL.md`).

O QA continua sendo o único que marca a DoD. A trilha leve encurta a documentação, **não** a verificação.

## O que dispara escalada para trilha completa

Pare a trilha leve e chame o `product-owner` quando a correção:

- mudar copy, oferta, preço, posicionamento ou o fluxo de WhatsApp;
- remover ou adicionar seção da landing;
- mudar o que é medido ou como a conversão é contada;
- exigir nova dependência, novo serviço externo ou novo tipo de dado coletado;
- envolver dado pessoal, consentimento ou retenção.

Os três últimos também exigem ADR (`skills/technical-design/SKILL.md`).

## Erros comuns

| Erro | Correção |
|---|---|
| Corrigir sem reproduzir | Reproduzir primeiro, sempre |
| Corrigir o sintoma visível | Achar a causa; se a causa for outra camada, corrigir lá |
| "É só um typo" numa copy aprovada | Copy aprovada é escopo de produto → PO |
| Aproveitar a correção para refatorar em volta | Fora de escopo vira `Riscos/Bloqueios` |
| Corrigir sem registrar em SPEC nenhuma | A próxima regressão não terá referência |
| Pular o QA porque "é pequeno" | Verificação não encolhe |
| Bump de dependência sem rodar os três comandos | `npm run check && npm run build && npm test` |

## Handoff

Formato de `skills/compact-agent-communication/SKILL.md`. Em `Objetivo`, diga explicitamente que é sustentação e qual SPEC recebeu o registro.
