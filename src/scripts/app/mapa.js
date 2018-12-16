define([
    'datos',
    'hashing',
    'clases',
    'algoritmos'
], function(datos, hashing, clases, algoritmos) {

    let mapa = {};

    let arcos = [
        []
    ];

    let matrizAdyacencia = [
        [0, 1, 0, 1],
        [1, 0, 1, 0],
        [0, 1, 0, 1],
        [1, 0, 1, 0]
    ];

    let matrizDePesos = [
        [0, 4, Infinity, 6],
        [4, 0, 6, Infinity],
        [Infinity, 6, 0, 8],
        [6, Infinity, 8, 0]
    ];

    //let vertices = ['LIM', 'CMX', 'SCL', 'AQP'];

    let buscarAdyacentes = (ubicacion) => {
        console.table(arcos);
        //debugger;
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

        let obj = algoritmos.floydWarshall(matrizDePesos)
        let caminosMinimos = obj.array;
        let camino = obj.camino;
        if (verticeOrigen >= 0 && verticeDestino >= 0) {
            console.log('Camino minimo de ' + origen + ' a ' + destino + ' ==> ' + camino + ' = ' + caminosMinimos[verticeOrigen][verticeDestino]);
        }
    }

    let buscarCaminoMaximo = () => {};

    let buscarUbicacion = (ubicacion) => {
        return hashing(ubicacion);
    };


    mapa.iniciarMapa = (tiempoDistanciaList) => {
        arcos = datos.iniciar(tiempoDistanciaList);
        buscarCaminoMinimo('Limon','Guanacaste');
    };

    //https://cdn-images-1.medium.com/max/1600/1*K_dtpNyaJ41uOEW_mHvW4A.png
    //Grafo https://cdn-images-1.medium.com/max/1600/1*yAdNgmGT-g8JX7P5WB0Heg.png
    mapa.caminoMinimo = buscarCaminoMinimo;
    mapa.caminoMaximo = buscarCaminoMaximo;
    mapa.buscarPorUbicacion = buscarUbicacion;
    mapa.buscarAdyacentes = buscarAdyacentes;
    mapa.datos = datos;



    return mapa;
});