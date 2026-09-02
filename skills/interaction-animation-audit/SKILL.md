---
name: interaction-animation-audit
description: Use when an agent needs to document website interactions, motion behavior, animation patterns, and responsive states.
---

# Interaction Animation Audit

## Objetivo

Documentar como o site se comporta, nao apenas como ele parece parado.

## Observar

- Animacoes de entrada: fade, slide, reveal, scale, stagger, parallax, scroll-triggered.
- Transicoes de interface: hover, focus, active, menu open/close, accordions, tabs, carousels e modais.
- Movimento continuo: video, canvas, WebGL, marquee, background motion, loops.
- Scroll: sticky headers, pinned sections, snap, progress, mudanca de tema e lazy loading.
- Feedback: loading, skeletons, validacao, erro, sucesso e disabled.
- Responsividade comportamental: menus mobile, collapse de grids, mudanca de ordem de conteudo.

## Como Investigar

- Interaja com os principais controles.
- Role a pagina lentamente e depois rapidamente.
- Compare desktop e mobile se possivel.
- Inspecione CSS `transition`, `animation`, `@keyframes`, bibliotecas JS e atributos de animacao quando disponiveis.
- Se nao houver acesso tecnico, descreva o movimento observado em linguagem clara.

## Como Descrever Animacoes

Para cada padrao relevante, registre:

- elemento afetado;
- gatilho;
- tipo de movimento;
- duracao aproximada;
- easing percebido ou confirmado;
- direcao;
- atraso/stagger;
- impacto na experiencia;
- como reproduzir ou adaptar.

## Nivel de Confianca

Use:

- `confirmado` para propriedades vistas em CSS/JS ou comportamento testado;
- `provavel` para inferencia visual forte;
- `nao confirmado` quando a animacao nao pode ser testada.

## Erros Comuns

- Ignorar hover e estados de formulario.
- Descrever animacao como "suave" sem especificar movimento.
- Nao registrar o gatilho da animacao.
- Supor biblioteca sem evidencia.
