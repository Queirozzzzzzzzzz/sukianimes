window.onload = function () {
  const body = document.querySelector("body");
  const navbarItem = document.querySelector("#navbar-icon");
  const navbarItems = document.querySelector(".navbar-items");

  // Activate or deactivate navbar items and page scroll
  function togglenavbarItems() {
    if (!navbarItems.classList.contains("active")) {
      navbarItem.classList.add("active");
      navbarItems.classList.add("active");
      body.style.overflow = "hidden";
    } else {
      navbarItem.classList.remove("active");
      navbarItems.classList.remove("active");
      body.style.overflow = "visible";
    }
  }

  // Event listener for navbar items
  if (navbarItem && navbarItems) {
    navbarItem.addEventListener("click", togglenavbarItems);
  }
};
