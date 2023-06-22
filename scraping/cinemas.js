exports.nomeCinemas = () => {
    const cinemas = [
    "Cinemark Praiamar",
    "Cine Flix Miramar", 
    "Cine Roxy 5 Gonzaga", 
    "Cine Roxy 6 Brisamar", 
    "Cine Roxy 3 Parque Anilinas", 
    "Cine 3 Ferry Boat's Plaza",
    "Espaço Itaú de Cinema - Augusta", 
    "Petra Belas Artes",
];

function format (cinemas) {
    var arrayCinemas = [];
    for (const cinema of cinemas){
        const objCinema = { key: cinema, value: cinema}

        arrayCinemas.push(objCinema);
    }

    return arrayCinemas;
}

return format(cinemas);
}