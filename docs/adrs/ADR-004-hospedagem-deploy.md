# ADR-004: Plataforma de Hospedagem, CDN e Deploy

## Contexto
O modelo de negócios da OCARECADEV prevê entregas rápidas (Express em até 48h) de landing pages estáticas e orientadas a conversão. Para tanto, o pipeline de deploy precisa ser altamente automatizado, sem fricção, e as páginas devem ser servidas a partir de redes de distribuição de conteúdo (Edge CDNs) para que usuários em qualquer local consigam tempos de resposta iniciais mínimos (Time to First Byte - TTFB).

## Opções Analisadas

1. **Vercel**
2. **Netlify**
3. **Cloudflare Pages**
4. **AWS Amplify**

## Decisão Aprovada: Vercel

### Motivos da Aprovação:
- **Zero Config CI/CD & Integração de Framework:** O suporte de primeira classe da Vercel ao Astro e a praticamente qualquer gerador estático garante que novos projetos (clientes) ou atualizações possam ir pro ar em minutos via `git push`. 
- **Otimização Edge Integrada:** O framework de Edge Network deles provê respostas em milissegundos nas principais capitais do mundo.
- **Workflow e Manutenção:** Como não teremos "backend", a Vercel brilha pela interface de desenvolvedor simplificada que foca em sites frontend. O uso de automações ou triggers de Github Actions aciona deploys instantâneos e permite controle de preview deployments essenciais para revisões com o cliente.

## Opções Reprovadas

### 1. Netlify
- **Motivo da Reprovação:** É uma ferramenta muito parecida e com recursos paralelos à Vercel. O fator decisivo para sua reprovação se dá unicamente pela experiência empírica de métricas de latência para o público da América do Sul (Brasil), onde, historicamente e em certas rotas específicas, a infraestrutura da Vercel (baseada nas edges da AWS e expansão contínua) oferece um TTFB levemente superior ao Netlify. Como o PRD-005 fala de "Performance e Conversão a todo custo", os milissegundos iniciais importam.

### 2. Cloudflare Pages
- **Motivo da Reprovação:** O Cloudflare tem, objetivamente, a maior e mais rápida infraestrutura global. O Cloudflare Pages é gratuito de forma generosa e estupidamente rápido para estáticos. O motivo de preterir a ferramenta é o ecossistema e DX de pipeline de Build de alguns frameworks. Às vezes a integração com certas bibliotecas e o gerenciamento de deploy previews não são tão 'plug-and-play' quanto a Vercel, que se consolida como padrão da indústria para desenvolvedores solo buscando agilidade e menos tempo gerenciando configurações da infraestrutura.

### 3. AWS Amplify
- **Motivo da Reprovação:** Traz uma complexidade conceitual muito alta. Configurar roles (IAM), políticas de permissão, e lidar com a interface pesada do painel AWS para hospedar uma simples Landing Page estática é como "usar um canhão para matar uma mosca". Reduziria a velocidade do desenvolvedor de orquestrar a infraestrutura cliente a cliente em comparação à simplicidade nativa de Vercel/Netlify.
