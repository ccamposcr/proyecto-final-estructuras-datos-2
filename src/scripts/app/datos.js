define(['clases'], () => {
    let datos = {}
    let ubicaciones = [
        new Nodo('San Jose'),
        new Nodo('Limon'),
        new Nodo('Guanacaste'),
        new Nodo('Alajuela'),
        new Nodo('Cartago'),
        new Nodo('Heredia'),
        new Nodo('Puntarenas')
    ];

    let arcos = [
        []
    ];
    let conexiones = [
        [0, 0],
        [0, 2],
        [0, 5],
        [1, 1],
        [1, 4],
        [1, 6],
        [2, 2],
        [3, 0],
        [3, 3],
        [3, 5],
        [4, 1],
        [4, 6],
        [5, 0],
        [5, 2],
        [6, 1],
    ];

    // Este listInfo lo que contiene es el tiempo y distancia de cada nodo
    datos.iniciar = (listInfo) => {
        inicializarArcos();
        for (let i = 0; i < conexiones.length; i++) {
            arcos[conexiones[i][0]][conexiones[i][1]] = new Arco(...listInfo[i]);
        }
        return arcos;
    }

    let inicializarArcos = () => {
        // arcos = (new Array(ubicaciones.length)).fill((new Array(ubicaciones.length)).fill(undefined));
        for (let x = 0; x < ubicaciones.length; x++) {
            arcos[x] = [];
            for (let y = 0; y < ubicaciones.length; y++) {
                arcos[x][y] = Infinity;
            }
        }
    }

    datos.ubicaciones = ubicaciones;
    datos.conexiones = conexiones;
    datos.matrizAdyacencia = arcos;
    return datos;
});