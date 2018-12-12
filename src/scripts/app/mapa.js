define([
    'datos',
    'hashing',
    'clases'
], function(datos, hashing) {

    let mapa = {};
    let matrizAdyacencia = [
        [0, 1, 0, 1],
        [1, 0, 1, 0],
        [0, 1, 0, 1],
        [1, 0, 1, 0]
    ];
    
    let arcos = [
        []
    ];
	
	let matrizAdyacencia = [
        [0, 1, 0,-1],
        [-1, 0, 1, 0],
        [0, -1, 0, 1],
        [1, 0, -1, 0]
    ];

    let matrizDePesos = [
        [0, 4, 0, 6],
        [4, 0, 6, 0],
        [0, 6, 0, 8],
        [6, 0, 8, 0]
    ];

    let caminos = [];
    //[0,1,2,3,4,5,6,7,8,9];
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
        let verticeOrigen = vertices.findIndex(k => k== origen);
        let verticeDestino = vertices.findIndex(k => k== destino);
        console.log(verticeOrigen);
        console.log(verticeDestino);

     
        var k;
        var c = '';
        k = p[i][j];
        if (k==0)
            return;
        caminos(i,k);
        cout<<k;
        cout<<c;
        getch();
        caminos(k,j);
        
    };

    let calcularCaminos = () => {
        let i, j, k;
        var array = [];

        for (i = 1; i <= array.length; i++){
            for (j = 1; j <= 7; j++){
                array[i][j] = matrizDePesos[i][j];
                caminos[i][j] = 0;
            }             
        } 

        for (i = 1; i <= array.length; i++){
            array[i][i] = 0;
        } 

        for (k = 1;k <= array.length; k++){
            for (i = 1;i <= array.length; i++){
                for (j = 1; j <= array.length; j++){
                    if ((array[i][k] + array[k][j]) < (array[i][j]))
                    {
                        array[i][j] = array[i][k] + array[k][j];
                        caminos[i][j] = k;
                    }
                }
            }
        }
    };

    let buscarCaminoMaximo = () => {};
	
    let buscarUbicacion = (ubicacion) => {
        return hashing(ubicacion);
    };
    let iniciarMapa = () => {
        iniciarMatriz();
    };
    let iniciarMatriz = () => {
        datos.inicar();
    };

    calcularCaminos();
    buscarCaminoMinimo('LIM','AQP');
    mapa.buscarPorUbicacion = buscarUbicacion;
    mapa.buscarAdyacentes = buscarAdyacentes;
    mapa.datos = datos;
    mapa.iniciarMapa = () => {
        iniciarMapa();
    };
    
    //https://cdn-images-1.medium.com/max/1600/1*K_dtpNyaJ41uOEW_mHvW4A.png
    //Grafo https://cdn-images-1.medium.com/max/1600/1*yAdNgmGT-g8JX7P5WB0Heg.png
	mapa.caminoMinimo = buscarCaminoMinimo;
	mapa.caminoMaximo = buscarCaminoMaximo;
	
    //buscarCaminoMinimo('LIM','CMX');
	
	return mapa;
});