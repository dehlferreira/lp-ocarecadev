# OCARECADEV — Protocolo de agentes

Pipeline instalado a partir de [agents-creator](https://github.com/dehlferreira/agents-creator). Este arquivo é a ponte do template com as regras deste repositório. Não cria documentos em `docs/superpowers/`.

## Estado do projeto

A landing **já está implementada**. Não trate a ausência de `docs/briefing/` ou `docs/design/` como projeto vazio. Não recrie PRD, ADR ou SPEC aceitos.

Mapa do que existe:

- `docs/prd/PRD-INDEX-001-landing-existente.md`
- `docs/adr/ARCH-001-landing-astro.md`
- `docs/specs/SPEC-INDEX-001-landing-existente.md`

Feature nova usa o próximo número sequencial (`PRD-007`, `ADR-012`, `SPEC-011`, …). Sustentação não exige PRD novo — ver `skills/maintenance-triage/`.

Referências vivas: `README.md` (tracking e variáveis), `guide.md` (CSS Scroll-Driven Animations, normativo), `docs/referencias/` (copy oficial e material de marca).

## Agentes

Definidos em `.claude/agents/`, com cópia em `.cursor/agents/` e `.codex/agents/`. Edite as três pastas em conjunto quando o arquivo existir nos três lugares. `image-creator-agent` é específico deste repo e não vem do template.

| Agente | Responsabilidade | Overlay deste repo | Escreve em |
| --- | --- | --- | --- |
| `project-orchestrator-agent` | escolhe o próximo agente; não substitui ninguém | este arquivo | handoff apenas |
| `briefing-agent` | síntese de fontes novas | — | `docs/briefing/` |
| `ux-design-documentation-agent` | UXD de entrega nova | — | `docs/design/` |
| `product-owner-prd-agent` | problema, escopo, aceite | `skills/product-documentation/` | `docs/prd/` |
| `teachlead-architecture-agent` | ADR, SPEC, triagem | `skills/technical-design/`, `skills/maintenance-triage/` | `docs/adr/`, `docs/specs/` |
| `development-implementation-agent` | implementação e testes | `skills/astro-implementation/` | `src/`, `test/` |
| `quality-assurance-validation-agent` | validação e DoD | `skills/landing-quality-assurance/` | DoD em `docs/specs/` |
| `image-creator-agent` | assets visuais | `skills/image-asset-production/` | `src/assets/images/`, `public/` |

Todos os handoffs entre agentes usam `skills/compact-agent-communication/`.

## Fluxo — feature ou mudança de escopo

1. **PO** (`product-owner-prd-agent`) esclarece problema, escopo, não escopo e aceite observável no PRD.
2. **Tech Lead** (`teachlead-architecture-agent`) avalia impacto; registra ADR se a decisão durar além da tarefa; produz/atualiza a SPEC com DoD.
3. **Dev** (`development-implementation-agent`) implementa somente SPEC aprovada, acrescenta testes proporcionais e informa evidências.
4. **QA** (`quality-assurance-validation-agent`) verifica critérios e DoD. **Só o QA marca item de DoD como aprovado.**
5. **Image** (`image-creator-agent`) entra por solicitação do PO/Tech Lead e entrega assets ao Dev; não integra UI sem SPEC.

`briefing-agent` e `ux-design-documentation-agent` entram só quando houver fonte nova (URL, documento, imagem) que ainda não esteja em PRD/copy. Não inventam briefing para o que já está no ar.

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

**Esta é a única enumeração dos invariantes do projeto.** Nenhuma skill reescreve esta lista; elas *anotam* cada item — o Dev diz como implementar, o QA diz como verificar, a SPEC declara quais toca. Cite sempre pelo número.

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

## Atualização do template

Origem: `.agents/agents-creator.env` (`SOURCE_URL`, `SOURCE_COMMIT`).

`bash .agents/check-agents-update.sh .` compara pastas inteiras com o template vazio. Neste repo isso **sempre** acusa diferença em `docs/` (artefatos do produto), `skills/` (overlay) e `*/agents/image-creator-agent.md`. Isso **não** é atualização.

Atualize a estrutura só quando o `SOURCE_COMMIT` remoto for diferente do instalado. Preserve arquivos que não existem no template. Não use `--force` sobre PRD, ADR, SPEC, overlay ou `image-creator-agent`.

## Dívida documental

Levantada em 2026-08-31. Todo documento que você tocar sai em conformidade; não é preciso mutirão.

- Nenhum PRD tem critérios de aceite nem fora de escopo explícitos (obrigatórios — ver `skills/product-documentation/SKILL.md`).
- ADR-001 a ADR-007 não têm `## Status` nem `## Data`.
- Só ADR-011 tem `## Relacionados`.
- PRD-006 mistura decisão de implementação (nomes de arquivo, ordem em `index.astro`) com requisito de produto. Ao atualizá-lo, mova o "como" para a SPEC.

## Handoff econômico e verificável

Todo handoff tem no máximo estes campos, com caminhos precisos: `Objetivo`, `Artefatos`, `Decisões`, `Mudanças`, `Aceite`, `Riscos/Bloqueios`, `Próximo responsável`. Não repita contexto já presente nos documentos; referencie `caminho:seção`.

Use `skills/compact-agent-communication/SKILL.md`. **Volte a texto normal e completo** para teste que falhou, decisão irreversível, privacidade/segurança/consentimento, instrução destrutiva, ambiguidade de negócio e qualquer texto lido pelo usuário humano.

## Skills do template

Usadas pelos agentes do `agents-creator`, nesta árvore:

`skills/adr-decision-writer/`, `skills/briefing-intake-analysis/`, `skills/briefing-synthesis-writer/`, `skills/dev-agent-handoff/`, `skills/experience-architecture-mapping/`, `skills/frontend-implementation-execution/`, `skills/implementation-source-intake/`, `skills/implementation-spec-writer/`, `skills/implementation-verification-report/`, `skills/interaction-animation-audit/`, `skills/interface-specification-writer/`, `skills/po-handoff-design-doc/`, `skills/prd-requirements-writer/`, `skills/prd-scope-planning/`, `skills/product-source-intake/`, `skills/qa-acceptance-report/`, `skills/qa-divergence-escalation/`, `skills/qa-implementation-audit/`, `skills/qa-source-intake/`, `skills/reference-source-capture/`, `skills/solution-architecture-definition/`, `skills/techlead-clarification-loop/`, `skills/techlead-prd-handoff/`, `skills/technical-source-intake/`, `skills/visual-system-extraction/`.
