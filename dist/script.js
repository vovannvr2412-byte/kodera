const workTrack = document.querySelector('#work-track');
const workPrev = document.querySelector('#work-prev');
const workNext = document.querySelector('#work-next');

function scrollWorks(direction) {
  if (!workTrack) return;
  const card = workTrack.querySelector('.work-card');
  const distance = card ? card.getBoundingClientRect().width + 24 : 300;
  workTrack.scrollBy({ left: distance * direction, behavior: 'smooth' });
}

workPrev?.addEventListener('click', () => scrollWorks(-1));
workNext?.addEventListener('click', () => scrollWorks(1));

document.querySelectorAll('.lead-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;

    form.querySelectorAll('.field').forEach((field) => {
      const input = field.querySelector('input');
      const empty = !input.value.trim();
      field.classList.toggle('invalid', empty);
      valid = valid && !empty;
    });

    const consent = form.querySelector('[name="consent"]');
    if (!consent.checked) {
      valid = false;
      consent.focus();
    }

    const status = form.querySelector('.form-status');
    status.textContent = valid
      ? 'Форма готова. Подключим отправку после добавления ваших контактов.'
      : 'Проверьте обязательные поля и согласие на обработку данных.';
    status.style.color = valid ? 'var(--success)' : '#ff9b7d';
  });
});

document.querySelectorAll('details').forEach((detail) => {
  detail.addEventListener('toggle', () => {
    if (!detail.open) return;
    document.querySelectorAll('details').forEach((other) => {
      if (other !== detail) other.open = false;
    });
  });
});
