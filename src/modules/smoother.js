import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import moveImages from '@/modules/moveImages.js'
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

function smoother() {
  ScrollSmoother.create({
    smooth: 1,
    effects: true,
    smoothTouch: 0.1
  })

}

export default smoother
