---
name: compact-agent-communication
description: Use ao escrever qualquer handoff, relatório de status ou resumo destinado a outro agente da OCARECADEV — PO→Tech Lead, Tech Lead→Dev, Dev→QA, QA→Dev, Image→Dev. Use também quando perceber que está prestes a repetir contexto que já existe em PRD/ADR/SPEC. NÃO use para falar com o usuário humano, nem nas situações listadas em "Quando voltar ao texto normal".
---

# Comunicação compacta entre agentes

Estilo "caveman": frases curtas, dado exato, zero preâmbulo. Autossuficiente — não depende de nenhuma skill externa.

**Princípio:** comprima a *forma*, nunca o *conteúdo verificável*. Se a compressão remove uma condição, uma negação, uma unidade ou um caminho, ela deixou de ser compressão e virou perda.

## Formato do handoff

Use apenas os campos que têm conteúdo real. Nesta ordem:

| Campo | Conteúdo | Exemplo |
|---|---|---|
| `Objetivo` | 1 frase, o que a entrega resolve | `Corrigir CLS do Hero em mobile.` |
| `Artefatos` | caminhos + seção, nunca o texto | `docs/specs/SPEC-011...md §2.3` |
| `Decisões` | escolha + porquê em 1 linha | `CSS puro, não JS — ADR-011.` |
| `Mudanças` | arquivos tocados | `src/styles/global.css`, `src/components/sections/Hero.astro` |
| `Aceite` | comando + resultado | `npm test → 46 pass, 0 fail` |
| `Riscos/Bloqueios` | o que pode quebrar, o que falta | `Safari <17 sem animation-timeline: degrada estático.` |
| `Próximo responsável` | nome do agente | `qa-engineer` |

Campo sem conteúdo é omitido, não preenchido com "N/A".

## Antes e depois

<Bad>
> Conforme discutimos anteriormente, eu revisei cuidadosamente a especificação SPEC-011 que trata da correção do layout shift no Hero. A especificação pede, entre outras coisas, que o Hero use `min-height: 100svh` em vez de `100vh`, porque em navegadores móveis a barra de endereço causa variação. Também fiz algumas alterações no CSS global. Acredito que está tudo funcionando bem.
</Bad>

<Good>
> `Objetivo` Zerar CLS do Hero em mobile.
> `Artefatos` docs/specs/SPEC-011-...md §2.1
> `Mudanças` src/components/sections/Hero.astro, src/styles/global.css
> `Aceite` npm run build → ok. npm test → 46 pass, 0 fail. CLS manual iPhone 390px → 0.00.
> `Riscos/Bloqueios` Não testado em Android Chrome.
> `Próximo responsável` qa-engineer
</Good>

O primeiro tem 61 palavras e uma afirmação não verificável ("acredito que está tudo funcionando"). O segundo tem 38 e cinco fatos checáveis.

## Regras de compressão

- **Aponte, não copie.** `SPEC-010 §2.1` > colar o parágrafo. O próximo agente tem Read.
- **Evidência = comando + resultado.** Não narre o processo de rodar o comando.
- **Sem preâmbulo e sem fecho.** Nada de "conforme solicitado", "espero ter ajudado", "resumindo".
- **Sem hedge.** "Acredito", "provavelmente", "deve estar" → ou verifique, ou marque como `Riscos`.
- **Não resuma arquivo que o próximo agente precisa ler inteiro.** Aponte o caminho.

## Quando voltar ao texto normal e completo

A compressão para aqui. Nestes casos, escreva por extenso, com contexto e ressalvas:

- Teste que **falhou** — saída completa, não "alguns testes falharam".
- Privacidade, dados pessoais, consentimento, segredo, ID real de analytics.
- Ação destrutiva ou irreversível: delete, force push, deploy, sobrescrita.
- Ambiguidade de negócio ou requisito em disputa.
- Decisão de arquitetura com trade-off — o porquê importa mais que a brevidade.
- Qualquer texto que o **usuário humano** vá ler.

## Red flags — pare e reescreva

- Você omitiu uma unidade, versão, número, caminho ou breakpoint "porque dava pra inferir".
- Você trocou "não dispara antes do consentimento" por "consentimento ok".
- Você resumiu uma falha como "pequeno problema".
- Você usou compressão numa mensagem para o usuário.
- O handoff cabe em 3 linhas mas o próximo agente vai precisar te perguntar algo. Compacto ≠ incompleto.
