"use strict";

const form = document.querySelector("form");
const btn = document.querySelector(".btn");
const input = document.querySelector("input");
const loginEl = document.getElementById("login");
const mainEl = document.querySelector("main");
const appEl = document.querySelector("#app");
const cityName = document.querySelector(".city-name");
const cityDayNTime = document.querySelector(".city-date_time");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const app = function () {
  form.addEventListener("submit", validateUser);
  btn.addEventListener("click", validateUser);

  function validateUser(e) {
    e.preventDefault();
    handleValidation();
  }

  function handleValidation() {
    if (input.value.includes(" ") || input.value === "") {
      alert(`Zeus says ${input.value} is not a valid name`);
    } else {
      input.value =
        input.value.slice(0, 1).toUpperCase() + input.value.slice(1);
      alert(`Zeus says Welcome ${input.value}`);
      if (appEl.classList.contains("hidden")) {
        loginEl.classList.add("hidden");
        appEl.classList.remove("hidden");
      }
    }
  }

  navigator.geolocation.getCurrentPosition(async function (position) {
    try {
      const { latitude, longitude } = position.coords;
      const API_KEY = "b63fcba4cca550c9f431d0e1b0a2ba13";
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );
      const data = await res.json();
      console.log(data);

      //Populating the User Interface with API data
      //city Name
      cityName.textContent = data.name;

      //City date and time
      setInterval(() => {
        let date = new Date();
        cityDayNTime.innerHTML = `${
          days[date.getUTCDay().toString()]
        } ${date.getHours()}:${date.getMinutes()}`;
      }, 1000);
    } catch (error) {
      console.error(err);
    }
  });
};

app();
