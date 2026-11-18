# PRD-013 — Página "Landing page para advogados"

## 1. Problema e Oportunidade

"landing page para advogados" tem cerca de 1.600 buscas/mês no Brasil, com dificuldade 27 (Ubersuggest, 2026-11). Hoje o site não tem página dedicada ao nicho, e a busca é nacional, então a home e as páginas locais não respondem a essa intenção. O André aprovou a página em 2026-11-18 (doc de concorrentes, item "Página Landing page para advogados").

O dono de escritório tem uma dúvida específica que outros nichos não têm: o que pode e o que não pode na publicidade da advocacia (Provimento 205/2021 da OAB).

## 2. Objetivo

Ter uma página indexável para a palavra-chave "landing page para advogados", que explique para o advogado (cliente) como é a landing, que ela é pensada dentro das regras da OAB, e leve ao WhatsApp.

## 3. Requisitos

- Endereço `/landing-page-para-advogados/`, com título e descrição próprios contendo "landing page para advogados".
- Público: advogado ou dono de escritório, não dev. Linguagem simples.
- Atendimento 100% online, para todo o Brasil.
- Mesmos três planos e preços da home (R$ 597, R$ 997, a partir de R$ 2.497).
- Seção sobre o Provimento 205/2021: o que a landing evita (preço de honorários, promessa de resultado, exposição de clientes e casos, autoengrandecimento e comparação, apelo de venda agressivo) e o que entra (áreas de atuação, formação, conteúdo informativo, contato). Deixar claro que a revisão final do conteúdo é do advogado responsável. Nada de afirmar "aprovado pela OAB".
- Mostrar o Modelo Advocacia (lp-modelo-advocacia.vercel.app) identificado como modelo de demonstração, não como cliente.
- CTA de WhatsApp com mensagem própria: "Olá! Vi a página de landing page para advogados e quero um orçamento."
- Link no rodapé, entrada no sitemap, em `llms.txt` e `index.md`.

## 4. Critérios de Aceite

- Rota gerada no build com exatamente um `<h1>` contendo "advogados".
- `<title>` = "Landing Page para Advogados | Site para Escritório de Advocacia | OCARECADEV".
- Canonical = `https://www.ocarecadev.com.br/landing-page-para-advogados/`.
- `/sitemap.xml` lista a URL.
- `FAQPage` da página contém as perguntas do nicho, incluindo a do Provimento 205/2021.
- Nenhum número inventado; nenhuma promessa de atendimento presencial; nenhuma afirmação de aprovação pela OAB.
- Sem overflow horizontal em 390px e 1280px.

## 5. Fora de Escopo

- Alterar a home e as páginas locais (só o rodapé ganha o link).
- Páginas de outros nichos (dentistas, contadores etc.).
- Parecer jurídico: a página informa, não substitui a análise do advogado.
- Novos eventos de tracking (usa `lead` com `data-track-location` próprio).
