const { sessoesScraping } = require("../scraping/scraping");
const { getFilmeApiTMDB } = require("../scraping/fetch-api-tmdb");
const { nomeCinemas } = require("../scraping/cinemas");
const nmCinemas = [
  "Cinemark Praiamar",
  "Cine Flix Miramar",
  "Cine Roxy 5 Gonzaga",
  "Cine Roxy 6 Brisamar",
  "Cinesystem Litoral Plaza",
  "Cine Roxy 3 Parque Anilinas",
  "Cine 3 Ferry Boat's Plaza",
  "Cinemar Itanhaém",
];

exports.getSessoes = async (req, res, next) => {
  let getSessoes = await sessoesScraping(
    req.params.cinema == "baixada santista" ? nmCinemas : ""
  );
  return res.status(200).json(getSessoes);
};

exports.getFilme = async (req, res, next) => {
  let getFilme = await getFilmeApiTMDB(req.params.filme);
  return res.status(200).json(getFilme);
};

exports.getCinemas = async (req, res, next) => {
  let getCinemas = nomeCinemas();
  return res.status(200).json(getCinemas);
};
