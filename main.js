//obtener el DOM de los elementos

const ciudad = document.getElementById("ciudad");
const temperatura = document.getElementById("temperatura");
const informacion = document.getElementById("informacion");
const humedad = document.getElementById("humedad");
const viento = document.getElementById("viento");
const icono = document.getElementsByClassName("clima");
//API Key

const apiKey = "d756ee2170dd5726b120d20afc2e517d";

function Clima() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let latitud = position.coords.latitude;
      let longitud = position.coords.longitude;
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiKey}`;

      // Peticion fetch
      fetch(url)
        .then((respuesta) => respuesta.json())
        .then((info) => {
          // Introducimos el DOM a los elementos que tomamos del API
          console.log(info);
          let cityApi = info.name;
          ciudad.textContent = cityApi;

          let tempApi = info.main.temp;
          temperatura.textContent = `${Math.round(tempApi - 273.15)} C°`;

          let infoApi = info.weather[0].description;
          informacion.textContent = infoApi;

          let humApi = info.main.humidity;
          humedad.textContent = `${humApi} %`;

          let vientoApi = Math.round(info.wind.speed * 3.6);
          viento.textContent = `${vientoApi} Km/h`;

          let iconoApi = info.weather[0].icon;
          let img = document.createElement("img");
          img.src = `http://openweathermap.org/img/wn/${iconoApi}.png`;
          img.classList.add("icono");
          icono[0].appendChild(img);
        })
        .catch((error) => console.error(error));
    });
  } else {
    console.log(
      "Ubicacion no disponible en este dispositivo, porfavor autorice el acceso a la ubicacion para el correcto funcionamiento"
    );
  }
}

Clima();
