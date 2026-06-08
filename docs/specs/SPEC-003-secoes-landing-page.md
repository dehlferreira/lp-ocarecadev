# SPEC-003: Montagem das Seções da Landing Page

**Status:** [ ] Pendente | [ ] Em Progresso | [ ] Implementada

> **⚠️ INSTRUÇÃO PARA AGENTES DE IA:**
> Durante a execução desta especificação, você deve consultar este arquivo. Ao finalizar a implementação técnica, é sua obrigação retornar a este documento, marcar as caixas do `Definition of Done` (DoD) que foram concluídas e atualizar o **Status** no topo para `[x] Implementada`.

## 1. Contexto e Objetivo
Com a base do Astro pronta e os componentes de UI (Botões e Cards de Vidro) finalizados, o próximo passo é orquestrar esses componentes para construir o conteúdo principal da Landing Page OCARECADEV, alinhado ao funil de vendas (PRD-001). As seções construídas aqui devem compor a `index.astro`.

## 2. Requisitos Técnicos

### 2.1. Cabeçalho (Header.astro)
- Arquivo: `src/components/sections/Header.astro`.
- Disposição flutuante no topo, usando o `GlassCard`.
- Inserção da logo (`docs/referencias/logos-perfil`) e um `Button` secundário/primário chamando para o contato.

### 2.2. Hero Section (Hero.astro)
- Arquivo: `src/components/sections/Hero.astro`.
- Foco central: Promessa Forte (Máquinas de geração de clientes).
- Uso dos botões primário ("Quero minha máquina") e secundário ("Ver planos").
- A seção deve preencher a primeira dobra (`min-h-screen` ou similar).

### 2.3. Prova Social (SocialProof.astro)
- Arquivo: `src/components/sections/SocialProof.astro`.
- Exibir mockups ou cards utilizando imagens/prints das referências (`docs/referencias/prints-instagram`).
- Título chamativo para resultados.

### 2.4. Seção de Preços (Pricing.astro)
- Arquivo: `src/components/sections/Pricing.astro`.
- Três planos: OCARECADEV EXPRESS (R$ 297), LANDING QUE VENDE (R$ 997), MÁQUINA DE CLIENTES (R$ 2.497).
- O plano central ("LANDING QUE VENDE") deve estar visualmente em destaque.
- Utilização de `GlassCard` para construir a caixa de cada plano.

### 2.5. Rodapé (Footer.astro)
- Arquivo: `src/components/sections/Footer.astro`.
- Links finais e Copyright.

### 2.6. Inserção na Home
- Editar `src/pages/index.astro` para importar e renderizar sequencialmente: `<Header />`, `<Hero />`, `<SocialProof />`, `<Pricing />`, `<Footer />`.

## 3. Definition of Done (DoD)
- [ ] Todas as 5 seções principais foram codificadas como componentes Astro independentes em `src/components/sections/`.
- [ ] A página principal (`index.astro`) importa e renderiza as 5 seções na ordem correta.
- [ ] Os layouts de cada seção são responsivos (mobile-first mente, PRD-002).
- [ ] As informações e preços corretos dos produtos (conforme PRD-001) foram inseridos em `Pricing.astro`.
