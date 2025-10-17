function accordion() {
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
}

export default accordion;