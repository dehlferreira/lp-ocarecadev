---
name: solution-architecture-definition
description: Use when a tech lead agent needs to define system architecture, technical boundaries, modules, data flow, integrations, and engineering constraints from product inputs.
---

# Solution Architecture Definition

## Objetivo

Definir uma arquitetura tecnica suficiente para orientar specs de implementacao, sem escrever codigo nem fechar decisoes que ainda dependem do usuario.

## Definir

### Visao Tecnica

- objetivo tecnico da solucao;
- escopo do MVP e limites explicitos;
- premissas confirmadas, inferidas e nao confirmadas;
- restricoes de plataforma, hospedagem, stack, dados ou operacao quando existirem.

### Fronteiras e Modulos

Para cada modulo, camada ou area tecnica, registre:

- responsabilidade;
- entradas e saidas;
- dependencias internas e externas;
- requisitos de estado, persistencia ou configuracao;
- principais riscos;
- PRDs e fontes relacionados.

### Dados e Fluxos

Documente:

- entidades, conteudos, estados e eventos conhecidos;
- origem, transformacao e destino de dados;
- fluxos de leitura, escrita, envio, rastreamento ou publicacao;
- regras de validacao e tratamento de erro;
- dados ainda nao confirmados.

### Requisitos Transversais

Considere somente quando houver fonte ou inferencia justificada:

- performance e carregamento;
- SEO e metadados;
- acessibilidade tecnica;
- responsividade e comportamento cross-device;
- seguranca, privacidade e permissao;
- observabilidade, analitica e eventos;
- internacionalizacao, conteudo e configurabilidade;
- operacao, deploy e manutencao.

## Saida Esperada

Escreva a arquitetura em:

```text
docs/adr/ARCH-001-descricao-curta.md
```

Incremente o numero quando ja houver arquivos `ARCH-###`.

## Estrutura Recomendada

```markdown
# ARCH-001 - Arquitetura da Solucao

## 1. Resumo Tecnico
## 2. Fontes e Rastreabilidade
## 3. Escopo Tecnico
## 4. Premissas e Restricoes
## 5. Visao de Arquitetura
## 6. Modulos e Responsabilidades
## 7. Dados, Estados e Eventos
## 8. Integracoes e Dependencias
## 9. Requisitos Transversais
## 10. Riscos Tecnicos
## 11. Decisoes Pendentes
## 12. ADRs Necessarias
## 13. Specs Derivadas
```

## Limites

- Nao escrever tarefas granulares de backlog.
- Nao criar estimativas de prazo ou esforco.
- Nao transformar decisao pendente em decisao tomada.
- Quando escolher uma direcao tecnica por inferencia, explique a fonte e marque como `Inferido`.
