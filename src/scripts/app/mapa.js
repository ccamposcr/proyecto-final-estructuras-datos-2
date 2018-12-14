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

    let caminosMinimos = [];    
    
    let vertices = ['LIM','CMX','SCL','AQP'];

    let buscarAdyacentes = (ubicacion) => {
        let idUbicacion = (datos.ubicaciones.map(e => e.ubicacion)).indexOf(ubicacion);
        let adyacentes = [];
        if (idUbicacion == -1) {
            return 'No existe la ubicación ingresada';
        }
        datos.matrizAdyacencia.forEach(value => {
            if (value[0][idUbicacion] != undefined) {
                adyacentes.push(getDatoEnFormato(datos.ubicaciones[idUbicacion].ubicacion,
                    value[0][idUbicacion].tiempo,
                    value[0][idUbicacion].distancia));
            }
            if (value[idUbicacion][0] != undefined) {
                adyacentes.push(getDatoEnFormato(datos.ubicaciones[idUbicacion].ubicacion,
                    value[idUbicacion][0].tiempo,
                    value[idUbicacion][0].distancia));

            }
        });
        return adyacentes;
    };

    let getDatoEnFormato = (ubicacion, tiempo, distancia) => {
        return `Ubicación: ${ubicacion}
                Tiempo: ${tiempo}
                Distancia: ${distancia}`;
    }

    let buscarCaminoMinimo = (origen, destino) => {
        let verticeOrigen = vertices.findIndex(k => k == origen);
        let verticeDestino = vertices.findIndex(k => k == destino);
        console.log(verticeOrigen);
        console.log(verticeDestino);
        caminosMinimos = algoritmos.floydWarshall(matrizDePesos);
        if( verticeOrigen >= 0 &&  verticeDestino >= 0){
            console.log(caminosMinimos);
        }
    }

    let buscarCaminoMaximo = () => {};
	
    let buscarUbicacion = (ubicacion) => {
        return hashing(ubicacion);
    };

    let iniciarMapa = () => {
        iniciarMatriz();
    };

    let iniciarMatriz = () => {
        datos.iniciar();
    };

    mapa.iniciarMapa = () => {
        //iniciarMapa();
        buscarCaminoMinimo('CMX','SCL');
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