# SPEC-001: Setup e Arquitetura Inicial

**Status:** [x] Pendente | [x] Em Progresso | [x] Implementada

> **⚠️ INSTRUÇÃO PARA AGENTES DE IA:**
> Durante a execução desta especificação, você deve consultar este arquivo. Ao finalizar a implementação técnica, é sua obrigação retornar a este documento, marcar as caixas do `Definition of Done` (DoD) que foram concluídas e atualizar o **Status** no topo para `[x] Implementada`.

## 1. Contexto e Objetivo
Esta especificação descreve os passos para inicializar o projeto base utilizando o Framework **Astro** (ADR-001), estabelecer a estrutura de pastas estendida (ADR-006) e inicializar as variáveis globais de CSS para o tema Glassmorphism (ADR-007).

## 2. Requisitos Técnicos

### 2.1. Setup do Astro
- O projeto deve ser inicializado com Astro usando `npm create astro@latest ./` no diretório raiz do repositório (considerando que não há arquivos conflitantes, caso haja, inicializar em subpasta e mover o conteúdo).
- Escolher a opção "Empty" ou "Minimal" se solicitado pelo assistente.
- Configurar o TypeScript se recomendado pelo assistente do Astro (embora seja Vanilla JS, TS para Astro components é o padrão recomendado).

### 2.2. Arquitetura de Pastas (ADR-006)
Criar ou garantir a existência das seguintes pastas dentro de `src/`:
- `src/components/ui/` (Para átomos: botões, inputs, cards genéricos).
- `src/components/sections/` (Para as seções maiores: Hero, Pricing, Social Proof).
- `src/layouts/` (Para o layout principal de páginas).
- `src/pages/` (Para as rotas, `index.astro`).
- `src/styles/` (Para os arquivos CSS globais).
- `src/assets/` (Para imagens/ícones locais otimizados pelo Astro).

### 2.3. Configuração do Tema Global (ADR-007)
- Criar o arquivo `src/styles/global.css`.
- Importar fontes (`Inter` ou `Outfit` via Google Fonts no CSS).
- Definir variáveis CSS no `:root`:
  - Cores: Background dark (`#0A0A0A`), text-primary (`#FFFFFF`), text-secondary (`#A3A3A3`).
  - Accent colors: `var(--color-primary-neon)` (`#00FF9D`) para botões e manchas de luz (Verde Neon / Mint).
  - Valores Glassmorphism: `var(--glass-bg)` (fundo translúcido), `var(--glass-border)` (borda fina), `var(--glass-blur)` (desfoque).
- Adicionar um CSS Reset básico.
- Garantir que o `global.css` esteja importado no arquivo de Layout principal (`src/layouts/Layout.astro`).

### 2.4. Importação e Conversão de Assets
- Copiar os arquivos `logo-horizontal.jpg`, `logo-vertical.jpg` e `perfil.PNG` do diretório `docs/referencias/logos-perfil/` para a pasta do projeto (ex: `public/images/` ou `src/assets/images/`).
- O agente responsável por esta migração DEVE converter essas imagens do formato original (JPG/PNG) para o formato moderno otimizado `.webp`, mantendo a transparência e qualidade.

## 3. Definition of Done (DoD)
- [x] O projeto Astro compila e roda perfeitamente via `npm run dev`.
- [x] O `package.json` está presente e as dependências instaladas.
- [x] A estrutura de pastas definida no requisito 2.2 existe e está correta.
- [x] O arquivo `global.css` contém as variáveis CSS nativas (ADR-007) e está sendo carregado no `Layout.astro`.
- [x] A página principal (`index.astro`) renderiza com sucesso as cores de fundo corretas estabelecidas pelo tema.
- [x] As imagens de logo e perfil foram copiadas de `docs/referencias/logos-perfil/` para os assets do projeto e convertidas para formato `.webp`.
