import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function scaleLogo() {
  let logo = document.querySelector('.logo-loader')
  let logoText = document.querySelector('.logo-loader__text')
  let trigger = document.querySelector('.hero__title')

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger,
      start: 'top top',
      end: 'end end-=500px',
      // markers: true,
      scrub: true,
    },
  })

  tl.to(logo, {scale: 0.5, duration: 1, transformOrigin: 'top left'})
    .to(logoText, {autoAlpha: 0}, '<')
}

export default scaleLogo
