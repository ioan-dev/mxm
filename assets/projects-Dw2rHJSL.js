import "./main-BvDMBVPT.js";
import { g as gsapWithCSS } from "./index-gFnrFzm-.js";
import { S as ScrollTrigger, a as ScrollSmoother } from "./ScrollSmoother-ChEnQjVM.js";
import { S as SplitText } from "./SplitText-gyKzut0F.js";
gsapWithCSS.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
document.addEventListener("DOMContentLoaded", () => {
  init();
});
function init() {
  initScrollSmoother();
  initHoverSync();
  function initHoverSync() {
    const navItems = document.querySelectorAll(".projects__nav-item");
    const contentItems = document.querySelectorAll(".projects__content-item");
    const syncItems = (index, isActive) => {
      const navItem = document.querySelector(
        `.projects__nav-item[data-index="${index}"]`
      );
      const contentItem = document.querySelector(
        `.projects__content-item[data-index="${index}"]`
      );
      if (isActive) {
        navItem == null ? void 0 : navItem.classList.add("is-active");
        contentItem == null ? void 0 : contentItem.classList.add("is-active");
      } else {
        navItem == null ? void 0 : navItem.classList.remove("is-active");
        contentItem == null ? void 0 : contentItem.classList.remove("is-active");
      }
    };
    navItems.forEach((navItem) => {
      navItem.addEventListener("mouseenter", () => {
        const index = navItem.dataset.index;
        syncItems(index, true);
      });
      navItem.addEventListener("mouseleave", () => {
        const index = navItem.dataset.index;
        syncItems(index, false);
      });
    });
    contentItems.forEach((contentItem) => {
      contentItem.addEventListener("mouseenter", () => {
        const index = contentItem.dataset.index;
        syncItems(index, true);
      });
      contentItem.addEventListener("mouseleave", () => {
        const index = contentItem.dataset.index;
        syncItems(index, false);
      });
    });
  }
  function initScrollSmoother() {
    ScrollSmoother.create({
      smooth: 1,
      smoothTouch: 0.1
    });
    document.querySelector(".projects__nav-wrapper");
    document.querySelector(".projects__nav");
    document.querySelector(".projects__content");
    gsapWithCSS.utils.toArray(".projects__content-item");
    gsapWithCSS.utils.toArray(".projects__nav-item");
    let mm = gsapWithCSS.matchMedia();
    mm.add(
      { isLarge: "(min-width: 1024px)", isSmall: "(max-width: 1023px)" },
      (context) => {
        let { isLarge, isSmall } = context.conditions;
      }
    );
  }
}
