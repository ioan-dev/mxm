import "./main-BvDMBVPT.js";
import { g as gsapWithCSS } from "./index-gFnrFzm-.js";
document.addEventListener("DOMContentLoaded", () => {
  init();
});
function init() {
  const teamItems = document.querySelectorAll(".team__item");
  const showImage = document.querySelector(".team__show-image img");
  const showName = document.querySelector(".team__show-name");
  const showPost = document.querySelector(".team__show-post");
  let isAnimating = false;
  function updateTeamShow(name, post, imageSrc, activeItem) {
    if (isAnimating) return;
    teamItems.forEach((item) => item.classList.remove("active"));
    activeItem.classList.add("active");
    isAnimating = true;
    gsapWithCSS.to([showName, showPost, showImage], {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        showName.textContent = name;
        showPost.textContent = post;
        showImage.src = imageSrc;
        gsapWithCSS.to([showName, showPost, showImage], {
          opacity: 1,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            isAnimating = false;
          }
        });
      }
    });
  }
  teamItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const name = item.getAttribute("data-team-name");
      const post = item.getAttribute("data-team-post");
      const imageSrc = item.querySelector("img").src;
      updateTeamShow(name, post, imageSrc, item);
    });
  });
  const firstItem = teamItems[0];
  firstItem.classList.add("active");
  updateTeamShow(
    firstItem.getAttribute("data-team-name"),
    firstItem.getAttribute("data-team-post"),
    firstItem.querySelector("img").src,
    firstItem
  );
}
