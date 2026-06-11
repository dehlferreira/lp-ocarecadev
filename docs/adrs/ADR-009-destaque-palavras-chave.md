# ADR-009: Palavras-Chave com Destaque Visual (Green Highlight)

## Status
Aceito

## Data
2026-06-11

## Contexto
A diretriz de copy final especifica que palavras estratégicas (*clientes*, *vender*, *resultado*, *leads*) devem ser **sempre destacadas em verde** seguindo a identidade visual da marca OCARECADEV (cor accent `#00FF9D`).

## Decisão

Utilizar a classe CSS existente `.text-neon` (que já aplica `color: var(--color-primary-neon)`) para destacar essas palavras inline em todas as seções. Não será criada uma classe nova — reutilizamos o token de design já existente no sistema.

### Implementação
```html
<span class="text-neon">clientes</span>
```

Para destaques maiores (headlines), usar `.text-gradient` que já aplica o gradiente verde da marca:
```html
<span class="text-gradient">Máquina de Clientes</span>
```

## Justificativa
- Reutiliza tokens existentes sem criar dívida técnica
- Mantém consistência visual com o resto do design system
- Facilita busca e manutenção (grep por `text-neon` mostra todos os destaques)

## Consequências
- Não há impacto em performance
- Os destaques devem ser aplicados com parcimônia para não poluir visualmente
