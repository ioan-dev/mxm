import { gsap } from 'gsap'

function favoritesAnimation() {
  let section = document.querySelector('[data-animation="favorites"]')
  // Находим все элементы с классом favorites__item
  const items = document.querySelectorAll('.favorites__item');

  // Проходим по каждому элементу
  items.forEach(item => {
    // При наведении на элемент
    item.addEventListener('mouseover', () => {
      // Получаем значение data-case текущего элемента
      const caseValue = item.dataset.case;

      // Находим все элементы с таким же data-case
      const matchingItems = document.querySelectorAll(`.favorites__item[data-case="${caseValue}"]`);

      // Добавляем класс favorites__item--active всем подходящим элементам
      matchingItems.forEach(matchingItem => {
        matchingItem.classList.add('favorites__item--active');
      });
    });

    // При уходе курсора с элемента
    item.addEventListener('mouseout', () => {
      // Получаем значение data-case текущего элемента
      const caseValue = item.dataset.case;

      // Находим все элементы с таким же data-case
      const matchingItems = document.querySelectorAll(`.favorites__item[data-case="${caseValue}"]`);

      // Убираем класс favorites__item--active у всех подходящих элементов
      matchingItems.forEach(matchingItem => {
        matchingItem.classList.remove('favorites__item--active');
      });
    });
  });
}



export default favoritesAnimation
