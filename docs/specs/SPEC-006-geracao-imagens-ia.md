# SPEC-006: Geração de Imagens e Mockups via IA

**Status:** [ ] Pendente | [ ] Em Progresso | [ ] Implementada

> **⚠️ INSTRUÇÃO PARA AGENTES DE IA:**
> Durante a execução desta especificação, você deve consultar este arquivo. Ao finalizar a implementação técnica, é sua obrigação retornar a este documento, marcar as caixas do `Definition of Done` (DoD) que foram concluídas e atualizar o **Status** no topo para `[x] Implementada`.

## 1. Contexto e Objetivo
Os PRDs (002 e 005) exigem que espaços ilustrativos na landing page (como a Hero Section e cards de Prova Social) contenham imagens geradas por IA (referenciado como "nano banana") para agregar valor visual premium. Esta spec garante que o agente de IA utilize sua ferramenta nativa (`generate_image`) para criar, otimizar e aplicar essas imagens no projeto.

## 2. Requisitos Técnicos

### 2.1. Geração de Imagens (Tool: `generate_image`)
O agente de IA deverá gerar no mínimo as seguintes imagens:
- **Mockup Hero Section:** Uma ilustração em 3D isométrica ou estilo tecnológico/glassmorphism de um dashboard de alta conversão, para flutuar ao lado ou abaixo da copy principal na `Hero.astro`.
- **Avatares/Imagens de Apoio (Opcional):** Imagens de avatares genéricos ou de clientes para compor os prints de prova social, caso não tenhamos as imagens reais no repositório.

### 2.2. Otimização (WebP/AVIF)
- De acordo com o PRD-005, as imagens geradas **não** podem ser usadas no formato `.png` ou `.jpg` bruto. 
- O agente deve garantir que as imagens geradas sejam salvas ou convertidas para o formato `.webp` ou `.avif` visando não penalizar a pontuação do Lighthouse.
- Se o Astro lidar com a otimização através do componente `<Image />` nativo (o que converte automaticamente no build), certifique-se de salvar em `src/assets/` e utilizar a importação correta do Astro.

### 2.3. Disponibilidade para a UI
- Todas as imagens geradas devem ser movidas/salvas em `src/assets/images/`.
- Elas serão integradas nos componentes durante a execução da `SPEC-003` (ou posteriormente se esta rodar depois).

## 3. Definition of Done (DoD)
- [ ] A ferramenta `generate_image` foi utilizada para criar o mockup visual 3D/tecnológico da Hero Section.
- [ ] As imagens geradas foram salvas dentro do diretório `src/assets/images/`.
- [ ] O formato das imagens ou a integração com o componente `<Image />` do Astro garante a conversão para WebP/AVIF.
- [ ] O layout principal não sofre gargalos de carregamento por culpa dessas imagens.
