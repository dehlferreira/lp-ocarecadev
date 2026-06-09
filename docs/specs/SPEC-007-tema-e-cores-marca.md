# SPEC-007: Identidade Visual e Design Tokens (Cores)

**Status:** [x] Pendente | [x] Em Progresso | [x] Implementada

> **⚠️ INSTRUÇÃO PARA AGENTES DE IA:**
> Durante a execução desta especificação, você deve consultar este arquivo. Ao finalizar a implementação técnica, é sua obrigação retornar a este documento, marcar as caixas do `Definition of Done` (DoD) que foram concluídas e atualizar o **Status** no topo para `[x] Implementada`.

## 1. Contexto e Objetivo
Para garantir que a página siga estritamente a identidade visual da marca (conforme os arquivos em `docs/referencias/logos-perfil`), esta especificação define a paleta de cores oficial. A identidade baseia-se num visual muito escuro ("Dark Mode") com um tom vibrante de **Verde Neon / Mint** atuando como o principal atrativo (accent color), contrastando com textos brancos.

## 2. Requisitos Técnicos

### 2.1. Variáveis Nativas do CSS
A implementação deve definir estas variáveis primárias no arquivo `src/styles/global.css` (ou local equivalente onde as variáveis CSS do `:root` estiverem configuradas, conforme `SPEC-001`):

```css
:root {
  /* Fundo da Página (Base Dark) */
  --color-bg-dark: #0A0A0A;
  
  /* Cor Accent Principal (Verde Neon / Mint) */
  --color-primary-neon: #00FF9D;
  
  /* Textos Principais */
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #A3A3A3;
  
  /* Tokens para Glassmorphism */
  --glass-bg: rgba(255, 255, 255, 0.03); /* Fundo sutil do vidro */
  --glass-border: rgba(0, 255, 157, 0.2); /* Borda envidraçada usando o verde neon com baixa opacidade */
  --glass-blur: 16px;
  
  /* Estado de Hover (Botões e Links) */
  --color-primary-hover: #00E58B; /* Tom ligeiramente mais escuro para hover */
}
```

### 2.2. Aplicação do Glassmorphism
- As bordas (`border: 1px solid var(--glass-border)`) dos elementos *glass* (cards, formulários, nav) devem utilizar o verde neon de forma muito sutil, indicando a cor da marca.
- Efeitos luminosos radiais no fundo da página (como *glows* e *blobs*) devem preferencialmente usar a `--color-primary-neon` muito desfocada (`filter: blur(100px)`) com baixa opacidade para "colorir" o fundo escuro sem ofuscar o texto.

### 2.3. Coerência nas Imagens
- Todas as imagens de IA geradas, mockups, e seções de prova social devem incorporar o Verde Neon ou pelo menos manter o padrão escuro/cinza em seus assets de suporte, evitando cores muito conflitantes (como vermelhos vivos, azuis muito fortes ou laranjas, a menos que com propósito claro de semântica de erro/alerta).

## 3. Definition of Done (DoD)
- [x] As Variáveis CSS acima foram configuradas no arquivo de estilos globais.
- [x] O componente de botão padrão (`Button.astro`) consome a `--color-primary-neon`.
- [x] A cor do projeto visualizado através de `npm run dev` corresponde à identidade Dark + Verde Neon solicitada.
