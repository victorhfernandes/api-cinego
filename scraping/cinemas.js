exports.nomeCinemas = () => {
  const cinemas = [
    "Cinemark Praiamar",
    "Cine Flix Miramar",
    "Cine Roxy 5 Gonzaga",
    "Cine Roxy 6 Brisamar",
    "Cinesystem Litoral Plaza",
    "Cine Roxy 3 Parque Anilinas",
    "Cine 3 Ferry Boat's Plaza",
    "Cinemar Itanhaém",
  ];

  function format(cinemas) {
    var arrayCinemas = [];
    for (const cinema of cinemas) {
      const objCinema = { key: cinema, value: cinema };

      arrayCinemas.push(objCinema);
    }

    return arrayCinemas;
  }

  return format(cinemas);
};
