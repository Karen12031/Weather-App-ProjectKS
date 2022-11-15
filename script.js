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

  document.querySelector("#cityHeadline").innerHTML = response.data.city;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement = Math.round(response.data.temperature.current);

  let humidityElement = document.querySelector("#humidity");
  humidityElement = Math.round(response.data.temperature.humidity);

  let feelsElement = document.querySelector("#feelsLike");
  feelsElement = Math.round(response.data.temperature.feels_like);

  let windElement = document.querySelector("#wind");
  windElement = Math.round(response.data.wind.speed);

  document.querySelector("#icons").setAttribute = response.data.condition.icon;

  document.querySelector("#description").innerHTML =
    response.data.condition.description;
}
function searchCity(city) {
  let apiKey = "83f300145oa41d134baet569cb092ae8";
  let apiWeatherURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiWeatherURL).then(cityConditions);
}
function pinLocation(response) {
  let apiKey = "83f300145oa41d134baet569cb092ae8";

  let latitude = response.coordinates.latitude;
  let longitude = response.coordinates.longitude;
  let apiURL = `https://api.shecodes.io/weather/v1/?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=imperial`;

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
searchForm.addEventListener("click", citySubmit);

let currentButton = document.querySelector("#pinLocations");
currentButton.addEventListener("click", currentGeo);
