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

  const scrollySupported =
    typeof CSS !== 'undefined' &&
    typeof CSS.supports === 'function' &&
    CSS.supports('(animation-timeline: view()) and (animation-range: contain)');

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scrollyFallbackActive = !scrollySupported && !prefersReducedMotion;

  if (scrollyFallbackActive && typeof document !== 'undefined') {
    document.documentElement.classList.add('scrolly-fallback');
  }

  const STEP_RANGES = {
    2: [
      [0.04, 0.42],
      [0.46, 0.88],
    ],
    3: [
      [0.04, 0.28],
      [0.32, 0.56],
      [0.6, 0.88],
    ],
    4: [
      [0.04, 0.22],
      [0.26, 0.44],
      [0.48, 0.66],
      [0.7, 0.88],
    ],
    5: [
      [0.04, 0.18],
      [0.21, 0.35],
      [0.38, 0.52],
      [0.55, 0.69],
      [0.72, 0.88],
    ],
    7: [
      [0.03, 0.13],
      [0.15, 0.25],
      [0.27, 0.37],
      [0.39, 0.49],
      [0.51, 0.61],
      [0.63, 0.73],
      [0.75, 0.88],
    ],
  };

  const scrollyContainers = scrollyFallbackActive
    ? Array.from(document.querySelectorAll('.scrolly'))
    : [];

  const updateScrollytelling = () => {
    const isMobile = window.innerWidth < 768;
    const headerOffset = isMobile ? 72 : 104;

    for (const container of scrollyContainers) {
      const pinDistance = container.offsetHeight - window.innerHeight;
      if (pinDistance <= 0) continue;

      const rect = container.getBoundingClientRect();
      const current = headerOffset - rect.top;
      const progress = Math.min(Math.max(current / pinDistance, 0), 1);

      let totalSteps = 5;
      for (const count of [2, 3, 4, 5, 7]) {
        if (container.classList.contains(`scrolly--${count}`)) {
          totalSteps = count;
          break;
        }
      }

      const ranges = STEP_RANGES[totalSteps] || STEP_RANGES[5];
      const steps = container.querySelectorAll('.scrolly-step');
      const section = container.closest('section');
      const isTarget = Boolean(
        section && section.id && window.location.hash === `#${section.id}`
      );

      for (const step of steps) {
        let stepIdx = 1;
        for (let i = 1; i <= 7; i++) {
          if (step.classList.contains(`s-${i}`)) {
            stepIdx = i;
            break;
          }
        }

        if (isTarget && stepIdx === 1) {
          step.style.opacity = '1';
          step.style.transform = 'none';
          continue;
        }

        const range = ranges[stepIdx - 1];
        if (!range) continue;

        const [start, end] = range;
        const stepProgress = Math.min(Math.max((progress - start) / (end - start), 0), 1);

        step.style.opacity = stepProgress.toString();

        if (stepProgress >= 1) {
          step.style.transform = 'none';
        } else {
          if (step.classList.contains('from-left')) {
            step.style.transform = isMobile
              ? `translateY(${(1 - stepProgress) * 38}px)`
              : `translateX(${(1 - stepProgress) * -44}px)`;
          } else if (step.classList.contains('from-right')) {
            step.style.transform = isMobile
              ? `translateY(${(1 - stepProgress) * 38}px)`
              : `translateX(${(1 - stepProgress) * 44}px)`;
          } else if (step.classList.contains('from-scale')) {
            step.style.transform = `scale(${0.92 + stepProgress * 0.08})`;
          } else {
            step.style.transform = `translateY(${(1 - stepProgress) * 38}px)`;
          }
        }
      }

      const progressBars = container.querySelectorAll('.scrolly-progress');
      for (const bar of progressBars) {
        const fill = Math.min(Math.max((progress - 0.02) / (0.88 - 0.02), 0), 1);
        if (bar.classList.contains('is-horizontal')) {
          bar.style.transform = `scaleX(${fill})`;
        } else {
          bar.style.transform = `scaleY(${fill})`;
        }
      }
    }
  };

  const header = document.getElementById('main-header');

  let ticking = false;

  const onScroll = () => {
    const scrolled = window.scrollY;

    if (header) {
      // Anima só o padding vertical (encolhe ao rolar); o horizontal fica no CSS
      // para o header manter o mesmo gutter das seções (1rem).
      header.style.paddingBlock = scrolled > 50 ? '0.5rem' : '1rem';
    }

    if (scrollyFallbackActive) {
      updateScrollytelling();
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
