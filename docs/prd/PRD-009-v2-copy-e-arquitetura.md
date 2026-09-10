# PRD-009 — V2 de Copy e Arquitetura de Persuasão da Landing Page

## 1. Problema e Oportunidade

A landing page atual da OCARECADEV possui excelente infraestrutura técnica (Astro 6, CSS vanilla, tracking assíncrono com consentimento e 0 CLS), porém apresenta descompassos em sua estratégia de persuasão e copy:

1. **Promessas absolutas e desbalanceadas**: Frases como "traz clientes todos os dias" prometem resultados que dependem de variáveis externas fora do controle do produto (oferta do cliente, preço, atendimento comercial, tráfego e fechamento). O produto controla estrutura, clareza, UX, direção e facilitação de contato.
2. **Ausência de mecanismo explicativo**: A página afirma que cria páginas para conversão, mas não demonstra *por que* ou *como* a sequência funciona para guiar o visitante.
3. **Fragmentação de argumentação**: A seção de Agitação atua como um bloco isolado e redundante em relação à seção de Problema/Diagnóstico.
4. **Prova social tardia**: Os depoimentos autênticos surgem apenas na metade inferior da página, sem que o visitante receba validação antecipada.
5. **Enquadramento de planos centrado em features**: O visitante compara itens técnicos em vez de se identificar com o momento do seu negócio; o plano 3 carrega o nome corporativo e exagerado "MÁQUINA DE CLIENTES".
6. **FAQ superficial**: As 4 perguntas atuais não atacam as reais objeções de compra (ex.: ter Instagram vs site, tráfego pago, redação dos textos, posse do código, escopo de domínio/hospedagem).

A oportunidade é implementar a **V2 da COPY e da ARQUITETURA DE PERSUASÃO**, aplicando os preceitos metodológicos de *Conversion Copywriting* (Joanna Wiebe / Copyhackers): clareza antes de criatividade, Voice of Customer, redução de atrito, tratamento real de objeções, CTAs contextuais e demonstração do mecanismo, sem descaracterizar a identidade visual dark/neon da OCARECADEV.

---

## 2. Contexto da Marca e Regras de Credibilidade

A comunicação da OCARECADEV deve ser direta, provocativa, profissional e sem jargões corporativos genéricos ou promessas milagrosas de infoproduto.

### Termos Proibidos:
- "Estratégias de alta performance"
- "Solução revolucionária"
- "Páginas milimetricamente projetadas"
- "Máquina de vendas"
- "Fórmula comprovada"
- "Método secreto"
- "Garantia de vendas"
- "Clientes todos os dias como promessa absoluta"

### Regra de Ouro da Credibilidade:
- Não inventar conversões, ROI, faturamento, quantidade fictícia de leads ou métricas que pareçam prova social em mockups.
- Onde houver representação visual de funil ou mockups de dashboard, indicar claramente como demonstração conceitual ou exemplo ilustrativo de gargalo.
- Manter apenas estatísticas reais e verificáveis (+50 Projetos Lançados). Remover "100% Foco em ROI".

---

## 3. Arquitetura das 13 Seções

A página deve ser sequenciada rigorosamente na seguinte ordem:

1. **Hero**: Headline: *"Seu site não precisa só ser bonito. Precisa fazer o visitante <span class="text-neon">agir</span>."* Subheadline específica. CTAs: *"Quero uma landing page para meu negócio"* e *"Ver como funciona"*.
2. **Identificação / Para quem é (`Identification`)**: Bloco compacto imediatamente após o Hero. Foco em negócios que precisam transformar atenção em oportunidades (prestadores de serviço, clínicas, escritórios, negócios locais).
3. **Problema / Diagnóstico (`Problem`)**: Headline: *"Seu site recebe pessoas. Mas deixa claro o que elas devem fazer depois?"* Incorpora os melhores pontos da agitação (os 3 pontos de clareza: o que faz, por que escolher você, próximo passo; e fechamento: *"Se sua página não ajuda o visitante a avançar, ela vira só mais um custo."*).
4. **Mecanismo da Solução (`Solution`)**: Headline: *"Não é só design. É uma sequência."* Estrutura de 4 etapas: *01 Clareza*, *02 Interesse*, *03 Confiança*, *04 Ação*. Fechamento com o fluxo contínuo.
5. **Provas Rápidas (`QuickProof`)**: Amostra antecipada com falas autênticas reais (Grupo Carrera Consórcio / Vinicius Oliveira) e link discreto para `#social-proof`.
6. **Como Funciona (`HowItWorks`)**: 4 etapas de entrega: *01 Entendemos sua oferta*, *02 Construímos a página*, *03 Ajustamos para o seu negócio*, *04 Publicamos e medimos*.
7. **Modelos / Exemplos (`ModelsShowcase`)**: Headline: *"Veja possibilidades para o seu negócio"*. Enquadramento claro dos modelos como base ágil para o OCARECADEV Express, diferenciando da personalização estratégica da Landing Que Vende.
8. **Prova Social Completa (`SocialProof`)**: Novo título: *"Não acredita no Careca? Pergunta pra quem já contratou."* Manutenção dos 4 casos autênticos reais (Carrera, Vinicius, áudio 1 e áudio 2).
9. **Sobre André / O Careca (`About`)**: Título: *"O Careca por trás dos sites"*. Copy humana e sem corporativismo. Métrica real mantida: *+50 Projetos Lançados*.
10. **Planos (`Pricing`)**:
    - **Plano 1 (Express)**: *"Preciso colocar minha empresa online rápido."*
    - **Plano 2 (Landing Que Vende)**: *"Quero transformar tráfego em oportunidades."* (Destaque recomendado)
    - **Plano 3 (Site Profissional)**: *"Preciso de uma presença digital completa."* (Substitui "Máquina de Clientes")
    - Resumo comparativo ágil. Preços e condições originais preservados (R$ 597, R$ 997 e a partir de R$ 2.497).
11. **FAQ de Objeções (`FAQ`)**: 9 perguntas obrigatórias abordando dúvidas reais de contratação, com respostas honestas e diretas.
12. **CTA Final (`CtaFinal`)**: *"Seu próximo cliente pode chegar pelo Instagram, pelo Google ou por indicação. Quando ele chegar ao seu site, o que ele vai encontrar?"* CTA: *"Quero conversar sobre meu projeto"*.
13. **Footer**: Preservado com links legais e institucionais.

---

## 4. Requisitos Não Funcionais (Guardrails G1–G8)

- **G1 — Acessibilidade**: HTML semântico, único `<h1>` no Hero, hierarquia `<h2>` e `<h3>` sem saltos, landmarks preservados, `alt` em imagens informativas, navegação por teclado e foco visível em todos os novos componentes e botões.
- **G2 — Movimento**: Animações respeitam `prefers-reduced-motion: reduce`. Nenhuma informação fica presa em `opacity: 0`.
- **G3 — Estabilidade de layout**: Dimensões explícitas em todas as mídias e imagens. Zero layout shift (CLS = 0). Sem overflow horizontal em 390px, 768px e 1200px+.
- **G4 — Performance**: HTML estático via Astro 6, CSS vanilla nativo, scripts inline mínimos. LCP preservado no Hero.
- **G5 — SEO**: Atualização de `<title>` ("OCARECADEV | Landing Pages Estratégicas para Negócios"), meta description e structured data Schema.org (`FAQPage` atualizado com as 9 perguntas).
- **G6 — Privacidade e consentimento**: Respeito estrito ao CookieConsent; nenhum evento de analytics/pixel dispara sem consentimento prévio. Placeholders de ambiente mantidos.
- **G7 — Dependências**: Nenhuma dependência externa nova. Zero bibliotecas JS adicionadas.
- **G8 — Git e entrega**: Mudanças incrementais e testadas; nenhum deploy ou commit não autorizado.

---

## 5. Fora de Escopo

- Redesenho da identidade visual ou alteração da paleta de cores (preto `#010101`, `#0A0A0A`, verde neon `#00FF9D`, branco `#FFFFFF`).
- Alteração de valores monetários ou parcelamentos dos planos existentes.
- Invenção de novas métricas, certificados, faturamentos fictícios ou depoimentos fabricados.
- Criação de painéis dinâmicos ou backend com banco de dados.

---

## 6. Critérios de Aceite Observáveis

1. **Arquitetura**: A página renderiza exatamente as 13 seções na sequência definida. `<Agitation />` deixa de existir como seção independente no DOM.
2. **Nova Identificação**: Componente `<Identification />` presente logo após o Hero com chips discretos de nichos.
3. **Novo Mecanismo**: Componente `<Solution />` expõe os 4 passos conceituais (Clareza, Interesse, Confiança, Ação).
4. **Nova Prova Rápida**: Componente `<QuickProof />` exibe citações autênticas e link para `#social-proof`.
5. **Novo FAQ**: Renderiza exatamente 9 perguntas com disclosure funcional, acessível e semântico.
6. **Plano 3**: Nomeado "SITE PROFISSIONAL" e tabela comparativa rápida presente.
7. **WhatsApp Contextual**: Cada botão de conversão gera mensagem contextual adequada ao ponto de contato.
8. **SEO & Schema**: Title, description e JSON-LD FAQPage refletem a V2.
9. **Qualidade Técnica**: `npm run check`, `npm run build` e `npm test` concluem com 0 erros e 0 falhas.
