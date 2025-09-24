import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

 function moveImages() {

    let images = document.querySelectorAll('.hero__image--move');

    gsap.set(images, {yPercent: 100, autoAlpha: 1});

   let tl = gsap.timeline({
     scrollTrigger: {
       trigger: '.hero',
       start: 'top+=10% center',
       markers: true
     }
   })


    tl.to(images, {
      yPercent: 0,
      stagger: 0.2,
      duration: 0.9,
      ease: 'power1.out',
    })
}



export default moveImages;
