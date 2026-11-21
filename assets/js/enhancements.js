(() => {
  // Smooth in-page anchor navigation
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const hash = link.getAttribute('href');
    if (!hash || hash === '#') return;

    const targetEl = document.querySelector(hash);
    if (!targetEl) return;

    event.preventDefault();
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (window.location.hash !== hash) {
      window.history.pushState(null, '', hash);
    }

    // Auto-close mobile drawer if open
    const menu = document.getElementById('mobile-menu');
    const menuBtn = document.getElementById('mobile-menu-btn');
    if (menu && !menu.classList.contains('max-h-0')) {
      menu.classList.add('max-h-0', 'opacity-0');
      menu.classList.remove('max-h-screen', 'opacity-100');
      if (menuBtn) menuBtn.innerHTML = '<ion-icon name="menu-outline"></ion-icon>';
    }
  });

  // Sticky navbar scroll state
  const siteNav = document.querySelector('header.site-nav');
  if (siteNav) {
    const updateSiteNav = () => {
      siteNav.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', updateSiteNav, { passive: true });
    updateSiteNav();
  }

  // Active Scroll Spy for navigation items
  const navLinks = document.querySelectorAll('header.site-nav nav a[href^="#"], #mobile-menu nav a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const linkHref = link.getAttribute('href');
            if (linkHref === `#${currentId}`) {
              link.classList.remove('text-slate-200', 'text-slate-300');
              link.classList.add('text-cyan-400', 'font-semibold');
            } else {
              link.classList.remove('text-cyan-400', 'font-semibold');
              link.classList.add(link.closest('#mobile-menu') ? 'text-slate-300' : 'text-slate-200');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -55% 0px', threshold: 0.1 });

    sections.forEach((sec) => spyObserver.observe(sec));
  }

  // Mobile menu button toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isClosed = mobileMenu.classList.contains('max-h-0');
      if (isClosed) {
        mobileMenu.classList.remove('max-h-0', 'opacity-0');
        mobileMenu.classList.add('max-h-screen', 'opacity-100');
        mobileBtn.innerHTML = '<ion-icon name="close-outline"></ion-icon>';
      } else {
        mobileMenu.classList.add('max-h-0', 'opacity-0');
        mobileMenu.classList.remove('max-h-screen', 'opacity-100');
        mobileBtn.innerHTML = '<ion-icon name="menu-outline"></ion-icon>';
      }
    });
  }

  // Contact form mailto handler
  const sendEmailBtn = document.getElementById('sendEmailButton');
  if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', () => {
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        alert('Please fill in your name, email, and message before sending.');
        return;
      }

      const mailtoLink = `mailto:saish.chaskar@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(`Hi Saish,\n\n${message}\n\nFrom: ${name} (${email})`)}`;
      window.location.href = mailtoLink;
    });
  }
})();
