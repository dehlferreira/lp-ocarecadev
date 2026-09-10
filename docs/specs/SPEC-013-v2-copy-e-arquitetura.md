# SPEC-013: V2 de Copy e Arquitetura de Persuasão

**Status:** [ ] Pendente | [ ] Em Progresso | [x] Implementada

> **⚠️ INSTRUÇÃO PARA AGENTES DE IA:**
> Durante a execução desta especificação, você deve consultar este arquivo. Ao finalizar a
> implementação técnica, o agente de QA (`quality-assurance-validation-agent`) deve verificar cada critério,
> preencher as evidências, marcar as caixas do `Definition of Done` (DoD) e atualizar o **Status** no topo para
> `[x] Implementada`.

---

## 1. Contexto e Objetivo

- **PRD de Origem**: `docs/prd/PRD-009-v2-copy-e-arquitetura.md`
- **ADR Relacionada**: `docs/adr/ADR-013-v2-arquitetura-persuasao.md`
- **Invariantes e Guardrails**: Conforme canônico em `AGENTS.md §Guardrails G1–G8`. Não reescreva a lista aqui; declare os itens tocados por seu número.
- **Objetivo**: Implementar a revisão de copy e reestruturação da landing page da OCARECADEV em 13 seções focadas em conversão, UX e clareza, preservando toda a base visual, animações e infraestrutura técnica do projeto.

---

## 2. Especificação dos Componentes e Mudanças

### 2.1. Arquitetura da Página (`src/pages/index.astro`)
Reordenar os blocos na sequência exata de 1 a 13:
1. `Hero` (`#hero`)
2. `Identification` (`#identificacao`) [NOVO]
3. `Problem` (`#problema`) [REFATORADO, absorve agitação]
4. `Solution` (`#mecanismo` ou `#solucao`) [REFATORADO, mecanismo de 4 passos]
5. `QuickProof` (`#prova-rapida`) [NOVO, teaser antecipado]
6. `HowItWorks` (`#como-funciona`) [REFATORADO, 4 passos de entrega]
7. `ModelsShowcase` (`#modelos`) [REFATORADO, enquadramento Express vs Custom]
8. `SocialProof` (`#social-proof`) [REFATORADO, novo título e copy afiada]
9. `About` (`#about`) [REFATORADO, novo título e copy humana]
10. `Pricing` (`#pricing`) [REFATORADO, planos por momento e comparativo]
11. `FAQ` (`#faq`) [REFATORADO, 9 perguntas de objeções reais]
12. `CtaFinal` (`#cta-final`) [REFATORADO, fechamento persuasivo e CTA]
13. `Footer` (`#footer`)

### 2.2. Detalhamento de Componentes

1. **`src/components/sections/Hero.astro`**:
   - `<h1>`: "Seu site não precisa só ser bonito. Precisa fazer o visitante <span class="text-neon">agir</span>."
   - Subtítulo: "Landing pages estratégicas para apresentar sua oferta com clareza, gerar interesse e levar mais pessoas até o seu WhatsApp."
   - CTA 1: "Quero uma landing page para meu negócio" (`#pricing` ou link contextual).
   - CTA 2: "Ver como funciona" (`#como-funciona`).
2. **`src/components/sections/Identification.astro` (Novo)**:
   - Seção compacta imediatamente pós-Hero.
   - Headline: "Feita para negócios que precisam transformar atenção em oportunidades."
   - Subtexto: "Para prestadores de serviço, clínicas, escritórios, negócios locais e profissionais que usam Instagram, Google, anúncios ou indicação para atrair novos clientes."
   - Chips/tags visuais discretos para facilitar identificação.
3. **`src/components/sections/Problem.astro`**:
   - Headline: "Seu site recebe pessoas. Mas deixa claro o que elas devem fazer depois?"
   - Introdução e os 3 pontos: 1. O que você faz | 2. Por que deveria escolher você | 3. Qual é o próximo passo.
   - Fechamento com a punchline integrada da agitação: "Se sua página não ajuda o visitante a avançar, ela vira só mais um custo."
   - Preserva `ProblemMockup` com rotulagem clara de exemplo de auditoria ilustrativa.
4. **`src/components/sections/Solution.astro` (Mecanismo)**:
   - Headline: "Não é só design. É uma sequência."
   - 4 passos: 01 — CLAREZA | 02 — INTERESSE | 03 — CONFIANÇA | 04 — AÇÃO.
   - Fechamento: "Cada seção tem uma função: fazer o visitante continuar, entender, confiar e agir."
   - Mockup `HeroMockup.astro` rotulado como demonstração conceitual de fluxo/funil.
5. **`src/components/sections/QuickProof.astro` (Novo)**:
   - Teaser de prova social antes da metade da página.
   - Título: "Não precisa acreditar só no que o Careca está dizendo."
   - Depoimentos autênticos rápidos (Carrera e Vinicius).
   - CTA discreto: "Ver mais feedbacks de quem já contratou" (`#social-proof`).
6. **`src/components/sections/HowItWorks.astro`**:
   - 4 etapas: 01 — Entendemos sua oferta | 02 — Construímos a página | 03 — Ajustamos para o seu negócio | 04 — Publicamos e medimos.
7. **`src/components/sections/ModelsShowcase.astro`**:
   - Headline: "Veja possibilidades para o seu negócio".
   - Subtexto explicativo destacando modelos ágeis para o OCARECADEV Express e diferenciando da Landing que Vende personalizada.
8. **`src/components/sections/SocialProof.astro`**:
   - Headline: "Não acredita no Careca? Pergunta pra quem já contratou."
   - Mantém os 4 casos reais (prints de WhatsApp e Instagram com lightbox, 2 áudios reais com waveform).
9. **`src/components/sections/About.astro`**:
   - Título: "O Careca por trás dos sites".
   - Copy humana de André Luiz Ferreira ("Sem enrolação. Sem site só pra dizer que tem site.").
   - Manter "+50 Projetos Lançados", remover métrica não mensurável "100% Foco em ROI".
10. **`src/components/sections/Pricing.astro`**:
    - Plano 1: "Preciso colocar minha empresa online rápido."
    - Plano 2: "Quero transformar tráfego em oportunidades."
    - Plano 3: "SITE PROFISSIONAL" — "Preciso de uma presença digital completa."
    - Resumo comparativo ágil.
    - CTAs e mensagens de WhatsApp específicas por plano.
11. **`src/components/sections/FAQ.astro`**:
    - 9 perguntas obrigatórias com respostas honestas e objetivas sobre escopo, posse, tráfego, prazos e redação.
12. **`src/components/sections/CtaFinal.astro`**:
    - "Seu próximo cliente pode chegar pelo Instagram, pelo Google ou por indicação. Quando ele chegar ao seu site, o que ele vai encontrar?"
    - CTA: "Quero conversar sobre meu projeto".

---

## 3. Guardrails e Invariantes Aplicados

Esta especificação toca os guardrails canônicos:
- **G1 (Acessibilidade)**: Navegação por teclado, contraste alto, único `<h1>`, landmarks semânticos, `alt` em imagens.
- **G2 (Movimento)**: Suporte obrigatório a `prefers-reduced-motion: reduce`.
- **G3 (Estabilidade de Layout)**: Zero CLS; dimensões e aspect-ratios fixos; sem overflow em 390px, 768px e 1200px+.
- **G4 (Performance)**: Astro estático, CSS vanilla, zero scripts bloqueantes.
- **G5 (SEO)**: Title, meta description e Schema.org (`FAQPage`) sincronizados.
- **G6 (Privacidade e Consentimento)**: Placeholders de ambiente preservados; rastreadores aguardam consentimento.
- **G7 (Dependências)**: Zero novas bibliotecas npm.
- **G8 (Git e Entrega)**: Mudanças incrementais e testadas.

---

## 4. Definition of Done (DoD)

### Itens de Implementação (Dev)
- [x] 1. Componente `src/components/sections/Identification.astro` criado e estilizado.
- [x] 2. Componente `src/components/sections/QuickProof.astro` criado e estilizado.
- [x] 3. Seção `Problem.astro` absorve argumentos de agitação e remove dependência de `Agitation.astro` na ordem principal.
- [x] 4. Seção `Solution.astro` exibe o mecanismo em 4 passos (Clareza, Interesse, Confiança, Ação).
- [x] 5. Mockups em `FrustrationChart.astro` e `HeroMockup.astro` rotulados com transparência como exemplos conceituais/ilustrativos.
- [x] 6. `HowItWorks.astro` atualizado com as 4 etapas de entrega.
- [x] 7. `ModelsShowcase.astro` atualizado com enquadramento de possibilidades/Express vs Personalizado.
- [x] 8. `SocialProof.astro` atualizado com novo título ("Não acredita no Careca? Pergunta pra quem já contratou.").
- [x] 9. `About.astro` atualizado com "O Careca por trás dos sites", nova copy e remoção de "100% Foco em ROI".
- [x] 10. `Pricing.astro` atualizado com "SITE PROFISSIONAL", identificações por momento, tabela comparativa e CTAs contextuais.
- [x] 11. `FAQ.astro` atualizado com as 9 perguntas obrigatórias e `Layout.astro` com JSON-LD atualizado.
- [x] 12. `CtaFinal.astro` atualizado com nova copy e CTA de WhatsApp.
- [x] 13. `index.astro` sequenciado rigorosamente nas 13 seções com novos metadados de SEO.
- [x] 14. `docs/copy-landing-page.json` sincronizado com todas as novas cópias e seções.
- [x] 15. Testes unitários atualizados e passando (`test/site-polish.test.mjs`, `test/modelos-fab-escassez.test.mjs`, etc.).

### Validação Formal (QA)
- [x] Q1. `npm run check` executado com 0 erros (40 arquivos verificados: 0 erros, 0 warnings).
- [x] Q2. `npm run build` executado gerando saída estática sem warnings impeditivos (2 páginas e 12 imagens geradas em 1.48s).
- [x] Q3. `npm test` executado com 100% de aprovação e 0 falhas (72/72 testes passando).
- [x] Q4. Validação de acessibilidade G1: único H1, landmarks corretos, botões com rótulo.
- [x] Q5. Validação de responsividade G3: sem scroll horizontal em 390px, 768px e 1200px+.
- [x] Q6. Validação de links e WhatsApp: links contextuais funcionando com encoding correto.
