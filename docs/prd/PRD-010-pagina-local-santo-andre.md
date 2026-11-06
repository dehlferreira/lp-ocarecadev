# PRD-010 — Página local "Criação de sites em Santo André"

## 1. Problema e Oportunidade

O site da OCARECADEV é uma landing page única, sem termo de cidade. Em 2026-10-20 o Search Console mostrou impressões só para a marca, e o Ubersuggest não encontrou nenhuma palavra-chave ranqueando. Pesquisa em 2026-11-05 (Ubersuggest, Brasil):

| Busca | Volume/mês | Dificuldade |
|---|---|---|
| criação de sites santo andré | 170 | 32 |
| criação de landing page | 480 | 45 (concorrência alta) |
| landing page para clínica | ~0 | — |

A busca local tem volume, baixa dificuldade e intenção de contratação. O Perfil da Empresa no Google foi verificado em 2026-11-05 com área de atendimento no ABC + São Paulo.

## 2. Objetivo

Ter uma página indexável dedicada a "criação de sites em Santo André", com copy própria, que leve ao mesmo WhatsApp e permita identificar os contatos vindos dela.

## 3. Requisitos

- Endereço `/criacao-de-sites-santo-andre/`, com título e descrição próprios contendo "Santo André".
- Copy aprovada pelo André em 2026-11-06 (texto integral na SPEC-017), sem reaproveitar parágrafos da home.
- Atendimento declarado como **100% online** (WhatsApp e videochamada). Nenhuma promessa de reunião presencial.
- Mesmos três planos e preços da home.
- CTA de WhatsApp com mensagem própria: "Olá! Vi a página de Santo André e quero um orçamento."
- Link para a página a partir da home e entrada no sitemap.

## 4. Critérios de Aceite

- `GET /criacao-de-sites-santo-andre/` responde no build com exatamente um `<h1>` contendo "Santo André".
- `<title>` = "Criação de Sites em Santo André | Landing Pages que Vendem | OCARECADEV".
- Canonical aponta para `https://www.ocarecadev.com.br/criacao-de-sites-santo-andre/`.
- `/sitemap.xml` lista a URL.
- O rodapé da home contém link para a URL.
- Os CTAs principais da página abrem `wa.me` com a mensagem de §3.
- O JSON-LD `FAQPage` da página contém as perguntas da página, não as da home.
- Nenhum texto da página contém "presencial" como promessa de atendimento (a única ocorrência é a resposta "O atendimento é presencial? Não...").
- Sem overflow horizontal em 390px e 1280px; `prefers-reduced-motion` não deixa conteúdo oculto.

## 5. Fora de Escopo

- Mudanças na copy, seções ou ordem da home (além do link no rodapé).
- Páginas por nicho (volume de busca ~0 hoje).
- Páginas para outras cidades do ABC.
- Novo evento de tracking: os CTAs usam os eventos `lead`/`select_content` existentes com `data-track-location` próprio.

## 6. Premissas

- Premissa (não validada): a página ranqueia para a busca local em semanas, somada ao Perfil da Empresa. Medir no Search Console.
