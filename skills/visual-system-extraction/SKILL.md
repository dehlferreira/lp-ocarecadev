---
name: visual-system-extraction
description: Use when an agent needs to extract colors, typography, layout, imagery, and component style from a reference website.
---

# Visual System Extraction

## Objetivo

Transformar a aparencia do site em um sistema visual compreensivel para um agente de design.

## Extrair

### Cores

- Paleta primaria, secundaria, neutra e cores de acento.
- Uso funcional: fundo, texto, bordas, botoes, links, estados, alertas.
- Hex, RGB, HSL ou tokens CSS quando estiverem disponiveis.
- Contraste percebido e combinacoes dominantes.

### Tipografia

- Familias de fontes confirmadas ou inferidas.
- Hierarquia: H1, H2, H3, corpo, legenda, botoes e labels.
- Peso, escala aproximada, line-height, caixa alta/baixa e estilo editorial.
- Relacao entre tipografia e tom da marca.

### Layout

- Grid, largura maxima, espacamentos, ritmo vertical e densidade.
- Alinhamentos, composicao de hero, secoes, cards e rodape.
- Breakpoints ou mudancas responsivas observadas.
- Uso de cards, bandas full-width, colunas, overlays e containers.

### Imagens e Iconografia

- Tipo de imagem: produto real, foto editorial, mockup, ilustracao, 3D, video, textura.
- Tratamento: corte, proporcao, filtros, sombras, bordas, mascara, blend.
- Estilo de icones: outline, preenchido, customizado, biblioteca provavel.

### Componentes

- Anatomia visual de botoes, inputs, cards, navegacao e elementos interativos.
- Estados visiveis: hover, active, focus, disabled, selected e loading quando observaveis.
- Bordas, raios, sombras, blur, transparencia e profundidade.

## Como Registrar

Separe fatos confirmados de inferencias:

- "Confirmado:" quando visto no DOM/CSS/asset ou claramente observavel.
- "Inferido:" quando baseado em aparencia, sem fonte tecnica.
- "Nao confirmado:" quando o ambiente nao permitiu verificar.

## Erros Comuns

- Dizer apenas "moderno", "clean" ou "premium" sem evidencias.
- Listar cores sem explicar onde aparecem.
- Ignorar escala tipografica e espacamento.
- Copiar detalhes demais sem sintetizar padroes reutilizaveis.
