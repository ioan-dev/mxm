import "./main-D7gjFCXa.js";
import { g as gsapWithCSS } from "./index-gFnrFzm-.js";
import { S as ScrollTrigger, a as ScrollSmoother } from "./ScrollSmoother-ChEnQjVM.js";
import { S as SplitText } from "./SplitText-gyKzut0F.js";
gsapWithCSS.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
document.addEventListener("DOMContentLoaded", () => {
  init();
});
function init() {
  initScrollSmoother();
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
    mm.add({ isLarge: "(min-width: 1024px)", isSmall: "(max-width: 1023px)" }, (context) => {
      let { isLarge, isSmall } = context.conditions;
      if (isLarge) {
        ScrollTrigger.create({
          id: "nav",
          trigger: ".projects__content",
          markers: true,
          start: "top 33.5%",
          pin: ".projects__nav-fixed"
        });
      }
    });
  }
}
