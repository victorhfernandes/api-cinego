module.exports = scraping => {
    const scrapingController = require('../controllers/scraping.controller');

    const router = require("express").Router();

    router.get('/sessoes/:cinema', scrapingController.getSessoes);
    router.get('/filme/:filme', scrapingController.getFilme);
    router.get('/cinemas', scrapingController.getCinemas);


    scraping.use('/api', router);
}