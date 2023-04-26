const { sessoesScraping } = require('../scraping/scraping')
const { getFilmeApiTMDB } = require('../scraping/fetch-api-tmdb')

exports.getSessoes = async (req, res, next) => {
  let getSessoes = await sessoesScraping(req.params.cinema);
  return res.status(200).json(getSessoes);
}

exports.getFilme = async (req, res, next) => {
  let getFilme = await getFilmeApiTMDB(req.params.filme);
  return res.status(200).json(getFilme);
}