# ADR-008: Estrutura de Funil PAS na Landing Page

## Status
Aceito

## Data
2026-06-11

## Contexto
A landing page OCARECADEV atualmente possui uma estrutura simplificada com 6 seções (Header, Hero, SocialProof, About, Pricing, Footer). A copy final de vendas aprovada segue a estrutura de funil **PAS (Problem → Agitation → Solution)**, amplamente utilizada em copywriting de alta conversão, e exige 6 novas seções para cobrir toda a jornada emocional do visitante antes de apresentar os planos.

## Decisão

Adotar a estrutura de funil PAS completa, implementando as seguintes seções na ordem:

```
Hero → Problema → Agitação → Solução → Como Funciona → Prova Social → Sobre → Pricing → FAQ → CTA Final
```

### Justificativa

1. **Conversão:** A estrutura PAS é comprovadamente mais eficaz para landing pages de vendas diretas com tráfego pago. O visitante precisa primeiro sentir a dor antes de ver a solução e os preços.
2. **Consistência com Copy:** A copy final foi escrita seguindo esta estrutura. Implementar apenas as seções existentes significaria desperdiçar a estratégia de vendas.
3. **SEO e Tempo na Página:** Mais conteúdo relevante = mais tempo na página = melhor sinal para Google Analytics e menor bounce rate.

## Alternativas Consideradas

### 1. Manter as 6 seções atuais e adaptar a copy
- **Prós:** Menos trabalho, menos componentes
- **Contras:** Perde-se a jornada emocional do PAS. A copy fica truncada e perde impacto.

### 2. Agrupar Problema + Agitação + Solução em uma única seção
- **Prós:** Menos scroll, página mais curta
- **Contras:** O impacto visual e emocional de cada etapa se perde quando agrupados. Melhor ter seções distintas com transições suaves (fade gradients).

## Consequências

### Positivas
- Funil de vendas completo e profissional
- Copy alinhada à estratégia de vendas
- Mais oportunidades de tracking (scroll depth por seção)

### Negativas
- 6 novos componentes Astro para codificar
- Página ficará mais longa (mitigado pelas scroll animations que mantêm engajamento)
- Possível necessidade de imagens geradas por IA para preencher seções visuais
