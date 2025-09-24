
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(SplitText)

function heroSplit() {
  let headerItems = document.querySelectorAll('[data-split="header"]')
  let title = document.querySelector('[data-animation="hero-title"]')

  return document.fonts.ready.then(() => {
    const splitTitle = SplitText.create(title, {
      type: 'chars, words, lines',
      charsClass: 'char',
      mask: "lines"
    });

    const splitHeader = SplitText.create(headerItems, {
      type: 'chars',
      charsClass: 'char'
    });

    // Возвращаем ОБЪЕКТ с двумя split-ами
    return {
      title: splitTitle,
      header: splitHeader
    };
  });
}

export default heroSplit;