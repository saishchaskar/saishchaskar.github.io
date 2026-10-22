(() => {
  const progress = document.createElement('div');
  progress.id = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);

  let frameRequested = false;
  const updateProgress = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressRatio = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    progress.style.transform = `scaleX(${Math.min(1, Math.max(0, progressRatio))})`;
    frameRequested = false;
  };

  window.addEventListener('scroll', () => {
    if (frameRequested) return;
    frameRequested = true;
    window.requestAnimationFrame(updateProgress);
  }, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  const revealItems = document.querySelectorAll(
    '[data-reveal], .activity-card, .challenge-card, .project-card, main > section'
  );
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    document.documentElement.classList.add('has-reveal');
    revealItems.forEach((item) => {
      item.setAttribute('data-reveal', '');
    });

    let revealFrameRequested = false;
    const revealVisibleItems = () => {
      const viewportHeight = window.innerHeight;
      revealItems.forEach((item) => {
        if (item.classList.contains('is-visible')) return;
        const bounds = item.getBoundingClientRect();
        if (bounds.top <= viewportHeight * 0.9 && bounds.bottom >= 0) {
          item.classList.add('is-visible');
        }
      });
      revealFrameRequested = false;
    };
    const scheduleRevealCheck = () => {
      if (revealFrameRequested) return;
      revealFrameRequested = true;
      window.requestAnimationFrame(revealVisibleItems);
    };

    revealVisibleItems();
    window.addEventListener('scroll', scheduleRevealCheck, { passive: true });
    window.addEventListener('resize', scheduleRevealCheck);
  }

  const menu = document.getElementById('mobile-menu');
  const menuButton = document.getElementById('mobile-menu-btn');
  if (menu && menuButton) {
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    menuButton.setAttribute('aria-expanded', 'false');

    menuButton.addEventListener('click', () => {
      const isOpen = !menu.classList.contains('max-h-0');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    menu.addEventListener('click', (event) => {
      if (!(event.target instanceof Element) || !event.target.closest('a')) return;
      menu.classList.add('max-h-0', 'opacity-0');
      menu.classList.remove('max-h-screen', 'opacity-100');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation menu');
      menuButton.innerHTML = '<ion-icon name="menu-outline"></ion-icon>';
    });
  }
})();
