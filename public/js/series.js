// Activate/deactivate more detailed informations

const moreDetailsElement = document.querySelector(".more-details");
const fewerDetailsElement = document.querySelector(".fewer-details");
const seriesInfoElement = document.querySelector(".series .info");

function activateMoreDetails() {
  seriesInfoElement.style.height = "auto";
  moreDetailsElement.style.display = "none";
  fewerDetailsElement.style.display = "block";
}

function activateFewerDetails() {
  seriesInfoElement.style.height = "30vh";
  fewerDetailsElement.style.display = "none";
  moreDetailsElement.style.display = "block";
}

moreDetailsElement.addEventListener("click", activateMoreDetails);
fewerDetailsElement.addEventListener("click", activateFewerDetails);
