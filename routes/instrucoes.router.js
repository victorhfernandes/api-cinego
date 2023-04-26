module.exports = instrucoes => {
    const instrucoesController = require('../controllers/instrucoes.controller');

    const router = require("express").Router();

    router.get('/', instrucoesController.instrucoes);

    instrucoes.use('/api', router);
}