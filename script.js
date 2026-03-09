// Theme toggle
function toggleTheme() {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('css-guide-theme', html.dataset.theme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  btn.innerHTML = document.documentElement.dataset.theme === 'dark' ? '&#9790; Dark' : '&#9788; Light';
}

// Load saved theme
(function() {
  const t = localStorage.getItem('css-guide-theme');
  if (t) document.documentElement.dataset.theme = t;
})();

document.addEventListener('DOMContentLoaded', () => {
  updateThemeIcon();

  // Scroll progress
  window.addEventListener('scroll', () => {
    const bar = document.getElementById('progress');
    if (!bar) return;
    const s = document.documentElement.scrollTop || document.body.scrollTop;
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    bar.style.width = h > 0 ? (s / h * 100) + '%' : '0%';
  });

  // Copy to clipboard
  document.addEventListener('click', e => {
    if (e.target.classList.contains('copy-btn')) {
      const code = e.target.closest('.code-block').querySelector('pre').textContent;
      navigator.clipboard.writeText(code).then(() => {
        e.target.textContent = 'Copied!';
        setTimeout(() => e.target.textContent = 'Copy', 1500);
      });
    }
  });

  // Active sidebar link on scroll
  const sections = document.querySelectorAll('.section');
  if (sections.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
          const a = document.querySelector('.sidebar a[href="#' + en.target.id + '"]');
          if (a) a.classList.add('active');
        }
      });
    }, { rootMargin: '-80px 0px -60% 0px' });
    sections.forEach(s => observer.observe(s));
  }

  // Close sidebar on mobile link click
  document.querySelectorAll('.sidebar a').forEach(a => a.addEventListener('click', () => {
    if (window.innerWidth <= 768) document.querySelector('.sidebar').classList.remove('open');
  }));
});
