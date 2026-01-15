
export function iniciarAccordions() {
  const accordions = document.querySelectorAll('.accordion');

  if (!accordions.length) return; // se não tem acordeão na página, sai

  accordions.forEach(acc => {
    const btn = acc.querySelector('.accordion-btn');
    const content = acc.querySelector('.accordion-content');
    const tri = btn.querySelector('.tri');

    content.style.maxHeight = null;
    btn.setAttribute('aria-expanded', 'false');
    tri.textContent = '▼';

    btn.onclick = () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        content.style.maxHeight = null;
        btn.setAttribute('aria-expanded', 'false');
        tri.textContent = '▼';
      } else {
        document.querySelectorAll('.accordion-content').forEach(other => {
          if (other !== content) {
            other.style.maxHeight = null;
          }
        });

        content.style.maxHeight = content.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
        tri.textContent = '▲';
      }
    };
  });
}