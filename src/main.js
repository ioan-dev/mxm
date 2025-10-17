import '@/styles/main.scss'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
import mobileMenu from '@/modules/mobile-menu.js'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Flip, SplitText)

document.addEventListener('DOMContentLoaded', () => {
  init()
})

function init() {
  let loader = document.querySelector('.loader')
  let images = document.querySelectorAll('.hero__move-wrapper')
  gsap.set(images, { yPercent: 100, autoAlpha: 1 })

  // let teamSlider = new Swiper('.team__slider-main', {
  //   loop: true,
  //   navigation: {
  //     nextEl: '.team__slider-next-btn',  // Указываем свои кнопки
  //     prevEl: '.team__slider-prev-btn',
  //   },
  //   speed: 300,
  //   spaceBetween: 10,
  //   on: {
  //     slideNextTransitionStart: function () {
  //       // При переходе к следующему слайду
  //       teamSliderMiniatures.slideNext();
  //     },
  //     slidePrevTransitionStart: function () {
  //       // При переходе к предыдущему слайду
  //       teamSliderMiniatures.slidePrev();
  //     }
  //   }
  // })
  //
  // let teamSliderMiniatures = new Swiper('.team__slider-miniatures .swiper', {
  //   loop: true,
  //   slidesPerView: 8,
  //   breakpoints: {
  //     768: {
  //       slidesPerView: 10,
  //     }
  //   },
  // })

  preloader()
  setCorrectHeight()

  let heroSliderInit = heroSlider()
  aboutAnimation()
  mobileMenu()
  favoritesAnimation()
  teamSlidersInit()
  services()
  teamGridAnimation()



  async function preloader() {
    if (!loader) {
      return
    }

    let splits = await heroSplit()
    let mm = gsap.matchMedia()
    mm.add(
      { isLarge: '(min-width: 1024px)', isSmall: '(max-width: 1023px)' },
      (context) => {
        let { isLarge, isSmall } = context.conditions

        if (isLarge) {
          // ITEMS LETTERS
          // MAX
          let letterM = document.querySelector('.svg-letter-m')
          let letterA = document.querySelector('.svg-letter-a')
          let letterX = document.querySelector('.svg-letter-x')

          let letterFigure = document.querySelector('.svg-x-figure')
          let letterMove = document.querySelector('.svg-letter-m-move')

          // COUNTER
          let counterWrapper = document.querySelector(
            '.counter--desktop .counter__inner',
          )
          let counterElement = document.querySelector(
            '.counter--desktop .counter__numbers',
          )

          // LOADER OTHER

          let mikhailovItem = document.querySelector('.loader__surname')
          let architectureItem = document.querySelector(
            '.loader__item--architecture',
          )

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
              counterWrapper,
            ],
            {
              yPercent: valueFrom,
            },
          )
          gsap.set([loader, counterWrapper], { autoAlpha: 1, duration: 0.01 })
          gsap.set(letterFigure, { yPercent: valueFrom })

          gsap.set(splits?.title.chars, { yPercent: yMovePercent })
          gsap.set(splits?.header.chars, { yPercent: yMovePercent })

          let tlMaster = gsap.timeline({
            onComplete: () => {
              initScrollSmoother()
              scrollingAnimation()
            },
          })

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
            .to(letterA, { yPercent: valueTo, duration: 0.4 }, '-=98%')
            .to(
              letterFigure,
              { yPercent: 0, duration: 0.6, ease: 'power2.out' },
              '<+=20%',
            )
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
                counterElement.textContent = Math.round(
                  counterElement.innerHTML,
                )
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
            let tl = gsap.timeline({
              onComplete: () => {
                document.body.classList.toggle('is-loading')
                gsap.set('.footer', { autoAlpha: 1, duration: 0.01 })
                splits.title.revert()
              },
            })

            gsap.set('.hero__title', { autoAlpha: 1, duration: 0.01 })

            // Анимация символов в первой строке (split.lines[0])
            tl.to(splits?.title.lines[0].querySelectorAll('.char'), {
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

            gsap.set(navLinks, { autoAlpha: 1, duration: 0.01 })

            let navTl = gsap.timeline()

            navLinks.forEach((link, index) => {
              let chars = gsap.utils.toArray('.char', link)

              // Для первой ссылки: "0", для остальных: "-=0.1"
              let position = index === 0 ? 0 : '-=' + overlapAmount

              navTl.to(
                chars,
                {
                  yPercent: 0,
                  stagger: charsStagger,
                  ease: 'power1.out',
                  duration: charsDuration,
                },
                position,
              )
            })

            return navTl
          }

          function switchAnimation() {
            let charsDuration = 0.25
            let charsStagger = 0.009

            let charsSwitcher = gsap.utils.toArray('.char', switcher)

            gsap.set(switcher, { autoAlpha: 1, duration: 0.01 })

            let tl = gsap.timeline({
              onComplete: () => {
                splits.header.revert()
              },
            })
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

          function heroBtnAnimation() {
            let charsDuration = 0.25
            let charsStagger = 0.009

            gsap.set(btn, { autoAlpha: 1, duration: 0.01 })

            return gsap.to(charsBtn, {
              yPercent: 0,
              stagger: charsStagger,
              duration: charsDuration,
            })
          }

          function logoTextAnimation() {
            let charsDuration = 0.25
            let charsStagger = 0.009

            gsap.set(logoText, { autoAlpha: 1, duration: 0.01 })

            return gsap.to(logoTextChars, {
              yPercent: 0,
              stagger: charsStagger,
              duration: charsDuration,
            })
          }
        }

        if (isSmall) {
          let logoLetter = gsap.utils.toArray(
            '[data-loader-mobile="letterLogo"]',
          )
          let loaderText = document.querySelector('.loader__text')
          let hero = document.querySelector('.hero-mobile')

          // COUNTER
          let counterWrapper = document.querySelector(
            '.counter--adaptation .counter__inner',
          )
          let counterElement = document.querySelector(
            '.counter--adaptation .counter__numbers',
          )

          //   SET
          gsap.set([logoLetter, loaderText], { yPercent: 102 })
          gsap.set([logoLetter, loaderText], { autoAlpha: 1, duration: 0.01 })
          gsap.set(hero, { yPercent: 100 })

          gsap.set(loader, { autoAlpha: 1, duration: 0.01 })

          // TIMELINE

          let master = gsap.timeline({
            onComplete: () => {
              document.body.classList.toggle('is-loading')
              heroSliderInit.params.autoplay = {
                delay: 3000,
                disableOnInteraction: true,
              }
              heroSliderInit.autoplay.start()
            },
          })

          master
            .add('start', '0')
            .to(
              loaderText,
              { yPercent: 0, duration: 0.4, ease: 'power1.out' },
              'start',
            )
            .to(
              '.counter--adaptation',
              { autoAlpha: 1, duration: 1 },
              'start+=0.2',
            )
            .add(logoLetterAnimation, 'start+=0.2')
            .call(counter, null, 'start+=0.6')
            .to(
              loader,
              { yPercent: -101, duration: 0.5, ease: 'power1.in' },
              'start+=3',
            )
            .to(hero, { yPercent: 0, duration: 0.5 }, '-=20%')

          // FUNC

          function logoLetterAnimation() {
            let tl = gsap.timeline()

            tl.to(logoLetter[0], {
              yPercent: 0,
              duration: 0.5,
              ease: 'power1.out',
            })
              .to(
                logoLetter[2],
                { yPercent: 0, duration: 0.5, ease: 'power1.out' },
                '<+=10%',
              )
              .to(
                logoLetter[1],
                { yPercent: 0, duration: 0.5, ease: 'power1.out' },
                '<+=10%',
              )

            return tl
          }

          function counter(dur = 3) {
            gsap.to(counterElement, {
              duration: dur,
              innerHTML: 100,
              roundProps: 'innerHTML',
              ease: 'power2.out',
              onUpdate: function () {
                // Обновляем текст в элементе при каждом шаге анимации
                counterElement.textContent = Math.round(
                  counterElement.innerHTML,
                )
              },
            })
          }
          function flip() {
            let logoWrapper = document.querySelector('.header__logo-mobile')
            let logo = document.querySelector('.logo-loader-adaptation')
            let state = Flip.getState(logo)
            logoWrapper.append(logo)
            Flip.from(state, {
              duration: 0.9,
              ease: 'power2.inOut',
              absolute: true,
            })
          }
        }
      },
    )
  }

  async function aboutAnimation() {
    let subText = document.querySelectorAll('[data-split="about-subheader"]')
    let split = await aboutSplit()

    // Нужно собрать все элементы подписи about
    let mindLetter = gsap.utils.toArray('[data-about="mind-letter"]')
    let xFigure = gsap.utils.toArray('[data-about="x-figure"]')
    let matterLetter = gsap.utils.toArray('[data-about="matter-letter"]')

    gsap.set(split?.subheader.masks, { y: '-20vw' })
    gsap.set(split?.subheader.chars, { yPercent: 102 })

    gsap.set([mindLetter, xFigure, matterLetter], { yPercent: 101 })

    let tlLetter = gsap.timeline({
      scrollTrigger: {
        trigger: split.subheader.words,
        start: 'top 60%',
        // refreshPriority: 2
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

    tlWordsMove
      .to(split?.subheader.masks, { y: 0, duration: 2, stagger: 0.1 })
      .to(mindLetter, { yPercent: 0, stagger: -0.01, duration: 2 }, '<')
      .to(xFigure, { yPercent: 0, duration: 2 }, '<+=0.2')
      .to(matterLetter, { yPercent: 0, stagger: -0.01, duration: 2 }, '<+=0.2')
  }

  function heroSplit() {
    let headerItems = document.querySelectorAll('[data-split="header"]')
    let title = document.querySelector('[data-animation="hero-title"]')

    return document.fonts.ready.then(() => {
      const splitTitle = SplitText.create(title, {
        type: 'chars, words, lines',
        charsClass: 'char',
        linesClass: 'lineParent',
        mask: 'lines',
      })

      const splitHeader = SplitText.create(headerItems, {
        type: 'chars,words, lines',
        charsClass: 'char',
        // smartWrap: true,
      })

      // Возвращаем ОБЪЕКТ с двумя split-ами
      return {
        title: splitTitle,
        header: splitHeader,
      }
    })
  }

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
        mask: 'words',
      })

      // Возвращаем ОБЪЕКТ с двумя split-ами
      return {
        // title: splitTitle,
        subheader: splitSubheader,
      }
    })
  }

  function services() {
    document.querySelectorAll('.accordion').forEach((accordion) => {
      const items = accordion.querySelectorAll('.accordion__item')

      items.forEach((item) => {
        const header = item.querySelector('.accordion__header')
        const content = item.querySelector('.accordion__content')

        // Устанавливаем начальную высоту для анимации
        content.style.maxHeight = '0px'

        item.addEventListener('click', () => {
          const isOpen = content.style.maxHeight !== '0px'

          // Закрываем все вкладки в этом аккордеоне
          items.forEach((otherItem) => {
            const otherContent = otherItem.querySelector('.accordion__content')
            otherContent.style.maxHeight = '0px'
            otherItem.classList.remove('is-open')
          })

          // Открываем текущую, если была закрыта
          if (!isOpen) {
            content.style.maxHeight = content.scrollHeight + 'px'
            item.classList.add('is-open')
          }
        })
      })
    })

    // -----

    const buttons = document.querySelectorAll('[data-service-btn]')

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const index = button.getAttribute('data-service-btn')

        // Убираем активный класс у всех кнопок
        buttons.forEach((btn) => {
          btn.classList.remove('service__btn--active')
        })

        // Добавляем активный класс текущей кнопке
        button.classList.add('service__btn--active')

        // Убираем класс у всех элементов аккордеона
        document
          .querySelectorAll('[data-service-accordion]')
          .forEach((item) => {
            item.classList.remove('accordion--active')
          })

        // Добавляем класс только нужному аккордеону
        const accordionItem = document.querySelector(
          `[data-service-accordion="${index}"]`,
        )
        if (accordionItem) {
          accordionItem.classList.add('accordion--active')
        }
      })
    })
  }

  function favoritesAnimation() {
    let section = document.querySelector('[data-animation="favorites"]')

    if (!section) {
      return
    }

    const items = document.querySelectorAll('.favorites__item')
    const mediaQuery = window.matchMedia('(min-width: 1024px)')

    // Хранилище обработчиков для возможности их удаления
    const handlers = new Map()

    function enableAnimation() {
      items.forEach((item) => {
        const imageWrapper = item.querySelector('.favorites__image-wrapper')

        const handleMouseOver = () => {
          const caseValue = item.dataset.case
          const matchingItems = document.querySelectorAll(
            `.favorites__item[data-case="${caseValue}"]`,
          )
          matchingItems.forEach((matchingItem) => {
            matchingItem.classList.add('favorites__item--active')
          })
        }

        const handleMouseOut = () => {
          const caseValue = item.dataset.case
          const matchingItems = document.querySelectorAll(
            `.favorites__item[data-case="${caseValue}"]`,
          )
          matchingItems.forEach((matchingItem) => {
            matchingItem.classList.remove('favorites__item--active')
          })
        }

        imageWrapper.addEventListener('mouseover', handleMouseOver)
        item.addEventListener('mouseout', handleMouseOut)

        // Сохраняем обработчики для последующего удаления
        handlers.set(item, { imageWrapper, handleMouseOver, handleMouseOut })
      })
    }

    function disableAnimation() {
      handlers.forEach(
        ({ imageWrapper, handleMouseOver, handleMouseOut }, item) => {
          imageWrapper.removeEventListener('mouseover', handleMouseOver)
          item.removeEventListener('mouseout', handleMouseOut)

          // Убираем активные классы
          item.classList.remove('favorites__item--active')
        },
      )
      handlers.clear()
    }

    function handleMediaChange(e) {
      if (e.matches) {
        enableAnimation()
      } else {
        disableAnimation()
      }
    }

    // Слушаем изменения media query
    mediaQuery.addEventListener('change', handleMediaChange)

    // Инициализируем сразу, если условие выполнено
    if (mediaQuery.matches) {
      enableAnimation()
    }
  }

  function setCorrectHeight() {
    // Получаем реальную высоту viewport
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  function heroSlider() {
    let swiper = new Swiper('.hero-mobile__swiper', {
      direction: 'vertical',
      autoplay: false,
      speed: 800,
      loop: true,
      allowTouchMove: false,
    })

    return swiper
  }

  function teamSlidersInit() {
    const mediaQuery = window.matchMedia('(max-width: 1023px)')

    let teamSlider = null
    let teamSliderMiniatures = null

    function enableSliders() {
      // Инициализируем слайдеры только если они ещё не созданы
      if (!teamSlider && !teamSliderMiniatures) {
        teamSliderMiniatures = new Swiper('.team__slider-miniatures .swiper', {
          loop: true,
          slidesPerView: 8,
          breakpoints: {
            768: {
              slidesPerView: 10,
            },
          },
        })

        teamSlider = new Swiper('.team__slider-main', {
          loop: true,
          navigation: {
            nextEl: '.team__slider-next-btn',
            prevEl: '.team__slider-prev-btn',
          },
          speed: 300,
          spaceBetween: 10,
          on: {
            slideNextTransitionStart: function () {
              teamSliderMiniatures.slideNext()
            },
            slidePrevTransitionStart: function () {
              teamSliderMiniatures.slidePrev()
            },
          },
        })
      }
    }

    function disableSliders() {
      // Уничтожаем слайдеры, если они существуют
      if (teamSlider) {
        teamSlider.destroy(true, true)
        teamSlider = null
      }
      if (teamSliderMiniatures) {
        teamSliderMiniatures.destroy(true, true)
        teamSliderMiniatures = null
      }
    }

    function handleMediaChange(e) {
      if (e.matches) {
        // Экран <= 1023px - включаем слайдеры
        enableSliders()
      } else {
        // Экран > 1023px - выключаем слайдеры
        disableSliders()
      }
    }

    // Слушаем изменения media query
    mediaQuery.addEventListener('change', handleMediaChange)

    // Инициализируем сразу, если условие выполнено
    if (mediaQuery.matches) {
      enableSliders()
    }
  }

  function scrollingAnimation() {
    let mm = gsap.matchMedia()

    mm.add(
      { isLarge: '(min-width: 1024px)', isSmall: '(max-width: 1023px)' },
      (context) => {
        let { isLarge, isSmall } = context.conditions

        if (isLarge) {
          let tlHero = gsap.timeline({
            scrollTrigger: {
              trigger: '.hero',
              start: 'top top',
              end: 'bottom bottom',
              pin: '.hero__fixed',
              refreshPriority: 1,
            },
          })

          // -------- tlMoveImage Start--------

          let tlMoveImage = gsap.timeline({
            scrollTrigger: {
              trigger: '.hero',
              id: 'image',
              start: 'top top',
              end: '40%',
              scrub: true,
              refreshPriority: 2,
            },
          })

          tlMoveImage.to(images, {
            yPercent: 0,
            stagger: 0.2,
            duration: 0.9,
            ease: 'power1.out',
          })
          // -------- tlMoveImage End --------

          let logo = document.querySelector('.logo-loader')
          let logoText = document.querySelector('.logo-loader__text')

          let tlLogoScale = gsap.timeline({
            scrollTrigger: {
              trigger: '.hero',
              start: 'top top',
              end: '40%',
              scrub: true,
              refreshPriority: 3,
            },
          })

          tlLogoScale
            .to(logo, { scale: 0.4, duration: 1, transformOrigin: 'top left' })
            .to(logoText, { autoAlpha: 0, yPercent: -300 }, '<')


          let tlServices = gsap.timeline({ onComplete: () => {
              ScrollTrigger.refresh()
            },
            scrollTrigger: {
              trigger: '.service__wrapper',
              start: 'top top+=30%',
              end: 'bottom bottom',
              pin: '.service__fixed',
              refreshPriority: 4,
            },
          })
        }
      },
    )
  }

  function initScrollSmoother() {
    ScrollSmoother.create({
      smooth: 1,
      smoothTouch: 0.1,
    })
  }

  function teamGridAnimation() {
    const teamGrid = document.querySelector('.team__miniatures')

    if (!teamGrid) {
      console.log('DESKT NO')
      return
    }

    const miniatures = document.querySelectorAll('.team__item')
    const showBlocks = document.querySelectorAll('.team__show')
    const mediaQuery = window.matchMedia('(min-width: 1024px)')

    // Сохраняем обработчик для возможности его удаления
    let handleMouseEnter = null

    function enableAnimation() {
      handleMouseEnter = (e) => {
        const miniature = e.target.closest('.team__item')

        if (!miniature) return

        const index = Array.from(miniatures).indexOf(miniature)

        miniatures.forEach((item) =>
          item.classList.remove('team__item--active'),
        )
        showBlocks.forEach((block) =>
          block.classList.remove('team__show--active'),
        )

        miniature.classList.add('team__item--active')
        if (showBlocks[index]) {
          showBlocks[index].classList.add('team__show--active')
        }
      }

      teamGrid.addEventListener('mouseenter', handleMouseEnter, true)
    }

    function disableAnimation() {
      if (handleMouseEnter) {
        teamGrid.removeEventListener('mouseenter', handleMouseEnter, true)
        handleMouseEnter = null
      }

      // Убираем все активные классы
      miniatures.forEach((item) => item.classList.remove('team__item--active'))
      showBlocks.forEach((block) =>
        block.classList.remove('team__show--active'),
      )
    }

    function handleMediaChange(e) {
      if (e.matches) {
        enableAnimation()
      } else {
        disableAnimation()
      }
    }

    // Слушаем изменения media query
    mediaQuery.addEventListener('change', handleMediaChange)

    // Инициализируем сразу, если условие выполнено
    if (mediaQuery.matches) {
      enableAnimation()
    }
  }
}
