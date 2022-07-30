"use strict";

const form = document.querySelector("form");
const btn = document.querySelector(".btn");
const input = document.querySelector("input");
const loginEl = document.getElementById("login");
const mainEl = document.querySelector("main");
const app = document.querySelector("#app");

const login = function () {
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
      console.log(input.value);
      alert(`Zeus says Welcome ${input.value}`);
      input.value = "";
      if (app.classList.contains("hidden")) {
        loginEl.classList.add("hidden");
        app.classList.remove("hidden");
      }
    }
  }
};

login();
