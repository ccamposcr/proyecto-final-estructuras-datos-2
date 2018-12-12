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

    let matrizDePesos = [
        [0, 4, 0, 6],
        [4, 0, 6, 0],
        [0, 6, 0, 8],
        [6, 0, 8, 0]
    ];

    let caminos = [];
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

    calcularCaminos();
    buscarCaminoMinimo('LIM','AQP');
});