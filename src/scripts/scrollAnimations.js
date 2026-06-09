const initAnalytics = () => {
  const ctaButtons = document.querySelectorAll('.btn-pricing-cta, #btn-hero-primary, #btn-header-cta');
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof fbq === 'function') fbq('track', 'Lead');
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', { currency: 'BRL', value: 997.00 });
      }
    });
  });
};

const initScrollAnimations = () => {
  // Intersection Observer para elementos .scroll-reveal
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.scroll-animate');
  revealElements.forEach(el => observer.observe(el));

  // Lógica de Scroll e Scrubbing via requestAnimationFrame (Conforme SPEC-004)
  const heroTitle = document.getElementById('hero-title');
  const heroSubtitle = document.getElementById('hero-subtitle');
  const heroImage = document.getElementById('hero-image');
  const header = document.getElementById('main-header');

  let ticking = false;

  const onScroll = () => {
    const scrolled = window.scrollY;
    
    // Repassa o scroll absoluto para o CSS (Variável Global conforme Spec-004)
    document.documentElement.style.setProperty('--scroll-y', scrolled + 'px');

    if (header) {
      if (scrolled > 50) {
        header.style.padding = '0.5rem 1rem';
      } else {
        header.style.padding = '1rem';
      }
    }

    if (scrolled < window.innerHeight && heroTitle && heroSubtitle && heroImage) {
      const opacity = Math.max(1 - (scrolled / 500), 0);
      heroTitle.style.transform = `translateY(${scrolled * 0.3}px)`;
      heroTitle.style.opacity = opacity.toString();
      
      heroSubtitle.style.transform = `translateY(${scrolled * 0.4}px)`;
      heroSubtitle.style.opacity = opacity.toString();
      
      heroImage.style.transform = `translateY(${scrolled * 0.15}px)`;
      heroImage.style.opacity = opacity.toString();
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  // Dispara uma vez no início para ajustar estado inicial do Header e CSS Var
  window.requestAnimationFrame(onScroll);
};

const init = () => {
  initAnalytics();
  initScrollAnimations();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
