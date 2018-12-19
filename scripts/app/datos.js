define(['clases'], () => {
    let datos = {}
    let ubicaciones = [
        new Nodo('San Jose', 9.928069, -84.090729),
        new Nodo('Limon', 9.975080, -83.061000),
        new Nodo('Guanacaste', 10.473270, -85.372650),
        new Nodo('Alajuela', 10.018770, -84.210190),
        new Nodo('Cartago', 9.830860, -83.868698),
        new Nodo('Heredia', 9.998910, -84.116478),
        new Nodo('Puntarenas', 9.977420, -84.833740),
        new Nodo('Desamparados', 10.023400, -84.187900),
        new Nodo('Coronado', 10.077210, -83.946790),
        new Nodo('Purral', 9.956810, -84.033200),
        new Nodo('Los Guido', 9.866690, -84.049000),
        new Nodo('Cenfotec', 9.932404, -84.031021),
        new Nodo('Turrialba', 9.906705, -83.680054),
        new Nodo('Perez Zeledon', 9.336680, -83.715520),
        new Nodo('Sarapiqui', 10.267700, -84.181200),
        new Nodo('Cañas Dulces', 10.733700, -85.479000),
        new Nodo('Quepos', 9.430300, -84.165100),
        new Nodo('Paraiso', 9.838490, -83.865600),
        new Nodo('Goicoechea', 9.957090, -83.982870)
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
        [7, 4],
        [8, 0],
        [9, 8],
        [10, 3],
        [11, 2],
        [12, 6],
        [13, 7],
        [14, 12],
        [15, 10],
        [16, 9],
        [17, 2],
        [18, 0]
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
        for (let x = 0; x < ubicaciones.length; x++) {
            arcos[x] = [];
            for (let y = 0; y < ubicaciones.length; y++) {
                arcos[x][y] = Infinity;
            }
        }
    }

    datos.ubicaciones = ubicaciones;
    datos.conexiones = conexiones;
    datos.arcos = arcos;
    return datos;
});