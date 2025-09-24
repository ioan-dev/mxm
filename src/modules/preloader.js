import { gsap } from 'gsap'
import heroSplit from '@/modules/heroSplit.js'
import { Flip } from 'gsap/Flip'
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(Flip)

async function preloader() {
  let loader = document.querySelector('.loader')
  let splits = await heroSplit()

  // ITEMS LETTERS
  // MAX
  let letterM = document.querySelector('.svg-letter-m')
  let letterA = document.querySelector('.svg-letter-a')
  let letterX = document.querySelector('.svg-letter-x')

  let letterFigure = document.querySelector('.svg-x-figure')
  let letterMove = document.querySelector('.svg-letter-m-move')

  // COUNTER
  let counterWrapper = document.querySelector('.counter__inner')
  let counterElement = document.querySelector('.counter__numbers')

  // LOADER OTHER

  let mikhailovItem = document.querySelector('.loader__surname')
  let architectureItem = document.querySelector('.loader__item--architecture')

  // LETTERS

  let mikhailovLetters = mikhailovItem.querySelectorAll('path')
  let architectureLetters = architectureItem.querySelectorAll('path')

  // NAV LINKS
  let navLinks = gsap.utils.toArray('.header__nav-link')

  // Nav switcher
  let icon = document.querySelector('header .switcher__icon')
  let switcher = document.querySelector('.header__switcher')


  // Nav Btn
  let btn = document.querySelector('.header__btn')
  let charsBtn = gsap.utils.toArray('.char', btn)

  // Logo text
  let logoText = document.querySelector('.logo-loader__text ')
  let logoTextChars = gsap.utils.toArray('.char', logoText)

  // --- MASTER ---

  let valueFrom = 102
  let valueTo = -102

  let charsDuration = 1
  let yMovePercent = 102
  let charsStagger = 0.1

  // -- SET
  gsap.set(
    [
      letterM,
      letterA,
      letterX,
      letterMove,
      mikhailovLetters,
      architectureLetters,
      icon,
      counterWrapper
    ],
    {
      yPercent: valueFrom,
    },
  )
  gsap.set([loader, counterWrapper], { autoAlpha: 1, duration: 0.01 })
  gsap.set(letterFigure, { yPercent: valueFrom })

  gsap.set(splits?.title.chars, { yPercent: yMovePercent })
  gsap.set(splits?.header.chars, { yPercent: yMovePercent })


  let tlMaster = gsap.timeline()

  tlMaster
    .add('start', '0')
    .to([letterM, letterA, letterX], { yPercent: 0, stagger: 0.02 })
    .to(letterMove, { yPercent: 0 }, 'start')
    .add(tlLetter(mikhailovLetters, 0), '<')
    .add(tlLetter(architectureLetters), 'start')
    .to(counterWrapper, { yPercent: 0 }, 'start')
    .call(counter, null, 'start+=0.5')
    .add('timerEnd', '4')
    .to(counterWrapper, { yPercent: valueTo }, 'timerEnd')
    .to(letterX, { yPercent: valueTo, duration: 0.4 }, 'timerEnd')
    .to(letterA, { yPercent: valueTo, duration: 0.4, }, '-=98%')
    .to(letterFigure, { yPercent: 0, duration: 0.6, ease: 'power2.out' }, '<+=20%')
    .add(tlLetter(mikhailovLetters, valueTo, false), '<')
    .add(tlLetter(architectureLetters, valueTo, false), '<+=5%')
    .call(flip, null, '<')
    .add('flipStart', '<')
    .add(heroImagesAnimation, 'flipStart+=0.5')
    .add(titleAnimation) // Требует внимания
    .add(logoTextAnimation, '<')
    .add(navLinksAnimation) // Требует внимания
    .add(switchAnimation, '<+=0.2')
    .add(heroBtnAnimation, '<+=0.2')



  function tlLetter(
    letters,
    value = 0,
    direction = true,
    dur = 0.5,
    stag = 0.02,
  ) {
    console.log(direction)
    let tl = gsap.timeline()

    if (direction) {
      tl.to(letters, {
        yPercent: value,
        duration: dur,
        stagger: -stag,
      })
    } else {
      tl.to(letters, {
        yPercent: value,
        duration: dur,
        stagger: stag,
      })
    }
    return tl
  }

  function flip() {
    let logoWrapper = document.querySelector('.logo-loader__xm')
    let mMove = document.querySelector(
      '.loader__item--mikhailov .logo-loader__m-move',
    )
    let state = Flip.getState(mMove)
    logoWrapper.append(mMove)
    Flip.from(state, { duration: 0.9, ease: 'power2.inOut' })
  }

  function counter(dur = 3.5) {
    gsap.to(counterElement, {
      duration: dur,
      innerHTML: 100,
      roundProps: 'innerHTML',
      ease: 'power2.out',
      onUpdate: function () {
        // Обновляем текст в элементе при каждом шаге анимации
        counterElement.textContent = Math.round(counterElement.innerHTML)
      },
    })
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

  function titleAnimation() {

    // Создаем Timeline
    let tl = gsap.timeline({onComplete: () => {
        document.body.classList.toggle('is-loading');
        gsap.set('.footer', {autoAlpha: 1, duration: 0.01})
      }})

    gsap.set('.hero__title', {autoAlpha: 1, duration: 0.01 })

    // Анимация символов в первой строке (split.lines[0])
    tl
      .to(splits?.title.lines[0].querySelectorAll('.char'), {
        yPercent: 0,
        stagger: 0.02, // Задержка между символами
        duration: 0.5, // Длительность анимации для первой строки
        ease: 'power1.out',
      })
      // Анимация символов во второй строке (split.lines[1])
      .to(
        splits?.title.lines[1].querySelectorAll('.char'),
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

  function navLinksAnimation() {
    let charsDuration = 0.25
    let charsStagger = 0.005
    let overlapAmount = 0.2

    gsap.set(navLinks, {autoAlpha: 1, duration: 0.01})

    let navTl = gsap.timeline()

    navLinks.forEach((link, index) => {
      let chars = gsap.utils.toArray('.char', link)

      // Для первой ссылки: "0", для остальных: "-=0.1"
      let position = index === 0 ? 0 : "-=" + overlapAmount

      navTl.to(chars, {
        yPercent: 0,
        stagger: charsStagger,
        ease: 'power1.out',
        duration: charsDuration
      }, position)
    })

    return navTl
  }

  function switchAnimation() {
    let charsDuration = 0.25
    let charsStagger = 0.009

    let charsSwitcher = gsap.utils.toArray('.char', switcher)

    gsap.set(switcher, {autoAlpha: 1, duration: 0.01})

    console.log(icon)

    let tl = gsap.timeline()
    tl.to(icon, { yPercent: 0, duration: charsDuration })
      .to(
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

  function heroBtnAnimation() {
    let charsDuration = 0.25
    let charsStagger = 0.009

    gsap.set(btn, { autoAlpha: 1, duration: 0.01  })

    return gsap.to(charsBtn, {
      yPercent: 0,
      stagger: charsStagger,
      duration: charsDuration,
    })
  }

  function logoTextAnimation() {
    let charsDuration = 0.25
    let charsStagger = 0.009

    gsap.set(logoText, { autoAlpha: 1, duration: 0.01  })

    return gsap.to(logoTextChars, {
      yPercent: 0,
      stagger: charsStagger,
      duration: charsDuration,
    })
  }
}

export default preloader
