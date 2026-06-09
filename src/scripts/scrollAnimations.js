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
  // Intersection Observer atuando como Fallback para navegadores sem suporte a CSS Scroll-Driven Animations
  if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Calcula o progresso para que a animação termine em 25% de visibilidade (0.25)
          const ratio = entry.intersectionRatio;
          const progress = Math.min(ratio / 0.25, 1);
          
          entry.target.style.opacity = progress.toString();
          entry.target.style.transform = `translateY(${(1 - progress) * 40}px)`;
        }
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
      }
    );

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });
  }

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

const initMouseTracking = () => {
  document.addEventListener('mousemove', (e) => {
    // Valores de -1 a 1, onde 0 é o centro da tela
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    document.documentElement.style.setProperty('--mouse-x', x);
    document.documentElement.style.setProperty('--mouse-y', y);
  }, { passive: true });
};

const init = () => {
  initAnalytics();
  initScrollAnimations();
  initMouseTracking();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
