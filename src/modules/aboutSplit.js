
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(SplitText)

function aboutSplit() {
  let subHeaders = document.querySelectorAll('[data-split="about-subheader"]')
  // let title = document.querySelector('[data-animation="hero-title"]')

  return document.fonts.ready.then(() => {
    // const splitTitle = SplitText.create(title, {
    //   type: 'chars, words, lines',
    //   charsClass: 'char',
    //   mask: "lines"
    // });

    const splitSubheader = SplitText.create(subHeaders, {
      type: 'words, chars',
      charsClass: 'char',
      wordsClass: 'word',
      mask: 'words'
    });

    // Возвращаем ОБЪЕКТ с двумя split-ами
    return {
      // title: splitTitle,
      subheader: splitSubheader
    };
  });
}

export default aboutSplit;