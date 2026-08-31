# OCARECADEV — Protocolo de agentes

## Fonte de verdade

Este repositório usa exclusivamente:

- `docs/prds/` — contexto de negócio, requisitos e critérios de aceite;
- `docs/adrs/` — decisões técnicas duradouras;
- `docs/specs/` — instruções técnicas implementáveis e Definition of Done (DoD).

Não criar documentos em `docs/superpowers/`. Antes de propor ou executar uma mudança, ler os artefatos relacionados e preservar decisões aceitas. Criar documento novo somente quando não for alteração pontual de um artefato existente. Nomes novos usam o próximo identificador sequencial (`PRD-NNN`, `ADR-NNN`, `SPEC-NNN`) e slug em kebab-case.

Referências vivas: `README.md` (tracking e variáveis), `guide.md` (CSS Scroll-Driven Animations, normativo), `docs/referencias/` (copy oficial e material de marca).

## Agentes

Definidos em `.claude/agents/`. `.agents/agents`, `.codex/agents` e `.cursor/agents` são **symlinks** para essa pasta — edite apenas a origem. As skills vivem em `skills/`, com symlink `.claude/skills` (e equivalentes) apontando para lá.

| Agente             | Responsabilidade                              | Skill principal                                          | Escreve em                  |
| ------------------ | --------------------------------------------- | -------------------------------------------------------- | --------------------------- |
| `product-owner`    | problema, escopo, critério de aceite          | `skills/product-documentation/`                          | `docs/prds/`                |
| `tech-lead`        | decisão técnica, SPEC, triagem de sustentação | `skills/technical-design/`, `skills/maintenance-triage/` | `docs/adrs/`, `docs/specs/` |
| `astro-developer`  | implementação e testes                        | `skills/astro-implementation/`                           | `src/`, `test/`             |
| `qa-engineer`      | validação e aprovação da DoD                  | `skills/landing-quality-assurance/`                      | DoD em `docs/specs/`        |
| `image-specialist` | assets visuais                                | `skills/image-asset-production/`                         | `src/assets/images/`        |

Todos usam `skills/compact-agent-communication/` para o handoff.

## Fluxo — feature ou mudança de escopo

1. **PO** esclarece problema, escopo, não escopo e aceite observável no PRD.
2. **Tech Lead** avalia impacto; registra ADR se a decisão durar além da tarefa; produz/atualiza a SPEC com DoD.
3. **Dev** implementa somente SPEC aprovada, acrescenta testes proporcionais e informa evidências.
4. **QA** verifica critérios e DoD. **Só o QA marca item de DoD como aprovado.**
5. **Image Specialist** entra por solicitação do PO/Tech Lead e entrega assets ao Dev; não integra UI sem SPEC.

## Fluxo — sustentação

Bug, regressão, typo, link quebrado, asset mal otimizado, dívida ou bump de dependência **não exigem PRD novo**.

1. **Tech Lead** triage com `skills/maintenance-triage/SKILL.md`: a mudança altera comportamento já aprovado em PRD/DoD?
   - **Não** → registra a correção na SPEC que já é dona do comportamento (ou cria SPEC nova se nenhuma cobrir), sem PRD.
   - **Sim** → volta ao fluxo completo, começando pelo PO.
2. **Dev** reproduz antes de corrigir e implementa.
3. **QA** valida. A trilha leve encurta a documentação, nunca a verificação.

Não pular etapas sem registrar no handoff por que o artefato não é necessário. Não fazer commits, deploys ou mudanças externas sem autorização explícita.

## Contexto técnico não negociável

Landing estática em Astro 6. Manter a arquitetura em `src/components/sections/`, `src/components/ui/`, `src/layouts/`, `src/pages/`, `src/scripts/`, `src/styles/` e `src/assets/images/`.

### Guardrails G1–G8 — enumeração canônica

**Esta é a única enumeração dos invariantes do projeto.** Nenhuma skill reescreve esta lista; elas *anotam* cada item — o Dev diz como implementar, o QA diz como verificar, a SPEC declara quais toca. Cite sempre pelo número, para que Tech Lead, Dev e QA falem do mesmo requisito.

- **G1 — Acessibilidade.** HTML semântico, um `<h1>`, hierarquia de headings sem pulo, landmarks, `alt` em imagem informativa, navegação por teclado, foco visível, contraste adequado.
- **G2 — Movimento.** `prefers-reduced-motion` desliga a animação sem esconder conteúdo. Nada preso em `opacity: 0`.
- **G3 — Estabilidade de layout.** Sem layout shift: dimensão explícita em imagem e mídia, `100svh` no lugar de `100vh` onde houver barra de endereço móvel. Sem overflow horizontal em 390px, 768px e 1200px+.
- **G4 — Performance.** Astro estático por padrão, CSS vanilla, JS só quando não houver equivalente em CSS, nenhum script bloqueante. LCP preservado.
- **G5 — SEO.** `<title>`, meta description, canonical, OG, `/robots.txt` e `/sitemap.xml` respondendo no build.
- **G6 — Privacidade e consentimento.** Nada dispara antes do consentimento explícito; a revogação para de disparar. Só placeholders `PUBLIC_*` via env — nunca ID real, label real, segredo ou PII em código, teste ou relatório.
- **G7 — Dependências.** Nenhuma dependência, framework cliente ou telemetria nova sem ADR/SPEC.
- **G8 — Git e entrega.** Nenhum commit, push ou deploy sem autorização explícita do usuário.

Quem anota: `skills/astro-implementation/SKILL.md` (implementação), `skills/landing-quality-assurance/SKILL.md` (verificação), `skills/technical-design/SKILL.md` (declaração na SPEC). A consistência entre os três é travada por `test/agent-protocol.test.mjs`.

## Verificação

O **Dev** roda o atalho, que falha rápido:

```bash
npm run verify   # astro check && astro build && node --test test/*.test.mjs
```

O **QA** roda os três separados, porque `verify` para no primeiro erro e a DoD exige evidência de cada comando:

```bash
npm run check
npm run build
npm test
```

Nenhuma entrega é reportada como pronta sem a saída real. O critério é **0 falhas** — não trate a contagem total de testes como número esperado, ela cresce a cada contrato novo.

## Dívida documental

Levantada em 2026-08-31. Todo documento que você tocar sai em conformidade; não é preciso mutirão.

- Nenhum PRD tem `✅ Critérios de Aceite` nem `🚫 Fora de Escopo` (obrigatórios — ver `skills/product-documentation/SKILL.md`).
- ADR-001 a ADR-007 não têm `## Status` nem `## Data`.
- Só ADR-011 tem `## Relacionados`.
- PRD-006 mistura decisão de implementação (nomes de arquivo, ordem em `index.astro`) com requisito de produto. Ao atualizá-lo, mova o "como" para a SPEC.

## Handoff econômico e verificável

Todo handoff tem no máximo estes campos, com caminhos precisos: `Objetivo`, `Artefatos`, `Decisões`, `Mudanças`, `Aceite`, `Riscos/Bloqueios`, `Próximo responsável`. Não repita contexto já presente nos documentos; referencie `caminho:seção`.

Use `skills/compact-agent-communication/SKILL.md`. **Volte a texto normal e completo** para teste que falhou, decisão irreversível, privacidade/segurança/consentimento, instrução destrutiva, ambiguidade de negócio e qualquer texto lido pelo usuário humano.
