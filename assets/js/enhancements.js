(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const introSplash = document.getElementById('intro-splash');

  if (introSplash && document.documentElement.classList.contains('intro-ready') && !prefersReducedMotion) {
    const greeting = document.getElementById('intro-greeting');
    const progress = document.getElementById('intro-progress');
    const skipButton = document.getElementById('intro-skip');
    const greetings = [
      { text: 'Hello', language: 'en' },
      { text: 'Bonjour', language: 'fr' },
      { text: 'Hola', language: 'es' },
      { text: 'नमस्ते', language: 'hi' },
      { text: 'नमस्कार', language: 'mr' },
      { text: 'こんにちは', language: 'ja' }
    ];
    let greetingIndex = 0;
    let greetingInterval;
    let greetingTimeout;

    const dismissIntro = () => {
      window.clearInterval(greetingInterval);
      window.clearTimeout(greetingTimeout);
      introSplash.classList.add('is-dismissed');
      window.setTimeout(() => {
        introSplash.remove();
        document.documentElement.classList.remove('intro-ready');
      }, 500);
    };

    skipButton.addEventListener('click', dismissIntro, { once: true });
    greetingInterval = window.setInterval(() => {
      greetingIndex += 1;
      if (greetingIndex >= greetings.length) {
        dismissIntro();
        return;
      }

      greeting.classList.add('is-changing');
      greetingTimeout = window.setTimeout(() => {
        greeting.textContent = greetings[greetingIndex].text;
        greeting.lang = greetings[greetingIndex].language;
        progress.style.width = `${(greetingIndex / (greetings.length - 1)) * 100}%`;
        greeting.classList.remove('is-changing');
      }, 140);
    }, 500);
  } else if (introSplash) {
    introSplash.remove();
    document.documentElement.classList.remove('intro-ready');
  }

  let scrollFrame;
  document.addEventListener('click', (event) => {
    if (
      !(event.target instanceof Element) ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return;

    const link = event.target.closest('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;

    const destination = new URL(link.href, window.location.href);
    if (
      destination.origin !== window.location.origin ||
      destination.pathname !== window.location.pathname ||
      destination.search !== window.location.search ||
      !destination.hash
    ) return;

    let targetId;
    try {
      targetId = decodeURIComponent(destination.hash.slice(1));
    } catch {
      return;
    }

    const target = document.getElementById(targetId);
    if (!target) return;

    event.preventDefault();
    window.cancelAnimationFrame(scrollFrame);
    if (window.location.hash !== destination.hash) {
      window.history.pushState(null, '', destination.hash);
    }

    const rootStyle = window.getComputedStyle(document.documentElement);
    const targetStyle = window.getComputedStyle(target);
    const topOffset = Math.max(
      Number.parseFloat(rootStyle.scrollPaddingTop) || 0,
      Number.parseFloat(targetStyle.scrollMarginTop) || 0
    );
    const startPosition = window.scrollY;
    const endPosition = Math.max(0, target.getBoundingClientRect().top + startPosition - topOffset);
    const distance = endPosition - startPosition;

    if (prefersReducedMotion || Math.abs(distance) < 1) {
      window.scrollTo({ top: endPosition, behavior: 'instant' });
      return;
    }

    const duration = Math.min(1600, Math.max(700, Math.abs(distance) * 0.45));
    const startTime = performance.now();
    const animateScroll = (time) => {
      const progress = Math.min(1, (time - startTime) / duration);
      const easedProgress = progress < 0.5
        ? 4 * progress ** 3
        : 1 - ((-2 * progress + 2) ** 3) / 2;
      window.scrollTo({
        top: startPosition + distance * easedProgress,
        behavior: 'instant'
      });

      if (progress < 1) {
        scrollFrame = window.requestAnimationFrame(animateScroll);
      }
    };

    scrollFrame = window.requestAnimationFrame(animateScroll);
  });

  const pageTransitionKey = 'saish-page-transition';
  try {
    if (sessionStorage.getItem(pageTransitionKey) === 'true') {
      sessionStorage.removeItem(pageTransitionKey);
      document.body.classList.add('is-page-entering');
      window.setTimeout(() => document.body.classList.remove('is-page-entering'), 460);
    }
  } catch (error) {
    console.error('Unable to restore the page transition state.', error);
  }

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest('a');
    if (
      !link ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      link.hasAttribute('download') ||
      (link.target && link.target !== '_self')
    ) return;

    const destination = new URL(link.href, window.location.href);
    if (
      destination.origin !== window.location.origin ||
      (destination.pathname === window.location.pathname && destination.search === window.location.search)
    ) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    document.body.classList.add('is-exiting');
    try {
      sessionStorage.setItem(pageTransitionKey, 'true');
    } catch (error) {
      console.error('Unable to save the page transition state.', error);
    }

    const transitionDelay = prefersReducedMotion ? 0 : 240;
    window.setTimeout(() => window.location.assign(destination.href), transitionDelay);
  }, true);

  const siteNav = document.querySelector('header.site-nav');
  if (siteNav) {
    const updateSiteNav = () => {
      siteNav.classList.toggle('is-scrolled', window.scrollY > 24);
    };

    window.addEventListener('scroll', updateSiteNav, { passive: true });
    updateSiteNav();
  }

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
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    document.documentElement.classList.add('has-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealItems.forEach((item) => {
      item.setAttribute('data-reveal', '');
      if (item.classList.contains('project-card') && item.parentElement) {
        const cardIndex = Array.from(item.parentElement.children).indexOf(item);
        item.style.setProperty('--reveal-delay', `${cardIndex * 90}ms`);
      }
      revealObserver.observe(item);
    });
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
