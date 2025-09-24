export function updateMoscowTime() {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 24-часовой формат (00–23)
    timeZone: 'Europe/Moscow'
  };

  const moscowTime = new Intl.DateTimeFormat('ru-RU', options).format(new Date());
  document.querySelector('[data-js-time]').textContent = moscowTime;
}