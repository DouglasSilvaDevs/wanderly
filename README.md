# Wanderly — Sua próxima história começa aqui

Landing page de viagens desenvolvida em **HTML, CSS e JavaScript**, em português, inspirada na referência visual enviada por Douglas. Combina um pôr do sol em Santorini, uma paleta escura com detalhes dourados, títulos manuscritos e cartões em estilo polaroid.

## Abrir o projeto

Abra `index.html` na pasta principal do ZIP. O site não precisa de instalação ou etapa de compilação. Todas as imagens, fontes e arquivos necessários estão incluídos.

Para trabalhar com um servidor local, você pode usar a extensão Live Server do VS Code ou, com Python instalado, executar na pasta do site:

```sh
python -m http.server 5500
```

Depois acesse `http://localhost:5500`. No repositório hospedado pelo Sites, os arquivos públicos ficam em `dist/`; no ZIP, eles estão diretamente na pasta `wanderly/`.

## O que está incluído

- Layout responsivo com adaptações para telas de até 360, 540, 800 e 1100 pixels.
- Menu de navegação para celular e cabeçalho que acompanha a rolagem.
- Imagem principal de Santorini e uma seção com estrada ao pôr do sol.
- Mapa ilustrativo com rotas animadas e quatro polaroids interativas.
- Detalhes de Santorini, Alpes Suíços, Bali e Capadócia em janelas acessíveis.
- Três diários editoriais, com histórias completas para leitura.
- Planejador com destino, data desejada, companhia, preferências e observações.
- Salvamento do plano no navegador, edição, exclusão e download em texto.
- Tratamento de armazenamento indisponível e dados locais inválidos.
- Navegação por teclado, link para pular ao conteúdo e respeito à preferência por animações reduzidas.
- Imagens e fontes locais, sem dependência de CDNs ou de bibliotecas JavaScript.

## Estrutura do ZIP

```text
wanderly/
├── index.html
├── styles.css
├── script.js
├── README.md
├── ASSET-PROMPTS.txt
└── assets/
    ├── santorini-hero.png
    ├── alpes.png
    ├── bali.png
    ├── capadocia.png
    ├── estrada.png
    ├── favicon.svg
    └── fonts/
```

## Personalização

**Textos e estrutura:** edite `index.html`. As cores, fontes, medidas e adaptações para celular estão em `styles.css`. As variáveis de cor ficam em `:root`.

**Destinos e diários:** edite o objeto `destinations` no começo de `script.js`. Para adicionar um destino, inclua uma entrada nesse objeto, uma polaroid em `index.html` e uma opção no seletor do planejador.

**Imagens:** os arquivos finais ficam em `assets/`. As fotografias foram geradas para este projeto; são ilustrações fotográficas e não registros documentais das localidades. As instruções utilizadas estão em `ASSET-PROMPTS.txt`.

**Fontes:** Editorial utiliza P052 Roman, da família URW Base 35; WanderScript utiliza Z003 Medium Italic; o texto de interface utiliza Carlito. As fontes foram preparadas em WOFF com caracteres latinos e acentuação em português. Créditos e informações de licença acompanham os arquivos na pasta `assets/fonts/`.

## Escopo do planejador

Este é um projeto demonstrativo de front-end. Os diários são textos editoriais, não depoimentos de clientes. O mapa é ilustrativo. O planejador organiza uma intenção de viagem, salva os dados apenas no navegador e permite exportar um arquivo de texto. Não há reservas, pagamentos, envio de contatos ou integração com agência de turismo.

Para usar como site de uma empresa, personalize a marca e os conteúdos e conecte o formulário ao serviço de atendimento desejado.

## Verificação

Foram conferidos sintaxe JavaScript, estrutura HTML, referências de arquivos, fontes locais e fluxos de interação por simulação de DOM. A revisão visual em navegador não estava disponível neste ambiente; não foi realizada uma captura de tela do site renderizado.

Desenvolvido para o portfólio de **Douglas Antonio**.
