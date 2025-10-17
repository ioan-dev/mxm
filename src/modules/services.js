
function services() {

  document.querySelectorAll('.accordion').forEach(accordion => {
    const items = accordion.querySelectorAll('.accordion__item');

    items.forEach(item => {
      const header = item.querySelector('.accordion__header');
      const content = item.querySelector('.accordion__content');

      // Устанавливаем начальную высоту для анимации
      content.style.maxHeight = '0px';

      item.addEventListener('click', () => {
        const isOpen = content.style.maxHeight !== '0px';


        // Закрываем все вкладки в этом аккордеоне
        items.forEach(otherItem => {
          const otherContent = otherItem.querySelector('.accordion__content');
          otherContent.style.maxHeight = '0px';
          otherItem.classList.remove('is-open');
        });

        // Открываем текущую, если была закрыта
        if (!isOpen) {
          content.style.maxHeight = content.scrollHeight + 'px';
          item.classList.add('is-open');
        }
      });
    });
  });

  // -----

  const buttons = document.querySelectorAll('[data-service-btn]');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-service-btn');

      // Убираем активный класс у всех кнопок
      buttons.forEach(btn => {
        btn.classList.remove('service__btn--active');
      });

      // Добавляем активный класс текущей кнопке
      button.classList.add('service__btn--active');

      // Убираем класс у всех элементов аккордеона
      document.querySelectorAll('[data-service-accordion]').forEach(item => {
        item.classList.remove('accordion--active');
      });

      // Добавляем класс только нужному аккордеону
      const accordionItem = document.querySelector(`[data-service-accordion="${index}"]`);
      if (accordionItem) {
        accordionItem.classList.add('accordion--active');
      }
    });
  });
}

export default services;