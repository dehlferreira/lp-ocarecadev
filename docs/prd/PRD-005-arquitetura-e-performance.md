# PRD-005: Arquitetura e Performance

## 🏗️ Stack Tecnológica
- **Framework Front-End:** Astro (Preferência recomendada) ou framework equivalente focado em alta performance. Foi escolhido para envio mínimo de JS ao cliente e geração de HTML estático ultra-rápida.
- **Estilos:** Vanilla CSS (ou TailwindCSS caso prefira abstração de utilities, mas a recomendação é foco em performance) / CSS Modules.
- **Animações:** Vanilla JS + Intersection Observer (conforme PRD-003).
- **Hospedagem / Deploy:** Vercel (CI/CD integrado).

## 🚀 Requisitos Não-Funcionais (Performance)

O usuário estipulou que "não pode demorar mais que 3 segundos para abrir". Sendo assim, a arquitetura deve ser focada em métricas de Core Web Vitals.

- **FCP (First Contentful Paint):** < 1.0s
- **LCP (Largest Contentful Paint):** < 2.5s (Target: < 1.5s)
- **CLS (Cumulative Layout Shift):** 0 (nenhum pulo de tela).
- **INP (Interaction to Next Paint):** < 200ms.

### Práticas de Otimização
1. **Otimização de Imagens:** Todas as imagens (referências e mockups gerados pela IA "nano banana") devem ser convertidas para `WebP` ou `AVIF`, e servidas com dimensões explícitas (`width`/`height`) para evitar CLS.
2. **Lazy Loading:** Imagens fora do primeiro viewport (below the fold) e iframes devem receber `loading="lazy"`.
3. **Fontes:** As web fonts devem usar `font-display: swap` e ser pre-carregadas (`<link rel="preload">`) caso afetem o LCP.

## ♿ Acessibilidade e SEO On-Page
- O projeto exige 100% de pontuação no Lighthouse.
- **Acessibilidade (A11y):** Contraste legível mesmo usando glassmorphism, uso correto de tags semânticas HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`), suporte a navegação por teclado (focus states visíveis).
- **SEO:** Inclusão de Meta tags corretas (Title, Description, OpenGraph para redes sociais). Uso de uma única tag `<h1>` focada na promessa principal.
