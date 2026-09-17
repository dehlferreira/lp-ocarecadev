const initScrollAnimations = () => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.add('js-loaded');
  }

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion && typeof document !== 'undefined') {
    document.documentElement.classList.add('reduced-motion');
  }

  // Animação de contadores numéricos ao entrar na tela (ex: +42%, 18 leads, 1.284 visitas)
  const animateCounter = (el) => {
    if (el.dataset.animated) return;
    el.dataset.animated = 'true';

    const rawTarget = el.dataset.target || el.textContent.replace(/[^0-9]/g, '');
    const target = parseFloat(rawTarget);
    if (isNaN(target)) return;

    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const isLocale = el.dataset.format === 'locale';
    const duration = 1200;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo suave
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(ease * target);

      el.textContent = `${prefix}${isLocale ? current.toLocaleString('pt-BR') : current}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${prefix}${isLocale ? target.toLocaleString('pt-BR') : target}${suffix}`;
      }
    };

    requestAnimationFrame(update);
  };

  // IntersectionObserver Universal: aciona revelação viva e contadores conforme o scroll desce
  // Com histerese segura para permitir repetição suave ao voltar sem oscilação na borda
  if (typeof IntersectionObserver !== 'undefined') {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        const windowH = typeof window !== 'undefined' ? window.innerHeight : 800;
        for (const entry of entries) {
          const targetEl = entry.target;
          if (entry.isIntersecting) {
            targetEl.classList.add('is-revealed');

            // Dispara contadores dentro do elemento
            const counters = targetEl.querySelectorAll('.counter-number');
            counters.forEach((c) => animateCounter(c));
            if (targetEl.classList.contains('counter-number')) {
              animateCounter(targetEl);
            }
          } else {
            // Histerese de segurança: só reseta para re-animar quando o elemento
            // estiver bem fora do campo de visão (pelo menos 120px abaixo da viewport),
            // evitando que oscilações no limite da tela causem travamentos ou jank.
            if (entry.boundingClientRect.top > windowH + 120) {
              targetEl.classList.remove('is-revealed');
            }
          }
        }
      },
      {
        rootMargin: '0px 0px -6% 0px',
        threshold: 0,
      }
    );

    const elementsToReveal = document.querySelectorAll(
      '.scrolly-step, .scroll-animate, .ba-card, .metric-card, .conversion-mockup, .problem-mockup, .counter-number'
    );

    elementsToReveal.forEach((el) => {
      if (prefersReducedMotion) {
        el.classList.add('is-revealed');
      } else {
        revealObserver.observe(el);
      }
    });
  }

  const scrollySupported =
    typeof CSS !== 'undefined' &&
    typeof CSS.supports === 'function' &&
    CSS.supports('(animation-timeline: view()) and (animation-range: contain)');

  const scrollyFallbackActive = !scrollySupported && !prefersReducedMotion;

  if (scrollyFallbackActive && typeof document !== 'undefined') {
    document.documentElement.classList.add('scrolly-fallback');
  }

  const updateScrollytelling = () => {
    // SPEC-014: Pinned scroll descontinuado. Alturas naturais e fluxo contínuo.
    return;
  };

  const header = document.getElementById('main-header');
  const heroSection = document.getElementById('hero');

  let ticking = false;
  let isHeaderShrunk = false;
  let cachedHeroHeight = heroSection ? heroSection.offsetHeight : 0;
  let cachedIsMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  window.addEventListener('resize', () => {
    if (heroSection) cachedHeroHeight = heroSection.offsetHeight;
    cachedIsMobile = window.innerWidth < 768;
  }, { passive: true });

  const onScroll = () => {
    const scrolled = window.scrollY;

    // Evita mutação forçada no DOM a cada frame: altera paddingBlock somente quando o estado mudar
    if (header) {
      const shouldShrink = scrolled > 50;
      if (shouldShrink !== isHeaderShrunk) {
        isHeaderShrunk = shouldShrink;
        header.style.paddingBlock = shouldShrink ? '0.5rem' : '1rem';
      }
    }

    if (scrollyFallbackActive) {
      updateScrollytelling();
    }

    // Hero dissolve — opacity + transform only (compositor-friendly, PRD-003)
    // Mobile First: no mobile o scroll é 100% nativo sem mutações contínuas de CSS variables,
    // eliminando travadas e garantindo fluidez instantânea na transição para a segunda seção.
    if (!cachedIsMobile && heroSection && cachedHeroHeight > 0 && scrolled <= cachedHeroHeight * 1.2) {
      const rawProgress = Math.min(scrolled / (cachedHeroHeight * 0.6), 1);
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
