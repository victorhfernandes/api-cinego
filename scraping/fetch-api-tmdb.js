require('dotenv').config();
const converter = require('./conversao-dados');

const apiKey = process.env.TMDB_API_KEY;
var dsSinopse,
    imPoster,
    nmDirecao,
    nmElenco,
    nmPais,
    qtDuracao,
    dsClassificacaoEtaria,
    nmFilme,
    nmOriginal,
    dtLancamento,
    nmGenero,
    movieID;


exports.getFilmeApiTMDB = async (nmf) => {

    try {
        const resNm = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${nmf}&language=pt-BR`);
        const jsonNm = await resNm.json();
        movieID = jsonNm.results[0].id;
    } catch (e) {
        console.error(e)
    }

    try {
        const resId = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&append_to_response=credits,release_dates&language=pt-BR`);
        const jsonId = await resId.json();
        dsSinopse = jsonId.overview;
        imPoster = 'https://image.tmdb.org/t/p/w500' + jsonId.poster_path;
        nmOriginal = jsonId.original_title;
        nmFilme = jsonId.title;
        dtLancamento = jsonId.release_date;
        qtDuracao = jsonId.runtime;
        let elenco = jsonId.credits.cast;
        for (let i = 0; i < elenco.length; i++) {
            elenco[i] = elenco[i].name;
        }
        nmElenco = elenco.join(', ');
        nmElenco = nmElenco.split(', ', 10);
        nmElenco = nmElenco.join(', ');
        let direcao = jsonId.credits.crew.filter(element => (element.job === 'Director'));
        for (let i = 0; i < direcao.length; i++) {
            direcao[i] = direcao[i].name;
        }
        nmDirecao = direcao.join(', ');
        let pais = jsonId.production_countries.map(element => (element.iso_3166_1));
        for (let i = 0; i < pais.length; i++) {
            pais[i] = converter.pais(pais[i]);
        }
        nmPais = pais.join(', ');
        let genero = jsonId.genres.map(element => (element.name));
        nmGenero = genero.join(', ');
        let classificacaoEtaria = jsonId.release_dates.results.filter(element => (element.iso_3166_1 === 'BR'));
        try {
            dsClassificacaoEtaria = classificacaoEtaria[0].release_dates[0].certification;
        } catch {
            dsClassificacaoEtaria = ''
        }

        const objFilme = {
            nome: nmFilme,
            sinopse: dsSinopse,
            poster: imPoster,
            direcao: nmDirecao,
            elenco: nmElenco,
            pais: nmPais,
            duracao: qtDuracao,
            classificacao_etaria: dsClassificacaoEtaria,
            nomeOriginal: nmOriginal,
            dataLancamento: dtLancamento,
            genero: nmGenero,
        }

        return objFilme;
    } catch (e) {
        console.error(e)
    }
}

/*var nmf = 'A Morte do Demônio: A Ascensão';
getFilmeApiTMDB(nmf);*/