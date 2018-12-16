define(['mapa'], () => {
   var map;
   //ubicaciones[i].latitud, ubicaciones[i].longitud
   let api = {};

   api.obtenerTiempoDistancia = (ubicaciones, conexiones) => {
    return `Ubicación: ${ubicaciones}
                Conexiones: ${conexiones}`;
   };

   function initMap() {
       map = new google.maps.Map(document.getElementById('map'), {
           center: {
               lat: 9.9323162,
               lng: -84.0332226
           },
           zoom: 8
       });
   };
   
   return api;

});

