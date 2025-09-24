import '@/styles/main.scss'
import Loader from '@/modules/Loader.js'
import preloader from '@/modules/preloader.js'
import moveImages from '@/modules/moveImages.js'
import scaleLogo from '@/scaleLogo.js'
import smoother from '@/modules/smoother.js'
import aboutSplit from '@/modules/aboutSplit.js'
import aboutAnimation from '@/modules/aboutAnimation.js'
import favoritesAnimation from '@/modules/favoritesAnimation.js'

document.addEventListener('DOMContentLoaded', () => {
  init()
})

function init() {
  preloader()
  smoother()
  favoritesAnimation()
  // moveImages()
  scaleLogo()
}
