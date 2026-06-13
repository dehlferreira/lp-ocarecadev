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
    // easeOutExpo — mesma sensação de "settle" suave do cubic-bezier usado no CSS scroll-driven
    const ease = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

    // Mapeia a variante do elemento para o transform interpolado (e = progresso já suavizado)
    const variantTransform = (el, e) => {
      const cl = el.classList;
      if (cl.contains('anim-left')) return `translateX(${(1 - e) * -48}px)`;
      if (cl.contains('anim-right')) return `translateX(${(1 - e) * 48}px)`;
      if (cl.contains('anim-scale')) return `scale(${0.94 + e * 0.06})`;
      if (cl.contains('anim-rise-sm')) return `translateY(${(1 - e) * 18}px)`;
      return `translateY(${(1 - e) * 32}px)`;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Progresso para a animação terminar em ~28% de visibilidade
          const progress = Math.min(entry.intersectionRatio / 0.28, 1);
          const e = ease(progress);

          entry.target.style.opacity = e.toString();
          entry.target.style.transform = variantTransform(entry.target, e);
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

  const header = document.getElementById('main-header');

  let ticking = false;

  const onScroll = () => {
    const scrolled = window.scrollY;
    
    // Repassa o scroll absoluto para o CSS (Variável Global conforme Spec-004)
    document.documentElement.style.setProperty('--scroll-y', scrolled + 'px');

    if (header) {
      // Anima só o padding vertical (encolhe ao rolar); o horizontal fica no CSS
      // para o header manter o mesmo gutter das seções (1rem).
      header.style.paddingBlock = scrolled > 50 ? '0.5rem' : '1rem';
    }

    // Hero "Dissolve com Blur" — animação cinematográfica bidirecional
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      const heroHeight = heroSection.offsetHeight;
      const isMobile = window.innerWidth < 768;
      // No mobile, só começa a animar depois que a foto já apareceu (35% da hero)
      const scrollOffset = isMobile ? heroHeight * 0.35 : 0;
      const effectiveScroll = Math.max(scrolled - scrollOffset, 0);
      // Progresso de 0 (início) a 1 (saiu da viewport)
      const rawProgress = Math.min(effectiveScroll / (heroHeight * 0.6), 1);
      // Ease-out para suavidade
      const progress = rawProgress * rawProgress;

      const opacity = 1 - progress;
      const blur = progress * 12; // até 12px de blur
      const scale = 1 - progress * 0.06; // escala de 1.0 → 0.94
      const translateY = progress * -30; // leve lift de -30px

      heroSection.style.setProperty('--hero-opacity', opacity);
      heroSection.style.setProperty('--hero-blur', blur + 'px');
      heroSection.style.setProperty('--hero-scale', scale);
      heroSection.style.setProperty('--hero-translate-y', translateY + 'px');
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
