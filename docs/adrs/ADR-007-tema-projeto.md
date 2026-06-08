# ADR-007: Arquitetura de Tema e Design Tokens

## Contexto
O design da página demanda um estilo muito específico e premium, focado em **Glassmorphism**, com forte ênfase em Dark Mode, fundos translúcidos e cores accent (neon/vibrantes). Conforme decidido no ADR-002 (utilização de Vanilla CSS/CSS Modules), precisamos de uma forma de gerenciar as cores, espaçamentos, tipografia e os tokens de vidro (blur, rgba, bordas) de maneira global para que todas as seções e landing pages mantenham consistência visual.

## Opções Analisadas

1. **Variáveis CSS Nativas (Custom Properties Globais no :root)**
2. **Tokens Configurados em CSS-in-JS (Theme Provider)**
3. **Mapas de Variáveis Sass/SCSS**
4. **Tailwind CSS config theme**

## Decisão Aprovada: Variáveis CSS Nativas (Custom Properties Globais)

### Motivos da Aprovação:
- **Alinhamento com o ADR-002:** Como escolhemos usar CSS Vanilla, as Variáveis CSS nativas são a forma mais correta e performática de gerenciar tokens de design. Um arquivo `global.css` declarando variáveis no `:root` permite que qualquer componente do Astro acesse cores de fundo, valores de blur para glassmorphism e tipografia sem configurações pesadas.
- **Dinamismo em Tempo de Execução:** Variáveis CSS podem ser alteradas dinamicamente via JavaScript. Se precisarmos mudar sutilmente as cores baseadas no scroll (para efeitos visuais) ou transitar suavemente entre o esquema de cor da marca para pacotes diferentes, as variáveis CSS nativas fazem isso com custo zero de processamento, apenas recalculando o estilo nativamente no browser.
- **Escopo e Escala:** É muito simples definir `var(--glass-bg)` e `var(--glass-border)` para reutilizar o efeito de glassmorphism em cards, headers e pop-ups.

## Opções Reprovadas

### 1. Tokens Configurados em CSS-in-JS (Theme Provider)
- **Motivo da Reprovação:** Requer a injeção do objeto de tema no cliente, adicionando peso no bundle JS e bloqueando a renderização rápida. Como o Styled Components e afins já foram rejeitados, usar um Theme Provider Javascript forçaria uma hidratação em React/Vue desnecessária apenas para fornecer as cores para a página.

### 2. Mapas de Variáveis Sass/SCSS
- **Motivo da Reprovação:** Usar variáveis do pré-processador Sass (`$primary-color`) gera valores estáticos (hardcoded) no CSS final. Isso dificulta muito a criação de transições dinâmicas via JS e remove a flexibilidade que as propriedades customizadas modernas trazem. Além disso, adiciona mais um passo de build para compilar arquivos `.scss` apenas para compartilhar os tokens.

### 3. Tailwind CSS config theme
- **Motivo da Reprovação:** O Tailwind é excelente para padronizar tokens de design no `tailwind.config.js`. Contudo, como sua adoção foi rejeitada na arquitetura geral devido à marcação HTML muito poluída e dificuldade em construir glassmorphism de forma limpa, basear os tokens no Tailwind exigiria utilizar o framework apenas pela sua configuração base e usar `@apply`, o que no final gera um CSS muito grande, fugindo da otimização proposta pelo Vanilla CSS.
