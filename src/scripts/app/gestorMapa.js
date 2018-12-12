define([''], function() {
    let gestor = {};
    const divMapaId = '#';

    let inicializarMapa = () => {

    }

    gestor.iniciar = () => {
        require(['apiGoogle', 'mapa'], function(api, mapa) {
            mapa.iniciarMapa();
        });
    }

    return gestor;
});