import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import aboutSplit from '@/modules/aboutSplit.js'

gsap.registerPlugin(ScrollTrigger, SplitText)

async function aboutAnimation() {
  let subText = document.querySelectorAll('[data-split="about-subheader"]')
  let split = await aboutSplit()

  gsap.set(split?.subheader.words, { y: '-20vw' })
  gsap.set(split?.subheader.chars, { yPercent: 102 })

  console.log(subText)

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: subText,
      start: 'top center',
      markers: true,
    },
  })

  tl.to(split?.subheader.chars, { yPercent: 0, stagger: 0.01 })
  tl.to(split?.subheader.words, { yPercent: 0, stagger: 0.1 })
}

export default aboutAnimation
