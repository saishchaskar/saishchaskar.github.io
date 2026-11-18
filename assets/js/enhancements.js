(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const introSplash = document.getElementById('intro-splash');

  if (introSplash) {
    const greetingText = document.getElementById('intro-text');
    const greetingEl = document.getElementById('intro-greeting');
    const svgPath = document.getElementById('intro-path');
    const svgEl = document.getElementById('intro-svg');

    // Multilingual greetings including Marathi (नमस्कार) and Hindi (नमस्ते)
    const words = ["Hello", "Bonjour", "Ciao", "Olà", "नमस्कार", "नमस्ते", "やあ", "Guten Tag", "Hallo"];
    let wordIndex = 0;
    let isExiting = false;
    let wordTimer = null;
    let exitTimer = null;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Cubic bezier easing: cubic-bezier(0.76, 0, 0.24, 1)
    const bezier = (p1x, p1y, p2x, p2y) => {
      const cx = 3 * p1x, bx = 3 * (p2x - p1x) - cx, ax = 1 - cx - bx;
      const cy = 3 * p1y, by = 3 * (p2y - p1y) - cy, ay = 1 - cy - by;
      const sampleX = (t) => ((ax * t + bx) * t + cx) * t;
      const sampleY = (t) => ((ay * t + by) * t + cy) * t;
      const solveX = (x) => {
        let t = x;
        for (let i = 0; i < 8; i++) {
          const dx = sampleX(t) - x;
          if (Math.abs(dx) < 1e-4) return t;
          const d = (3 * ax * t + 2 * bx) * t + cx;
          if (Math.abs(d) < 1e-5) break;
          t -= dx / d;
        }
        let t0 = 0, t1 = 1;
        t = x;
        for (let i = 0; i < 12; i++) {
          const dx = sampleX(t) - x;
          if (Math.abs(dx) < 1e-4) return t;
          if (dx > 0) t1 = t; else t0 = t;
          t = (t0 + t1) / 2;
        }
        return t;
      };
      return (x) => sampleY(solveX(x));
    };
    const ease = bezier(0.76, 0, 0.24, 1);

    const updateSvg = (curveOffset) => {
      if (!svgPath || !svgEl) return;
      svgEl.setAttribute('viewBox', `0 0 ${width} ${height + 300}`);
      svgEl.setAttribute('preserveAspectRatio', 'none');
      const d = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + curveOffset} 0 ${height} L0 0`;
      svgPath.setAttribute('d', d);
    };

    window.scrollTo(0, 0);
    updateSvg(300);

    const onResize = () => {
      if (isExiting) return;
      width = window.innerWidth;
      height = window.innerHeight;
      updateSvg(300);
    };
    window.addEventListener('resize', onResize, { passive: true });

    // Cycle through multilingual words
    const cycleWords = () => {
      if (wordIndex < words.length - 1) {
        const delay = wordIndex === 0 ? 900 : 135;
        wordTimer = window.setTimeout(() => {
          wordIndex += 1;
          if (greetingText) greetingText.textContent = words[wordIndex];
          cycleWords();
        }, delay);
      }
    };
    cycleWords();

    // Curved curtain exit transition
    const exitAnimation = () => {
      if (isExiting) return;
      isExiting = true;
      window.clearTimeout(wordTimer);
      window.clearTimeout(exitTimer);
      window.removeEventListener('resize', onResize);

      width = window.innerWidth;
      height = window.innerHeight;

      const startTime = performance.now();
      const slideStart = 200;
      const slideDuration = 800;
      const curveStart = 300;
      const curveDuration = 700;
      const totalDuration = 1000;

      const animate = (now) => {
        const elapsed = now - startTime;

        if (elapsed >= slideStart) {
          const slideProgress = Math.min(1, (elapsed - slideStart) / slideDuration);
          const slideEased = ease(slideProgress);
          introSplash.style.transform = `translateY(-${slideEased * 100}%)`;
        }

        if (elapsed >= curveStart) {
          const curveProgress = Math.min(1, (elapsed - curveStart) / curveDuration);
          const curveEased = ease(curveProgress);
          const curveOffset = 300 * (1 - curveEased);
          updateSvg(curveOffset);
        }

        if (elapsed < totalDuration) {
          window.requestAnimationFrame(animate);
        } else {
          introSplash.style.transform = 'translateY(-100%)';
          updateSvg(0);
          introSplash.remove();
          document.documentElement.classList.remove('intro-ready');
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
        }
      };

      window.requestAnimationFrame(animate);
    };

    exitTimer = window.setTimeout(exitAnimation, 2000);

    introSplash.addEventListener('click', exitAnimation, { once: true });
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') exitAnimation();
    }, { once: true });
  } else {
    document.documentElement.classList.remove('intro-ready');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

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
