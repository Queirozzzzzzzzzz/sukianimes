window.onload = function () {
  const menuItem = document.querySelector("#menu");
  const navbarItems = document.querySelector(".navbar-items");
  const header = document.querySelector("header");

  // Activate or deactivate navbar items
  function toggleNavbarItems() {
    if (
      navbarItems.style.display === "none" ||
      navbarItems.style.display == ""
    ) {
      navbarItems.style.display = "block";
      header.style.position = "fixed";
    } else {
      navbarItems.style.display = "none";
      header.style.position = "absolute";
    }
  }

  // Event listener for navbar items
  if (menuItem && navbarItems) {
    menuItem.addEventListener("click", toggleNavbarItems);
  }
};
