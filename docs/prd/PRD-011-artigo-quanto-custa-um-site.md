# PRD-011: Artigo "Quanto custa um site em 2026"

**Status:** Aprovado pelo André em 2026-11-10.

## Problema
O site recebe quase nenhuma visita pela busca (Search Console, 28 dias até 09/11/2026: 12 impressões, 0 cliques, quase tudo do nome da marca). A busca mais forte do nicho no Brasil é "quanto custa um site" (590/mês, Ubersuggest 09/11/2026), com variações "simples" (210) e "profissional" (170) de baixa concorrência.

## Objetivo
Uma página de conteúdo em `/quanto-custa-um-site/` que responde à pergunta com os preços reais da OCARECADEV e leva ao WhatsApp.

## Requisitos
- RF-001: texto aprovado no doc "Artigo: Quanto custa um site em 2026" (preços, fatores, custos, sinais de cilada, comparação, FAQ, CTA).
- RF-002: só números reais (planos de `Pricing.astro`, domínio R$ 40/ano no Registro.br, hospedagem média R$ 50/ano informada pelo André, pacote mensal de manutenção opcional).
- RF-003: 4 imagens geradas pelo André no Gemini (IMAGE_SYSTEM §22/§23), sem texto.
- RF-004: FAQ no JSON-LD, imagem de compartilhamento própria, link no rodapé, sitemap e llms.txt.
- RF-005: WhatsApp com mensagem própria para medir os contatos do artigo.

## Fora de escopo
Blog com listagem, outras páginas de artigo, página de São Bernardo.
