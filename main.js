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
  }
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
    showError();
  } else {
    confirmPasswordError.textContent = "";
  }
});
