define([''], function() {
    let gestor = {};
    const divMapaId = '#';

    let inicializarMapa = () => {

    }

    gestor.iniciar = () => {
        console.log('inicio');
        require(['apiGoogle', 'mapa'], function(api, mapa) {

        });
    }

    return gestor;
});