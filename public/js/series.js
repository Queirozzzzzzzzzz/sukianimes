// Activate/deactivate more detailed informations

const moreDetailsElement = document.querySelector(".more-details");
const fewerDetailsElement = document.querySelector(".fewer-details");
const seriesInfoElement = document.querySelector(".series .info");

function activateMoreDetails() {
  seriesInfoElement.classList.add("active");
  moreDetailsElement.style.display = "none";
  fewerDetailsElement.style.display = "block";
}

function activateFewerDetails() {
  seriesInfoElement.classList.remove("active");
  fewerDetailsElement.style.display = "none";
  moreDetailsElement.style.display = "block";
}

moreDetailsElement.addEventListener("click", activateMoreDetails);
fewerDetailsElement.addEventListener("click", activateFewerDetails);

function adjustInfoTitle() {
  let h1 = document.querySelector(".series .info h1");
  let charCount = h1.innerText.length;
  let maxCharValue = window.innerWidth <= 600 ? 9 : 36;
  let bigFontSize = "3em";
  let smallFontSize = window.innerWidth <= 600 ? "1em" : "2em";

  if (charCount <= maxCharValue) {
    h1.style.fontSize = bigFontSize;
  } else if (charCount > maxCharValue) {
    h1.style.fontSize = smallFontSize;
  }
}

window.addEventListener("load", adjustInfoTitle);

document
  .getElementById("series-seasons")
  .addEventListener("change", function () {
    var selectedOption = this.options[this.selectedIndex];
    const url = selectedOption.getAttribute("data-url");
    window.location.href = url;
  });
