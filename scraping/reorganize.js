exports.reorganizeJSON = (arrayCinema) => {
  let nomesFilmes = [],
    horariosFilme = [],
    sessoesFilme = [],
    datasFilme = [],
    cinemas = [],
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

  for (let nomeFilme of setNomesFilmes) {
    for (let dataFilme of setDatasFilme) {
      for (let cinema of arrayCinema) {
        for (let emCartaz of cinema.emCartaz) {
          if (dataFilme === emCartaz.data) {
            for (filme of emCartaz.filmes) {
              if (nomeFilme === filme.nome) {
                let objSessao = {
                  cinema: cinema.cinema,
                  sessoes: filme.sessoes,
                };
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

  return cinemas;
};
