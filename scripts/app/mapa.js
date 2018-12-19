define(["datos", "hashing", "clases", "algoritmos"], function(
  datos,
  hashing,
  clases,
  algoritmos
) {
  let mapa = {};
  let hash;

  let buscarAdyacentes = ubicacion => {
    let idUbicacion = datos.ubicaciones
      .map(e => e.ubicacion)
      .indexOf(ubicacion);
    let adyacentes = [];
    if (idUbicacion == -1) {
      return "No existe la ubicación ingresada";
    }

    for (let i = 0; i < arcos.length; i++) {
      if (arcos[idUbicacion][i] != Infinity) {
        adyacentes.push(
          getDatoEnFormato(
            datos.ubicaciones[i],
            arcos[idUbicacion][i].tiempo,
            arcos[idUbicacion][i].distancia,
            i
          )
        );
      }
    }
    return {
      adyacentes: adyacentes,
      Origen: datos.ubicaciones[idUbicacion],
      Conexiones: getConexionesAdyacentes(adyacentes, idUbicacion)
    };
  };

  let getConexionesAdyacentes = (adyacentes, idUbicacion) => {
    let array = Object.values(
      [].fill.call({ length: adyacentes.length }, [idUbicacion, 0])
    );
    array.pop();
    let arrayId = adyacentes.map(x => {
      return x.id;
    });
    for (let i = 0; i < array.length; i++) {
      array[i] = [array[i][0], arrayId[i]];
    }

    return array;
  };

  let getDatoEnFormato = (ubicacion, tiempo, distancia, id) => {
    return {
      id: id,
      Ubicación: ubicacion,
      Tiempo: tiempo,
      Distancia: distancia
    };
  };

  let buscarCaminoMinimo = (origen, destino) => {
    let verticeOrigen = datos.ubicaciones.findIndex(k => k.ubicacion == origen),
        verticeDestino = datos.ubicaciones.findIndex(k => k.ubicacion == destino),
        caminoMinimo = [],
        caminosMinimos = algoritmos.floydWarshall(arcos);
        
    if (verticeOrigen >= 0 && verticeDestino >= 0) {
      caminoMinimo = caminosMinimos[verticeOrigen][verticeDestino];
    }

    return caminoMinimo;
  };

  let buscarUbicacion = ubicacion => {
    return hash.obtener(ubicacion) != ""
      ? hash.obtener(ubicacion)
      : `Ubicación ${ubicacion} ingresada no existe `;
  };

  mapa.iniciarMapa = tiempoDistanciaList => {
    arcos = datos.iniciar(tiempoDistanciaList);
    hash = new Hashing(datos.ubicaciones, "ubicacion");
    console.log(hash);
  };

  mapa.caminoMinimo = buscarCaminoMinimo;
  mapa.buscarPorUbicacion = buscarUbicacion;
  mapa.buscarAdyacentes = buscarAdyacentes;
  mapa.datos = datos;

  return mapa;
});
