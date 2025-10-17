import { gsap } from 'gsap';
import { debounce } from 'lodash';

function favoritesAnimationV2() {
  // Находим секцию и элементы
  let section = document.querySelector('[data-animation="favorites"]');
  const items = document.querySelectorAll('.favorites__item');

  // Создаем debounce для событий
  const handleMouseOver = debounce((item) => {
    const caseValue = item.dataset.case;
    const matchingItems = document.querySelectorAll(`.favorites__item[data-case="${caseValue}"]`);

    matchingItems.forEach(matchingItem => {
      // Находим псевдоэлемент ::before через .favorites__image-wrapper
      const imageWrapper = matchingItem.querySelector('.favorites__image-wrapper');
      const caseNameSpan = matchingItem.querySelector('.favorites__case-name span');

      // Анимируем opacity псевдоэлемента и transform span
      gsap.to(imageWrapper, {
        '--before-opacity': 0, // Меняем CSS-переменную для ::before
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(caseNameSpan, {
        yPercent: 0, // Смещение с 101% до 0
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  }, 100);

  const handleMouseOut = debounce((item) => {
    const caseValue = item.dataset.case;
    const matchingItems = document.querySelectorAll(`.favorites__item[data-case="${caseValue}"]`);

    matchingItems.forEach(matchingItem => {
      const imageWrapper = matchingItem.querySelector('.favorites__image-wrapper');
      const caseNameSpan = matchingItem.querySelector('.favorites__case-name span');

      // Возвращаем в исходное состояние
      gsap.to(imageWrapper, {
        '--before-opacity': 0.8, // Возвращаем opacity для ::before
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(caseNameSpan, {
        yPercent: 101, // Возвращаем смещение
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  }, 100);

  // Добавляем обработчики событий
  items.forEach(item => {
    item.addEventListener('mouseover', () => handleMouseOver(item));
    item.addEventListener('mouseout', () => handleMouseOut(item));
  });
}

export default favoritesAnimationV2;