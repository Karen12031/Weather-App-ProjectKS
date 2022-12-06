function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let min = date.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }

  let currentDay = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[currentDay];
  return `${day}, ${hours}:${min}`;
}

let currentTime = new Date();
document.querySelector("#nowDated").innerHTML = formatDate(currentTime);

function cityConditions(response) {
  console.log(response.data);

  let cityElement = document.querySelector("#cityHeadline");
  cityElement.innerHTML = response.data.city;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);

  let feelsElement = document.querySelector("#feelsLike");
  feelsElement.innerHTML = Math.round(response.data.temperature.feels_like);

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let iconElement = document.querySelector("#icons");
  iconElement.setAttribute =
    ("src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "83f300145oa41d134baet569cb092ae8";
  let apiWeatherURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiWeatherURL).then(cityConditions);
}
function pinLocation(response) {
  let apiKey = "83f300145oa41d134baet569cb092ae8";

  let lat = response.coordinates.latitude;
  let long = response.coordinates.longitude;
  let apiURL = `https://api.shecodes.io/weather/v1/current?lon=${long}&lat=${lat}&key=${apiKey}`;

  axios.get(apiURL).then(cityConditions);
}

function currentGeo(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(pinLocation);
}

function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searching").value;
  searchCity(city);
}

searchCity();

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySubmit);

let currentButton = document.querySelector("#pinLocations");
currentButton.addEventListener("click", currentGeo);

function displayFahrenheit(event) {
  event.preventDefault();
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#farenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

function displayCelsius(event) {
  event.preventDefault();
  let celsiusTemperature = ((40 - 32.0) * 5.0) / 9.0;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);
