(() => {
  const tabs = [...document.querySelectorAll('.option-tab')];
  const display = document.querySelector('#sole-display');
  const description = document.querySelector('#option-copy');
  const panel = document.querySelector('#sole-description');
  const number = document.querySelector('#display-label');
  const copy = {
    sport: 'Designed for training, movement, and active days. A little more grip for wherever you’re headed.',
    formal: 'A clean, understated option for class, events, and long days. Comfort that moves quietly with you.'
  };

  function selectSole(mode, focus = false) {
    tabs.forEach(tab => {
      const active = tab.dataset.mode === mode;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active) panel.setAttribute('aria-labelledby', tab.id);
    });
    display.dataset.mode = mode;
    number.textContent = mode === 'sport' ? '01' : '02';
    description.textContent = copy[mode];
    panel.style.animation = 'none';
    void panel.offsetWidth;
    panel.style.animation = '';
    if (focus) tabs.find(tab => tab.dataset.mode === mode).focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectSole(tab.dataset.mode));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      selectSole(tabs[next].dataset.mode, true);
    });
  });

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }));

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('is-visible'));
})();
