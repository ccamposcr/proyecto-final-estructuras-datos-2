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

                console.log(mapa.caminoMinimo("Limon", "San Jose"));
            });
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
                        //console.log(mapa.caminoMinimo(origen.value, destino.value));
                        //api.dibujarCaminoMinimo(mapa.caminoMinimo(origen.value, destino.value););
                    }
                }
            });
        });
    }
    return gestor;
})