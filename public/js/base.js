window.onload = function () {
  const menuItem = document.querySelector("#menu");
  const navbarItems = document.querySelector(".navbar-items");

  // Activate or deactivate navbar items
  function toggleNavbarItems() {
    if (
      navbarItems.style.display === "none" ||
      navbarItems.style.display == ""
    ) {
      navbarItems.style.display = "flex";
    } else {
      navbarItems.style.display = "none";
    }
  }

  // Event listener for navbar items
  if (menuItem && navbarItems) {
    menuItem.addEventListener("click", toggleNavbarItems);
  }
};
