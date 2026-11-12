# PRD-012 — Página local "Criação de sites em São Bernardo do Campo"

## 1. Problema e Oportunidade

Depois da página de Santo André (PRD-010), a segunda maior busca local é "criação de sites são bernardo do campo": cerca de 40 buscas/mês no Brasil (Ubersuggest, 2026-11-09). Os posts do Perfil da Empresa no Google sobre São Bernardo hoje levariam à home, que é nacional.

## 2. Objetivo

Ter uma página indexável dedicada a São Bernardo do Campo, para receber o tráfego dos posts do Perfil Google e da busca local.

## 3. Requisitos

- Endereço `/criacao-de-sites-sao-bernardo-do-campo/`, com título e descrição próprios contendo "São Bernardo do Campo".
- Atendimento declarado como **100% online**. O André é de Santo André: a página não diz que a sede é em São Bernardo.
- Mesmos três planos e preços da home (R$ 597, R$ 997, a partir de R$ 2.497).
- CTA de WhatsApp com mensagem própria: "Olá! Vi a página de São Bernardo do Campo e quero um orçamento."
- Link no rodapé, entrada no sitemap, em `llms.txt` e `index.md`.

## 4. Critérios de Aceite

- Rota gerada no build com exatamente um `<h1>` contendo "São Bernardo do Campo".
- `<title>` = "Criação de Sites em São Bernardo do Campo | Landing Pages que Vendem | OCARECADEV".
- Canonical = `https://www.ocarecadev.com.br/criacao-de-sites-sao-bernardo-do-campo/`.
- `/sitemap.xml` lista a URL.
- `FAQPage` da página contém as perguntas locais.
- Nenhuma promessa de atendimento presencial.
- Sem overflow horizontal em 390px e 1280px.

## 5. Fora de Escopo

- Alterar a home ou a página de Santo André.
- Páginas de outras cidades (São Caetano, Diadema/Mauá ficam para depois).
- Novos eventos de tracking (usa `lead` com `data-track-location` próprio).
