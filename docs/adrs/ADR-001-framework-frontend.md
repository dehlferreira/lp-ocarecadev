# ADR-001: Escolha do Framework Front-End

## Contexto
O projeto consiste em uma landing page de altíssima performance para a OCARECADEV, focada em conversão. O escopo é estrito: não haverá backend dinâmico ou construtor de sites automatizado; trata-se exclusivamente da criação manual (pelo desenvolvedor) de landing pages estáticas e vitrines comerciais. Segundo o PRD-005, o site deve abrir em menos de 3 segundos, focando em excelente LCP, zero CLS, e SEO impecável (nota 100 no Lighthouse).

## Opções Analisadas

1. **Astro**
2. **Next.js**
3. **Nuxt.js**
4. **Vite + React (SPA)**
5. **Código Puro (HTML/CSS/JS Vanilla)**

## Decisão Aprovada: Astro

### Motivos da Aprovação:
- **Zero JS by Default:** O Astro entrega HTML 100% estático por padrão. O JavaScript é enviado ao cliente apenas para componentes específicos (Ilhas) que necessitem de interatividade. Isso garante tempos de carregamento (FCP e LCP) muito menores em comparação a SPAs e SSR.
- **Agnóstico a Frameworks:** Permite o uso de componentes React, Vue, Svelte, ou até mesmo HTML/CSS puro no mesmo projeto, o que facilita o reaproveitamento de código e adoção de bibliotecas conforme necessário sem amarrar a arquitetura inteira a um runtime pesado.
- **Developer Experience (DX):** Oferece roteamento baseado em arquivos (file-based routing), suporte nativo a Markdown/MDX para conteúdo, e minificação automática, mantendo o ambiente de desenvolvimento moderno, organizado e mais produtivo do que usar "código puro".

## Opções Reprovadas

### 1. Código Puro (HTML/CSS/JS Vanilla)
- **Motivo da Reprovação:** Embora garanta a melhor performance absoluta (por não ter overhead de framework) e atenda aos requisitos do PRD-005, a manutenibilidade, componentização e escalabilidade no desenvolvimento ficam muito prejudicadas. Tarefas como gestão de rotas, inclusão de cabeçalhos/rodapés repetidos, e otimização de imagens precisariam ser feitas manualmente, reduzindo a velocidade de entrega do desenvolvedor para cada nova página de vendas.

### 2. Next.js
- **Motivo da Reprovação:** O Next.js é focado primariamente na construção de aplicações complexas via SSR. Embora tenha um excelente recurso de Geração de Sites Estáticos (SSG), ele ainda hidrata a página inteira com o runtime do React no lado do cliente, adicionando um volume de JavaScript base desnecessário para uma página estritamente de marketing e vendas, dificultando atingir a pontuação máxima no Lighthouse em dispositivos móveis.

### 3. Nuxt.js
- **Motivo da Reprovação:** Compartilha o mesmo problema estrutural do Next.js. O ecossistema Vue é excelente, porém o runtime do Vue.js necessário para hidratação no cliente impõe uma penalidade no Total Blocking Time (TBT) e INP em conexões lentas, sendo excessivo para uma landing page pura.

### 4. Vite + React (SPA)
- **Motivo da Reprovação:** Single Page Applications precisam baixar e executar o bundle JavaScript antes de começar a renderizar o DOM real. Isso prejudica drasticamente o FCP (First Contentful Paint), LCP e, principalmente, a indexação inicial do SEO (Crawler precisa esperar o JS executar). Não atende aos requisitos do PRD-005.
