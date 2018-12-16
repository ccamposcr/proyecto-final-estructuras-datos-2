define(['datos'], () => {

    let hash = {};

    String.prototype.hashCode = function (max) {
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

    class hashing {
        constructor(ubicaciones, nombreIdentificador) {
            this.table = [];
            this.crearTabla(ubicaciones);
            this.nombreIdentificador = nombreIdentificador;
            this.crearTabla(ubicaciones);
        }
    
        crearTabla(ubicaciones) {
            var value = 0;
            for (var i = 0; i < ubicaciones.length; i++) {
                ubicaciones[i] = value;
            }
            this.tabla = this.tabla.fill.call({ length: this.value }, []);
            for (const ubicaciones of ubicaciones) {
                this.insertar(ubicaciones);
            }
        }

        codigoHash(clave) {
            switch (typeof clave) {
                case 'string':
                    return clave.hashCode(this.size);
                default:
                    return Math.abs(clave % this.size);
            }
        }

        funcionaHash() {

        }

        insertar() {
            if (ubicaciones.hasOwnProperty(this.nombreIdentificador)) {
                let hash = this.codigoHash(ubicaciones[this.nombreIdentificador]);
                this.tabla[hash].push(new CeldaTabla(ubicaciones[this.nombreIdentificador], ubicaciones));
            }
        }

        obtener(clave) {
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

    return hash;

});

