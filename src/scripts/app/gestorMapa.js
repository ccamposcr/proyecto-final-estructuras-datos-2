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

        btnBuscar.addEventListener('click', () => {
            if (origen.value != '') {
                require(['mapa', "sweet"], function(mapa) {
                    swal({
                        title: 'Título',
                        text: 'Mensaje de texto',
                        html: getHtmlAlert(mapa.buscarPorUbicacion(ipBuscar.value)),
                        type: 'success'
                    });
                });
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
                        console.log(resultAdy.Conexiones);
                        api.dibujarConexiones(mapa.datos.ubicaciones, resultAdy.Conexiones);

                    } else {
                        // busca el camino minimo

                        //api.dibujarCaminoMinimo(mapa.caminoMinimo(origen.value, destino.value););
                    }
                }
            });
        });
    }

    let getHtmlAlert = (nodo) => {
        return `<div class="card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">Ubicacion ${nodo.ubicacion}</h5>
                    <p class="card-text"><strong>Latitud: </strong>${nodo.latitud}</p>
                    <p class="card-text"><strong>Longitud: </strong>${nodo.longitud}</p>
                    </div>
                </div>`;
    }
    return gestor;
})