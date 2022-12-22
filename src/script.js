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
  cityElement.innerHTML = response.data.name;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);

  let feelsElement = document.querySelector("#feelsLike");
  feelsElement.innerHTML = Math.round(response.data.main.feels_like);

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let iconElement = document.querySelector("#mainWeather");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let fahrenheiTemperature = response.data.main.temp;
}

function searchCity(city) {
  let apiKey = "c2b924a522e7431434cbf7706f4b901f";
  let apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiWeatherURL).then(cityConditions);
}
function pinLocation(response) {
  let latitude = response.coords.latitude;
  let longitude = response.coords.longitude;

  let apiKey = "c2b924a522e7431434cbf7706f4b901f";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

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

function displayFahrenheit(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");

  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");

  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

let fahrenheitLink = document.querySelector("#farenheitLinks");
fahrenheitLink.addEventListener("click", displayFahrenheit);

function displayCelsius(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let celsiusTemperature = (fahrenheiTemperature - 32) / 1.8;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsiusLinks");
celsiusLink.addEventListener("click", displayCelsius);

let fahrenheiTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("click", citySubmit);

let currentButton = document.querySelector("#pinLocations");
currentButton.addEventListener("click", currentGeo);

searchCity("Charlotte");
