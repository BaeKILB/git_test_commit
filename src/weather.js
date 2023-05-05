const weatherInfo = document.querySelector("#weather-info");

function onGeoOK(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const APIkey = "2cf1f2638c8aaedbd309de7989369855";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;

  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      console.log(data);
      const weather = document.querySelector("#weather-info #weather");
      const city = document.querySelector("#weather-info #city");
      const temperature = document.querySelector("#weather-info #temperature");

      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main}`;
      temperature.innerText = `${Math.round(
        parseFloat(data.main.temp) - 273.15
      )} °C`;
    });
}

function onGeoError() {
  alert("Sorry Can't find you. Please check your browser location option");
}
navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError);
