with open('src/components/sections/SocialProof.astro', 'r') as f:
    content = f.read()

script_to_add = """
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

content = content.replace('const setupSocialProofs = () => {', script_to_add + '\n  const setupSocialProofs = () => {')

with open('src/components/sections/SocialProof.astro', 'w') as f:
    f.write(content)
print("Done")
