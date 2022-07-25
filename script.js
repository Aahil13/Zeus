"use strict";

const form = document.querySelector("form");
const btn = document.querySelector(".btn");
const input = document.querySelector("input");
const loginEl = document.getElementById("login");

class Login {
  constructor(form) {
    this.form = form;

    btn.addEventListener("click", this.validateUser.bind(this));
    this.form.addEventListener("submit", this.validateUser.bind(this));
  }

  validateUser(e) {
    e.preventDefault();
    if (input.value.includes(" ") || input.value === "") {
      alert(`Zeus says ${input.value} is not a valid name`);
    } else {
      input.value =
        input.value.slice(0, 1).toUpperCase() + input.value.slice(1);
      console.log(input.value);
      alert(`Zeus says Welcome ${input.value}`);
      loginEl.classList.add("hidden");
    }
  }
}

const login = new Login(form);
