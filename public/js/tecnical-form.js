document.addEventListener("DOMContentLoaded", () => {
  var inputs = ["email", "password"];

  for (let i = 0; i < inputs.length; i++) {
    let inputId = inputs[i];
    document
      .querySelector(`#${inputId}`)
      .addEventListener("input", function () {
        let labelElement = document.querySelector(`label[for='${inputId}']`);
        if (this.value !== "") {
          labelElement.style.fontSize = "1.2em";
          labelElement.style.color = "var(--purple-second)";
          labelElement.style.marginTop = "0vh";
        } else {
          labelElement.style.fontSize = "";
          labelElement.style.color = "";
          labelElement.style.margin = "";
        }
      });
  }
});
