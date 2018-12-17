define(['googleMaps', 'datos', 'jQuery'], (googleMaps, datos, jQuery) => {

    let api = {},
        markers = [],
        lineas = [],
        map,
        distanceService;

    api.obtenerTiempoDistancia = (ubicaciones, conexiones) => {
        let array = [],
            puntoPartida = 0,
            puntoLlegada = 0,
            distancia,
            duracion;

        for(let j = 0; j < conexiones.length; j++){
            puntoPartida = ubicaciones[conexiones[j][0]].ubicacion;
            puntoLlegada = ubicaciones[conexiones[j][1]].ubicacion;

            distanceService.getDistanceMatrix({
                origins: [puntoPartida + ', Costa Rica'],
                destinations: [puntoLlegada + ', Costa Rica'],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC,
                durationInTraffic: true,
                avoidHighways: false,
                avoidTolls: false
            },
            function (response, status) {
                if (status !== google.maps.DistanceMatrixStatus.OK) {
                    console.log('Error:', status);
                } else {
                    distancia = response.rows[0].elements[0].distance.value;
                    duracion = response.rows[0].elements[0].duration.value;
                    array.push([distancia, duracion]);
                }
            });
        }
        return array;
    };

    api.dibujarConexiones = (ubicaciones, conexiones) => {
        let puntoPartida = {},
            puntoLlegada = {},
            polyline;

        for(let i = 0; i < ubicaciones.length; i++){
            markers.push(new google.maps.Marker({
                position: {
                    "lat": ubicaciones[i].latitud,
                    "lng": ubicaciones[i].longitud
                },
                map: map
            }));
        }

        for(let j = 0; j < conexiones.length; j++){
            puntoPartida.latitud = ubicaciones[conexiones[j][0]].latitud;
            puntoPartida.longitud = ubicaciones[conexiones[j][0]].longitud;
            puntoLlegada.latitud = ubicaciones[conexiones[j][1]].latitud;
            puntoLlegada.longitud = ubicaciones[conexiones[j][1]].longitud;

            polyline = new google.maps.Polyline({
                path: [
                    new google.maps.LatLng(puntoPartida.latitud, puntoPartida.longitud), 
                    new google.maps.LatLng(puntoLlegada.latitud, puntoLlegada.longitud)
                ],
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
                map: map
            });

            lineas.push(polyline);
        }

    };
   
    // Initialize and add the map
    api.initMap = () => {
        map = new google.maps.Map(
            document.getElementById('map'), {
                    zoom: 8,
               center: {
                    "lat": 9.934739,
                    "lng": -84.087502
                }
           });

        distanceService = new google.maps.DistanceMatrixService();
        //TODO: Eliminar estos llamados, existen solo para efectos de prueba
        console.log(api.obtenerTiempoDistancia(datos.ubicaciones, datos.conexiones));
        api.dibujarConexiones(datos.ubicaciones, datos.conexiones);
    }
   
    return api;

});

