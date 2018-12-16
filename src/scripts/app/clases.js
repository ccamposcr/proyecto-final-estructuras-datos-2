class Nodo {
    constructor(pUbicacion, pLatitud = 0, pLongitud = 0) {
        this.ubicacion = pUbicacion;
        this.latitud = pLatitud;
        this.longitud = pLongitud;
    }
    toString() {
        return `Ubicacion: ${this.ubicacion}
                Latitud: ${this.latitud}
                Longuitud: ${this.longitud}`
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