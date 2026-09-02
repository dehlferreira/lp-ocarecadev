---
name: briefing-synthesis-writer
description: Use when an agent needs to write a structured briefing document from reference source analysis, including websites, documents, text, images, screenshots, or mixed inputs.
---

# Briefing Synthesis Writer

## Objetivo

Escrever um briefing claro, acionavel e especifico para que um agente de design consiga criar documentacoes e propostas visuais depois.

## Local de Saida

Sempre grave o arquivo final em:

```text
docs/briefing/
```

Use o padrao:

```text
BRIEFING-001-descricao-curta.md
```

Incremente o numero se ja houver briefings anteriores.

## Estrutura Recomendada

Use esta estrutura, adaptando somente quando as fontes exigirem:

```markdown
# BRIEFING-001 - Nome ou descricao do site

## 1. Resumo Executivo

## 2. Fontes Analisadas

## 3. Objetivo Percebido do Site

## 4. Mapa de Paginas e Secoes

## 5. Estrutura de Conteudo

## 6. Sistema Visual

### 6.1 Cores
### 6.2 Tipografia
### 6.3 Layout e Grid
### 6.4 Imagens, Videos e Iconografia
### 6.5 Componentes

## 7. Interacoes e Animacoes

## 8. Responsividade

## 9. Tom de Voz e Conteudo

## 10. Padroes Reutilizaveis para o Designer

## 11. Pontos de Atencao

## 12. Limitacoes da Analise

## 13. Checklist para o Proximo Agente
```

## Regras de Escrita

- Escreva em portugues claro e direto.
- Priorize observacoes especificas das fontes analisadas.
- Use bullets para listas tecnicas e paragrafos curtos para sintese.
- Marque `Confirmado`, `Inferido` e `Nao confirmado` quando necessario.
- Inclua detalhes suficientes para orientar design: medidas aproximadas, comportamento, hierarquia, estilo e intencao.
- Nao prometa implementacao. O arquivo e briefing, nao plano de desenvolvimento.
- Na secao de fontes analisadas, liste cada fonte com identificador, tipo, confianca da leitura e limitacoes.

## Checklist Final

Antes de finalizar, confirme:

- o arquivo esta em `docs/briefing`;
- o nome segue `BRIEFING-001-descricao`;
- as fontes analisadas aparecem no documento;
- existem limitacoes documentadas;
- cores, tipografia, layout, componentes, conteudo, responsividade e animacoes foram tratados;
- inferencias estao marcadas;
- o texto e util para outro agente de design agir sem reler todas as fontes originais.
