// ===== TOPICS DATA (used by search, related topics, keyboard nav) =====
const TOPICS = [
  { num: '01', file: '01-css-basics.html', title: 'CSS Basics', desc: 'Syntax, selectors, specificity, cascade, inheritance', related: [2,5,15] },
  { num: '02', file: '02-box-model.html', title: 'Box Model', desc: 'Margin, padding, border, box-sizing', related: [1,5,6] },
  { num: '03', file: '03-typography.html', title: 'Typography', desc: 'Font properties, text styling, @font-face, fluid type', related: [4,8,14] },
  { num: '04', file: '04-colors-backgrounds.html', title: 'Colors & Backgrounds', desc: 'Hex, RGB, HSL, gradients, blend modes', related: [3,13,10] },
  { num: '05', file: '05-display-positioning.html', title: 'Display & Positioning', desc: 'Block, inline, position types, z-index, overflow', related: [2,6,7] },
  { num: '06', file: '06-flexbox.html', title: 'Flexbox', desc: 'Flex container and item properties, alignment, patterns', related: [5,7,8] },
  { num: '07', file: '07-css-grid.html', title: 'CSS Grid', desc: 'Grid template, areas, auto-fit, minmax, subgrid', related: [6,8,21] },
  { num: '08', file: '08-responsive-design.html', title: 'Responsive Design', desc: 'Media queries, mobile-first, breakpoints, clamp()', related: [6,7,14] },
  { num: '09', file: '09-pseudo-classes-elements.html', title: 'Pseudo-classes & Elements', desc: ':hover, :nth-child, ::before, ::after', related: [1,15,11] },
  { num: '10', file: '10-css-variables.html', title: 'CSS Variables', desc: 'Custom properties, :root, theming, JS integration', related: [14,4,21] },
  { num: '11', file: '11-transitions-animations.html', title: 'Transitions & Animations', desc: '@keyframes, timing functions, will-change, performance', related: [12,9,13] },
  { num: '12', file: '12-transforms.html', title: 'Transforms', desc: 'Translate, rotate, scale, skew, 3D, perspective', related: [11,13,17] },
  { num: '13', file: '13-filters-effects.html', title: 'Filters & Effects', desc: 'CSS filters, backdrop-filter, shadows, glassmorphism', related: [12,4,17] },
  { num: '14', file: '14-css-functions.html', title: 'CSS Functions', desc: 'calc(), min(), max(), clamp(), var(), env(), attr()', related: [10,8,3] },
  { num: '15', file: '15-selectors-deep-dive.html', title: 'Selectors Deep Dive', desc: 'Combinators, attribute selectors, :is(), :where(), :has()', related: [1,9,21] },
  { num: '16', file: '16-logical-properties.html', title: 'Logical Properties', desc: 'margin-inline, padding-block, inset, writing-mode', related: [2,8,20] },
  { num: '17', file: '17-shapes-clip-path.html', title: 'Shapes & Clip-path', desc: 'Circles, polygons, clipping masks, shape-outside', related: [12,13,11] },
  { num: '18', file: '18-scrollbar-styling.html', title: 'Scrollbar Styling', desc: 'Custom scrollbars, scroll snap, scroll-behavior', related: [11,20,19] },
  { num: '19', file: '19-print-styles.html', title: 'Print Styles', desc: '@media print, page breaks, print-friendly output', related: [8,20,18] },
  { num: '20', file: '20-architecture-best-practices.html', title: 'Architecture & Best Practices', desc: 'BEM, resets, file organization, scalable patterns', related: [21,10,16] },
  { num: '21', file: '21-modern-css.html', title: 'Modern CSS', desc: 'Container queries, :has(), @layer, nesting, subgrid', related: [15,7,10] }
];

// ===== THEME =====
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

// ===== MAIN INIT =====
document.addEventListener('DOMContentLoaded', () => {
  updateThemeIcon();
  initScrollProgress();
  initCopyButtons();
  initSidebarObserver();
  initMobileSidebar();
  initSearch();
  initBackToTop();
  initFontSizeControls();
  initSectionDeepLinks();
  initReadingTime();
  initRelatedTopics();
  initCollapsibleCode();
  initKeyboardNav();
  initProgressTracking();
  initServiceWorker();
});

// ===== SCROLL PROGRESS =====
function initScrollProgress() {
  window.addEventListener('scroll', () => {
    const bar = document.getElementById('progress');
    if (!bar) return;
    const s = document.documentElement.scrollTop || document.body.scrollTop;
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    bar.style.width = h > 0 ? (s / h * 100) + '%' : '0%';
  });
}

// ===== COPY TO CLIPBOARD =====
function initCopyButtons() {
  document.addEventListener('click', e => {
    if (e.target.classList.contains('copy-btn')) {
      const code = e.target.closest('.code-block').querySelector('pre').textContent;
      navigator.clipboard.writeText(code).then(() => {
        e.target.textContent = 'Copied!';
        setTimeout(() => e.target.textContent = 'Copy', 1500);
      });
    }
  });
}

// ===== SIDEBAR OBSERVER =====
function initSidebarObserver() {
  const sections = document.querySelectorAll('.section');
  if (sections.length === 0) return;
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

// ===== MOBILE SIDEBAR =====
function initMobileSidebar() {
  document.querySelectorAll('.sidebar a').forEach(a => a.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      const sb = document.querySelector('.sidebar');
      if (sb) sb.classList.remove('open');
    }
  }));
}

// ===== FEATURE 1: GLOBAL SEARCH =====
function initSearch() {
  // Build search index from TOPICS data
  const searchIndex = TOPICS.map(t => ({
    file: t.file,
    title: t.title,
    num: t.num,
    desc: t.desc,
    keywords: (t.title + ' ' + t.desc).toLowerCase()
  }));

  // Also build section-level index from current page
  const pageSections = [];
  document.querySelectorAll('.section[id]').forEach(sec => {
    const h2 = sec.querySelector('h2');
    if (!h2) return;
    const text = sec.textContent.substring(0, 300).replace(/\s+/g, ' ').trim();
    pageSections.push({
      id: sec.id,
      title: h2.textContent.trim(),
      text: text.toLowerCase(),
      snippet: text.substring(0, 120)
    });
  });

  // Create & inject overlay
  const overlay = document.createElement('div');
  overlay.className = 'search-overlay';
  overlay.innerHTML = `
    <div class="search-modal">
      <div class="search-input-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" class="search-input" placeholder="Search all CSS topics..." autofocus>
        <span class="search-kbd">ESC</span>
      </div>
      <div class="search-results"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  const input = overlay.querySelector('.search-input');
  const results = overlay.querySelector('.search-results');

  function openSearch() {
    overlay.classList.add('open');
    input.value = '';
    results.innerHTML = '';
    setTimeout(() => input.focus(), 50);
  }

  function closeSearch() {
    overlay.classList.remove('open');
  }

  // Search trigger button in header
  const headerNav = document.querySelector('.header-nav') || document.querySelector('.header');
  if (headerNav) {
    const searchBtn = document.createElement('button');
    searchBtn.className = 'search-trigger';
    searchBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg><span>Search</span><span class="search-kbd">Ctrl+K</span>';
    searchBtn.onclick = openSearch;
    // Insert before theme toggle
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) themeBtn.parentNode.insertBefore(searchBtn, themeBtn);
  }

  // Ctrl+K / Cmd+K
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeSearch();
    }
  });

  // Click overlay to close
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeSearch();
  });

  // Search logic
  let activeIndex = -1;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    if (!q) { results.innerHTML = ''; activeIndex = -1; return; }

    let matches = [];

    // Search topics
    searchIndex.forEach(item => {
      if (item.keywords.includes(q)) {
        matches.push({
          type: 'topic',
          url: item.file,
          topic: 'Chapter ' + item.num,
          title: item.title,
          snippet: item.desc,
          score: item.title.toLowerCase().includes(q) ? 2 : 1
        });
      }
    });

    // Search current page sections
    pageSections.forEach(sec => {
      if (sec.text.includes(q)) {
        matches.push({
          type: 'section',
          url: '#' + sec.id,
          topic: 'This Page',
          title: sec.title,
          snippet: highlightMatch(sec.snippet, q),
          score: sec.title.toLowerCase().includes(q) ? 1.5 : 0.5
        });
      }
    });

    matches.sort((a, b) => b.score - a.score);
    matches = matches.slice(0, 10);
    activeIndex = -1;

    if (matches.length === 0) {
      results.innerHTML = '<div class="search-no-results">No results found for "' + escapeHtml(input.value) + '"</div>';
      return;
    }

    results.innerHTML = matches.map((m, i) =>
      `<a href="${m.url}" class="search-result-item" data-index="${i}" onclick="document.querySelector('.search-overlay').classList.remove('open')">
        <div class="sr-topic">${m.topic}</div>
        <div class="sr-title">${escapeHtml(m.title)}</div>
        <div class="sr-snippet">${m.snippet}</div>
      </a>`
    ).join('');
  });

  // Keyboard navigation in results
  input.addEventListener('keydown', e => {
    const items = results.querySelectorAll('.search-result-item');
    if (!items.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, items.length - 1);
      items.forEach((it, i) => it.classList.toggle('active', i === activeIndex));
      items[activeIndex].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      items.forEach((it, i) => it.classList.toggle('active', i === activeIndex));
      items[activeIndex].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      items[activeIndex].click();
    }
  });
}

function highlightMatch(text, query) {
  const idx = text.toLowerCase().indexOf(query);
  if (idx === -1) return escapeHtml(text);
  const before = escapeHtml(text.slice(0, idx));
  const match = text.slice(idx, idx + query.length);
  const after = escapeHtml(text.slice(idx + query.length));
  return before + '<mark>' + escapeHtml(match) + '</mark>' + after;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ===== FEATURE 3: TOPIC PROGRESS TRACKING =====
function initProgressTracking() {
  // Track current page visit
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  if (currentFile !== 'index.html' && currentFile.match(/^\d{2}-/)) {
    const visited = JSON.parse(localStorage.getItem('css-guide-visited') || '[]');
    if (!visited.includes(currentFile)) {
      visited.push(currentFile);
      localStorage.setItem('css-guide-visited', JSON.stringify(visited));
    }
  }

  // Update landing page cards with checkmarks
  const cards = document.querySelectorAll('.topic-card');
  if (cards.length === 0) return;

  const visited = JSON.parse(localStorage.getItem('css-guide-visited') || '[]');

  cards.forEach(card => {
    const href = card.getAttribute('href');
    if (!href) return;
    // Add check span
    const check = document.createElement('span');
    check.className = 'progress-check';
    check.innerHTML = '&#10003;';
    card.appendChild(check);
    if (visited.includes(href)) {
      card.classList.add('visited');
    }
  });

  // Add progress bar above grid
  const grid = document.querySelector('.topics-grid');
  if (grid) {
    const count = visited.length;
    const total = 21;
    const pct = Math.round((count / total) * 100);
    const progressDiv = document.createElement('div');
    progressDiv.className = 'landing-progress';
    progressDiv.innerHTML = `<strong>${count}</strong> of ${total} topics visited (${pct}%)
      <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct}%"></div></div>`;
    grid.parentNode.insertBefore(progressDiv, grid);
  }
}

// ===== FEATURE 4: SECTION DEEP LINKS =====
function initSectionDeepLinks() {
  document.querySelectorAll('.section h2[id], .section[id] > h2').forEach(h2 => {
    const section = h2.closest('.section');
    const id = section ? section.id : h2.id;
    if (!id) return;
    const anchor = document.createElement('a');
    anchor.className = 'section-anchor';
    anchor.href = '#' + id;
    anchor.textContent = '#';
    anchor.title = 'Copy link to this section';
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const url = window.location.origin + window.location.pathname + '#' + id;
      navigator.clipboard.writeText(url).then(() => {
        anchor.textContent = 'Copied!';
        setTimeout(() => anchor.textContent = '#', 1500);
      });
      // Also update URL
      history.replaceState(null, '', '#' + id);
    });
    h2.appendChild(anchor);
  });
}

// ===== FEATURE 5: BACK TO TOP =====
function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.innerHTML = '&#8593;';
  btn.title = 'Back to top';
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    btn.classList.toggle('visible', scrollY > 400);
  });
}

// ===== FEATURE 6: FONT SIZE CONTROLS =====
function initFontSizeControls() {
  const sizes = { small: '15px', medium: '16px', large: '18px' };
  const saved = localStorage.getItem('css-guide-fontsize') || 'medium';
  document.documentElement.style.fontSize = sizes[saved];

  const container = document.createElement('div');
  container.className = 'font-size-controls';
  container.innerHTML = `
    <button data-size="small" title="Small text" style="font-size:.72rem">A</button>
    <button data-size="medium" title="Medium text" style="font-size:.85rem">A</button>
    <button data-size="large" title="Large text" style="font-size:1rem">A</button>
  `;

  container.querySelectorAll('button').forEach(btn => {
    if (btn.dataset.size === saved) btn.classList.add('active');
    btn.addEventListener('click', () => {
      const size = btn.dataset.size;
      document.documentElement.style.fontSize = sizes[size];
      localStorage.setItem('css-guide-fontsize', size);
      container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  const themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) themeBtn.parentNode.insertBefore(container, themeBtn);
}

// ===== FEATURE 7: RELATED TOPICS =====
function initRelatedTopics() {
  const currentFile = window.location.pathname.split('/').pop();
  const currentTopic = TOPICS.find(t => t.file === currentFile);
  if (!currentTopic || !currentTopic.related) return;

  const topicNav = document.querySelector('.topic-nav');
  if (!topicNav) return;

  const relatedDiv = document.createElement('div');
  relatedDiv.className = 'related-topics';
  relatedDiv.innerHTML = '<h3>Related Topics</h3><div class="related-grid"></div>';
  const grid = relatedDiv.querySelector('.related-grid');

  currentTopic.related.forEach(idx => {
    const t = TOPICS[idx - 1];
    if (!t) return;
    grid.innerHTML += `
      <a href="${t.file}" class="related-card">
        <span class="rc-num">${t.num}</span>
        <span class="rc-title">${t.title}</span>
      </a>`;
  });

  topicNav.parentNode.insertBefore(relatedDiv, topicNav);
}

// ===== FEATURE 8: READING TIME =====
function initReadingTime() {
  const hero = document.querySelector('.page-hero');
  if (!hero) return;

  const mainContent = document.querySelector('.main');
  if (!mainContent) return;
  const text = mainContent.textContent || '';
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 220));

  const timeDiv = document.createElement('div');
  timeDiv.className = 'reading-time';
  timeDiv.innerHTML = `&#9201; ${minutes} min read &middot; ${words.toLocaleString()} words`;
  hero.appendChild(timeDiv);
}

// ===== FEATURE 10: COLLAPSIBLE CODE BLOCKS =====
function initCollapsibleCode() {
  document.querySelectorAll('.code-block').forEach(block => {
    const pre = block.querySelector('pre');
    if (!pre) return;
    const lineCount = pre.textContent.split('\n').length;
    if (lineCount < 15) return; // only collapse long blocks

    block.classList.add('collapsible', 'collapsed');
    const btn = document.createElement('button');
    btn.className = 'code-expand-btn';
    btn.textContent = 'Show more (' + lineCount + ' lines)';
    block.appendChild(btn);

    btn.addEventListener('click', () => {
      const isCollapsed = block.classList.toggle('collapsed');
      btn.textContent = isCollapsed
        ? 'Show more (' + lineCount + ' lines)'
        : 'Show less';
    });
  });
}

// ===== FEATURE 11: KEYBOARD NAVIGATION =====
function initKeyboardNav() {
  const currentFile = window.location.pathname.split('/').pop();
  const currentIndex = TOPICS.findIndex(t => t.file === currentFile);

  // Find prev/next from topic-nav links on the page
  const prevLink = document.querySelector('.topic-nav a:not(.next)');
  const nextLink = document.querySelector('.topic-nav a.next');

  document.addEventListener('keydown', e => {
    // Don't intercept if user is typing in input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    // Don't intercept if search overlay is open
    if (document.querySelector('.search-overlay.open')) return;

    if (e.key === 'ArrowLeft' && prevLink) {
      window.location.href = prevLink.href;
    } else if (e.key === 'ArrowRight' && nextLink) {
      window.location.href = nextLink.href;
    } else if (e.key === 't' || e.key === 'T') {
      toggleTheme();
    } else if (e.key === '?') {
      showKbdToast();
    }
  });
}

function showKbdToast() {
  let toast = document.querySelector('.kbd-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'kbd-toast';
    toast.innerHTML = '<kbd>&larr;</kbd><kbd>&rarr;</kbd> Navigate &middot; <kbd>T</kbd> Theme &middot; <kbd>Ctrl+K</kbd> Search &middot; <kbd>?</kbd> This help';
    document.body.appendChild(toast);
  }
  toast.classList.add('visible');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('visible'), 3500);
}

// ===== FEATURE 12: OFFLINE SUPPORT (Service Worker) =====
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {
      // Service worker registration failed — that's OK, site works without it
    });
  }
}

// ===== FEATURE 9: BROWSER SUPPORT BADGES =====
// Auto-added to section headings based on keyword matching
(function() {
  const BADGES = {
    'container-queries': { label: 'Chrome 105+', cls: 'partial' },
    'container queries': { label: 'Chrome 105+', cls: 'partial' },
    ':has()': { label: 'Chrome 105+', cls: 'partial' },
    '@layer': { label: 'All Modern', cls: 'full' },
    'cascade layers': { label: 'All Modern', cls: 'full' },
    'nesting': { label: 'Chrome 120+', cls: 'partial' },
    'css nesting': { label: 'Chrome 120+', cls: 'partial' },
    'subgrid': { label: 'Chrome 117+', cls: 'partial' },
    'color-mix': { label: 'Chrome 111+', cls: 'partial' },
    'accent-color': { label: 'All Modern', cls: 'full' },
    '@property': { label: 'Chrome 85+', cls: 'partial' },
    'scroll-driven': { label: 'Chrome 115+', cls: 'limited' },
    'view transitions': { label: 'Chrome 111+', cls: 'limited' },
    '@starting-style': { label: 'Chrome 117+', cls: 'limited' },
    'text-wrap': { label: 'Chrome 114+', cls: 'partial' },
    'field-sizing': { label: 'Chrome 123+', cls: 'limited' },
    'popover': { label: 'Chrome 114+', cls: 'partial' },
    ':is()': { label: 'All Modern', cls: 'full' },
    ':where()': { label: 'All Modern', cls: 'full' },
    'clamp()': { label: 'All Modern', cls: 'full' },
    'custom properties': { label: 'All Modern', cls: 'full' },
    'css variables': { label: 'All Modern', cls: 'full' },
    'flexbox': { label: 'All Modern', cls: 'full' },
    'css grid': { label: 'All Modern', cls: 'full' },
    'backdrop-filter': { label: 'All Modern', cls: 'full' },
    'clip-path': { label: 'All Modern', cls: 'full' },
    'logical properties': { label: 'All Modern', cls: 'full' },
    'scroll snap': { label: 'All Modern', cls: 'full' },
    'oklch': { label: 'Chrome 111+', cls: 'partial' },
    'oklab': { label: 'Chrome 111+', cls: 'partial' }
  };

  document.addEventListener('DOMContentLoaded', () => {
    // Only add badges on the page-hero h1 if it's a topic page
    const pageHero = document.querySelector('.page-hero h1');
    if (!pageHero) return;
    const pageTitle = pageHero.textContent.toLowerCase();
    for (const [keyword, badge] of Object.entries(BADGES)) {
      if (pageTitle.includes(keyword.toLowerCase())) {
        const span = document.createElement('span');
        span.className = 'browser-badge ' + badge.cls;
        span.textContent = badge.label;
        pageHero.appendChild(span);
        break; // Only one badge per page hero
      }
    }

    // Add badges to section h2 headings
    document.querySelectorAll('.section h2').forEach(h2 => {
      const text = h2.textContent.toLowerCase();
      for (const [keyword, badge] of Object.entries(BADGES)) {
        if (text.includes(keyword.toLowerCase())) {
          const span = document.createElement('span');
          span.className = 'browser-badge ' + badge.cls;
          span.textContent = badge.label;
          h2.appendChild(span);
          break; // One badge per heading
        }
      }
    });
  });
})();
