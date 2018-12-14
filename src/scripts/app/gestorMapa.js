define([''], function() {
    let gestor = {};
    const divMapaId = '#';

    let inicializarMapa = () => {

    }

    gestor.iniciar = () => {
        console.log('inicio');
        require(['apiGoogle', 'mapa'], function(api, mapa) {
            let tiempoDistanciaList = api.obtenerTiempoDistancia(mapa.datos.ubicaciones, mapa.datos.conexiones);
            mapa.iniciarMapa(tiempoDistanciaList);
        });
    }

    return gestor;
})