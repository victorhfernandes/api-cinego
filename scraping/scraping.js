const cheerio = require("cheerio");
const axios = require("axios");
const converter = require("./conversao-dados");
const { getFilmesEmBreve } = require("./em-breve");
const { getFilmeApiTMDB } = require("./fetch-api-tmdb");

exports.sessoesScraping = async (nmCinemas) => {
  let cinemas = [];

  for (const nmCinema of nmCinemas) {
    do {
      var axiosResponse = await axios.request({
        method: "GET",
        url: "https://www.google.com/search?q=" + nmCinema,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
        },
      });
    } while (axiosResponse.length === 0);

    const $ = cheerio.load(axiosResponse.data);

    let arrayFilmes = [],
      arraySessoes = [],
      arrayHorarios = [],
      sessoesCinema = [],
      linguagens = [],
      dataSessao,
      tecnologia,
      linguagem,
      nomeFilme,
      TMDB,
      horario,
      i = 0,
      j = 0;

    for (const element of $(".WIDPrb")) {
      //:first
      dataSessao = $(element).attr("data-date");
      dataSessao = converter.data(dataSessao, j);
      //console.log(dataSessao);
      j++;
      let lr_c_fcb = $(element).find(".lr_c_fcb"); //:eq(1)
      for (const element of lr_c_fcb) {
        nomeFilme = $(element).attr("data-movie-name");
        //---------------------->TMDB = getFilmeApiTMDB(nomeFilme);
        //console.log(nomeFilme);
        let YHR1ce = $(element).find(".YHR1ce");
        for (const element of YHR1ce) {
          linguagens[i] = $(element).text();
          //console.log(linguagens[i]);
          i++;
        }
        let lr_c_fcc = $(element).find(".lr_c_fcc");
        i = 0;
        for (const element of lr_c_fcc) {
          let lr_c_vn = $(element).find(".lr_c_vn");
          for (const element of lr_c_vn) {
            tecnologia = $(element).text();
            tecnologia = converter.tecnologia(tecnologia);
            //console.log(tecnologia);
            linguagem = linguagens[i];
            linguagem = converter.linguagem(linguagem);
            //console.log(linguagem + ' ' + i);
            i++;
          }
          let std = $(element).find(".std-ts");
          for (const element of std) {
            horario = $(element).text();
            horario = converter.horario(horario);
            //console.log(horario);
            arrayHorarios.push(horario);
          }

          const objSessao = {
            linguagem: linguagem,
            tecnologia: tecnologia,
            horarios: arrayHorarios,
          };

          arraySessoes.push(objSessao);

          //console.log(arrayHorarios);
          arrayHorarios = [];
        }
        //console.log(arraySessoes);

        TMDB = "vazio";
        //---------------------->TMDB = await getFilmeApiTMDB(nomeFilme);
        /*if (TMDB !== "vazio") {
        nomeFilme = TMDB.nome;
      } else {
        //console.log(TMDB);
      }*/
        const objFilme = {
          nome: nomeFilme,
          poster: TMDB.poster,
          sessoes: arraySessoes,
        };

        arrayFilmes.push(objFilme);

        arraySessoes = [];
        linguagens = [];
        i = 0;
      }
      //console.log(arrayFilmes);

      const objData = {
        data: dataSessao,
        filmes: arrayFilmes,
      };

      sessoesCinema.push(objData);

      arrayFilmes = [];
    }
    /*const diff = getFilmesEmBreve(sessoesCinema);

    for (let filme of diff) {
      if (filme.length === 0) {
        continue;
      }
      const objNome = {
        nome: filme.toString(),
      };
      arrayEmBreve.push(objNome);
    }
    const objEmBreve = {
      emBreve: arrayEmBreve,
    };
    sessoesCinema.push(objEmBreve);*/

    const objSessoesCinema = {
      cinema: nmCinema,
      sessoes: sessoesCinema,
    };

    cinemas.push(objSessoesCinema);
  }
  //-----------------------------------------
  let nome = [];
  let sessoes = [];
  let caralho = [];

  for (let cinema of cinemas) {
    for (let sessão of cinema.sessoes) {
      for (filme of sessão.filmes) {
        nome.push(filme.nome);
      }
    }
  }

  let nomeSet = new Set(nome);

  for (let nome of nomeSet) {
    for (let cinema of cinemas) {
      for (let sessão of cinema.sessoes) {
        for (filme of sessão.filmes) {
          if (nome === filme.nome) {
            let objSessao = {
              data: sessão.data,
              cinema: cinema.cinema,
              sessoes: filme.sessoes,
            };

            sessoes.push(objSessao);

            let objCaralho = {
              nome: filme.nome,
              sessoes: sessoes,
            };

            caralho.push(objCaralho);
          }
        }
      }
    }
  }

  return caralho;
};

//sessoesScraping('Cinemark Praiamar');
