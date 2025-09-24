import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(SplitText)

function splitHeroTitle() {
  let title = document.querySelector('[data-animation="hero-title"]')

  return document.fonts.ready.then(() => {
    let split = SplitText.create(title, {
      type: 'chars, words, lines',
      charsClass: 'char',
      mask: 'lines',
    })
    return split;
  })
}

export default splitHeroTitle
