define([
    'datos',
    'hashing',
    'clases',
    'algoritmos'
], function(datos, hashing, clases, algoritmos) {

    let mapa = {};

    let buscarAdyacentes = (ubicacion) => {
        console.table(arcos);
        debugger;
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

        let obj = algoritmos.floydWarshall(datos.matrizAdyacencia)
        let caminosMinimos = obj.array;
        let camino = obj.camino;
        if (verticeOrigen >= 0 && verticeDestino >= 0) {
            console.log('Camino minimo de ' + origen + ' a ' + destino + ' ==> ' + camino + ' Valor del Camino = ' + caminosMinimos[verticeOrigen][verticeDestino]);
        }
    }

    let buscarCaminoMaximo = () => {};

    let buscarUbicacion = (ubicacion) => {
        return hashing(ubicacion);
    };

    mapa.iniciarMapa = (tiempoDistanciaList) => {
        arcos = datos.iniciar(tiempoDistanciaList);
        buscarCaminoMinimo('Limon','Cartago');
    };

    mapa.caminoMinimo = buscarCaminoMinimo;
    mapa.caminoMaximo = buscarCaminoMaximo;
    mapa.buscarPorUbicacion = buscarUbicacion;
    mapa.buscarAdyacentes = buscarAdyacentes;
    mapa.datos = datos;

    return mapa;
});