import "./main-BvDMBVPT.js";
import { S as ScrollSmoother } from "./ScrollSmoother-Dklour7k.js";
document.addEventListener("DOMContentLoaded", () => {
  init();
});
function init() {
  initScrollSmoother();
  mobileMenu();
  function initScrollSmoother() {
    ScrollSmoother.create({
      smooth: 1,
      smoothTouch: 0.1
    });
  }
  function mobileMenu() {
    const mobileMenu2 = document.querySelector(".mobile-menu");
    const menuBurger = document.querySelector(".header__burger");
    const menuClose = document.querySelector(".mobile-menu__close");
    const body = document.body;
    function openMenu() {
      mobileMenu2.classList.add("is-open");
      body.style.overflow = "hidden";
      menuBurger.setAttribute("aria-expanded", "true");
    }
    function closeMenu() {
      mobileMenu2.classList.remove("is-open");
      body.style.overflow = "";
      menuBurger.setAttribute("aria-expanded", "false");
    }
    menuBurger.addEventListener("click", openMenu);
    menuClose.addEventListener("click", closeMenu);
    mobileMenu2.addEventListener("click", (e) => {
      if (e.target === mobileMenu2) {
        closeMenu();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu2.classList.contains("is-open")) {
        closeMenu();
      }
    });
    const menuLinks = document.querySelectorAll('[data-toggle="menu-close"]');
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });
  }
}
