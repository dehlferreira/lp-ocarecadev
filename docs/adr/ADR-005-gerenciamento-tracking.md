# ADR-005: Arquitetura de Gerenciamento e Tracking de Eventos

## Contexto
O objetivo número um das Landing Pages da OCARECADEV é gerar clientes mensuráveis (Marketing e Ads Tracking via PRD-004). Assim, precisamos injetar pixels do Meta Ads, tags do Google Analytics (GA4) e Google Ads Tag em nossa página para aferir conversões e otimizar campanhas de tráfego pago. A forma como esses scripts de terceiros são adicionados na página pode ditar o sucesso ou o fracasso do cumprimento da métrica fundamental (Lighthouse Score Alto e Velocidade < 3s).

## Opções Analisadas

1. **Partytown (Third-party Scripts via Web Worker)**
2. **Google Tag Manager (GTM)**
3. **Integração Direta (Hardcoded Snippets)**
4. **Segment**

## Decisão Aprovada: Partytown

### Motivos da Aprovação:
- **Remoção de Overhead na Main Thread:** O pacote Partytown, que integra perfeitamente ao Astro de forma oficial, executa scripts como Google Analytics e Meta Pixel isolados dentro de um *Web Worker* em background. Isso significa que o JavaScript de terceiros que rastreia os eventos nunca bloqueia a thread principal (DOM), não causando penalizações no Total Blocking Time (TBT).
- **Adequação Integral aos Requisitos:** Permite monitorar 100% dos eventos (scroll_depth, click_cta, page_view) descritos no PRD-004 preservando as garantias de 100 pontos no Lighthouse prometidos no PRD-005. Nenhuma outra opção consegue manter performance equivalente com tamanha injeção de bibliotecas externas de Marketing.

## Opções Reprovadas

### 1. Google Tag Manager (GTM)
- **Motivo da Reprovação:** GTM é excelente do ponto de vista do gestor de tráfego, permitindo a instalação remota de scripts. Porém, ele tradicionalmente injeta código síncrono ou blocante na Thread Principal. Usar GTM da forma clássica "arruina" as métricas vitais da página, aumentando drasticamente o tempo necessário para o navegador ficar interativo (TTI), fato proibitivo no escopo deste negócio.

### 2. Integração Direta (Hardcoded Snippets)
- **Motivo da Reprovação:** Adicionar diretamente o GTAG e o fbq() no `<head>` das páginas traz exatamente o mesmo problema do GTM: uso da Thread Principal, execução intensiva no carregamento e degradação do Core Web Vitals (aumentando o LCP por disputar banda da rede de download do HTML/CSS principal da página inicial).

### 3. Segment
- **Motivo da Reprovação:** Uma plataforma corporativa incrível (CDP) que abstrai toda injeção num único script e roteia os dados no lado do servidor para Google/Meta. Contudo, é uma solução muito cara (overkill absoluto) focada em operações complexas de dados de usuários e unificação de ecossistemas, totalmente desalinhada da proposta de simplificação e margem de lucro agressiva da venda avulsa de landing pages da OCARECADEV.
