# ADR-013: Arquitetura de Persuasão e Sequenciamento de Conversão V2

## Status
Aceito

## Data
2026-09-09

## Contexto
A versão anterior da landing page da OCARECADEV utilizava uma arquitetura inspirada em funil PAS (Problema, Agitação, Solução), separando o Problema e a Agitação em duas seções completas e independentes, postergando qualquer prova social para a segunda metade da página e focando a apresentação de planos em listas de funcionalidades técnicas e promessas absolutas de vendas.

Essa abordagem gerou fricção perceptível:
1. Redundância e peso cognitivo entre a seção de Problema e a de Agitação;
2. Falta de explicação do mecanismo de conversão da solução (por que a sequência funciona);
3. Dificuldade do visitante em identificar se a solução é para o estágio do negócio dele antes de navegar por metade da página;
4. Falta de ancoragem precoce de credibilidade antes da apresentação do processo e modelos.

## Decisão Aprovada: Arquitetura de Conversão Modular em 13 Seções

1. **Unificação de Problema e Agitação**:
   - Eliminar a seção independente `<Agitation />` do fluxo principal. Os argumentos de maior impacto e a visualização do gargalo são integrados diretamente à seção `<Problem />`.
2. **Nova Seção de Identificação Imediata**:
   - Criação de `<Identification />` logo após o `<Hero />`, permitindo auto-reconhecimento rápido do visitante em termos de modelo de negócio e canais de atração de clientes.
3. **Mecanismo da Solução em 4 Passos Conceituais**:
   - Redefinir `<Solution />` para expor o mecanismo lógico: *01 Clareza → 02 Interesse → 03 Confiança → 04 Ação*, com demonstração conceitual de fluxo e rotulagem explícita de ilustração para manter credibilidade absoluta.
4. **Camada Dupla de Prova Social**:
   - Inserção de `<QuickProof />` (teaser rápido com depoimento autêntico e link suave) antes do meio da página (`#como-funciona`), mantendo o bloco aprofundado `<SocialProof />` mais abaixo.
5. **Enquadramento de Planos por Momento/Necessidade**:
   - Renomear o plano 3 para "SITE PROFISSIONAL", adicionar resumo comparativo de fácil digestão e orientar a escolha pela dor que o cliente resolve.
6. **FAQ Exaustivo contra Objeções Reais**:
   - Estruturação de 9 perguntas e respostas objetivas via `<GlassCard as="details">` nativo e sincronização com JSON-LD `FAQPage`.

## Opções Analisadas
1. **Opção A (Aprovada)**: Arquitetura em 13 seções com unificação de problema/agitação, prova social em duas camadas e novo FAQ.
2. **Opção B (Reprovada)**: Manter a seção de Agitação isolada e apenas trocar os textos.
3. **Opção C (Reprovada)**: Mover todo o bloco de depoimentos completos para cima do Como Funciona.

## Opções Reprovadas
- **Opção B**: Reprovada por manter redundância que alongava a rolagem e gerava dispersão antes de apresentar a solução.
- **Opção C**: Reprovada por quebrar o fluxo de leitura: o bloco de mídia com múltiplos áudios e prints é denso demais para o topo da página; um teaser ágil (`<QuickProof />`) resolve a validação sem cansar o visitante.

## Consequências

### Positivas
- Redução substancial de atrito na jornada de decisão do visitante.
- Fortalecimento da credibilidade da marca sem promessas infladas.
- Preservação de todos os componentes de estilo, animações, acessibilidade e tracking (G1–G8).
- Zero novas dependências npm (G7).

### Negativas
- Necessidade de atualizar testes automatizados que verificavam a ordem anterior e o número antigo de perguntas do FAQ.

## Relacionados
- `PRD-009`: `docs/prd/PRD-009-v2-copy-e-arquitetura.md`
- `SPEC-013`: `docs/specs/SPEC-013-v2-copy-e-arquitetura.md`
- `AGENTS.md`: §Guardrails G1–G8
