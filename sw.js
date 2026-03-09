// CSS Reference Guide - Service Worker for Offline Support
const CACHE_NAME = 'css-guide-v1';
const ASSETS = [
  './',
  'index.html',
  'styles.css',
  'script.js',
  '01-css-basics.html',
  '02-box-model.html',
  '03-typography.html',
  '04-colors-backgrounds.html',
  '05-display-positioning.html',
  '06-flexbox.html',
  '07-css-grid.html',
  '08-responsive-design.html',
  '09-pseudo-classes-elements.html',
  '10-css-variables.html',
  '11-transitions-animations.html',
  '12-transforms.html',
  '13-filters-effects.html',
  '14-css-functions.html',
  '15-selectors-deep-dive.html',
  '16-logical-properties.html',
  '17-shapes-clip-path.html',
  '18-scrollbar-styling.html',
  '19-print-styles.html',
  '20-architecture-best-practices.html',
  '21-modern-css.html',
  'playground.html'
];

// Install — cache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate — clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — serve from cache, fall back to network
self.addEventListener('fetch', event => {
  // Only handle same-origin GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      // Return cached version, but also fetch an update for next time
      const fetchPromise = fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached);

      return cached || fetchPromise;
    })
  );
});
