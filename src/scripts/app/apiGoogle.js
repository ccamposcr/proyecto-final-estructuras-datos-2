define(['googleMaps', 'datos', 'jQuery'], (googleMaps, datos, jQuery) => {

    let api = {},
        markers = [],
        map;

    api.obtenerTiempoDistancia = (ubicaciones, conexiones) => {
        let array = [],
            puntoPartida = 0,
            puntoLlegada = 0;

        for(let j = 0; j < conexiones.length; j++){
            puntoPartida = ubicaciones[conexiones[j][0]].ubicacion;
            puntoLlegada = ubicaciones[conexiones[j][1]].ubicacion;
            console.log(puntoPartida);
            console.log(puntoLlegada);

            $.ajax({
                url: "https://maps.googleapis.com/maps/api/distancematrix/json",
                method: "GET",
                data: { 
                    origins: puntoPartida,
                    destination: puntoLlegada,
                    mode: "driving",
                    key: "AIzaSyAVTOu-bHLsE5PNp1NlVMDQsycnZ1ALlps"
                }
            })
            .done(function(data) {
                console.log('success', data) 
            })
            .fail(function(xhr) {
                console.log('error', xhr);
            });
        }
        /*return `Ubicación: ${ubicaciones}
            Conexiones: ${conexiones}`;*/
         return array;
    };

    api.dibujarConexiones = (ubicaciones, conexiones) => {
        for(let i = 0; i < ubicaciones.length; i++){
            markers.push(new google.maps.Marker({
                position: {
                    "lat": ubicaciones[i].latitud,
                    "lng": ubicaciones[i].longitud
                },
                map: map
            }));
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
        api.obtenerTiempoDistancia(datos.ubicaciones, datos.conexiones);
        api.dibujarConexiones(datos.ubicaciones, datos.conexiones);
    }
   
    return api;

});

