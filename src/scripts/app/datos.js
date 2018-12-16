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
        [0, 7],
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
        [7, 0],
        [7, 2]
    ];

    // Este listInfo lo que contiene es el tiempo y distancia de cada nodo
    datos.iniciar = (listInfo) => {
        conexiones.forEach((conexion, index, array) => {
            arcos[conexion[0]][conexion[1]] = new arcos(listInfo[index][0], listInfo[index][1]);
        });
    }

    datos.ubicaciones = ubicaciones;
    datos.conexiones = conexiones;
    datos.matrizAdyacencia = arcos;
    return datos;
});