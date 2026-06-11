# SPEC-008: Implementação da Copy Final e Novas Seções

**Status:** [ ] Pendente | [ ] Em Progresso | [ ] Implementada

> **⚠️ INSTRUÇÃO PARA AGENTES DE IA:**
> Durante a execução desta especificação, você deve consultar este arquivo. Ao finalizar a implementação técnica, é sua obrigação retornar a este documento, marcar as caixas do `Definition of Done` (DoD) que foram concluídas e atualizar o **Status** no topo para `[x] Implementada`.

## 1. Contexto e Objetivo

Implementar a **copy final de vendas** (referência: `docs/referencias/copy-completa-landing.md`) em todas as seções da landing page OCARECADEV. Isso inclui atualizar as seções existentes e criar 6 novas seções seguindo a estrutura de funil PAS (ADR-008).

**Documentos de referência:**
- PRD-006: Copy Final e Seções Faltantes
- ADR-008: Estrutura de Funil PAS
- ADR-009: Palavras-Chave com Destaque Visual
- ADR-010: Geração de Imagens via IA

---

## 2. Atualização de Seções Existentes

### 2.1. Hero Section (`Hero.astro`)

**Copy a implementar:**

```html
<h1>
  Seu site não precisa ser bonito.<br/>
  Precisa trazer <span class="text-neon">clientes</span> todos os dias.
</h1>
<p>
  Criamos páginas pensadas para transformar visitantes em 
  <span class="text-neon">clientes</span> — mesmo que hoje seu site 
  não gere nenhum <span class="text-neon">resultado</span>.
</p>
```

- **CTA Primário:** "Quero minha página que vende" → `href="#pricing"`
- **CTA Secundário:** Remover ou trocar por "Ver como funciona" → `href="#como-funciona"`
- **Imagem:** Manter `hero-perfil.webp` (foto do André)

### 2.2. Social Proof (`SocialProof.astro`)

**Copy a implementar:**

```html
<h2>
  <span class="text-neon">Resultados</span> falam mais que qualquer promessa
</h2>
```

**Conteúdo:**
- Manter os 3 cards de depoimentos existentes (adaptar textos se necessário)
- Adicionar bullets visuais:
  - "Mais mensagens no WhatsApp"
  - "Mais pedidos de orçamento"
  - "Mais clientes entrando todos os dias"
- **Imagem:** Gerar via "nano banana" um mockup antes/depois

### 2.3. Pricing (`Pricing.astro`)

**Headline:** "Escolha o plano ideal para o seu momento"
**Subtítulo:** Remover ou simplificar

**Plano EXPRESS:**
- Desc: "Para quem precisa entrar no ar rápido"
- Features: Landing page simples · Template validado · Personalização básica · Botão direto para WhatsApp · Entrega em até 48h
- CTA: "Quero começar rápido"

**Plano LANDING QUE VENDE:**
- Desc: "Para quem quer gerar <span class='text-neon'>clientes</span> de verdade"
- Features: Estrutura focada em conversão · Design premium · CTA estratégico · Integração WhatsApp e Analytics · Tracking de cliques e leads · 1 revisão estratégica
- CTA: "Quero uma página que gera clientes"

**Plano MÁQUINA DE CLIENTES:**
- Desc: "Para quem quer presença profissional e escala"
- Features: 3 a 5 páginas completas · Estrutura estratégica · Integrações e tracking · Pronto para tráfego pago · Otimização de conversão
- CTA: "Quero um sistema completo"

---

## 3. Novas Seções a Implementar

### 3.1. Problema (`Problem.astro`)

- **Arquivo:** `src/components/sections/Problem.astro`
- **ID da seção:** `#problema`
- **Estilo:** Fundo mais escuro que o padrão, com tom avermelhado sutil nos orbs ou sem orbs (contraste emocional com o restante verde)

**Copy:**
```html
<h2>
  Se você já tem um site e ele não te traz <span class="text-neon">clientes</span>, 
  ele não serve pra nada.
</h2>

<p>A verdade é simples:</p>

<ul>
  <li>Seu site não gera <span class="text-neon">leads</span></li>
  <li>Ninguém clica no seu botão</li>
  <li>Você depende de indicação</li>
  <li>E quando não indicam… você não vende</li>
</ul>

<p class="highlight">👉 você nem sabe o que está errado</p>
```

**Visual:** Layout centralizado, tipografia grande, sem imagens. Bullet points com ícones X ou ✗.

### 3.2. Agitação (`Agitation.astro`)

- **Arquivo:** `src/components/sections/Agitation.astro`
- **ID da seção:** `#agitacao`
- **Estilo:** Transição emocional — continua tom de dor. Pode ter uma imagem gerada via IA mostrando frustração/estagnação.

**Copy:**
```html
<p class="big-text">
  Você investiu tempo, dinheiro…<br/>
  e no fim, tem só uma página parada na internet.
</p>

<p>Sem retorno.</p>
<p>Sem previsibilidade.</p>
<p>Sem controle.</p>

<p class="highlight">👉 Isso não é um site. É um <span class="text-neon">custo</span>.</p>
```

**Visual:** Texto grande, centralizado, espaçamento generoso. Efeito de fade-in por scroll. Opcional: imagem gerada via nano banana (tela de computador com gráfico caindo).

### 3.3. Solução (`Solution.astro`)

- **Arquivo:** `src/components/sections/Solution.astro`
- **ID da seção:** `#solucao`
- **Estilo:** Aqui o tom muda — volta o verde neon, glow orbs, energia positiva.

**Copy:**
```html
<h2>
  Agora imagina ter uma página que trabalha por você todos os dias
</h2>

<p>Na OCARECADEV, nós não criamos "sites bonitos".</p>

<p class="highlight">
  👉 Nós criamos páginas pensadas para gerar <span class="text-neon">clientes</span>.
</p>

<p>
  Cada detalhe é feito para uma coisa:<br/>
  fazer o visitante clicar, entrar em contato e virar <span class="text-neon">cliente</span>.
</p>
```

**Visual:** GlassCard envolvendo o conteúdo, glow neon verde retornando. Opcional: imagem gerada via nano banana (mockup de landing page premium).

### 3.4. Como Funciona (`HowItWorks.astro`)

- **Arquivo:** `src/components/sections/HowItWorks.astro`
- **ID da seção:** `#como-funciona`
- **Estilo:** Grid de 4 cards com ícones/números, usando `GlassCard`.

**Copy:**
```html
<h2>Um processo simples, direto e focado em <span class="text-neon">resultado</span></h2>
```

**4 Passos (cada um em um GlassCard):**

| # | Título | Descrição |
|---|---|---|
| 01 | Estrutura validada | Usamos modelos que já funcionam |
| 02 | Personalização | Adaptamos para o seu negócio |
| 03 | Publicação rápida | Seu site no ar em poucos dias |
| 04 | Geração de leads | Visitantes viram contatos no WhatsApp |

**Visual:** Grid 2x2 em desktop, empilhado em mobile. Cada card com número grande em verde e texto explicativo. Animação staggered por scroll.

### 3.5. FAQ / Quebra de Objeções (`FAQ.astro`)

- **Arquivo:** `src/components/sections/FAQ.astro`
- **ID da seção:** `#faq`
- **Estilo:** Accordion ou lista simples em `GlassCard`.

**Copy:**
```html
<h2>Ainda com dúvidas?</h2>
```

| Pergunta | Resposta |
|---|---|
| Preciso entender de tecnologia? | Não. Nós cuidamos de tudo. |
| Em quanto tempo fica pronto? | A partir de 48h no plano Express. |
| Vou conseguir editar depois? | Sim, você terá acesso. |
| Isso realmente funciona? | Funciona quando é feito da forma certa — e é isso que fazemos. |

**Visual:** Cada pergunta/resposta em um `GlassCard` ou em formato accordion com animação de expand/collapse.

### 3.6. CTA Final (`CtaFinal.astro`)

- **Arquivo:** `src/components/sections/CtaFinal.astro`
- **ID da seção:** `#cta-final`
- **Estilo:** Seção impactante com glow forte. Fundo com gradiente ou neon light.

**Copy:**
```html
<h2>Agora a decisão é sua</h2>

<p>
  Continuar com um site que não traz <span class="text-neon">resultado</span><br/>
  ou ter uma página que gera <span class="text-neon">clientes</span> todos os dias.
</p>
```

- **CTA:** "Falar no WhatsApp agora" → `href` usando variável `WHATSAPP_NUMBER` do `.env`
- **Visual:** Botão grande, centralizado, com pulse animation forte. Glow orbs intensificados.

---

## 4. Atualização do `index.astro`

A página principal deve importar e renderizar as seções na seguinte ordem:

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/sections/Header.astro';
import Hero from '../components/sections/Hero.astro';
import Problem from '../components/sections/Problem.astro';
import Agitation from '../components/sections/Agitation.astro';
import Solution from '../components/sections/Solution.astro';
import HowItWorks from '../components/sections/HowItWorks.astro';
import SocialProof from '../components/sections/SocialProof.astro';
import About from '../components/sections/About.astro';
import Pricing from '../components/sections/Pricing.astro';
import FAQ from '../components/sections/FAQ.astro';
import CtaFinal from '../components/sections/CtaFinal.astro';
import Footer from '../components/sections/Footer.astro';
---

<Layout title="OCARECADEV | Páginas que Geram Clientes Todos os Dias">
  <Header />
  <main>
    <Hero />
    <Problem />
    <Agitation />
    <Solution />
    <HowItWorks />
    <SocialProof />
    <About />
    <Pricing />
    <FAQ />
    <CtaFinal />
  </main>
  <Footer />
</Layout>
```

---

## 5. Imagens a Gerar (via "nano banana" / generate_image)

| Imagem | Uso | Prompt Sugerido |
|---|---|---|
| `mockup-antes-depois.webp` | Social Proof | "Side by side comparison of a generic boring website vs a premium dark glassmorphism landing page with green neon accents, minimalist tech style, no text" |
| `frustration-screen.webp` | Agitação | "Dark moody illustration of a laptop screen showing declining analytics graph, minimal style, dark background with subtle red glow" |
| `solution-mockup.webp` | Solução | "Premium dark landing page mockup on a floating laptop, glassmorphism design with green neon glow accents, clean modern tech aesthetic" |
| `process-icons.webp` | Como Funciona | "Four minimalist tech icons: structure/blueprint, customization/palette, rocket launch, lead generation/handshake, dark background, green neon outlines" |

---

## 6. Diretriz de Microcopy para Botões

Conforme a copy, os seguintes textos devem ser usados nos botões espalhados pelo site:

- "Quero vender mais"
- "Quero minha página pronta"
- "Quero gerar clientes"
- "Falar com especialista"

---

## 7. Definition of Done (DoD)

- [ ] Copy do Hero atualizada conforme plano de vendas
- [ ] Copy do Pricing atualizada (headlines, features, CTAs)
- [ ] Copy do SocialProof atualizada
- [ ] Seção `Problem.astro` criada e implementada
- [ ] Seção `Agitation.astro` criada e implementada
- [ ] Seção `Solution.astro` criada e implementada
- [ ] Seção `HowItWorks.astro` criada e implementada
- [ ] Seção `FAQ.astro` criada e implementada
- [ ] Seção `CtaFinal.astro` criada e implementada
- [ ] `index.astro` atualizada com todas as seções na ordem correta
- [ ] Palavras-chave destacadas em verde (`.text-neon`) em todas as seções
- [ ] Imagens geradas via "nano banana" e inseridas nas seções correspondentes
- [ ] Todos os links de WhatsApp usam variáveis de ambiente (`.env`)
- [ ] Site responsivo com todas as novas seções (mobile-first)
- [ ] Transições suaves entre seções (`.section-fade-top` / `.section-fade-bottom`)
- [ ] Scroll animations (`.scroll-animate`) aplicadas em todos os novos elementos
