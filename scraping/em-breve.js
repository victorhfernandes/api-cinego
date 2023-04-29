exports.getFilmesEmBreve = (sessoes) => { 

    let nomes = [];
    let diferenca = [];

    for (let i = 0; i < sessoes.length; i++){
        nomes[i] = sessoes[i].filmes.map(element => element.nome);
        if (i === 0){continue};
        //console.log(nomes[i-1]) ; console.log(nomes[i]);
        if (nomes[i-1].toString() === nomes[i].toString()) {
            //console.log('true');
        }
        else {
            //console.log('false');
            diferenca.push(diffArray(nomes[i-1], nomes[i]));
        }
    }
    return diferenca;
}

var diffArray = (ontem, hoje) => {
    var copyOntem = ontem.slice();
    var copyHoje = hoje.slice();

    for (let i = 0; i < copyOntem.length; i++){
        for (let j = 0; j < copyHoje.length; j++){
            if (copyOntem[i] === copyHoje[j]){
                copyHoje.splice(j, 1)//
            }
        }
    }
    return copyHoje
}
