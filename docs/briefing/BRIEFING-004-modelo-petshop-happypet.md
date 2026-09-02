# BRIEFING-004 - Modelo de nicho: pet shop / clínica vet (demo HappyPet / PetCare)

## 1. Resumo Executivo

LP-demo em [https://brainartsolucoes.com.br/portfolio/petshop](https://brainartsolucoes.com.br/portfolio/petshop). Única das sete com visual **lúdico e colorido**: roxo + laranja, header com `border-b-4`, H1 afetivo com ponto de exclamação, serviços com emoji. **Não é cliente real confirmado.**

Naming: carrossel **HappyPet** / “Clínica Veterinária”; página e footer **PetCare** / Pet Care. Title HTML é o genérico da agência.

## 2. Fontes Analisadas

| Identificador | Tipo | Confiança | Limitações |
| --- | --- | --- | --- |
| `https://brainartsolucoes.com.br/portfolio/petshop` | Site-demo | Parcial | Sem browser; HTML menor (~52 KB) |
| Card home | JS | Completa | img `golden_retriever.jpg`, color amber |
| BRIEFING-001 | Showroom | Completa | |

Data: **2026-09-01**. Template, não case.

## 3. Objetivo Percebido do Site

Levar tutores a **agendar visita** (banho, consulta, vacina). Promessa: pet como família, 24h, cat-friendly.

## 4. Mapa de Páginas e Seções

IDs: `inicio`, `servicos`, `diferenciais`, `depoimentos`. Header `sticky` `bg-purple-700 text-white border-b-4 border-orange-500`. Nav: Início, Serviços, Diferenciais, Depoimentos. Sem id `faq` — FAQ existe como H2 “Dúvidas Frequentes”.

Fluxo: Header → Hero `from-purple-600 to-purple-800` `rounded-b-[3rem]` → `#servicos` (4 cards emoji) → `#diferenciais` (3) → `#depoimentos` (2 histórias) → FAQ → CTA “patas abertas” → Footer.

Overlays: FAB + Cookie. Sem UrgencyToast. Sem `#agendar` no HTML (**Confirmado** `has #agendar False`); CTAs são `<button>` “Agendar” / “Agende uma Visita” / “Falar com Atendimento” — destino **Não confirmado** (JS no chunk de página).

## 5. Estrutura de Conteúdo

**H1:** `Cuidado com Amor para o seu Melhor Amigo!`

**Lead:** saúde, carinho e alegria num só lugar.

**Serviços:** Vacinas e Prevenção; Banho & Tosa Relaxante; Clínica Veterinária 24h; Petshop Premium (petiscos/brinquedos). Emojis no H3.

**Por que PetCare:** Cat-Friendly; Time Apaixonado; Transparência Total.

**Depoimentos:** Mariana Silva — Thor Golden Retriever (banho); Rafael Costa — Luna SRD (emergência). Cargo no formato “Mãe do / Pai da”.

**FAQ:** silvestres; agendar tosa 48h; tutor na consulta vs vidro no banho; filhote sem vacina completa.

**Footer:** Rua das Patinhas, 123 (propositalmente fictício); `ola@petcare.com`; IG/FB/TT.

**Pricing / form:** ausentes.

## 6. Sistema Visual

### 6.1 Cores

**Confirmado:** `bg-purple-50 text-purple-900`; hero e header **purple-600/700/800**; CTA **orange-500/600** com sombra “chunky” `shadow-[0_8px_0_rgb(194,65,12)]` (efeito botão físico). Selection não destacada como nas outras. FAB `#25D366` (terceira cor).

Paleta de nicho: roxo + laranja + fundo lilás claro. Distante do dark da agência.

### 6.2 Tipografia

H1 `text-5xl md:text-6xl font-black leading-tight drop-shadow-md`. Tom amigável, não luxury light. Emoji nos títulos de serviço.

### 6.3 Layout e Grid

Hero com `rounded-b-[3rem] shadow-2xl mb-12` — “bolha” infantil. Botões `rounded-3xl`. Cards provavelmente 2×2 no desktop (**inferido**).

### 6.4 Imagens, Videos e Iconografia

- `/portfolio/petshop/golden_retriever.jpg` (carrossel)
- `/portfolio/petshop/cute_cat.jpg`
- Emoji como ícone de serviço (💉🛁🏥🧸)
- Sem Unsplash, sem vídeo

### 6.5 Componentes

Header colorido sólido (não glass). Botão laranja 3D. FAB global. Botões em vez de links em alguns CTAs.

## 7. Interações e Animações

Sombra do botão laranja reduz no hover (`0_8px_0` → `0_4px_0`) — **Confirmado** classe. FAB pulse global. Reduced-motion não específico.

## 8. Responsividade

Hero `py-20 px-6`. H1 `5xl/6xl`. Header sticky com borda 4px (ok em mobile). Arredondamento grande do hero pode gerar gap visual — **não confirmado** overflow em 390px.

## 9. Tom de Voz e Conteúdo

Afetivo, tutores como “mãe/pai”, “rabinho abanando”, “patas abertas”. Informal. Endereço “Rua das Patinhas” deixa claro o caráter de **demo**.

## 10. Padrões Reutilizáveis para o Designer

Receita Express pet:

1. Paleta alta saturação (não dark luxury).
2. H1 emocional + exclusão de jargão clínico no hero.
3. 4 serviços cobrindo vet + estética + varejo + 24h (o Express pode **reduzir** para 3 se o cliente for só petshop).
4. Prova social com **nome do animal e raça**.
5. FAQ operacional (vacina, silvestre, acompanhar banho).
6. CTA “agendar visita”, não “orçamento de site”.
7. Fotos reais de cão/gato (golden no card da fonte).

Carrossel OCARECADEV: label “Petshop” ou “Clínica veterinária”, marca nossa, não HappyPet/PetCare.

## 11. Pontos de Atenção

- HappyPet vs PetCare.
- Botões sem href visível — risco de CTA morto se JS falhar (G4: preferir `<a href="https://wa.me/...">`).
- Emoji em H3: ok visualmente; leitores de tela leem os símbolos (G1: avaliar).
- 24h é claim forte; no template Express não inventar plantão se o cliente não tiver.

## 12. Limitações da Análise

Sem JS da página para o click dos botões. Sem screenshot do hero roxo. FAQ sem `id` para o nav.

## 13. Checklist para o Próximo Agente

- [ ] Unificar nome do modelo.
- [ ] CTAs como links WhatsApp (env), não botões opacos.
- [ ] Fotos próprias (cão + gato).
- [ ] Decidir se o Express inclui vet 24h ou só petshop.
- [ ] Contraste purple-700/branco no header (provavelmente ok; verificar orange sobre purple).
