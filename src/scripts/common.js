"use strict"

requirejs.config({
    baseUrl: "./",
    paths: {
        "gestor": "scripts/app/gestorMapa",
        "clases": "scripts/app/clases",
        "datos": "scripts/app/datos",
        "mapa": "scripts/app/mapa",
        "hashing": "scripts/app/hashing",
        "apiGoogle": "scripts/app/apiGoogle",
        "googleMaps": "https://maps.googleapis.com/maps/api/js?key=AIzaSyAYDiiPeMSVqarqP8kPOnYpXTVM_2yC3TU&callback=initMap",
        "jquery": "https://code.jquery.com/jquery-3.3.1.slim.min.js",
        "popper": "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
        "bootstrap": "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
    },
    shim: {
        "bootstrap": ['jquery', 'popperjs']
            // backbone: {
            //     deps: ['jquery', 'underscore'],
            //     exports: 'Backbone'
            // },
            // underscore: {
            //     exports: '_'
            // }
    }
});
require(["gestor"], function(iniciar) {

    iniciar.onReady();
});