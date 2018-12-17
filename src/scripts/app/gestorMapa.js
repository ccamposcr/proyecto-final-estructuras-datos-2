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
            console.log(mapa.buscarAdyacentes('Limon'))
        });
    }

    let agregarEventos = () => {
        origen.addEventListener('change', () => {
            if (origen.value != -1) {
                destino.removeAttribute('disabled');
            } else {
                if (destino.getAttribute("disabled") == null) {
                    destino.setAttribute('disabled', 'disabled');
                    destino.value = -1;
                }
            }
        });

        btnBuscarRuta.addEventListener('click', () => {
            require(['apiGoogle', 'mapa'], function(api, mapa) {
                if (origen.value == -1) {
                    // mostrar todas las rutas
                    api.initMap();
                } else {
                    if (destino.value == -1) {
                        // mostrar todas las adyacencias
                        let resultAdy = mapa.buscarAdyacentes(origen.value);
                        api.dibujarConexiones(mapa.datos.ubicaciones, resultAdy.Conexiones);

                    } else {
                        // busca el camino minimo

                        //api.dibujarCaminoMinimo(mapa.caminoMinimo(origen.value, destino.value););
                    }
                }
            });
        });
    }
    return gestor;
})