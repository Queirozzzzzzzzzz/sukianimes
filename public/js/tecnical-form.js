document.addEventListener("DOMContentLoaded", () => {
  var inputs = ["username", "email", "password", "password-1", "password-2"];

  for (let i = 0; i < inputs.length; i++) {
    let inputId = inputs[i];
    let inputElement = document.getElementById(inputId);

    if (inputElement) {
      document
        .querySelector(`#${inputId}`)
        .addEventListener("input", function () {
          let input = document.getElementById(inputId);
          let labelElement = document.querySelector(`label[for='${inputId}']`);
          if (this.value !== "") {
            labelElement.style.fontSize = "1.5em";
            labelElement.style.color = "var(--purple-second)";
            input.style.borderColor = "var(--purple-base)";
          } else {
            labelElement.style.fontSize = "";
            labelElement.style.color = "";
            labelElement.style.margin = "";
            input.style.borderColor = "";
          }
        });
    }
  }
});
