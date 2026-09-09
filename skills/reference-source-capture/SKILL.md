---
name: reference-source-capture
description: Use when an agent needs to inspect websites, documents, text, images, screenshots, or mixed reference sources before writing a project briefing.
---

# Reference Source Capture

## Objetivo

Capturar evidencias suficientes de uma ou mais fontes de referencia para que a analise posterior seja concreta, rastreavel e util para design.

## Fonte de Referencia

Uma fonte de referencia pode ser:

- URL de site, pagina, produto ou concorrente;
- texto colado diretamente na conversa;
- Documentos textuais, como Markdown, TXT, DOCX, PDF, Google Docs exportado, proposta, briefing comercial, notas de reuniao ou escopo;
- apresentacoes, decks, PDFs visuais ou materiais institucionais;
- Imagens e screenshots, como telas, wireframes, moodboards, logos, fotos, composicoes, anuncios, referencias de layout ou guias visuais;
- conjunto combinado de varias fontes.

## O Que Registrar

Para cada fonte, registre:

- identificador da fonte: URL, caminho do arquivo, nome anexado ou descricao curta quando nao houver caminho;
- tipo da fonte: site, texto, documento, imagem, screenshot, apresentacao ou misto;
- data da analise e contexto recebido;
- confianca da leitura: completa, parcial, visual, textual, inferida ou limitada;
- limitacoes tecnicas, como falta de browser, arquivo inacessivel, baixa resolucao, texto ilegivel ou paginas nao observadas.

## O Que Observar

### Sites

- Paginas, rotas ou secoes principais.
- Hierarquia de conteudo: hero, navegacao, secoes, chamadas, rodape, formularios, listas e cards.
- Componentes recorrentes: botoes, menus, cards, accordions, modais, sliders, tabs, badges e formularios.
- Assets visuais: imagens, videos, icones, logos, fundos, texturas e ilustracoes.
- Responsividade: diferencas claras entre desktop, tablet e mobile quando for possivel observar.
- Conteudo: tom de voz, mensagens principais, nomes de secoes, microcopy e CTAs.

### Documentos textuais

- Objetivo declarado, problema, oportunidade ou contexto de negocio.
- Publico-alvo, usuarios, stakeholders e cenarios citados.
- Requisitos, funcionalidades, restricoes, prioridades e criterios de sucesso.
- Termos de marca, linguagem, tom de voz, mensagens-chave e conteudo obrigatorio.
- Decisoes confirmadas, pontos em aberto, riscos e contradicoes.
- Qualquer referencia visual, tecnica ou de produto mencionada no texto.

### Imagens e screenshots

- Tipo da imagem: tela de produto, site, wireframe, moodboard, marca, foto, anuncio, layout editorial ou composicao.
- Hierarquia visual: foco principal, ordem de leitura, navegacao, blocos, CTAs e densidade.
- Layout: grid aparente, alinhamentos, espacamentos, proporcoes, bordas, elevacao e uso de areas vazias.
- Sistema visual: cores aproximadas, tipografia percebida, iconografia, estilo de imagem, textura e tratamento grafico.
- Estados ou interacoes sugeridas: menus, formularios, tabs, cards clicaveis, hover indicado, modal ou fluxo de tela.
- Conteudo visivel: titulos, labels, microcopy, mensagens e chamadas.
- Itens nao confirmados por causa de recorte, resolucao baixa ou ausencia de contexto.

## Metodo

Use o metodo mais forte disponivel para cada fonte:

- Com navegador ou Playwright: capture screenshots de desktop e mobile, navegue por secoes e teste interacoes visiveis.
- Com DevTools ou codigo do site: inspecione HTML, CSS, fontes, tokens, keyframes, scripts e assets.
- Com arquivos locais: leia o conteudo diretamente, extraia texto de PDFs ou documentos quando a ferramenta permitir, e registre paginas ou secoes analisadas.
- Com imagens: observe visualmente, leia textos visiveis quando possivel, descreva elementos concretos e marque inferencias.
- Com texto colado: trate o texto como fonte primaria, preserve decisoes explicitas e separe pedidos do usuario de inferencias do agente.
- Com acesso parcial: analise o que estiver disponivel e marque o restante como `Nao confirmado`.

## Evidencias Minimas

Antes de escrever o briefing, tenha pelo menos:

- lista das fontes recebidas e analisadas;
- tipo e confianca de cada fonte;
- principais blocos de conteudo ou elementos visuais observados;
- componentes, assets, requisitos ou mensagens relevantes;
- limitacoes da captura.

Se algum item nao puder ser visto, lido ou confirmado, registre essa ausencia no briefing.

## Erros Comuns

- Exigir URL quando o usuario ja forneceu documento, texto ou imagem suficiente.
- Tratar uma imagem recortada como fluxo completo confirmado.
- Transformar texto exploratorio em requisito confirmado.
- Ignorar fonte secundaria que muda a interpretacao da fonte principal.
- Descrever uma referencia generica em vez da fonte real analisada.
- Confundir inferencia com fato observado.
