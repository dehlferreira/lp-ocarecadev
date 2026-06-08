# ADR-002: Ferramenta de Estilização CSS

## Contexto
O projeto demanda uma estética visual premium fortemente baseada no estilo **Glassmorphism** (fundos translúcidos, blur, sombras, dark mode). Além disso, o PRD-005 prioriza performance extrema (Core Web Vitals) em cima da facilidade de escrita. É necessário definir como o CSS será escrito e empacotado para o navegador.

## Opções Analisadas

1. **Vanilla CSS / CSS Modules**
2. **Tailwind CSS**
3. **Styled Components (CSS-in-JS)**
4. **Sass (SCSS)**

## Decisão Aprovada: Vanilla CSS / CSS Modules

### Motivos da Aprovação:
- **Performance Extrema:** O CSS puro (ou com uso de CSS Modules gerado via Astro/Vite) garante que não existe parsing no lado do cliente ou overhead de classes não utilizadas (o framework já minifica e extrai apenas o usado no escopo de cada componente).
- **Controle Fino para Glassmorphism:** O efeito de vidro (`backdrop-filter`, múltiplos `box-shadow` combinados com variáveis de cor RGBA) pode exigir customizações muito granulares de variáveis que muitas vezes são difíceis de encaixar de maneira enxuta nos padrões de frameworks utilitários, requerendo muita abstração no `tailwind.config`. Escrever o CSS bruto dá controle total pixel-perfect.
- **Evolução do CSS Moderno:** Recursos nativos como Custom Properties (Variáveis CSS), Nesting nativo (`&`), e Container Queries reduzem a necessidade real de pré-processadores externos (Sass) e oferecem alto desempenho no navegador.

## Opções Reprovadas

### 1. Tailwind CSS
- **Motivo da Reprovação:** Apesar de acelerar drasticamente o desenvolvimento, a natureza utilitária do Tailwind pode gerar marcação HTML excessivamente verbosa (class-soup). Além disso, para implementar Glassmorphism de alto nível como exigido (com gradientes sutis animados e bordas translúcidas interativas), seria necessário estender o arquivo de configuração demasiadamente com classes personalizadas (plugins ou utilitários arbitrários com chaves `[]`), perdendo grande parte do benefício da convenção utilitária original.

### 2. Styled Components (CSS-in-JS)
- **Motivo da Reprovação:** CSS-in-JS bloqueia a thread de execução do JavaScript para gerar as tags `<style>` em tempo de execução no cliente, a menos que haja configuração pesada de renderização crítica no servidor. Isso impacta negativamente o FCP e LCP e vai diretamente contra a diretriz de alta performance (carregamento < 3s) e adoção de HTML estático leve.

### 3. Sass (SCSS)
- **Motivo da Reprovação:** SCSS é excelente para organização, porém com o suporte abrangente moderno dos navegadores para Variáveis Nativas e Nesting nativo (já embutido nativamente no processamento de ferramentas modernas via PostCSS), o Sass acaba adicionando complexidade e um passo adicional na esteira de compilação sem oferecer um benefício de escala decisivo para landing pages pequenas/médias.
