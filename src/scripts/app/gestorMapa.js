define([''], function() {
    let gestor = {};
    const divMapaId = '#';

    let inicializarMapa = () => {

    }

    gestor.iniciar = () => {
        require(['apiGoogle', 'mapa'], function(api, mapa) {
            // let tiempoDistanciaList = api.obtenerTiempoDistancia(mapa.datos.ubicaciones, mapa.datos.conexiones);
            // mapa.iniciarMapa(tiempoDistanciaList);
            let tiempoDistancia = [
                [45, 0],
                [45, 2],
                [23, 5],
                [23, 1],
                [7561, 4],
                [56, 6],
                [452, 2],
                [853, 0],
                [833, 3],
                [323, 5],
                [41, 1],
                [47, 6],
                [895, 23],
                [85, 23],
                [6987, 23]
            ];
            api.initMap();
            mapa.iniciarMapa(tiempoDistancia);
            console.table(mapa.buscarAdyacentes('Limon'));
        });
    }

    return gestor;
})