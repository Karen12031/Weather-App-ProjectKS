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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
			 <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
				<div class="weather-forecast-temperatures">
					  <span class="weather-forecast-temperature-max">
					${Math.round(forecastDay.temp.max)}° 
					</span>
					<span class="weather-forecast-temperature-min">
						${Math.round(forecastDay.temp.min)}° 
					</span>
				</div>
      </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2718952144ed077c12e7c160fb6fc351";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

let currentTime = new Date();
document.querySelector("#nowDated").innerHTML = formatDate(currentTime);

function cityConditions(response) {
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

  let iconElement = document.querySelector("#mainIcon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let fahrenheiTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "2718952144ed077c12e7c160fb6fc351";
  let apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiWeatherURL).then(cityConditions);
}
function pinLocation(response) {
  let latitude = response.coords.latitude;
  let longitude = response.coords.longitude;

  let apiKey = "2718952144ed077c12e7c160fb6fc351";
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
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("click", citySubmit);

let currentButton = document.querySelector("#pinLocations");
currentButton.addEventListener("click", currentGeo);

searchCity("Charlotte");
