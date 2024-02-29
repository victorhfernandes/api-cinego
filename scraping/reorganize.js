exports.reorganizeJSON = (arrayCinema) => {
  let nomesFilmes = [],
    horariosFilme = [],
    sessoesFilme = [],
    datasFilme = [],
    cinemas = [],
    setDatasFilme,
    setNomesFilmes;

  for (const cinema of arrayCinema) {
    for (const emCartaz of cinema.emCartaz) {
      for (const filme of emCartaz.filmes) {
        nomesFilmes.push(filme.nome);
      }
      datasFilme.push(emCartaz.data);
    }
  }

  setNomesFilmes = new Set(nomesFilmes);
  setDatasFilme = new Set(datasFilme);

  for (const nomeFilme of setNomesFilmes) {
    for (const dataFilme of setDatasFilme) {
      for (const cinema of arrayCinema) {
        for (const emCartaz of cinema.emCartaz) {
          if (dataFilme === emCartaz.data) {
            for (const filme of emCartaz.filmes) {
              if (nomeFilme === filme.nome) {
                const objSessao = {
                  cinema: cinema.cinema,
                  sessoes: filme.sessoes,
                };
                horariosFilme.push(objSessao);
              }
            }
          }
        }
      }
      const objDatas = {
        data: dataFilme,
        dados: horariosFilme,
      };
      sessoesFilme.push(objDatas);
    }
    const objCinema = {
      filme: nomeFilme,
      dados: sessoesFilme,
    };

    cinemas.push(objCinema);
  }

  nomesFilmes = [];
  horariosFilme = [];
  sessoesFilme = [];
  datasFilme = [];

  return cinemas;
};
