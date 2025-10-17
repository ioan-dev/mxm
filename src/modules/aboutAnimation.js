import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import aboutSplit from '@/modules/aboutSplit.js'

gsap.registerPlugin(ScrollTrigger, SplitText)

async function aboutAnimation() {
  let subText = document.querySelectorAll('[data-split="about-subheader"]')
  let split = await aboutSplit()

  // Нужно собрать все элементы подписи about
  let mindLetter = gsap.utils.toArray('[data-about="mind-letter"]');
  let xFigure = gsap.utils.toArray('[data-about="x-figure"]');
  let matterLetter = gsap.utils.toArray('[data-about="matter-letter"]');


  gsap.set(split?.subheader.masks, { y: '-20vw' })
  gsap.set(split?.subheader.chars, { yPercent: 102 })

  gsap.set([mindLetter, xFigure, matterLetter], {yPercent: 101})

  let tlLetter = gsap.timeline({
    scrollTrigger: {
      trigger: split.subheader.words,
      start: 'top 60%',
      // markers: true,
    },
  })

  tlLetter.to(split?.subheader.chars, { yPercent: 0, stagger: 0.01 })

  let tlWordsMove = gsap.timeline({
    scrollTrigger: {
      trigger: split.subheader.masks,
      start: 'top 40%',
      end: 'bottom -20%',
      // markers: true,
      scrub: 0.8,
      once: true,
    },
  })

  tlWordsMove.to(split?.subheader.masks, { y: 0, duration: 2, stagger: 0.1 })
    .to(mindLetter, {yPercent: 0, stagger: -0.01, duration: 2}, '<')
    .to(xFigure, {yPercent: 0, duration: 2}, '<+=0.2')
    .to(matterLetter, {yPercent: 0, stagger: -0.01, duration: 2}, '<+=0.2')
}

export default aboutAnimation
