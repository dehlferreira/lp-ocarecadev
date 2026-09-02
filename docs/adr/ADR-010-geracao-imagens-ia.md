# ADR-010: Geração de Imagens via IA ("Nano Banana")

## Status
Aceito

## Data
2026-06-11

## Contexto
Várias seções da copy final exigem conteúdo visual que ainda não existe no projeto (mockups antes/depois, ilustrações de processo, ícones visuais para os 4 passos do "Como Funciona"). A diretriz do negócio é que essas imagens sejam geradas usando ferramentas de IA (chamada internamente de "nano banana").

## Decisão

Usar a ferramenta `generate_image` para criar:
1. **Mockup "Antes/Depois"** — Para a seção de Prova Social (site genérico vs site OCARECADEV)
2. **Ícones/Ilustrações** — Para os 4 passos da seção "Como Funciona"
3. **Imagem de contexto** — Para seções Problema/Agitação (frustração com site que não converte)
4. **Imagem para CTA Final** — Visual de fechamento que reforce a decisão

### Diretrizes para as imagens geradas:
- Paleta escura com acentos em verde neon (#00FF9D)
- Estilo clean, minimalista e tech
- Sem textos dentro das imagens (textos vão via HTML)
- Formato adequado para otimização (Astro converte automaticamente)

## Alternativas Consideradas

### 1. Usar bancos de imagem stock
- **Prós:** Imagens profissionais prontas
- **Contras:** Genéricas, não refletem a identidade OCARECADEV, custos de licença

### 2. Não usar imagens (apenas texto)
- **Prós:** Mais leve, menos trabalho
- **Contras:** Seções ficam "secas" e menos engajantes — contra o padrão premium da marca

## Consequências
- Imagens únicas e alinhadas à marca
- Precisam ser revisadas manualmente para garantir qualidade
- Devem ser salvas em `src/assets/images/` para otimização automática do Astro
