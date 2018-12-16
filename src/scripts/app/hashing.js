String.prototype.hashCode = function(max) {
    var hash = 0;
    if (!this.length) return hash;
    for (i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(max ? hash % max : hash);
};

class CeldaTabla {
    constructor(clave, ubicaciones) {
        this.clave = clave;
        this.ubicaciones = ubicaciones;
    }
}

class Hashing {
    constructor(ubicaciones, nombreIdentificador) {
        this.size = ubicaciones.length;
        this.tabla = [].fill.call({ length: this.size }, []);
        this.nombreIdentificador = nombreIdentificador;
        this.crearTabla(ubicaciones);
    }

    crearTabla(ubicaciones) {
        for (const ubicacion of ubicaciones) {
            this.insertar(ubicacion);
        }
    }

    codigoHash(clave) {
        return clave.hashCode(this.size);
    }

    insertar(ubicacion) {
        if (ubicacion.hasOwnProperty(this.nombreIdentificador)) {
            let hash = this.codigoHash(ubicacion[this.nombreIdentificador]);
            this.tabla[hash] = this.tabla[hash].concat(new CeldaTabla(ubicacion[this.nombreIdentificador], ubicacion));
        }
    }

    obtener(clave) {
        // debugger;
        let index = this.codigoHash(clave);
        let bucket = this.tabla[index];
        let resultado = [];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].clave === clave) {
                resultado.push(bucket[i].ubicaciones);
            }
        }
        return resultado;
    }

}

define(() => {
    return { Hashing }
});