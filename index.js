// Importação da biblioteca
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');

async function run() {
  // Criar uma variável para armazenar o link da globo
  const url = "https://g1.globo.com/";
  
// Seletor Main
const MAINSELETOR = '.feed-post-body'  

// seletor para buscar a imagem
const IMAGEM = ".bstn-fd-picture-image";

// seletor para buscar o título
const TITULO = ".feed-post-link";

// seletor para buscar os subtítulos
const SUBTITULO = ".feed-post-header-chapeu";

// seletor para buscar o link para a matéria
const LINK = ".feed-post-link";

const RELACIONADA = ".bstn-relatedtext"

  const dados = await axios.get(url).then((res) => {
        let $ = cheerio.load(res.data);
        let body = [];

        // Pegando Imagem e inserindo no JSON
        $(MAINSELETOR).each((index, elem) => {
            body.push({
                image: $(elem).find(IMAGEM).attr('src'),
                title: $(elem).find(TITULO).text(),
                subtitle: $(elem).find(SUBTITULO).text(),
                link: $(elem).find(LINK).attr('href'),
                relationship: {
                  titulo: $(elem).find(RELACIONADA).text(),
                  link: $(elem).find(RELACIONADA).attr('href')
                }
            }) 
        })

        fs.writeFile('./body.json', JSON.stringify(body), (error) => {
            if (error) throw error;
        })

    })
    .catch((error) => {
      console.log(error);
    });

}

run();
