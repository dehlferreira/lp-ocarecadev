---
name: image-asset-production
description: Use ao produzir, substituir ou otimizar asset visual da OCARECADEV em src/assets/images/ ou public/, e ao definir prompt, proporção e alt text para geração por IA conforme ADR-010 e SPEC-006. NÃO use para alterar componente, copy ou layout, nem para decidir onde a imagem entra na página.
---

# Produção de assets de imagem

Asset pronto para integrar. Sem tocar em componente, copy ou layout.

## Antes de gerar

Leia `AGENTS.md`, `docs/adrs/ADR-010-geracao-imagens-ia.md`, `docs/specs/SPEC-006-geracao-imagens-ia.md`, a demanda aprovada e **o que já existe** em `src/assets/images/`. Reaproveitar vence gerar.

## Direção de marca (ADR-010)

| Atributo | Valor |
|---|---|
| Paleta | dark com acento verde neon `#00FF9D` |
| Estilo | clean, minimalista, tech |
| Texto na imagem | **nenhum** — texto vai em HTML |
| Formato de entrega | WebP otimizado |
| Nome | semântico e kebab-case (`hero-perfil.webp`, `logo-ocareca-horizontal.webp`) |
| Destino | `src/assets/images/` |

Transparência quando o uso exigir. Peso mínimo sem degradar a função do asset.

## Especificação obrigatória de cada asset

Antes de produzir, defina por escrito:

1. Objetivo e local de uso (seção/componente)
2. Proporção e dimensões alvo
3. Composição e paleta
4. Prompt completo (quando gerado por IA)
5. Variações a avaliar
6. Origem e licença
7. **Alt text** — descritivo, sem "imagem de"

## Se não houver ferramenta de geração disponível

**Não invente o arquivo e não diga que gerou.** Entregue a especificação acima como resultado e devolva ao usuário para gerar, declarando explicitamente que o arquivo não foi produzido.

## Limites de direito de uso

Proibido: logo ou marca de terceiro, imitação de estilo protegido, pessoa identificável sem autorização, material sem licença compatível com uso comercial.

## Erros comuns

| Erro | Correção |
|---|---|
| Texto embutido na imagem | Texto em HTML, imagem só visual |
| PNG/JPG pesado | WebP otimizado |
| Nome genérico (`image1.webp`) | Nome semântico |
| Substituir asset existente por conta própria | Exige SPEC |
| Editar `.astro` ou `.css` para "já integrar" | Entregar instrução ao Dev |
| Afirmar que gerou sem ter gerado | Declarar a limitação |

## Handoff

Caminho, dimensões, peso, alt text, origem/licença e instruções de integração → `astro-developer`, no formato de `skills/compact-agent-communication/SKILL.md`.

Mudança de direção de marca ou substituição de asset existente → `product-owner`/`tech-lead`.
