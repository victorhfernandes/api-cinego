exports.instrucoes = (req, res) => {
    return res.status(200).json({
        "Para pesquisar sessões": 'api/sessoes/nome do cinema',
        "Para pesquisar um filme": 'api/filme/nome do filme',
        "As pesquisas podem ser feitas com espaço e o navegador colocará automaticamente o caracter especial (%20) no lugar": 0
    });
}