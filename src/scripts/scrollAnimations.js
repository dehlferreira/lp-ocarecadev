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

  const header = document.getElementById('main-header');

  let ticking = false;

  const onScroll = () => {
    const scrolled = window.scrollY;

    if (header) {
      // Anima só o padding vertical (encolhe ao rolar); o horizontal fica no CSS
      // para o header manter o mesmo gutter das seções (1rem).
      header.style.paddingBlock = scrolled > 50 ? '0.5rem' : '1rem';
    }

    // Hero dissolve — opacity + transform only (compositor-friendly, PRD-003)
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      const heroHeight = heroSection.offsetHeight;
      const isMobile = window.innerWidth < 768;
      // No mobile, só começa a animar depois que a foto já apareceu (35% da hero)
      const scrollOffset = isMobile ? heroHeight * 0.35 : 0;
      const effectiveScroll = Math.max(scrolled - scrollOffset, 0);
      const rawProgress = Math.min(effectiveScroll / (heroHeight * 0.6), 1);
      const progress = rawProgress * rawProgress;

      const opacity = 1 - progress;
      const scale = 1 - progress * 0.06;
      const translateY = progress * -30;

      heroSection.style.setProperty('--hero-opacity', opacity);
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

  window.requestAnimationFrame(onScroll);
};

const initMouseTracking = () => {
  // Só em dispositivos com ponteiro fino (desktop); orbs/glows estão ocultos no mobile
  if (!window.matchMedia('(pointer: fine)').matches) return;

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    document.documentElement.style.setProperty('--mouse-x', x);
    document.documentElement.style.setProperty('--mouse-y', y);
  }, { passive: true });
};

const init = () => {
  initScrollAnimations();
  initMouseTracking();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
