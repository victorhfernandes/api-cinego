const cheerio = require("cheerio");
const axios = require("axios");
const converter = require("./conversao-dados");
const { getFilmesEmBreve } = require("./em-breve");
const { getFilmeApiTMDB } = require("./fetch-api-tmdb");

exports.sessoesScraping = async (nomeCinemas) => {
  let arrayCinema = [];
  let cinemas = [];

  for (const nomeCinema of nomeCinemas) {
    do {
      var axiosResponse = await axios.request({
        method: "GET",
        url: "https://www.google.com/search?q=" + nomeCinema,
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
      emCartaz = [],
      linguagens = [],
      dataSessao,
      tecnologia,
      linguagem,
      nomeFilme,
      horario,
      i = 0,
      j = 0;

    for (const element of $(".WIDPrb")) {
      dataSessao = $(element).attr("data-date");
      dataSessao = converter.data(dataSessao, j);
      j++;
      let lr_c_fcb = $(element).find(".lr_c_fcb");
      for (const element of lr_c_fcb) {
        nomeFilme = $(element).attr("data-movie-name");
        let YHR1ce = $(element).find(".YHR1ce");
        for (const element of YHR1ce) {
          linguagens[i] = $(element).text();
          i++;
        }
        let lr_c_fcc = $(element).find(".lr_c_fcc");
        i = 0;
        for (const element of lr_c_fcc) {
          let lr_c_vn = $(element).find(".lr_c_vn");
          for (const element of lr_c_vn) {
            tecnologia = $(element).text();
            tecnologia = converter.tecnologia(tecnologia);
            linguagem = linguagens[i];
            linguagem = converter.linguagem(linguagem);
            i++;
          }
          let std = $(element).find(".std-ts");
          for (const element of std) {
            horario = $(element).text();
            horario = converter.horario(horario);
            arrayHorarios.push(horario);
          }

          const objSessao = {
            linguagem: linguagem,
            tecnologia: tecnologia,
            horarios: arrayHorarios,
          };

          arraySessoes.push(objSessao);

          arrayHorarios = [];
        }

        const objFilme = {
          nome: nomeFilme,
          sessoes: arraySessoes,
        };

        arrayFilmes.push(objFilme);

        arraySessoes = [];
        linguagens = [];
        i = 0;
      }

      const objData = {
        data: dataSessao,
        filmes: arrayFilmes,
      };

      emCartaz.push(objData);

      arrayFilmes = [];
    }

    const objemCartaz = {
      cinema: nomeCinema,
      emCartaz: emCartaz,
    };

    arrayCinema.push(objemCartaz);
  }

  //----------------------------------------
  let nomesFilmes = [],
    horariosFilme = [],
    sessoesFilme = [],
    datasFilme = [],
    setDatasFilme,
    setNomesFilmes;

  for (let cinema of arrayCinema) {
    for (let emCartaz of cinema.emCartaz) {
      for (filme of emCartaz.filmes) {
        nomesFilmes.push(filme.nome);
      }
      datasFilme.push(emCartaz.data);
    }
  }

  setNomesFilmes = new Set(nomesFilmes);
  setDatasFilme = new Set(datasFilme);

  let i = 0;

  //console.log("00000000000000000000");

  for (let nomeFilme of setNomesFilmes) {
    //console.log(nomeFilme);
    for (let dataFilme of setDatasFilme) {
      //console.log(dataFilme);
      for (let cinema of arrayCinema) {
        for (let emCartaz of cinema.emCartaz) {
          if (dataFilme === emCartaz.data) {
            for (filme of emCartaz.filmes) {
              if (nomeFilme === filme.nome) {
                let objSessao = {
                  cinema: cinema.cinema,
                  sessoes: filme.sessoes,
                };
                console.log(i);
                //console.log(i);
                //console.log(emCartaz.data);
                //console.log(cinema.cinema);
                i++;
                //console.log(filme.sessoes);
                //console.log("---------------------------");
                horariosFilme.push(objSessao);
              }
            }
          }
        }
      }
      let objDatas = {
        data: dataFilme,
        dados: horariosFilme,
      };
      sessoesFilme.push(objDatas);
    }
    let objCinema = {
      filme: nomeFilme,
      dados: sessoesFilme,
    };

    cinemas.push(objCinema);
  }

  //-----------------------------------------

  //return arrayCinema;
  return cinemas;
};

//sessoesScraping('Cinemark Praiamar');
