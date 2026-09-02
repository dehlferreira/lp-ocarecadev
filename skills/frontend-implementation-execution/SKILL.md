---
name: frontend-implementation-execution
description: Use when a development agent implements frontend work from approved specs while preserving existing codebase conventions.
---

# Frontend Implementation Execution

## Objetivo

Implementar mudancas de frontend a partir das specs aprovadas, seguindo as convencoes existentes do projeto e entregando uma experiencia funcional, responsiva, acessivel e verificavel.

## Prioridade de Decisao

Quando houver conflito, use esta ordem:

1. instrucoes explicitas do usuario nesta conversa;
2. specs, arquitetura e ADRs mais recentes;
3. PRDs e UXDs referenciados pela spec;
4. padroes existentes do codigo;
5. melhores praticas gerais de frontend.

Se uma decisao de nivel superior contradisser uma restricao tecnica real do codigo, acione `techlead-clarification-loop`.

## Convencoes de Codigo

Antes de criar padroes novos:

- reutilize componentes, tokens, estilos, helpers, hooks e estruturas existentes;
- mantenha os limites de modulos e rotas ja estabelecidos;
- preserve nomenclatura, organizacao de arquivos, padrao de importacao e estilo de estado ja usados;
- evite novas dependencias sem necessidade clara ou sem respaldo em ADR/spec;
- prefira alteracoes pequenas e coesas, com refatoracoes somente quando reduzem risco ou duplicacao real.

## Qualidade de Interface

Garanta que a implementacao:

- entregue a experiencia real como primeira tela quando for app, ferramenta, site ou jogo, sem criar landing page desnecessaria;
- use hierarquia visual adequada ao dominio e ao nivel de densidade esperado;
- tenha estados de carregamento, vazio, erro, foco, hover e desabilitado quando aplicaveis;
- seja navegavel por teclado para controles interativos;
- use semantica HTML adequada e labels acessiveis;
- mantenha texto legivel e sem sobreposicao em mobile e desktop;
- defina dimensoes estaveis para grids, boards, toolbars, botoes, tiles e areas interativas;
- preserve ou melhore responsividade sem quebrar conteudo existente.

## Implementacao

Durante a execucao:

- implemente uma spec ou grupo coeso de specs por vez;
- mantenha rastreabilidade mental entre cada alteracao e o item da spec;
- nao misture tarefas fora de escopo, limpeza cosmetica ampla ou reescrita de arquitetura;
- trate assets referenciados como obrigatorios apenas quando a spec, UXD ou PRD exigir;
- quando precisar inferir microcopy, estados ou nomes internos, escolha opcoes neutras e consistentes com o produto.

## Testes Durante Desenvolvimento

Escolha verificacoes proporcionais ao risco:

- execute lint, typecheck, unit tests ou build quando existirem;
- adicione testes focados quando tocar logica compartilhada, estado, contratos, componentes reutilizaveis ou fluxo critico;
- use verificacao visual/browser quando a entrega for principalmente interface, responsividade, navegacao ou interacao;
- registre no final qualquer verificacao que nao pode ser executada.

## Limites

- Nao altere docs do tech lead para fazer a implementacao caber; use `techlead-clarification-loop`.
- Nao introduza dependencia, servico externo, analytics, armazenamento ou API nova sem base em spec/ADR ou aprovacao.
- Nao reverta mudancas nao relacionadas do usuario.
- Nao declare a entrega completa sem verificacao proporcional.
