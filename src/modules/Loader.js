import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import heroAnimation from '@/modules/HeroAnimation.js'
import heroMotion from '@/modules/heroMotion.js'
import heroSplit from '@/modules/heroSplit.js'
gsap.registerPlugin(Flip)

function Loader() {
  // ITEMS
  let letterM = document.querySelector('.svg-letter-m')
  let letterA = document.querySelector('.svg-letter-a')
  let letterX = document.querySelector('.svg-letter-x')
  let letterFigure = document.querySelector('.svg-x-figure')
  let letterMove = document.querySelector('.svg-letter-m-move')
  let counterWrapper = document.querySelector('.counter__inner')
  let counterElement = document.querySelector('.counter__numbers')


  let mikhailovItem = document.querySelector('.loader__surname')
  let architectureItem = document.querySelector('.loader__item--architecture')

  // LETTERS

  let mikhailovLetters = mikhailovItem.querySelectorAll('path')
  let architectureLetters = architectureItem.querySelectorAll('path')


  // TIMELINE

  function tlLetter(
    letters,
    value = 0,
    direction = true,
    dur = 0.5,
    stag = 0.1,
  ) {
    console.log(direction)
    let tl = gsap.timeline()

    if (direction) {
      tl.from(letters, {
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
    Flip.from(state, { duration: 1, ease: 'power2.inOut' })
  }

  function counter() {
    gsap.to(counterElement, {
      duration: 4, // Длительность анимации (2 секунды)
      innerHTML: 100, // Конечное значение
      roundProps: 'innerHTML', // Округляем до целого числа
      ease: 'power2.out', // Плавность (похоже на замедление в конце)
      onUpdate: function () {
        // Обновляем текст в элементе при каждом шаге анимации
        counterElement.textContent = Math.round(counterElement.innerHTML)
      },
    })
  }

  let valueFrom = 102
  let valueTo = -102

  gsap.set(letterFigure, { yPercent: valueFrom })

  let tlMaster = gsap.timeline()

  tlMaster
    .add('start', '0')
    .from(letterM, { yPercent: valueFrom }, 'start')
    .from(letterA, { yPercent: valueFrom }, 'start+=0.1')
    .from(letterX, { yPercent: valueFrom }, 'start+=0.2')
    .from(letterMove, { yPercent: valueFrom }, 'start')
    .add(tlLetter(mikhailovLetters, valueFrom), '<')
    .add(tlLetter(architectureLetters, valueFrom), 'start')
    .from(counterWrapper, { yPercent: valueFrom }, 'start')
    .call(counter)
    .add('timerEnd', '5')
    .to(counterWrapper, {yPercent: valueTo}, 'timerEnd')
    .to(letterX, { yPercent: valueTo }, 'timerEnd')
    .to(letterA, { yPercent: valueTo }, '-=50%')
    .to(letterFigure, { yPercent: 0 }, '<')
    .add(tlLetter(mikhailovLetters, valueTo, false), '<')
    .add(tlLetter(architectureLetters, valueTo, false), '<')
    .call(flip)

}

export default Loader
