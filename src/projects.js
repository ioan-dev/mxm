import '@/styles/main.scss'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { Flip } from 'gsap/Flip'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)

document.addEventListener('DOMContentLoaded', () => {
  init()
})

function init() {
  // ------------ INIT ------------
  initScrollSmoother()
  // initHoverSync()

  // ---------- FUNCTION ----------

  function initHoverSync() {
    const navItems = document.querySelectorAll('.projects__nav-item')
    const contentItems = document.querySelectorAll('.projects__content-item')

    // Функция для синхронизации элементов по индексу
    const syncItems = (index, isActive) => {
      // Находим nav элемент с нужным индексом
      const navItem = document.querySelector(`.projects__nav-item[data-index="${index}"]`)
      // Находим content элемент с нужным индексом
      const contentItem = document.querySelector(`.projects__content-item[data-index="${index}"]`)

      if (isActive) {
        navItem?.classList.add('is-active')
        contentItem?.classList.add('is-active')
      } else {
        navItem?.classList.remove('is-active')
        contentItem?.classList.remove('is-active')
      }
    }

    // Обработчик для nav элементов
    navItems.forEach((navItem) => {
      navItem.addEventListener('mouseenter', () => {
        const index = navItem.dataset.index
        syncItems(index, true)
      })

      navItem.addEventListener('mouseleave', () => {
        const index = navItem.dataset.index
        syncItems(index, false)
      })
    })

    // Обработчик для content элементов
    contentItems.forEach((contentItem) => {
      contentItem.addEventListener('mouseenter', () => {
        const index = contentItem.dataset.index
        syncItems(index, true)
      })

      contentItem.addEventListener('mouseleave', () => {
        const index = contentItem.dataset.index
        syncItems(index, false)
      })
    })
  }

  function initScrollSmoother() {
    const smoother = ScrollSmoother.create({
      smooth: 1,
      smoothTouch: 0.1
    })

    const navWrapper = document.querySelector('.projects__nav-wrapper')
    const nav = document.querySelector('.projects__nav')
    const content = document.querySelector('.projects__content')
    const items = gsap.utils.toArray('.projects__content-item')
    const navItems = gsap.utils.toArray('.projects__nav-item')

    let mm = gsap.matchMedia();

    mm.add({ isLarge: '(min-width: 1024px)', isSmall: '(max-width: 1023px)' }, (context) => {
      let { isLarge, isSmall } = context.conditions

      if (isLarge) {
        ScrollTrigger.create({
          id: "nav",
          trigger: '.projects__content',
          markers: true,
          start: 'top 33.5%',
          pin: '.projects__nav-fixed'
        })
      }
    } )











  }

}