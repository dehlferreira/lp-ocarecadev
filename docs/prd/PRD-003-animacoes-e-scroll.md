# PRD-003: Animações e Scroll

## 🎢 Lógica de Animação (Scroll-Driven)
A landing page será fortemente baseada em animações para gerar engajamento, mas elas seguirão uma regra de negócio estrita:
**"Todas as animações são puramente acionadas e controladas pelo Scroll."**

### Regras de Comportamento
1. **Sem Automação Independente:** Nenhuma animação deve "disparar e rodar sozinha" simplesmente porque o elemento entrou na tela. 
2. **Scroll Vinculado (Scrubbing):** O progresso da animação está diretamente ligado à posição do scroll do usuário (Intersection Observer). 
3. **Reversibilidade Total:** Se o usuário descer o scroll, a animação avança. Se ele subir o scroll, a animação retrocede perfeitamente.

## ⚡ Tecnologia a ser utilizada
Para garantir o máximo de performance, especialmente em dispositivos móveis (evitando o uso excessivo de thread principal do JS e baterias descarregando), a stack será:
- **CSS / JS Nativo:** Animações baseadas no estilo CSS geridas por JS minimalista.
- **Intersection Observer API:** Para detectar quando elementos entram/saem da viewport.
- **`requestAnimationFrame`:** Para atualizar valores de CSS custom properties (variáveis CSS) atreladas a transformações (translate, scale, rotate, opacity) de forma performática.

## 📍 Elementos Animados Esperados
- **Hero Section:** Elementos (imagens, textos) surgindo ou se reorganizando conforme a tela desce.
- **Efeitos Parallax em Fundo:** Elementos translúcidos e manchas de fundo se movendo em velocidades diferentes do foreground.
- **Cards de Planos:** Efeito de escala/reveal progressivo quando o usuário rola pela seção de preços.
- **Provas Sociais (Instagram Prints):** Os prints devem entrar na tela ou deslizar horizontalmente atrelados ao scroll vertical.

## 📉 Performance
- Evitar animar propriedades que ativem relayout (como `width`, `height`, `margin`).
- Focar exclusivamente em propriedades "cheap": `transform` e `opacity`.
- Garantir `will-change: transform` nos elementos que sofrerão animações pesadas.
