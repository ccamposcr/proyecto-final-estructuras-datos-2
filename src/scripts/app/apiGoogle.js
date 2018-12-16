define(['googleMaps', 'datos'], (googleMaps, datos) => {
   var map;
   //ubicaciones[i].latitud, ubicaciones[i].longitud
   let api = {};
   let markers = [];

   /*api.obtenerTiempoDistancia = (ubicaciones, conexiones) => {
    return `Ubicación: ${ubicaciones}
            Conexiones: ${conexiones}`;
   };*/
   
   /*createMarker
   getMarker
   drawMap
   maps*/
   
   // Initialize and add the map
   api.initMap = () => {


       let map = new google.maps.Map(
           document.getElementById('map'), {
               zoom: 8,
               center: {
                    "lat": 9.934739,
                    "lng": -84.087502
                }
           });

        for(let i = 0; i < datos.ubicaciones.length; i++){
            markers.push(new google.maps.Marker({
                position: {
                    "lat": datos.ubicaciones[i].latitud,
                    "lng": datos.ubicaciones[i].longitud
                },
                map: map
            }));
        }
   }
   
   return api;

});

