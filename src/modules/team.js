import { gsap } from 'gsap'

function team() {
  // Получаем элементы
  const teamItems = document.querySelectorAll('.team__item');
  const showImage = document.querySelector('.team__show-image img');
  const showName = document.querySelector('.team__show-name');
  const showPost = document.querySelector('.team__show-post');

  // Флаг для отслеживания состояния анимации
  let isAnimating = false;

  // Функция для обновления team__show с анимацией
  function updateTeamShow(name, post, imageSrc, activeItem) {
    // Если анимация уже идёт, пропускаем
    if (isAnimating) return;

    // Удаляем класс active у всех миниатюр
    teamItems.forEach(item => item.classList.remove('active'));
    // Добавляем класс active к текущей миниатюре
    activeItem.classList.add('active');

    // Устанавливаем флаг, что анимация началась
    isAnimating = true;

    // Анимация исчезновения текущего контента
    gsap.to([showName, showPost, showImage], {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        // Обновляем содержимое после исчезновения
        showName.textContent = name;
        showPost.textContent = post;
        showImage.src = imageSrc;

        // Анимация появления нового контента
        gsap.to([showName, showPost, showImage], {
          opacity: 1,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            // Сбрасываем флаг после завершения анимации
            isAnimating = false;
          }
        });
      }
    });
  }

  // Добавляем обработчик событий для каждого team__item
  teamItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const name = item.getAttribute('data-team-name');
      const post = item.getAttribute('data-team-post');
      const imageSrc = item.querySelector('img').src;
      updateTeamShow(name, post, imageSrc, item);
    });
  });

  // Инициализация начального состояния (показываем первого сотрудника)
  const firstItem = teamItems[0];
  firstItem.classList.add('active'); // Добавляем класс active для первой миниатюры
  updateTeamShow(
    firstItem.getAttribute('data-team-name'),
    firstItem.getAttribute('data-team-post'),
    firstItem.querySelector('img').src,
    firstItem
  );
}

export default team;