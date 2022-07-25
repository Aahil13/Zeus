"use strict";

const form = document.querySelector("form");
const btn = document.querySelector(".btn");
const input = document.querySelector("input");
const loginEl = document.getElementById("login");
const mainEl = document.querySelector("main");

class Login {
  constructor(form) {
    this.form = form;
    this.handleBtn();
    this.handleForm();
  }

  handleForm() {
    this.form.addEventListener("submit", this.validateUser.bind(this));
  }

  handleBtn() {
    btn.addEventListener("click", this.validateUser.bind(this));
  }

  validateUser(e) {
    e.preventDefault();
    this.handleValidation();
  }

  handleValidation() {
    if (input.value.includes(" ") || input.value === "") {
      alert(`Zeus says ${input.value} is not a valid name`);
    } else {
      input.value =
        input.value.slice(0, 1).toUpperCase() + input.value.slice(1);
      console.log(input.value);
      alert(`Zeus says Welcome ${input.value}`);
      loginEl.classList.contains("hidden")
        ? mainEl.classList.add("hidden")
        : loginEl.classList.add("hidden");
      // loginEl.classList.add("hidden");
      // main.style.display = "block";
    }
  }
}

const login = new Login(form);
