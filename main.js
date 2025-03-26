let userName = document.querySelector("#fname");
let userLastName = document.querySelector("#lname");
let emailField = document.querySelector("#email");
let inputRadios = document.querySelectorAll("input[type=radio]");
let textArea = document.querySelector("#msg");
let form = document.querySelector("#form1");
let consent = document.querySelector("#consent");
const userInputRegex = /^[a-zA-Z0-9]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const textAreaRegex = /\S+/;
let isChecked = false;
let isValid = true;
const errorElementName = document.querySelector("#fname-error");
const errorElementLname = document.querySelector("#lname-error");
const errorElementEmail = document.querySelector("#email-error");
const errorElementRadio = document.querySelector("#error-radio");
const errorElementTextArea = document.querySelector("#msg-error");
let consentError = document.querySelector("#error-consent");

const message1 = "This field is required";
const message2 = "Please enter a valid email address";
const message3 = "Please select a query type";

const modal = document.querySelector(".success");

let isFormValid = true;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  isFormValid &= validateField(
    userName,
    userInputRegex,
    errorElementName,
    message1
  );
  isFormValid &= validateField(
    userLastName,
    userInputRegex,
    errorElementLname,
    message1
  );
  isFormValid &= validateField(
    emailField,
    emailRegex,
    errorElementEmail,
    message2
  );
  isFormValid &= validateRadio(inputRadios, errorElementRadio, message3);
  paintRadio();
  isFormValid &= validateField(
    textArea,
    textAreaRegex,
    errorElementTextArea,
    message1
  );
  isFormValid &= validateConsent();


  if (isFormValid) {
    console.log("formulario enviado");
    modal.classList.add("active");
    modal.scrollIntoView({behavior: "smooth"});
    setTimeout(() => {
      modal.classList.remove("active");
    }, 5000);
    form.reset();
  }
});

function validateField(field, expRegex, errorElement, message) {
  if (field.value.match(expRegex)) {
    hiddenError(field, errorElement);
    return true;
  } else {
    showError(field, errorElement, message);
  }
  return false;
}

function validateRadio(radios, errorElement, errorMessage) {
  let isChecked = Array.from(radios).some((radio) => radio.checked);
  if (isChecked) {
    hiddenError(radios[0], errorElement);
    return true;
  } else {
    showError(radios[0], errorElement, errorMessage);
    return false;
  }
}

function showError(field, errorElementId, errorMessage) {
  field.classList.add("error");
  errorElementId.textContent = errorMessage;
  errorElementId.style.display = "block";
}

function hiddenError(field, errorElementId) {
  field.classList.remove("error");
  errorElementId.style.display = "none";
  document.querySelector(".container").classList.add("send");
}

function paintRadio() {
  inputRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      inputRadios.forEach((r) => {
        r.parentElement.classList.remove("checked");
      });

      if (radio.checked) {
        radio.parentElement.classList.add("checked");
        hiddenError(radio, errorElementRadio);
      } else {
        showError(radio, errorElementRadio, "Please check the box");
      }
    });
  });
}

function validateConsent() {
  if (consent.checked) {
    hiddenError(consent, consentError);
    return true;
  } else {
    showError(
      consent,
      consentError,
      "To submit this form, please consent to being contacted"
    );
    return false;
  }
}
