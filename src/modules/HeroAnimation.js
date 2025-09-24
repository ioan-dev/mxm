import { gsap } from 'gsap'
import { oneLineText } from '@/modules/utils/splitText.js'
import { SplitText } from 'gsap/SplitText'
import { GSDevTools } from 'gsap/GSDevTools'
gsap.registerPlugin(SplitText, GSDevTools)

function heroAnimation() {
  let charsDuration = 1
  let yMovePercent = 102
  let charsStagger = 0.1

  // Разбиваем текст и получаем chars
  oneLineText().then((splitting) => {
    // Nav links
    let navLinks = gsap.utils.toArray('.header__nav-link')

    // Nav switcher
    let icon = document.querySelector('header .switcher__icon')
    let charsSwitcher = gsap.utils.toArray('.header__switcher .char')

    // Nav Btn
    let btn = document.querySelector('.header__btn')
    let charsBtn = gsap.utils.toArray('.char', btn)

    function navLinksAnimation() {
      let charsDuration = 0.25
      let charsStagger = 0.009

      // Создаём Timeline для анимации навигации
      let navTl = gsap.timeline()

      navLinks.forEach((link, index) => {
        let chars = gsap.utils.toArray('.char', link)
        gsap.set(chars, { yPercent: 102 })

        // Добавляем анимацию в Timeline
        navTl.to('header', { autoAlpha: 1, duration: 0.01 }).to(chars, {
          yPercent: 0,
          stagger: charsStagger,
          ease: 'power1.out',
          duration: charsDuration,
        })
      })

      return navTl // Возвращаем Timeline
    }

    // Анимация переключения темы
    function switchAnimation() {
      let charsDuration = 0.25
      let charsStagger = 0.009

      gsap.set([charsSwitcher, icon], { yPercent: yMovePercent })

      let tl = gsap.timeline()
      tl.to(icon, { yPercent: 0, duration: charsDuration }).to(
        charsSwitcher,
        {
          yPercent: 0,
          stagger: charsStagger,
          duration: charsDuration,
        },
        '<',
      )

      return tl
    }

    //   Анимация кнопки связаться

    function heroBtnAnimation() {
      let charsDuration = 0.25
      let charsStagger = 0.009

      gsap.set(charsBtn, { yPercent: yMovePercent })

      return gsap.to(charsBtn, {
        yPercent: 0,
        stagger: charsStagger,
        duration: charsDuration,
      })
    }

    function titleAnimation() {
      let title = document.querySelector('[data-animation="hero-title"]')

      // Создаем SplitText для разделения текста
      let split = SplitText.create(title, {
        type: 'chars, words, lines',
        charsClass: 'char',
        mask: 'lines',
        smartWrap: true,
      })

      // Создаем Timeline
      let tl = gsap.timeline()

      gsap.set(split.chars, { yPercent: yMovePercent })

      // Анимация символов в первой строке (split.lines[0])
      tl
        .to(title, {autoAlpha: 1, duration: 0.01})
        .to(split.lines[0].querySelectorAll('.char'), {
        yPercent: 0,
        stagger: 0.02, // Задержка между символами
        duration: 0.5, // Длительность анимации для первой строки
        ease: 'power1.out',
      })
        // Анимация символов во второй строке (split.lines[1])
        .to(
          split.lines[1].querySelectorAll('.char'),
          {
            yPercent: 0,
            stagger: 0.02, // Можно задать другой stagger для разнообразия
            duration: 0.5, // Можно задать другую длительность
            ease: 'power1.out',
          },
          '<', // Перекрытие анимаций (начинается на 0.3 секунды раньше окончания предыдущей)
        )

      return tl
    }

    function heroImagesAnimation() {
      let images = document.querySelectorAll(
        '[data-animation="hero-images-review"]',
      )

      gsap.set(images, {
        yPercent: 100,
      })

      let tl = gsap.timeline()

      tl.to(images, { autoAlpha: 1, duration: 0.01 })

        .to(images, {
          yPercent: 0,
          stagger: 0.2,
          duration: 0.9,
          ease: 'power1.out',
        })
    }

    let tl = gsap.timeline()

    tl.add(heroImagesAnimation())
      .add(navLinksAnimation(), '<')
      .add(switchAnimation(), '<')
      .add(heroBtnAnimation(), '<')
  })
}

export default heroAnimation
