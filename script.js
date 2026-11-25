const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation?.classList.toggle('is-open', !isOpen);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
  });
});

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

const carousel = document.querySelector('[data-carousel]');
if (carousel) {
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  const indicators = [...document.querySelectorAll('[data-carousel-slide]')];
  const status = document.querySelector('.carousel-status');
  let activeIndex = 0;

  const showSlide = (requestedIndex) => {
    activeIndex = (requestedIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      const active = index === activeIndex;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    indicators.forEach((indicator, index) => {
      const active = index === activeIndex;
      indicator.classList.toggle('is-active', active);
      if (active) indicator.setAttribute('aria-current', 'true');
      else indicator.removeAttribute('aria-current');
    });
    if (status) status.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  };

  document.querySelector('[data-carousel-previous]')?.addEventListener('click', () => showSlide(activeIndex - 1));
  document.querySelector('[data-carousel-next]')?.addEventListener('click', () => showSlide(activeIndex + 1));
  indicators.forEach((indicator) => {
    indicator.addEventListener('click', () => showSlide(Number(indicator.dataset.carouselSlide)));
  });
  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showSlide(activeIndex - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showSlide(activeIndex + 1);
    }
  });

  let pointerStartX = null;
  carousel.addEventListener('pointerdown', (event) => { pointerStartX = event.clientX; });
  carousel.addEventListener('pointerup', (event) => {
    if (pointerStartX === null) return;
    const delta = event.clientX - pointerStartX;
    if (Math.abs(delta) > 55) showSlide(activeIndex + (delta < 0 ? 1 : -1));
    pointerStartX = null;
  });
  carousel.addEventListener('pointercancel', () => { pointerStartX = null; });
}

const bookGallery = document.querySelector('[data-book-gallery]');
if (bookGallery) {
  const pages = [...bookGallery.querySelectorAll('[data-book-page]')];
  const status = bookGallery.querySelector('[data-book-status]');
  let activePage = 0;

  const showBookPage = (requestedIndex) => {
    activePage = (requestedIndex + pages.length) % pages.length;
    pages.forEach((page, index) => {
      const isActive = index === activePage;
      page.classList.toggle('is-active', isActive);
      page.setAttribute('aria-hidden', String(!isActive));
      if (isActive) page.removeAttribute('inert');
      else page.setAttribute('inert', '');
    });
    if (status) status.textContent = `${String(activePage + 1).padStart(2, '0')} / ${String(pages.length).padStart(2, '0')}`;
  };

  bookGallery.querySelector('[data-book-previous]')?.addEventListener('click', () => showBookPage(activePage - 1));
  bookGallery.querySelector('[data-book-next]')?.addEventListener('click', () => showBookPage(activePage + 1));
  bookGallery.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showBookPage(activePage - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showBookPage(activePage + 1);
    }
  });

  let pointerStartX = null;
  bookGallery.addEventListener('pointerdown', (event) => { pointerStartX = event.clientX; });
  bookGallery.addEventListener('pointerup', (event) => {
    if (pointerStartX === null) return;
    const delta = event.clientX - pointerStartX;
    if (Math.abs(delta) > 55) showBookPage(activePage + (delta < 0 ? 1 : -1));
    pointerStartX = null;
  });
  bookGallery.addEventListener('pointercancel', () => { pointerStartX = null; });
}
