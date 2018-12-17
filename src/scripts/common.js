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
        "algoritmos": "scripts/app/algoritmos",
        "googleMaps": "https://maps.googleapis.com/maps/api/js?key=AIzaSyAVTOu-bHLsE5PNp1NlVMDQsycnZ1ALlps",
        "jQuery": "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/core.js",
        "popper": "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min",
        "bootstrap": "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min"
    },
    shim: {
        "bootstrap": ['jquery', 'popperjs']
    }
});
require(["gestor"], function(func) {

    func.iniciar();
});