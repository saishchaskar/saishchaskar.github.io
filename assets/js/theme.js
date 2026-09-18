(() => {
  const storageKey = 'saish-theme';
  const root = document.documentElement;
  const savedTheme = localStorage.getItem(storageKey);
  const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  function setTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem(storageKey, theme);
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      const isDark = theme === 'dark';
      button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      button.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  setTheme(savedTheme || preferredTheme);

  function addToggle() {
    if (document.querySelector('[data-theme-toggle]')) return;
    const header = document.querySelector('header');
    if (!header) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-toggle';
    button.dataset.themeToggle = '';
    button.innerHTML = '<span class="theme-light-icon" aria-hidden="true">☀</span><span class="theme-dark-icon" aria-hidden="true">☾</span>';
    button.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
    const target = header.querySelector('.container') || header.querySelector('.topbar-inner') || header;
    target.appendChild(button);
  }

  function setupStudioTransitions() {
    if (!document.querySelector('.topbar')) return;
    document.body.classList.add('is-entering');
    requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.remove('is-entering')));

    document.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (event) => {
        const target = link.href;
        const isInternal = target.startsWith(window.location.origin) || target.startsWith('./') || target.startsWith('../');
        const isNewTab = link.target === '_blank';
        const isAnchor = target.includes('#');
        if (!isInternal || isNewTab || isAnchor) return;
        event.preventDefault();
        document.body.classList.add('is-exiting');
        setTimeout(() => { window.location.href = target; }, 400);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { addToggle(); setupStudioTransitions(); });
  } else {
    addToggle();
    setupStudioTransitions();
  }
})();
