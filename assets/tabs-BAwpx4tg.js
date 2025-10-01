import { g as gsapWithCSS } from "./index-CUhG7ImZ.js";
import { S as ScrollTrigger, a as ScrollSmoother } from "./ScrollSmoother-ChEnQjVM.js";
gsapWithCSS.registerPlugin(ScrollTrigger, ScrollSmoother);
document.addEventListener("DOMContentLoaded", () => {
  init();
});
function init() {
  ScrollSmoother.create({
    smooth: 1,
    effects: true,
    smoothTouch: 0.1
  });
  ScrollTrigger.create({
    id: "hero",
    trigger: ".hero",
    pinnedContainer: ".hero",
    start: "top top",
    end: "bottom bottom",
    // markers: true,
    pin: ".hero__inner"
  });
  ScrollTrigger.create({
    trigger: ".service",
    start: "top 5%",
    end: "bottom+=100% center",
    pin: true,
    // pinSpacing: false,
    markers: true
  });
  document.querySelectorAll(".accordion").forEach((accordion) => {
    const items = accordion.querySelectorAll(".accordion__item");
    items.forEach((item) => {
      item.querySelector(".accordion__header");
      const content = item.querySelector(".accordion__content");
      content.style.maxHeight = "0px";
      item.addEventListener("click", () => {
        const isOpen = content.style.maxHeight !== "0px";
        items.forEach((otherItem) => {
          const otherContent = otherItem.querySelector(".accordion__content");
          otherContent.style.maxHeight = "0px";
          otherItem.classList.remove("is-open");
        });
        if (!isOpen) {
          content.style.maxHeight = content.scrollHeight + "px";
          item.classList.add("is-open");
        }
      });
    });
  });
  const buttons = document.querySelectorAll("[data-service-btn]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-service-btn");
      buttons.forEach((btn) => {
        btn.classList.remove("service__btn--active");
      });
      button.classList.add("service__btn--active");
      document.querySelectorAll("[data-service-accordion]").forEach((item) => {
        item.classList.remove("accordion--active");
      });
      const accordionItem = document.querySelector(`[data-service-accordion="${index}"]`);
      if (accordionItem) {
        accordionItem.classList.add("accordion--active");
      }
    });
  });
}
