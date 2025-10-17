function mobileMenu() {
  // Получаем элементы
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuBurger = document.querySelector('.header__burger');
  const menuClose = document.querySelector('.mobile-menu__close');
  const body = document.body;

// Функция открытия меню
  function openMenu() {
    mobileMenu.classList.add('is-open');
    body.style.overflow = 'hidden'; // блокируем скролл страницы
    menuBurger.setAttribute('aria-expanded', 'true');
  }

// Функция закрытия меню
  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    body.style.overflow = ''; // возвращаем скролл
    menuBurger.setAttribute('aria-expanded', 'false');
  }

// Обработчики событий
  menuBurger.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);

// Закрытие при клике вне меню
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      closeMenu();
    }
  });

// Закрытие по клавише Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Добавляем к предыдущему коду
  const menuLinks = document.querySelectorAll('[data-toggle="menu-close"]');

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}

export default mobileMenu;