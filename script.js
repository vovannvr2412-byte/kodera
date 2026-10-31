const workTrack = document.querySelector('#work-track');
const workPrev = document.querySelector('#work-prev');
const workNext = document.querySelector('#work-next');
const workProgressBar = document.querySelector('#work-progress-bar');

function scrollWorks(direction) {
  if (!workTrack) return;
  const cards = workTrack.querySelectorAll('.work-card');
  const distance = cards[1] ? cards[1].offsetLeft - cards[0].offsetLeft : 300;
  workTrack.scrollBy({ left: distance * direction, behavior: 'smooth' });
}

function updateWorkProgress() {
  if (!workTrack || !workProgressBar) return;
  const max = workTrack.scrollWidth - workTrack.clientWidth;
  const visibleShare = Math.min(1, workTrack.clientWidth / workTrack.scrollWidth);
  const position = max > 0 ? workTrack.scrollLeft / max : 0;
  workProgressBar.style.width = `${visibleShare * 100}%`;
  workProgressBar.style.transform = `translateX(${position * (1 - visibleShare) / visibleShare * 100}%)`;
  if (workPrev) workPrev.disabled = workTrack.scrollLeft <= 2;
  if (workNext) workNext.disabled = workTrack.scrollLeft >= max - 2;
}

workPrev?.addEventListener('click', () => scrollWorks(-1));
workNext?.addEventListener('click', () => scrollWorks(1));
workTrack?.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') { event.preventDefault(); scrollWorks(1); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); scrollWorks(-1); }
});
workTrack?.addEventListener('scroll', () => requestAnimationFrame(updateWorkProgress), { passive: true });
window.addEventListener('resize', updateWorkProgress);
updateWorkProgress();

const workCards = document.querySelectorAll('.work-card');
if ('IntersectionObserver' in window) {
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting));
  }, { rootMargin: '0px 150px' });
  workCards.forEach((card) => cardObserver.observe(card));
} else {
  workCards.forEach((card) => card.classList.add('is-visible'));
}

const desktopFab = document.querySelector('#desktop-fab');
const heroActions = document.querySelector('.hero .button-row');
const orderSection = document.querySelector('#order');
let orderIsVisible = false;

function updateDesktopFab() {
  if (!desktopFab || !heroActions) return;
  const pastHeroActions = heroActions.getBoundingClientRect().bottom < 0;
  desktopFab.classList.toggle('is-hidden', !pastHeroActions || orderIsVisible);
}

if (orderSection && 'IntersectionObserver' in window) {
  const orderObserver = new IntersectionObserver((entries) => {
    orderIsVisible = entries[0].isIntersecting;
    updateDesktopFab();
  }, { threshold: .15 });
  orderObserver.observe(orderSection);
}

window.addEventListener('scroll', updateDesktopFab, { passive: true });
updateDesktopFab();

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
