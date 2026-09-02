# Agents Update Policy

Antes de executar qualquer pedido do usuario que envolva comandos, edicoes, criacao de artefatos, acionamento de agentes ou continuidade de fluxo, o agente deve verificar se a estrutura instalada esta atualizada em relacao ao template `agents-creator`.

## Fonte

Use `.agents/agents-creator.env` quando existir:

- `SOURCE_URL`: repositorio remoto do template, quando configurado.
- `SOURCE_PATH`: caminho local usado na instalacao.
- `SOURCE_COMMIT`: commit do template usado na instalacao, quando disponivel.

## Escopo de comparacao

Compare estes caminhos:

- `.claude/agents`
- `.codex/agents`
- `.cursor/agents`
- `skills`
- `docs`

Quando `.agents/check-agents-update.sh` existir, rode:

```bash
bash .agents/check-agents-update.sh .
```

## Resultado

Se houver atualizacao:

1. atualize a estrutura de agentes antes de executar o pedido original;
2. preserve arquivos nao relacionados ao template;
3. pare apos atualizar;
4. informe o que mudou;
5. peca para reiniciar a IDE ou recarregar a sessao quando novos agentes, skills ou instrucoes principais precisarem ser relidos.

Se nao houver atualizacao, avise que os agentes estao atualizados e pergunte se deve seguir com o pedido original.

Nao execute o pedido original na mesma resposta em que uma atualizacao for aplicada.

## Neste repositorio

`diff -qr` contra o template acusa diferenca permanente em `docs/` (PRDs, ADRs, SPECs), nas skills de overlay da OCARECADEV e em `image-creator-agent`. Isso nao e atualizacao.

Atualize a estrutura somente quando `SOURCE_COMMIT` em `.agents/agents-creator.env` divergir do commit remoto de `SOURCE_URL`. Preserve arquivos que o template nao possui. Nao use `--force` sobre artefatos de produto.
