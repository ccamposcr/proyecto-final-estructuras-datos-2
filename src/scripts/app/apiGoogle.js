define(['mapa'], () => {
   var map;
   //ubicaciones[i].latitud, ubicaciones[i].longitud
   let api = {};

   api.obtenerTiempoDistancia = (ubicaciones, conexiones) => {
    return `Ubicación: ${ubicaciones}
            Conexiones: ${conexiones}`;
   };
   
   // Initialize and add the map
   function initMap() {
       // The location of Uluru
       var cenfotec = {
           lat: 9.932316199999999,
           lng: -84.03103390000001
       };
       // The map, centered at Uluru
       var map = new google.maps.Map(
           document.getElementById('map'), {
               zoom: 30,
               center: cenfotec
           });
       // The marker, positioned at Uluru
       var marker = new google.maps.Marker({
           position: cenfotec,
           map: map
       });
   }
   
   return api;

});

