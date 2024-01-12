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

window.addEventListener("load", adjustInfoTitle);

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

var element = document.getElementById("series-seasons");
if (element !== null) {
  element.addEventListener("change", function () {
    var selectedOption = this.options[this.selectedIndex];
    const url = selectedOption.getAttribute("data-url");
    if (url !== null) {
      window.location.href = url;
    }
  });
}

/* Manage filter floating window */

document.addEventListener("DOMContentLoaded", function () {
  var floatingWindows = document.querySelectorAll(".filter, .content .more");
  console.log(floatingWindows);

  floatingWindows.forEach(function (floatingWindow) {
    floatingWindow.addEventListener("click", function (event) {
      event.stopPropagation();
      var filterOptions = floatingWindow.querySelector(".options");
      filterOptions.style.display =
        filterOptions.style.display === "none" ? "" : "none";
    });
  });

  var body = document.querySelector("body");

  body.addEventListener("click", function (event) {
    floatingWindows.forEach(function (floatingWindow) {
      var filterOptions = floatingWindow.querySelector(".options");
      if (
        event.target !== floatingWindow &&
        !floatingWindow.contains(event.target)
      ) {
        filterOptions.style.display = "none";
      }
    });
  });
});
