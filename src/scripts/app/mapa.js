define([
    'datos',
    'hashing',
    'clases'
], function(datos, hashing) {
    let mapa = {};
    let matrizAdyacencia = [
        [0, 1, 0,-1],
        [-1, 0, 1, 0],
        [0, -1, 0, 1],
        [1, 0, -1, 0]
    ];

    let matrizDeCostos = [
        [0, 4, 0,-6],
        [-4, 0, 6, 0],
        [0, -6, 0, 8],
        [6, 0, -8, 0]
    ];
    //[0,1,2,3,4,5,6,7,8,9];
    let vertices = ['LIM','CMX','SCL','AQP'];
    //https://cdn-images-1.medium.com/max/1600/1*K_dtpNyaJ41uOEW_mHvW4A.png
    //Grafo https://cdn-images-1.medium.com/max/1600/1*yAdNgmGT-g8JX7P5WB0Heg.png

    let buscarAdyacentes = () => {};
    let buscarUbicacion = () => {};
    let iniciarMapa = () => {};
    let iniciarMatriz = () => {};
    let buscarCaminoMinimo = (origen, destino) => {
        let verticeOrigen = vertices.findIndex(k => k== origen);
        let verticeDestino = vertices.findIndex(k => k== destino);
        console.log(verticeOrigen);
        console.log(verticeDestino);
    };
    let buscarCaminoMaximo = () => {};

    buscarCaminoMinimo('LIM','CMX');
});