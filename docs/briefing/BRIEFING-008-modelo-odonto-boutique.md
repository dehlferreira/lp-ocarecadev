# BRIEFING-008 - Modelo de nicho: odontologia boutique / lentes (demo Odonto Boutique)

## 1. Resumo Executivo

LP-demo em [https://brainartsolucoes.com.br/portfolio/dentista](https://brainartsolucoes.com.br/portfolio/dentista). Clínica odontológica **premium/tecnologia**: fundo `slate-50`/`white`, H1 light enorme “sorriso perfeito”, prova de previsibilidade 3D, tratamentos (lentes E.max, implante guiado, Invisalign®). Naming: carrossel **Odonto Boutique** + subtitle **Lentes de Contato**; nav “Odonto Boutique”. **Não é cliente real confirmado.** Title HTML genérico da agência. Única demo com avatares **Unsplash** nos depoimentos.

Marca Invisalign® aparece na copy — no template Express só usar com licença do cliente.

## 2. Fontes Analisadas

| Identificador | Tipo | Confiança | Limitações |
| --- | --- | --- | --- |
| `https://brainartsolucoes.com.br/portfolio/dentista` | Site-demo | Parcial | Header class não capturado no primeiro `<header>`; Unsplash preload |
| Card home | JS | Completa | title “Odonto Boutique”, subtitle “Lentes de Contato”, desc “Clínica Premium”, img `clinic_tech_1.jpg`, color amber |
| BRIEFING-001 / 003 | Showroom + overlap com clínica estética | Completa | Aurora também vende lentes — nichos se cruzam |

Data: **2026-09-01**. Template, não case.

## 3. Objetivo Percebido do Site

Agendar **avaliação VIP** de estética dental. Promessa: mockup 3D, materiais suíços, atendimento spa, sem medo de dentista.

## 4. Mapa de Páginas e Seções

IDs: `servicos`, `metodologia`, `depoimentos`, `faq`. Nav extraída: Odonto Boutique, Serviços, Diferenciais, Resultados, Dúvidas, Agendar.

Fluxo: Hero `pt-40 pb-20 min-h-screen bg-white` + métricas “+500 sorrisos” / “100% Previsibilidade” → H2 problema “esconder o sorriso nas fotos” → `#servicos` 01–03 (Lentes, Implantes Guiados, Invisalign®) + 4 diferenciais (Mockup 3D, Materiais Suíços, Atendimento Spa, Laboratório próprio) → `#depoimentos` → `#faq` → CTA “O seu novo sorriso começa aqui.”

Overlays: FAB + Cookie. Sem UrgencyToast. CTAs: botões “Agendar” / “Agendar Avaliação” / “WhatsApp”.

## 5. Estrutura de Conteúdo

**H1:** `A arte do sorriso perfeito.`

**Prova no hero:** `+500 sorrisos transformados`; `100% Previsibilidade` + linha “Veja o resultado exato…”.

**Agitação:** dentes amarelados/desalinhados; peso emocional.

**Tratamentos:** Lentes E.max; implantes digitais sem bisturi; Invisalign®.

**Boutique:** mockup em resina; porcelanas E.max; aromaterapia e anestesia computadorizada; lab digital.

**Depoimentos:** Amanda Resende (medo de dentista / lentes naturais); Dr. Ricardo Farias (mockup 3D). Avatares Unsplash (homens/mulher crop 100×100) — **stock**, não pacientes.

**FAQ:** dor das lentes; durabilidade 10–15 anos; 2–3 sessões.

**Pricing / form / endereço no extract de footer:** footer não veio no recorte Python (arquivo pode ter footer mínimo). Telefone da agência no FAB. **Não confirmado** endereço da clínica nesta página.

## 6. Sistema Visual

### 6.1 Cores

**Confirmado:** `bg-slate-50 text-slate-800`; hero `bg-white`; H1 `text-slate-900`; selection `bg-cyan-100 text-cyan-900` — acento **ciano/clínico** (único demo com cyan). Estrelas `text-yellow-400` nos depoimentos.

Clínica “spa tech”: branco, slate, ciano, não esmeralda da Aurora.

### 6.2 Tipografia

H1 `text-6xl md:text-8xl font-light tracking-tighter leading-[1.05]` — fashion-clínico, próximo do salão/Aurora em peso, maior em escala. Corpo sans.

### 6.3 Layout e Grid

Hero centralizado, muito padding-top (header provavelmente fixed). Tratamentos em lista numerada + grade de 4 diferenciais. Densidade média.

### 6.4 Imagens, Videos e Iconografia

- `/portfolio/dentista/clinic_tech_1.jpg` (carrossel)
- `dentist-clinic.jpg`, `dentist-smile.jpg`, `dentist-smile-3.jpg`
- Unsplash `photo-1544005313`, `1506794778202`, `1534528741775` (avatars)
- Sem vídeo no HTML

### 6.5 Componentes

Botões agendar. Cards de tratamento. FAQ (mais menções a “Dúvidas” que nas outras). Estrelas amarelas. FAB. Cookie.

## 7. Interações e Animações

Pouco motion próprio comparado a tattoo/pet. FAB global. Hover de cards **não extraído** com a mesma clareza. Reduced-motion pouco crítico aqui.

## 8. Responsividade

H1 `6xl/8xl` pode quebrar linha em 390px (`tracking-tighter` ajuda). `pt-40` + `min-h-screen` — hero longo no mobile. Overflow `overflow-hidden` no wrapper (cuidado com foco/clip).

## 9. Tom de Voz e Conteúdo

Empático (medo de dentista) + tech (3D, E.max, suíço). “Arquitetura dental”. Superlativos (“absurdamente natural”). Marca Invisalign®.

## 10. Padrões Reutilizáveis para o Designer

Receita Express odonto boutique:

1. Branco clínico + um acento frio (ciano) ou dourado suave — não roxo.
2. H1 light sobre “sorriso / arte”.
3. Número de casos + “previsibilidade” (se o cliente tiver mockup 3D de verdade).
4. Bloco de agitação emocional (fotos, esconder sorriso) — padrão Problem da OCARECADEV em versão nicho.
5. 3 tratamentos âncora (lentes como hero do card do carrossel).
6. 4 diferenciais de experiência (spa, lab, material).
7. FAQ de dor / sessões / durabilidade.
8. CTA avaliação; **sem** preço de lente no Express a menos que o cliente queira.

Carrossel: label “Odonto Boutique” ou “Lentes de contato”; não usar fotos Unsplash de “pacientes”.

**Relação com BRIEFING-003:** se OCARECADEV oferecer os dois templates, separar **estética corporal/facial** vs **sorriso**; a fonte misturou lentes na Aurora.

## 11. Pontos de Atenção

- Invisalign® e E.max são marcas; template genérico deve usar “alinhadores” / “porcelana” se não houver parceria.
- “+500” e “100% previsibilidade” são claims de demo.
- Avatares Unsplash passam por prova social falsa.
- Sobreposição de nicho com clínica estética.
- Header não classificado — comportamento sticky **Não confirmado**.

## 12. Limitações da Análise

Footer incompleto no parser. Sem screenshot do hero branco. Sem href dos botões Agendar. Sem Playwright para o fluxo WhatsApp.

## 13. Checklist para o Próximo Agente

- [ ] Nome e CRO do cliente real; fotos de sorriso **autorizadas**.
- [ ] Não usar Unsplash como “paciente”.
- [ ] WhatsApp env; CTA avaliação VIP só se o tom combinar.
- [ ] G1: um H1; contraste do H1 light em branco.
- [ ] G3: dimensões nas fotos da clínica; `svh` se hero full viewport.
- [ ] Desambiguar do template de clínica estética no PRD do carrossel.
