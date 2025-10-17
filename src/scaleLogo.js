import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function scaleLogo() {
  let logo = document.querySelector('.logo-loader')
  let logoText = document.querySelector('.logo-loader__text')
  let trigger = document.querySelector('.hero__title')

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: '40%',
      scrub: true,
    },
  })

  tl.to(logo, {scale: 0.4, duration: 1, transformOrigin: 'top left'})
    .to(logoText, {autoAlpha: 0, yPercent: -300}, '<')
}

export default scaleLogo
