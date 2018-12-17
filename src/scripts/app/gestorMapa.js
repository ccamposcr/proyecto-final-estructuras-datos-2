define([''], function() {
    let gestor = {};
    const divMapaId = '#';

    let origen = document.getElementById("slOrigen");
    let destino = document.getElementById("slDestino");
    let btnBuscarRuta = document.getElementById("btnRuta");
    let btnBuscar = document.getElementById("btnBuscar");
    let ipBuscar = document.getElementById("ipBuscar");

    gestor.iniciar = () => {
        require(['apiGoogle', 'mapa', 'datos'], function(api, mapa, datos) {
            api.initMap();
            agregarEventos();
            api.obtenerTiempoDistancia(datos.ubicaciones, datos.conexiones).then(function(value) {
                let tiempoDistancia = value;
                mapa.iniciarMapa(tiempoDistancia);
                console.table(mapa.buscarAdyacentes('Limon'));

                console.log(`La busqueda fue exitosa: 
                ${mapa.buscarPorUbicacion('Limon').toString()}`);
            
                api.dibujarConexiones(datos.ubicaciones, datos.conexiones);
            });
        });
    }

    let agregarEventos = () => {
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelector('select[id="slOrigen"]').onchange = (event) => {
                // document.getElementById("").classList
            };
            document.querySelector('select[id="btnBuscar"]').onchange = (event) => {

            };

            document.querySelector('select[id="btnRuta"]').onchange = (event) => {

            };;
        });

    }
    return gestor;
})