define([""], function() {
  let gestor = {};
  const divMapaId = "#";

  let origen = document.getElementById("slOrigen");
  let destino = document.getElementById("slDestino");
  let btnBuscarRuta = document.getElementById("btnRuta");
  let btnBuscar = document.getElementById("btnBuscar");
  let ipBuscar = document.getElementById("ipBuscar");
  let modal = document.getElementById("modalBusqueda");
  let loader = document.getElementById("loader");
  let content = document.getElementById("contenido");
  let divresult = document.getElementById("resultadoBusqueda");

  gestor.iniciar = () => {
    require(["apiGoogle", "mapa", "datos"], function(api, mapa, datos) {
      api.initMap();
      agregarEventos();
      api
        .obtenerTiempoDistancia(datos.ubicaciones, datos.conexiones)
        .then(function(value) {
          let tiempoDistancia = value;
          mapa.iniciarMapa(tiempoDistancia);

          api.dibujarConexiones(datos.ubicaciones, datos.conexiones);

          loader.setAttribute("hidden", "hidden");
          content.removeAttribute("hidden");
        });
    });
  };

  let agregarEventos = () => {
    origen.addEventListener("change", () => {
      if (origen.value != -1) {
        destino.removeAttribute("disabled");
      } else {
        if (destino.getAttribute("disabled") == null) {
          destino.setAttribute("disabled", "disabled");
          destino.value = -1;
        }
      }
    });

    btnBuscar.addEventListener("click", () => {
      if (origen.value != "") {
        require(["mapa", "sweet", "clases"], function(mapa) {
          let result = mapa.buscarPorUbicacion(ipBuscar.value);
          if (typeof result != "string") {
            swal({
              title: "Descripción:",
              content: getHtmlAlert(result),
              icon: "success",
              html: true
            });
          } else {
            swal({
              title: "Lo sentimos!",
              text: result,
              icon: "error",
              html: true
            });
          }
        });
      }
    });

    btnBuscarRuta.addEventListener("click", () => {
      require(["apiGoogle", "mapa"], function(api, mapa) {
        if (origen.value == -1) {
          // mostrar todas las rutas
          api.dibujarConexiones(mapa.datos.ubicaciones, mapa.datos.conexiones);
          divresult.innerHTML = "";
        } else {
          if (destino.value == -1) {
            // mostrar todas las adyacencias
            let resultAdy = mapa.buscarAdyacentes(origen.value);
            api.dibujarConexiones(mapa.datos.ubicaciones, resultAdy.Conexiones);
            getHtmlResultAdya(resultAdy.adyacentes);
          } else {
            // busca el camino minimo
            //console.log(mapa.caminoMinimo(origen.value, destino.value));
            //api.dibujarCaminoMinimo(mapa.caminoMinimo(origen.value, destino.value););
          }
        }
      });
    });
  };

  let getHtmlAlert = nodo => {
    let result = `<div class="card">
                    <div class="card-body">
                    <h5 class="card-title">Ubicación: ${nodo[0].ubicacion}</h5>
                    <p class="card-text"><strong>Latitud: </strong>${
                      nodo[0].latitud
                    }</p>
                    <p class="card-text"><strong>Longitud: </strong>${
                      nodo[0].longitud
                    }</p>
                    </div>
                </div>`;
    modal.innerHTML = result;
    return modal;
  };

  let getHtmlResultAdya = adyacencias => {
    console.log(adyacencias);
    let result = `
    <a href="#" id="btnClose" class="close" data-dismiss="alert" aria-label="close">&times;</a>
    <br />
    <table class="table table-hover animated fast fadeIn">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Ubicación</th>
                        <th scope="col">Latitud</th>
                        <th scope="col">Longuitud</th>
                        <th scope="col">Tiempo</th>
                        <th scope="col">Distancia</th>
                      </tr>
                    </thead>
                    <tbody>`;
    for (const adyacencia of adyacencias) {
      result += `
        <tr>
          <th scope="row">${adyacencia.id}</th>
          <td>${adyacencia.Ubicación.ubicacion}</td>
          <td>${adyacencia.Ubicación.latitud}</td>
          <td>${adyacencia.Ubicación.longitud}</td>
          <td>${adyacencia.Tiempo}</td>
          <td>${adyacencia.Distancia}</td>
        </tr>
      `;
    }
    result += ` </tbody> </table>`;
    divresult.innerHTML = result;
    document.getElementById("btnClose").addEventListener("click", () => {
      divresult.innerHTML = "";
    });
  };
  return gestor;
});
