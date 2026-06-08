# SPEC-002: Componentes Base de UI

**Status:** [ ] Pendente | [ ] Em Progresso | [ ] Implementada

> **⚠️ INSTRUÇÃO PARA AGENTES DE IA:**
> Durante a execução desta especificação, você deve consultar este arquivo. Ao finalizar a implementação técnica, é sua obrigação retornar a este documento, marcar as caixas do `Definition of Done` (DoD) que foram concluídas e atualizar o **Status** no topo para `[x] Implementada`.

## 1. Contexto e Objetivo
Após o setup da arquitetura (SPEC-001), precisamos criar a biblioteca de componentes (átomos) da Landing Page. Eles serão a fundação para construir as seções na próxima spec. O foco aqui é implementar o Glassmorphism rigorosamente (PRD-002 e ADR-002), utilizando as variáveis CSS criadas no `global.css`.

## 2. Requisitos Técnicos

### 2.1. Componente de Botão (Button.astro)
- Arquivo: `src/components/ui/Button.astro`.
- Deve aceitar `variants` (props) como `primary` (fundo sólido/neon com shadow) e `ghost`/`secondary` (fundo de vidro, apenas borda e desfoque).
- Deve ter interações de `hover` (ex: clarear o fundo, escalar levemente `transform: scale(1.05)`).
- Pode aceitar propriedades para links (`href`) ou ser botão de ação genérica (`<button>`).

### 2.2. Componente de Card (GlassCard.astro)
- Arquivo: `src/components/ui/GlassCard.astro`.
- Contêiner genérico reutilizável.
- Deve aplicar o estilo central do Glassmorphism: `backdrop-filter: blur(10px)`, fundo levemente translúcido (`rgba`), e borda superior/esquerda reflexiva.
- Aceitar atributos padrão de Astro (Slots) para renderizar filhos no interior do card.

### 2.3. Tipografia Modular (Heading.astro / Text.astro - opcional, se necessário)
- Para garantir consistência ou manter na semântica padrão, é possível utilizar estilos genéricos globais (`h1`, `h2`, `p`) ou componentes para manter a hierarquia bem definida.
- Requisito mínimo: Garantir que títulos grandes tenham estilo padronizado no CSS para o tema dark (cores brancas, subtítulos em cinza).

## 3. Definition of Done (DoD)
- [ ] `Button.astro` criado e suportando variação visual (primary, ghost).
- [ ] `GlassCard.astro` criado exibindo o estilo central de Glassmorphism.
- [ ] Os componentes estão estilizados via Vanilla CSS (tags `<style>` locais no `.astro` ou globais usando CSS Modules/Vars).
- [ ] Hover effects implementados nos componentes de interação (como botões).
