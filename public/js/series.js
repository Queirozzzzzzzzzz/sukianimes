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
  let smallFontSize = window.innerWidth <= 600 ? "1.5em" : "2em";

  if (charCount <= maxCharValue) {
    h1.style.fontSize = bigFontSize;
  } else if (charCount > maxCharValue) {
    h1.style.fontSize = smallFontSize;
  }
}

/* Load season */

window.addEventListener("load", adjustInfoTitle);

document
  .getElementById("series-seasons")
  .addEventListener("change", function () {
    var selectedOption = this.options[this.selectedIndex];
    const url = selectedOption.getAttribute("data-url");
    window.location.href = url;
  });

/* Manage filter floating window */

document.addEventListener("DOMContentLoaded", function () {
  var filter = document.querySelector(".filter");
  var body = document.querySelector("body");

  filter.addEventListener("click", function (event) {
    event.stopPropagation();
    var filterOptions = document.querySelector(".filter-options");
    filterOptions.style.display =
      filterOptions.style.display === "none" ? "" : "none";
  });

  body.addEventListener("click", function (event) {
    var filterOptions = document.querySelector(".filter-options");
    if (event.target !== filter && !filter.contains(event.target)) {
      filterOptions.style.display = "none";
    }
  });
});
