"use strict";

//Button elements
const btn = document.querySelector(".btn");
const closeBtn = document.querySelector(".close");

//app section element
const appEl = document.querySelector("#app");
const appInput = document.querySelector("input");

//Request section elements
const requestEl = document.getElementById("request");
const requestInput = document.querySelector(".request-input");
const requestForm = document.querySelector(".request-form");

const form = document.querySelector("form");
const loginEl = document.querySelector(".login-section");
const mainEl = document.querySelector("main");
const cityName = document.querySelector(".city-name");
const cityDayNTime = document.querySelector(".city-date_time");
const mainTemp = document.querySelector(".temp-degree");
const greeting = document.querySelector(".greeting");
const userName = document.querySelector(".username");
const windEl = document.querySelector(".wind-pressure");
const sunriseEl = document.querySelector(".time");
const tempEl = document.querySelector(".temp-deg");
const weatherImg = document.querySelector(".weather-illustration-img");
const menuEl = document.querySelector(".menu");
const backEl = document.querySelector(".back");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

appInput.focus();
const API_KEY = "b63fcba4cca550c9f431d0e1b0a2ba13";

//handles all the login functionalities
const login = function () {
  form.addEventListener("submit", validateUser);
  btn.addEventListener("click", validateUser);

  function validateUser(e) {
    e.preventDefault();
    handleValidation();
  }

  function handleValidation() {
    if (appInput.value.includes(" ") || appInput.value === "") {
      alert(`Zeus says ${appInput.value} is not a valid name`);
    } else {
      appInput.value =
        appInput.value.slice(0, 1).toUpperCase() + appInput.value.slice(1);
      userName.textContent = `${appInput.value}`;
      alert(`Zeus says Welcome ${appInput.value}`);
      if (appEl.classList.contains("hidden")) {
        loginEl.classList.add("hidden");
        appEl.classList.remove("hidden");
      }
    }
  }

  getPosition();
};

login();

//gets the users location from geolocation api
function getPosition() {
  navigator.geolocation.getCurrentPosition(async function (position) {
    try {
      const { latitude, longitude } = position.coords;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      /////Populating the User Interface with API data
      displayWeatherUI(data);
    } catch (error) {
      console.error(err);
    }
  });
}

//Populates the User interface with the data from geolocation api
function displayWeatherUI(data) {
  //city Name
  cityName.textContent = data.name;

  //City date and time
  setInterval(() => {
    let date = new Date();
    cityDayNTime.innerHTML = `${
      days[date.getUTCDay().toString()]
    }, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }, 1000);

  //wind
  windEl.textContent = `${Math.trunc(data.wind.speed)}m/s`;

  //city Temperature
  [tempEl, mainTemp].forEach(
    (e) => (e.innerHTML = `${Math.floor(data.main.temp)}°C`)
  );

  //greeting
  if (new Date().getHours() >= 0 && new Date().getHours() < 12) {
    greeting.textContent = `Good Morning `;
  } else if (new Date().getHours() >= 12 && new Date().getHours() < 18) {
    greeting.textContent = `Good Afternoon `;
  } else if (new Date().getHours() >= 13 && new Date().getHours() < 23) {
    greeting.textContent = `Good Evening `;
  }

  //sunriseEl
  sunriseEl.textContent = `${new Date(data.sys.sunrise).getHours()}:${new Date(
    data.sys.sunrise
  ).getMinutes()}`;

  //Background Image
  if (data.weather[0].main === "Rain" || data.weather[0].main === "Clouds") {
    document.body.style.backgroundImage = "url(./images/stormy-cloud.jpg)";
    appEl.style.color = "#fff";
    weatherImg.src = "images/cloud.png";
  } else {
    document.body.style.backgroundImage =
      "url(./images/sunny-cloud-desktop.jpg)";
    weatherImg.src = "images/sun.svg";
  }
}

//Events that control the request section
requestForm.addEventListener("submit", requestLocation);
closeBtn.addEventListener("click", closeRequestSection);
menuEl.addEventListener("click", displayRequestSection);
backEl.addEventListener("click", handleReverse);

//gets the location requested by the user
function requestLocation(e) {
  e.preventDefault();

  if (requestInput.value === "") {
    alert("Zeus asks for a valid location");
  } else {
    async function requestNewLocation() {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${requestInput.value}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod === "404") {
        alert(`Zeus says ${requestInput.value} ${data.message}`);
      } else {
        menuEl.classList.add("hidden");
        backEl.classList.remove("hidden");
        appEl.classList.remove("hidden");
        requestEl.classList.add("hidden");
      }

      displayWeatherUI(data);
    }

    requestNewLocation();
  }
}

//Displays the request section
function displayRequestSection() {
  appEl.classList.add("hidden");
  requestEl.classList.remove("hidden");
  requestInput.focus();
}

//close the request section
function closeRequestSection() {
  requestEl.classList.add("hidden");
  appEl.classList.remove("hidden");
}

//taks the page back to it's normal location
function handleReverse() {
  backEl.classList.add("hidden");
  getPosition();
  menuEl.classList.remove("hidden");
}
