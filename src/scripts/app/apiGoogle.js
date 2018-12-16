define(['googleMaps', 'datos'], (googleMaps, datos) => {

   let api = {};
   let markers = [];
   let map;

   api.obtenerTiempoDistancia = (ubicaciones, conexiones) => {
    /*return `Ubicación: ${ubicaciones}
            Conexiones: ${conexiones}`;*/
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

