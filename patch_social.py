import re

with open('src/components/sections/SocialProof.astro', 'r') as f:
    content = f.read()

# 1. Add transition beam and glow right after <section id="social-proof"...>
content = re.sub(
    r'(<section id="social-proof"[^>]+>)',
    r'\1\n  <!-- Conector Luminoso de Transição Fluida -->\n  <div class="transition-beam" aria-hidden="true"></div>\n  <div class="transition-ambient-glow" aria-hidden="true"></div>',
    content
)

# 2. Add scroll-animate to section-title
content = content.replace('<h2 class="section-title">', '<h2 class="section-title scroll-animate anim-rise-sm">')

# 3. Add scroll-animate to section-subtitle-list
content = content.replace('<ul class="section-subtitle-list">', '<ul class="section-subtitle-list scroll-animate anim-rise-sm delay-100">')

# 4. Add scroll-animate to group-header
content = content.replace('<div class="group-header">', '<div class="group-header scroll-animate anim-rise-sm">')

# 5. Add scroll-animate and delays to proof-card
def replace_audio_cards(match):
    replace_audio_cards.count += 1
    delay = replace_audio_cards.count * 100
    return f'<div class="proof-card audio-card scroll-animate anim-rise-sm delay-{delay}">'
replace_audio_cards.count = 0
content = re.sub(r'<div class="proof-card audio-card">', replace_audio_cards, content)

def replace_print_cards(match):
    replace_print_cards.count += 1
    delay = replace_print_cards.count * 100
    return f'<div class="proof-card print-card scroll-animate anim-rise-sm delay-{delay}">'
replace_print_cards.count = 0
content = re.sub(r'<div class="proof-card print-card">', replace_print_cards, content)

# 6. CSS additions
style_additions = """
  /* Conector de Transição Fluida */
  .transition-beam {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 255, 157, 0.04) 15%,
      rgba(0, 255, 157, 0.45) 50%,
      rgba(0, 255, 157, 0.04) 85%,
      transparent 100%
    );
    z-index: 2;
    pointer-events: none;
  }

  .transition-ambient-glow {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 800px;
    height: 250px;
    background: radial-gradient(
      ellipse at top center,
      rgba(0, 255, 157, 0.07) 0%,
      transparent 70%
    );
    z-index: 1;
    pointer-events: none;
  }
"""
content = content.replace('<style>', '<style>' + style_additions)

css_hover_proof = """
  :global(.proof-card) {
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), 
                border-color 0.35s ease, 
                box-shadow 0.35s ease,
                background 0.35s ease,
                opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }

  :global(.proof-card:hover) {
    transform: translateY(-4px) !important;
    border-color: rgba(0, 255, 157, 0.4) !important;
    background: rgba(255, 255, 255, 0.05) !important;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.12), 0 0 24px rgba(0, 255, 157, 0.15) !important;
    transition-delay: 0s, 0s, 0s, 0s, 0s !important; 
  }
"""

content = content.replace('.proof-card {', css_hover_proof + '\n  .proof-card {')

css_hover_wa_btn = """
  .wa-play-btn {
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  }
  .wa-play-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(0, 255, 157, 0.3);
    background-color: var(--color-primary-neon);
  }
"""

content = content.replace('.wa-play-btn {', css_hover_wa_btn + '\n  .wa-play-btn {')

# 7. Add intersection observer script
script_addition = """
  const setupSocialProofRepeat = () => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        } else {
          if (entry.boundingClientRect.top > 0) {
            entry.target.classList.remove('is-revealed');
          }
        }
      });
    }, {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0
    });

    const elements = document.querySelectorAll('#social-proof .scroll-animate');
    elements.forEach(el => observer.observe(el));
  };
  setupSocialProofRepeat();
"""
content = content.replace('document.addEventListener(\'astro:page-load\', () => {', script_addition + '\n  document.addEventListener(\'astro:page-load\', () => {\n    setupSocialProofRepeat();')

with open('src/components/sections/SocialProof.astro', 'w') as f:
    f.write(content)

print("Done")
