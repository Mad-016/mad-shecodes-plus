let currentTime = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentHours = date.getHours();
  if (currentHours < 10) currentHours = "0" + currentHours;
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) currentMinutes = "0" + currentMinutes;
  let currentDay = days[date.getDay()];
  let currentDate = date.getDate();
  let currentMonth = months[date.getMonth()];
  let currentYear = date.getFullYear();
  let formattedDate = `${currentHours}:${currentMinutes} on ${currentDay}, ${currentDate} ${currentMonth} ${currentYear}`;

  return formattedDate;
}
let theDate = document.querySelector("#current-date");
theDate.innerHTML = formatDate(currentTime);

function showTemperature(response) {
  let city = response.data.name;
  let heading = document.querySelector("h1");
  heading.innerHTML = `${city}`;
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#the-value");
  temp.innerHTML = `${temperature}`;
  let temp_min = Math.round(response.data.main.temp_min);
  let lowtemp = document.querySelector("#min-temp");
  lowtemp.innerHTML = `${temp_min}ºC`;
  let temp_max = Math.round(response.data.main.temp_max);
  let hightemp = document.querySelector("#max-temp");
  hightemp.innerHTML = `${temp_max}ºC`;
  let country = response.data.sys.country;
  let location = document.querySelector("#country");
  location.innerHTML = `${country}`;
  let description = response.data.weather[0].description;
  let describe = document.querySelector("#description");
  describe.innerHTML = `${description}`;
  let humidity = response.data.main.humidity;
  let humid = document.querySelector("#humidity");
  humid.innerHTML = `${humidity}%`;
  let wind = Math.round(3.6 * response.data.wind.speed);
  let windy = document.querySelector("#wind");
  windy.innerHTML = `${wind}`;
}

function showCity(event) {
  event.preventDefault();
  let typedCity = document.querySelector("#searching");

  let apiKey = "82f33736fe5d08022fb7076137f7ac18";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${typedCity.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

let revealCity = document.querySelector("#the-search-form");
revealCity.addEventListener("submit", showCity);

function showPosition(position) {
  let apiKey = "82f33736fe5d08022fb7076137f7ac18";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

let revealTemp = document.querySelector("#current-city");
revealTemp.addEventListener("click", showPosition);

navigator.geolocation.getCurrentPosition(showPosition);
