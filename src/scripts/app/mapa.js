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
                adyacentes.push(getDatoEnFormato(
                    i,
                    `Destino: ${datos.ubicaciones[i]}`,
                    arcos[idUbicacion][i].tiempo,
                    arcos[idUbicacion][i].distancia));
            }
        }
        return {
            "adyacentes": adyacentes,
            "Origen": datos.ubicaciones[idUbicacion],
            "Conexiones": getConexionesAdyacentes(adyacentes, idUbicacion)
        };
    };

    let getConexionesAdyacentes = (adyacentes, idUbicacion) => {
        let array = Object.values([].fill.call({ length: adyacentes.length }, [idUbicacion, 0]));
        array.pop();
        let arrayId = adyacentes.map(x => { return x.id });
        for (let i = 0; i < array.length; i++) {
            array[i] = [array[i][0], arrayId[i]];
        }

        return array;
    }

    let getDatoEnFormato = (ubicacion, tiempo, distancia, id) => {
        return {
            'id': id,
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