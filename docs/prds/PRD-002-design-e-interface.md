# PRD-002: Design e Interface (UI/UX)

## 🎨 Visão Geral do Design
A landing page da OCARECADEV deve ter um visual extremamente **premium, moderno e focado em alta tecnologia**. O objetivo é que o cliente, ao abrir a página, sinta imediatamente a superioridade do produto em relação a "sites comuns".

## 🧊 Glassmorphism Forte (Diretriz Principal)
O projeto deve adotar a estética de **Glassmorphism** de forma agressiva e sofisticada. 
- **Cards e Containers:** Fundos translúcidos (`backdrop-filter: blur()`), com bordas sutis brilhantes (brancas/translúcidas com baixa opacidade).
- **Sombras:** Uso de drop-shadows suaves para dar profundidade e destacar os containers flutuando sobre o fundo.
- **Fundos (Backgrounds):** Fundos escuros (Dark Mode prioritário) com manchas de cores vibrantes e gradientes dinâmicos (ex: tons de Verde Neon / Mint) que brilham por trás dos elementos de vidro.

## 🖼️ Referências Visuais
O design deve consumir e se inspirar nos assets providenciados:
- **Logos (`docs/referencias/logos-perfil`):** Utilização correta das versões horizontal e vertical. A imagem de perfil (convertida para WebP) deve ser usada obrigatoriamente na seção "Sobre o Especialista" ("falar de mim").
- **Prints do Instagram (`docs/referencias/prints-instagram`):** Devem ser dispostos visualmente como prova social (Social Proof). Podem ser exibidos usando componentes com efeito glassmorphic e um leve tilt/rotação 3D para gerar impacto visual.
- **Mockups de Suporte:** Imagens e mockups adicionais que complementem o site (ex: visualização de páginas geradas em dispositivos móveis e desktops) serão gerados utilizando ferramentas de IA ("nano banana") para preencher espaços ilustrativos e agregar valor.

## 📱 Responsividade (Mobile-First Mente)
- A conversão de anúncios ocorrerá majoritariamente no mobile. 
- O layout deve ser adaptado para telas pequenas sem quebrar a estética de glassmorphism.
- Os cards de planos e portfólio/provas sociais devem usar scroll horizontal ou empilhamento inteligente.
- Tamanho de fontes legíveis sem zoom (`min-text-size: 16px`).
- Áreas de clique (Touch targets) com no mínimo `48x48px` em dispositivos móveis.

## 📝 Tipografia e Cores
- **Tipografia:** Uso de fontes modernas sem serifa (ex: *Inter*, *Outfit*, *Plus Jakarta Sans*) para alta legibilidade e aspecto tecnológico.
- **Paleta de Cores:** Fundo Dark, elementos de superfície translúcidos (Glass), e accent colors vibrantes (Verde Neon / Mint, ex: `#00FF9D`, conforme identidade visual da marca) para os botões de conversão e elementos de destaque.
