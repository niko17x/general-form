const mainForm = document.querySelector("#main-form");
const firstNameInput = document.querySelector("#first-name");
const firstNameError = document.querySelector(".first-name-error");
const lastNameInput = document.querySelector("#last-name");
const lastNameError = document.querySelector(".last-name-error");
const emailInput = document.querySelector("#email");
const emailError = document.querySelector(".email-error");
const countryInput = document.querySelector("#country");
const countryError = document.querySelector(".country-error");
const zipCodeInput = document.querySelector("#zip-code");
const zipCodeError = document.querySelector(".zip-code-error");
const passwordInput = document.querySelector("#password");
const passwordError = document.querySelector(".password-error");
const confirmPasswordInput = document.querySelector("#confirm-password");
const confirmPasswordError = document.querySelector(".confirm-password-error");

const LOCAL_STORAGE_USER_LIST = "data.userList";

const userList =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_LIST)) || [];

function save() {
  localStorage.setItem(LOCAL_STORAGE_USER_LIST, JSON.stringify(userList));
}

class UserObj {
  constructor(
    firstName,
    lastName,
    email,
    country,
    zipCode,
    password,
    confirmPassword
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.country = country;
    this.zipCode = zipCode;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}

const newUser = new UserObj();

function createUser() {
  newUser.firstName = firstNameInput.value;
  newUser.lastName = lastNameInput.value;
  newUser.email = emailInput.value;
  newUser.country = countryInput.value;
  newUser.zipCode = zipCodeInput.value;
  newUser.password = passwordInput.value;
  newUser.confirmPassword = confirmPasswordInput.value;
}

function showError() {
  if (firstNameInput.validity.valueMissing) {
    firstNameError.textContent = "First name is required.";
  }

  if (lastNameInput.validity.valueMissing) {
    lastNameError.textContent = "Last name is required.";
  }

  if (emailInput.validity.valueMissing) {
    emailError.textContent = "Please enter email.";
  } else if (emailInput.validity.typeMismatch) {
    emailError.textContent = "Needs to be a valid email address.";
  }

  if (document.querySelector("select").value.includes("Select")) {
    countryError.innerText = "Please select a country.";
  }

  if (
    zipCodeInput.validity.valueMissing ||
    zipCodeInput.validity.patternMismatch ||
    zipCodeInput.validity.tooShort
  ) {
    zipCodeError.textContent = "Must be a valid zip code.";
  }

  if (passwordInput.validity.valueMissing || passwordInput.validity.tooShort) {
    passwordError.textContent = "Password must be at least 8 characters.";
  }

  if (confirmPasswordInput.validity.valueMissing) {
    confirmPasswordError.textContent = "Please confirm password.";
  } else if (confirmPasswordInput.value !== passwordInput.value) {
    confirmPasswordError.textContent = "Passwords do not match.";
  }
}

function helperValidate(typeInput, typeError) {
  if (typeInput.validity.valid) {
    typeError.textContent = "";
    typeError.className = "error";
    typeError.classList.add("check");
  } else {
    showError();
  }
}

firstNameInput.addEventListener("input", () => {
  helperValidate(firstNameInput, firstNameError);
});

lastNameInput.addEventListener("input", () => {
  helperValidate(lastNameInput, lastNameError);
});

emailInput.addEventListener("input", () => {
  helperValidate(emailInput, emailError);
});

zipCodeInput.addEventListener("input", () => {
  helperValidate(zipCodeInput, zipCodeError);
});

mainForm.addEventListener("submit", (e) => {
  if (
    !firstNameInput.validity.valid ||
    !lastNameInput.validity.valid ||
    !emailInput.validity.valid ||
    !countryInput.validity.valid ||
    !zipCodeInput.validity.valid ||
    !passwordInput.validity.valid ||
    !confirmPasswordInput.validity.valid
  ) {
    e.preventDefault();
    showError();
  } else {
    // Take form input values and store data as objects:

    createUser();
    userList.push(newUser);
    save();
  }
  e.preventDefault();
});

// Validate Country selection (non-input element):

document.querySelector("select").addEventListener("input", () => {
  if (countryInput.value.includes("Select")) {
    // countryError.innerText = "Please select a country";

    showError();
  } else {
    countryError.innerText = "";
  }
});

passwordInput.addEventListener("input", () => {
  helperValidate(passwordInput, passwordError);
});

confirmPasswordInput.addEventListener("input", () => {
  if (confirmPasswordInput.value !== passwordInput.value) {
    confirmPasswordError.classList.remove("check");
    showError();
  } else {
    confirmPasswordError.className = "check";
    confirmPasswordError.textContent = "";
  }
});
