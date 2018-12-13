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
        [0, 4, Infinity, 6],
        [4, 0, 6, Infinity],
        [Infinity, 6, 0, 8],
        [6, Infinity, 8, 0]
    ];

    let caminosMinimos = [];
    
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
        console.log(verticeOrigen);
        console.log(verticeDestino);
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
        //calcularCaminos();
        //buscarCaminoMinimo('CMX','SCL');
        caminosMinimos = floydWarshall(matrizDePesos);
    };
    
    //https://cdn-images-1.medium.com/max/1600/1*K_dtpNyaJ41uOEW_mHvW4A.png
    //Grafo https://cdn-images-1.medium.com/max/1600/1*yAdNgmGT-g8JX7P5WB0Heg.png
	mapa.caminoMinimo = buscarCaminoMinimo;
    mapa.caminoMaximo = buscarCaminoMaximo;
    mapa.buscarPorUbicacion = buscarUbicacion;
    mapa.buscarAdyacentes = buscarAdyacentes;
    mapa.datos = datos;
    

    var floydWarshall = (function () {
        /**
         * Matrix used for the algorithm.
         */
        var dist;
        /**
         * Initialize the distance matrix.
         *
         * @private
         * @param {Array} graph Distance matrix of the array.
         * @return {Array} Distance matrix used for the algorithm.
         */
        function init(graph) {
          var dist = [];
          var size = graph.length;
          for (var i = 0; i < size; i += 1) {
            dist[i] = [];
            for (var j = 0; j < size; j += 1) {
              if (i === j) {
                dist[i][j] = 0;
              } else if (!isFinite(graph[i][j])) {
                dist[i][j] = Infinity;
              } else {
                dist[i][j] = graph[i][j];
              }
            }
          }
          return dist;
        }
        /**
         * Floyd-Warshall algorithm. Finds the shortest path between
         * each two vertices.<br><br>
         * Complexity: O(|V|^3) where V is the number of vertices.
         *
         * @public
         * @module graphs/shortest-path/floyd-warshall
         * @param {Array} graph A distance matrix of the graph.
         * @return {Array} Array which contains the shortest
         *    distance between each two vertices.
         *
         * @example
         * var floydWarshall =
         * require('path-to-algorithms/src/graphs/shortest-path/floyd-warshall').floydWarshall;
         * var distMatrix =
         *    [[Infinity, 7,        9,       Infinity,  Infinity, 16],
         *     [7,        Infinity, 10,       15,       Infinity, Infinity],
         *     [9,        10,       Infinity, 11,       Infinity, 2],
         *     [Infinity, 15,       11,       Infinity, 6,        Infinity],
         *     [Infinity, Infinity, Infinity, 6,        Infinity, 9],
         *     [16,       Infinity, 2,        Infinity, 9,        Infinity]];
         *
         * // [ [ 0, 7, 9, 20, 20, 11 ],
         * //   [ 7, 0, 10, 15, 21, 12 ],
         * //   [ 9, 10, 0, 11, 11, 2 ],
         * //   [ 20, 15, 11, 0, 6, 13 ],
         * //   [ 20, 21, 11, 6, 0, 9 ],
         * //   [ 11, 12, 2, 13, 9, 0 ] ]
         * var shortestDists = floydWarshall(distMatrix);
         */
        return function (graph) {
          dist = init(graph);
          var size = graph.length;
          for (var k = 0; k < size; k += 1) {
            for (var i = 0; i < size; i += 1) {
              for (var j = 0; j < size; j += 1) {
                if (dist[i][j] > dist[i][k] + dist[k][j]) {
                  dist[i][j] = dist[i][k] + dist[k][j];
                }
              }
            }
          }
          return dist;
        };
      }());
	
	
	return mapa;
});