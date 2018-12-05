class Nodo {
    constructor(pUbicacion, pLatitud = 0, pLongitud = 0) {
        this.ubicacion = pUbicacion;
        this.latitud = pLatitud;
        this.longitud = pLongitud;
    }
}

class Arco {
    constructor(pTiempo, pDistancia) {
        this.tiempo = pTiempo;
        this.distancia = pDistancia;
    }
}

define(() => {
    return { Nodo, Arco }
})