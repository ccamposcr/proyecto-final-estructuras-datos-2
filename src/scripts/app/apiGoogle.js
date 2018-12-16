define(['mapa'], () => {
   var map;
   //ubicaciones[i].latitud, ubicaciones[i].longitud
   let api = {};

   api.obtenerTiempoDistancia = (ubicaciones, conexiones) => {
    return `Ubicación: ${ubicaciones}
            Conexiones: ${conexiones}`;
   };
   
   /*createMarker
   getMarker
   drawMap
   maps*/
   
   // Initialize and add the map
   function initMap() {

       var cenfotec = {
           lat: 9.932316199999999,
           lng: -84.03103390000001
       };

       var map = new google.maps.Map(
           document.getElementById('map'), {
               zoom: 30,
               center: cenfotec
           });

       var marker = new google.maps.Marker({
           position: cenfotec,
           map: map
       });
   }
   
   return api;

});

