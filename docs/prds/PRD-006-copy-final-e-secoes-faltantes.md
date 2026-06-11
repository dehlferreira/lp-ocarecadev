# PRD-006: Copy Final e Seções Faltantes

## 🧠 Contexto

Com a estrutura técnica da landing page OCARECADEV praticamente finalizada (Astro + Glassmorphism + Scroll Animations + Tracking), é necessário agora alinhar o **conteúdo das seções existentes** com a **copy oficial de vendas** e implementar as **seções que ainda não existem** no site.

Este documento mapeia o GAP entre o que está implementado e o que a copy final exige.

---

## 📊 Análise: O Que Já Temos vs O Que Falta

### Seções Implementadas

| Seção | Arquivo | Status | Alinhada com Copy? |
|---|---|---|---|
| Header | `Header.astro` | ✅ Implementado | ⚠️ Parcial — CTAs ok, mas microcopy precisa atualizar |
| Hero | `Hero.astro` | ✅ Implementado | ❌ Copy diverge completamente |
| Social Proof | `SocialProof.astro` | ✅ Implementado | ⚠️ Parcial — Tem depoimentos fictícios, falta "antes/depois" |
| About | `About.astro` | ✅ Implementado | ⚠️ Não está na copy final — avaliar remoção ou merge |
| Pricing | `Pricing.astro` | ✅ Implementado | ⚠️ Features e CTAs divergem da copy final |
| Footer | `Footer.astro` | ✅ Implementado | ✅ Ok |

### Seções Faltantes (Novas)

| Seção | Prioridade | Descrição |
|---|---|---|
| 🔴 **Problema** | ALTA | Seção de dor/problema — "Se você já tem um site e ele não te traz clientes, ele não serve pra nada." |
| 🟡 **Agitação** | MÉDIA | Intensifica a dor — "Você investiu tempo, dinheiro… e no fim, tem só uma página parada." |
| 🟢 **Solução** | ALTA | Apresenta a OCARECADEV como resposta — "Nós criamos páginas pensadas para gerar clientes." |
| ⚙️ **Como Funciona** | ALTA | Processo em 4 passos — Estrutura validada → Personalização → Publicação → Geração de leads |
| ⚡ **FAQ / Quebra de Objeções** | ALTA | Perguntas e respostas para eliminar dúvidas finais |
| 🟢 **CTA Final** | ALTA | Seção de fechamento antes do Footer — "A decisão é sua" |

---

## 🔄 Mudanças Necessárias nas Seções Existentes

### Hero (`Hero.astro`)

**Atual:**
- Headline: "Construímos sua Máquina de Clientes"
- Subtítulo: "Páginas de alta conversão focadas em vendas..."
- CTA: "Quero minha Máquina" / "Ver Resultados"

**Copy Final:**
- Headline: "Seu site não precisa ser bonito. Precisa trazer **clientes** todos os dias."
- Subtítulo: "Criamos páginas pensadas para transformar visitantes em **clientes** — mesmo que hoje seu site não gere nenhum **resultado**."
- CTA: "Quero minha página que vende"
- CTA secundário: (remover ou adaptar)

> **Ação:** Atualizar textos. Aplicar destaque verde (`.text-neon`) nas palavras-chave: *clientes*, *resultado*.

### Social Proof (`SocialProof.astro`)

**Atual:**
- Headline: "Eles já estão faturando"
- 3 depoimentos fictícios com avatares placeholder

**Copy Final:**
- Headline: "Resultados falam mais que qualquer promessa"
- Texto: bullets sobre resultados reais
- Deve conter prints, depoimentos reais ou antes/depois
- Imagens geradas com "nano banana" para mockups

> **Ação:** Atualizar headline e subtítulo. Gerar imagens de mockup (antes/depois) usando generate_image. Substituir depoimentos fictícios por conteúdo alinhado à copy.

### Pricing (`Pricing.astro`)

**Atual vs Copy Final:**

| Item | Atual | Copy Final |
|---|---|---|
| Headline | "Escolha a sua Máquina" | "Escolha o plano ideal para o seu momento" |
| Subtítulo | "Planos transparentes e focados em ROI imediato." | (remover ou simplificar) |
| EXPRESS desc | "Para quem precisa validar rápido." | "Para quem precisa entrar no ar rápido" |
| EXPRESS features | Setup em 24h, 1 Sessão de Estrutura, SEO Básico | Landing page simples, Template validado, Personalização básica, Botão WhatsApp, Entrega 48h |
| EXPRESS CTA | "Começar Agora" | "Quero começar rápido" |
| VENDE desc | "O equilíbrio perfeito para escalar." | "Para quem quer gerar clientes de verdade" |
| VENDE features | Setup 3 dias, Design Glassmorphism, Tracking, WebP/AVIF, Animações | Estrutura conversão, Design premium, CTA estratégico, WhatsApp+Analytics, Tracking, 1 revisão |
| VENDE CTA | "Garantir Minha Vaga" | "Quero uma página que gera clientes" |
| MÁQUINA desc | "Para líderes de mercado." | "Para quem quer presença profissional e escala" |
| MÁQUINA features | Tudo anterior, Múltiplas Páginas, Teste A/B, Suporte 30d, CRM | 3-5 páginas, Estrutura estratégica, Integrações e tracking, Tráfego pago, Otim. conversão |
| MÁQUINA CTA | "Falar com Especialista" | "Quero um sistema completo" |

> **Ação:** Atualizar todos os textos, descrições, features e CTAs.

### About (`About.astro`)

A seção "Sobre o Especialista" **não aparece na copy final de vendas**. Opções:
1. **Manter como está** — funciona como reforço de autoridade
2. **Mesclar com a seção Solução** — "Na OCARECADEV, nós não criamos sites bonitos..."
3. **Remover** — simplificar o funil

> **Recomendação:** Manter, posicionar depois da seção Solução.

---

## 🎨 Diretriz Visual: Destaque em Verde

Conforme instrução da copy, as seguintes palavras devem **sempre** aparecer com destaque verde (`.text-neon` ou `.text-gradient`):

- **clientes**
- **vender**
- **resultado**
- **leads**

Isso deve ser aplicado consistentemente em todas as seções.

---

## 📐 Ordem Final das Seções (index.astro)

```
1. Header (fixo)
2. Hero — Promessa forte
3. Problema — Dor do visitante (NOVO)
4. Agitação — Intensifica a dor (NOVO)
5. Solução — OCARECADEV como resposta (NOVO)
6. Como Funciona — 4 passos (NOVO)
7. Social Proof — Resultados e depoimentos (ATUALIZAR)
8. About — Sobre o especialista (MANTER)
9. Pricing — Planos e ofertas (ATUALIZAR)
10. FAQ — Quebra de objeções (NOVO)
11. CTA Final — Decisão final (NOVO)
12. Footer
```

---

## 📈 Métricas de Sucesso

- Copy alinhada 100% com o plano de vendas aprovado
- Todas as seções presentes e na ordem correta
- Palavras-chave destacadas em verde conforme identidade visual
- Imagens geradas via "nano banana" onde necessário
- Zero textos placeholder ou fictícios não intencionais
