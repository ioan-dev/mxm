import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(SplitText)

function oneLineText() {
  return document.fonts.ready.then(() => {
    let splitting = SplitText.create('[data-split="one-line"]', {
      type: 'chars',
      charsClass: 'char',
      smartWrap: true,
    });
    return splitting;
  });
}

export { oneLineText }


