var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 9.9323162,
            lng: -84.0332226
        },
        zoom: 8
    });
}