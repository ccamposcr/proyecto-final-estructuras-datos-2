define([''], function() {
    let gestor = {};
    const divMapaId = '#';

    let origen = document.getElementById("slOrigen");
    let destino = document.getElementById("slDestino");
    let btnBuscarRuta = document.getElementById("btnRuta");
    let btnBuscar = document.getElementById("btnBuscar");
    let ipBuscar = document.getElementById("ipBuscar");

    gestor.iniciar = () => {
        require(['apiGoogle', 'mapa'], function(api, mapa) {
            agregarEventos();
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

            console.log(`La busqueda fue exitosa: 
                ${mapa.buscarPorUbicacion('Limon').toString()}`);
        });
    }

    let agregarEventos = () => {
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelector('select[id="slOrigen"]').onchange = (event) => {

            };
            document.querySelector('select[id="btnBuscar"]').onchange = (event) => {

            };

            document.querySelector('select[id="btnRuta"]').onchange = (event) => {

            };;
        });

    }
    return gestor;
})