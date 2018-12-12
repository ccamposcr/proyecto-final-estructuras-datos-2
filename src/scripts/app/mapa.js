define([
    'datos',
    'hashing',
    'clases'
], function(datos, hashing) {

    let mapa = {};
    let arcos = [
        []
    ];

    let buscarAdyacentes = (ubicacion) => {
        let idUbicacion = (datos.ubicaciones.map(e => e.ubicacion)).indexOf(ubicacion);
        let adyacentes = [];
        if (idUbicacion == -1) {
            return 'No existe la ubicación ingresada';
        }
        datos.matrizAdyacencia.forEach(value => {
            if (value[0][idUbicacion] != undefined) {
                adyacentes.push(getDatoEnFormato(datos.ubicaciones[idUbicacion].ubicacion,
                    value[0][idUbicacion].tiempo,
                    value[0][idUbicacion].distancia));
            }
            if (value[idUbicacion][0] != undefined) {
                adyacentes.push(getDatoEnFormato(datos.ubicaciones[idUbicacion].ubicacion,
                    value[idUbicacion][0].tiempo,
                    value[idUbicacion][0].distancia));

            }
        });
        return adyacentes;
    };

    let getDatoEnFormato = (ubicacion, tiempo, distancia) => {
        return `Ubicación: ${ubicacion}
                Tiempo: ${tiempo}
                Distancia: ${distancia}`;
    }

    let buscarUbicacion = (ubicacion) => {
        return hashing(ubicacion);
    };
    let iniciarMapa = () => {
        iniciarMatriz();
    };
    let iniciarMatriz = () => {
        datos.inicar();
    };

    mapa.buscarPorUbicacion = buscarUbicacion;
    mapa.buscarAdyacentes = buscarAdyacentes;
    mapa.datos = datos;
    mapa.iniciarMapa = () => {
        iniciarMapa();
    };
    return mapa;
});