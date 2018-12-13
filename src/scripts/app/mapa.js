define([
    'datos',
    'hashing',
    'clases'
], function(datos, hashing) {

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
        [0, 4, 0, 6],
        [4, 0, 6, 0],
        [0, 6, 0, 8],
        [6, 0, 8, 0]
    ];
    
    let initMatriz = () => {
        let i, j, matriz = [];

        for( i = 0; i < matrizDePesos.length; i++){
            matriz[i] = new Array(matrizDePesos[0].length);
        }

        for( i = 0; i < matrizDePesos.length; i++ ){
            for( j = 0; j < matrizDePesos[0].length; j++ ){
                matriz[i][j] = 0;
            }
        }

        return matriz;
    };

    let caminos = initMatriz();
    
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
        if( verticeOrigen >= 0 &&  verticeDestino >= 0){
            buscarCaminoMinRecursivo(verticeOrigen, verticeDestino);
        }
    }

	let buscarCaminoMinRecursivo = (origen, destino) => {
        let k;
        let c = '';
        k = caminos[origen][destino];
        if (k == 0){
            return;
        }
        buscarCaminoMinRecursivo(origen, k);
        //cout << k;
        console.log('k '+ k);
        console.log('c '+ c);
        //cout << c;
        buscarCaminoMinRecursivo(k, destino);
    };

    let calcularCaminos = () => {
        let i, j, k;
        let matrizTmp = initMatriz();

        for (i = 0; i < matrizTmp.length; i++){
            for (j = 0; j < matrizTmp.length; j++){
                matrizTmp[i][j] = matrizDePesos[i][j];
                caminos[i][j] = 0;
            }             
        } 

        for (i = 0; i < matrizTmp.length; i++){
            matrizTmp[i][i] = 0;
        } 

        for (k = 0; k < matrizTmp.length; k++){
            for (i = 0; i < matrizTmp.length; i++){
                for (j = 0; j < matrizTmp.length; j++){
                    if ((matrizTmp[i][k] + matrizTmp[k][j]) < (matrizTmp[i][j]))
                    {
                        matrizTmp[i][j] = matrizTmp[i][k] + matrizTmp[k][j];
                        caminos[i][j] = k;
                    }
                }
            }
        }
        console.log(caminos);
    };

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
        calcularCaminos();
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