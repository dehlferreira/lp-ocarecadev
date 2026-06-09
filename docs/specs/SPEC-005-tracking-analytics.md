# SPEC-005: Integração de Tracking (Partytown & Analytics)

**Status:** [x] Pendente | [x] Em Progresso | [x] Implementada

> **⚠️ INSTRUÇÃO PARA AGENTES DE IA:**
> Durante a execução desta especificação, você deve consultar este arquivo. Ao finalizar a implementação técnica, é sua obrigação retornar a este documento, marcar as caixas do `Definition of Done` (DoD) que foram concluídas e atualizar o **Status** no topo para `[x] Implementada`.

## 1. Contexto e Objetivo
Para que a OCARECADEV analise suas campanhas de publicidade, a landing page precisa integrar as Tags de GA4, Google Ads e o Meta Pixel. Segundo a ADR-005, o carregamento desses scripts será orquestrado pelo **Partytown** para garantir que a Main Thread não seja bloqueada, permitindo a manutenção da pontuação 100 no Google Lighthouse (PRD-005).

## 2. Requisitos Técnicos

### 2.1. Instalação e Configuração do Partytown
- Adicionar o pacote `@astrojs/partytown` seguindo a documentação oficial do Astro.
- Configurar a integração no arquivo `astro.config.mjs`.

### 2.2. Inserção de Scripts no Head
- No componente `src/layouts/Layout.astro` (no bloco `<head>`), injetar os scripts padrão do Google Analytics e do Meta Pixel usando a prop mágica `type="text/partytown"` providenciada pelo módulo.
- Os IDs do GA4 e Pixel não devem estar hardcoded (chumbados) no código HTML. Eles devem vir de Variáveis de Ambiente (`.env`).
  - `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` (ou sua versão padronizada para Astro, como `PUBLIC_GA_ID`).
  - `PUBLIC_META_PIXEL_ID`.

### 2.3. Configuração do Botão do WhatsApp (Evento de Conversão)
- Ajustar os botões de CTA primários da landing page (`Quero minha máquina` ou `Falar com Consultor`).
- O clique no botão deve despachar um evento de Conversão (Lead) para o `fbq('track', 'Lead')` e para o GA (via função customizada atrelada aos scripts em Partytown) antes ou junto de abrir a janela/tab do WhatsApp.
- O número do WhatsApp deve ser puxado da variável de ambiente correspondente (`WHATSAPP_NUMBER` e `WHATSAPP_MESSAGE_DEFAULT`).

## 3. Definition of Done (DoD)
- [x] Partytown configurado e habilitado no `astro.config.mjs`.
- [x] Scripts do GA4 e Meta Pixel implementados no cabeçalho com o tipo `text/partytown`.
- [x] As chaves (IDs) foram parametrizadas via variáveis de ambiente.
- [x] Os cliques nos CTAs encaminham para o WhatsApp passando as mensagens padrão e tentam enviar o evento de Lead.
- [x] Auditoria do Lighthouse mostra que os scripts de terceiros não estão estrangulando o TBT (Total Blocking Time).
