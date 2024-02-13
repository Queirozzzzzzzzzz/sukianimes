import "/components/css/index.css";
import Layout from "/components/layout.js";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  // Navbar
  useEffect(() => {
    const toggleNavbarItems = () => {
      const navbarItem = document.querySelector("#navbar-icon");
      const navbarItems = document.querySelector(".navbar-items");
      const body = document.querySelector("body");

      if (!navbarItems.classList.contains("active")) {
        navbarItem.classList.add("active");
        navbarItems.classList.add("active");
        body.style.overflow = "hidden";
      } else {
        navbarItem.classList.remove("active");
        navbarItems.classList.remove("active");
        body.style.overflow = "visible";
      }
    };

    const navbarIcon = document.querySelector("#navbar-icon");
    if (navbarIcon) {
      navbarIcon.addEventListener("click", toggleNavbarItems);
    }

    return () => {
      if (navbarIcon) {
        navbarIcon.removeEventListener("click", toggleNavbarItems);
      }
    };
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
