# ADR-006: Arquitetura de Pastas e Organização do Projeto

## Contexto
Mesmo sendo um projeto focado apenas em Landing Pages estáticas criadas manualmente (sem gerador automatizado), a organização interna dos arquivos é fundamental para garantir a velocidade do desenvolvedor (DX) ao criar novas seções, componentes e reutilizar partes da interface. Precisamos definir uma estrutura de diretórios que seja escalável para landing pages de diferentes tamanhos (do Express à Máquina de Clientes) sem adicionar complexidade desnecessária.

## Opções Analisadas

1. **Padrão Astro Recomendado (src/pages, src/components, src/layouts)**
2. **Atomic Design (atoms, molecules, organisms, templates, pages)**
3. **Feature-Sliced Design (FSD)**
4. **Arquitetura Baseada em Módulos (Domain-Driven)**

## Decisão Aprovada: Padrão Astro Recomendado (Estendido)

### Motivos da Aprovação:
- **Simplicidade e Conveniência:** A estrutura nativa do Astro (`src/pages`, `src/layouts`, `src/components`, `src/assets`) é incrivelmente intuitiva. Adicionar uma subdivisão simples em `src/components` (como `ui` para botões e `sections` para partes grandes da landing page, como `Hero`, `Pricing`) atende 100% da necessidade de uma landing page.
- **Roteamento Baseado em Arquivos:** Ao usar a pasta `src/pages` nativa, não precisamos nos preocupar com configuração de rotas, tornando a criação de múltiplas landing pages ou páginas acessórias (como Termos de Uso ou Obrigado) muito mais rápida.
- **Baixo Overhead:** Evita "pensamento excessivo" sobre onde um arquivo deve ir, acelerando a produção das landing pages pelos desenvolvedores.

## Opções Reprovadas

### 1. Atomic Design
- **Motivo da Reprovação:** Exige uma categorização estrita entre átomos, moléculas e organismos, que na prática costuma gerar debates infinitos sobre onde um componente se encaixa (ex: "um card de preço é uma molécula ou organismo?"). Para landing pages focadas na conversão, essa abstração extrema retarda a velocidade de entrega e fragmenta demais o código HTML/CSS, prejudicando a manutenção rápida.

### 2. Feature-Sliced Design (FSD)
- **Motivo da Reprovação:** FSD é excelente para aplicações web complexas e painéis de administração, pois separa o código por domínios de negócio, "features" e "entities". Para uma landing page que tem apenas 1 domínio de negócio (vender o serviço) e pouca ou nenhuma lógica de estado, usar FSD seria uma superengenharia absurda que geraria pastas vazias e complexidade inútil.

### 3. Arquitetura Baseada em Módulos (Domain-Driven)
- **Motivo da Reprovação:** Organizar pastas por "módulo de domínio" (ex: módulo de checkout, módulo de usuário) não faz sentido em uma página estática de marketing. Não há domínios isolados, toda a página trabalha em conjunto de forma visual para convencer o visitante. A separação por componentes visuais e layouts (como no Astro Padrão) é muito mais eficaz aqui.
