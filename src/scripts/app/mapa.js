define([
    'datos',
    'hashing',
    'clases',
    'algoritmos'
], function(datos, hashing, clases, algoritmos) {

    let mapa = {};
    let hash;

    let buscarAdyacentes = (ubicacion) => {
        let idUbicacion = (datos.ubicaciones.map(e => e.ubicacion)).indexOf(ubicacion);
        let adyacentes = [];
        if (idUbicacion == -1) {
            return 'No existe la ubicación ingresada';
        }

        for (let i = 0; i < arcos.length; i++) {

            if (arcos[idUbicacion][i] != Infinity) {
                adyacentes.push(getDatoEnFormato(`Destino: ${datos.ubicaciones[i].ubicacion}`,
                    arcos[idUbicacion][i].tiempo,
                    arcos[idUbicacion][i].distancia));
            }

        }
        return adyacentes;
    };

    let getDatoEnFormato = (ubicacion, tiempo, distancia) => {
        return {
            'Ubicación': ubicacion,
            'Tiempo': tiempo,
            'Distancia': distancia
        }
    }

    let buscarCaminoMinimo = (origen, destino) => {
        let verticeOrigen = datos.ubicaciones.findIndex(k => k.ubicacion == origen);
        let verticeDestino = datos.ubicaciones.findIndex(k => k.ubicacion == destino);

        let obj = algoritmos.floydWarshall(arcos)
        let caminosMinimos = obj.array;
        let camino = obj.camino;
        if (verticeOrigen >= 0 && verticeDestino >= 0) {
            console.log('Camino minimo de ' + origen + ' a ' + destino + ' ==> ' + camino + ' Valor del Camino = ' + caminosMinimos[verticeOrigen][verticeDestino]);
        }
    }

    let buscarUbicacion = (ubicacion) => {
        return hash.obtener(ubicacion);
    };

    mapa.iniciarMapa = (tiempoDistanciaList) => {
        arcos = datos.iniciar(tiempoDistanciaList);
        hash = new Hashing(datos.ubicaciones, "ubicacion");
        console.log(hash);
        buscarCaminoMinimo('Limon', 'Cartago');
    };

    mapa.caminoMinimo = buscarCaminoMinimo;
    mapa.buscarPorUbicacion = buscarUbicacion;
    mapa.buscarAdyacentes = buscarAdyacentes;
    mapa.datos = datos;

    return mapa;
});