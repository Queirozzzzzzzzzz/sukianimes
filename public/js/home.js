var images = Array.from(document.querySelectorAll(".carousel-image"));
var currentIndex = 0;

// CAROUSEL

function updateCarousel() {
  // Remove 'active' class from all images
  images.forEach(function (image) {
    image.classList.remove("active");
  });

  // Add 'active' class to current image
  images[currentIndex].classList.add("active");

  // Update current index
  currentIndex = (currentIndex + 1) % images.length;

  // Call this function again after 5 seconds
  setTimeout(updateCarousel, 5000);
}

// Start the carousel
updateCarousel();

// Select next/previous divs
var contentDivs = Array.from(
  document.querySelectorAll(".home-preview .content-next-previous"),
);

contentDivs.forEach((contentDiv, i) => {
  var nextButton = contentDiv.parentElement.querySelector("#next");
  var previousButton = contentDiv.parentElement.querySelector("#previous");

  var currentSlideNumber = 0;
  nextButton.addEventListener("click", () => {
    // Increment the current slide number and call the function to update the content position
    currentSlideNumber++;
    updateContentPosition(i);
  });

  previousButton.addEventListener("click", () => {
    // Decrement the current slide number and call the function to update the content position
    currentSlideNumber--;
    updateContentPosition(i);
  });

  // Update the content position based on the current slide number
  function updateContentPosition(index) {
    var contentItems = Array.from(contentDiv.querySelectorAll(".content-item"));
    var itemWidth = contentItems[0].offsetWidth;
    var itemsPerSlide = 4;
    var totalWidth = itemWidth * itemsPerSlide; // Calculate the total width of 8 items

    // Check current slide number
    if (currentSlideNumber >= Math.ceil(contentItems.length / itemsPerSlide)) {
      currentSlideNumber = 0;
    } else if (currentSlideNumber < 0) {
      currentSlideNumber = Math.floor(contentItems.length / itemsPerSlide);
    }

    // Update the style property
    contentDivs[index].style.transform = `translateX(-${
      currentSlideNumber * totalWidth
    }px)`;
  }
});
