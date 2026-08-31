---
name: landing-quality-assurance
description: Use ao validar qualquer entrega do astro-developer contra PRD, ADR, SPEC e Definition of Done, antes de marcar item de DoD, e antes de build de produção ou deploy. Cobre responsividade, acessibilidade, SEO, imagens, consentimento e tracking. NÃO use para corrigir o defeito encontrado nem para alterar código de produção.
---

# QA da landing

Evidência antes de afirmação. Sem evidência, o critério é `bloqueado`, não `passou`.

## Antes de validar

Leia `AGENTS.md`, o PRD, os ADRs, a SPEC (com a DoD), o diff e os testes existentes.

## Regra que não se negocia

**QA não edita `src/`.** A permissão de edição existe só para marcar a DoD em `docs/specs/` e registrar defeito. Alterar produção para uma validação passar destrói o valor do QA.

## Verificação automática

```bash
npm run check
npm run build
npm test
```

Os três separados, **não** `npm run verify` — `verify` para no primeiro erro e você precisa da evidência de cada comando. Registre a saída resumida de cada um.

O critério é **0 falhas**; a contagem total de testes cresce, não a trate como número esperado. Teste que falha bloqueia a DoD inteira — sem exceção por "falha não relacionada".

## Cobertura orientada a risco

Valide o que a mudança tocou, nesta ordem:

A enumeração canônica dos guardrails está em `AGENTS.md §Guardrails G1–G8`. Aqui está **como verificar** cada um:

| G / Área | Como verificar |
|---|---|
| **Aceite** | cada critério do PRD e cada item da DoD, individualmente |
| **G1** | Tab percorre todos os interativos, foco sempre visível, sem armadilha de foco; um `<h1>`, hierarquia de headings sem pulo, landmarks, `alt` em toda imagem informativa; contraste conferido no texto sobre fundo escuro |
| **G2** | com `prefers-reduced-motion: reduce`, todo conteúdo permanece visível e legível; nada preso em `opacity: 0` |
| **G3** | 390px, 768px e 1200px+ sem overflow horizontal e sem texto cortado; sem salto ao carregar; imagens com dimensão; `100svh` onde há barra de endereço móvel |
| **G4** | LCP medido no build de produção; nenhum `client:*` novo sem SPEC; nenhum script bloqueante no `<head>` |
| **G5** | `<title>`, meta description, canonical, OG, `/robots.txt` e `/sitemap.xml` respondendo no build |
| **G6** | **zero request a domínio de tracking antes do aceite**; aceite passa a disparar; revogação para de disparar; nenhum ID real, label real ou PII no diff. Confira contra `README.md §Tracking` |
| **G7** | diff de `package.json` sem dependência nova, ou com ADR/SPEC que a autorize |
| **G8** | nada foi commitado, enviado ou publicado sem autorização registrada |
| **Imagens** | WebP, peso proporcional ao uso, proporção sem distorção, `alt` correto |

Tracking só com placeholder ou ambiente autorizado. **Nunca ID real.**

## Formato do resultado

Um item por critério:

```
[passou]    LCP ≤ 2.5s — build de produção, 4G simulado: 1.9s
[falhou]    CTA visível sem scroll em 390×844 — CTA aparece a 940px do topo
[bloqueado] Conversão do Google Ads — exige ambiente autorizado, indisponível
```

Defeito:

```
Severidade: alta
Passos: 1) abrir / em 390px  2) rolar até Pricing  3) Tab
Esperado: foco visível no CTA do plano
Observado: foco invisível (outline: none em .btn:focus-visible)
Arquivo: src/styles/global.css:412
```

## Erros comuns

| Erro | Correção |
|---|---|
| "Testei e está tudo ok" | Um item por critério, com evidência |
| Aprovar critério que não conseguiu testar | `bloqueado`, com o motivo |
| Ignorar teste vermelho não relacionado | Vermelho bloqueia. Reportar |
| Aceitar requisito ambíguo | Devolver ao PO/Tech Lead como `bloqueado` |
| Corrigir o bug encontrado | Devolver ao `astro-developer` |
| Tratar ausência de teste automatizado como aprovação | É lacuna. Reportar |

## Handoff

Falha → `astro-developer`. Ambiguidade de requisito → `product-owner`/`tech-lead`. Formato compacto de `skills/compact-agent-communication/SKILL.md`, **exceto** resultado de teste que falhou: esse vai em texto completo.

Marque na SPEC apenas os itens da DoD comprovadamente aprovados. Se algum item ficou `bloqueado`, o Status da SPEC não vira `[x] Implementada`.
