const STATIC_CACHE = 'wortkraft-v1';

const PRECACHE_URLS = [
  '/offline.de.html',
  '/offline.en.html',
  '/offline.ua.html',
  '/img/lex/500.webp',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-512-maskable.png',
  '/icons/apple-touch-icon.png',
];

// install
self.addEventListener('install', event => {
  event.waitUntil(caches.open(STATIC_CACHE).then(cache => cache.addAll(PRECACHE_URLS)));
  self.skipWaiting();
});

// activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys => Promise.all(keys.filter(key => key !== STATIC_CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

function getOfflinePage(pathname) {
  if (pathname.startsWith('/en')) return '/offline.en.html';
  if (pathname.startsWith('/uk') || pathname.startsWith('/ua')) return '/offline.ua.html';
  return '/offline.de.html';
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  return fetch(request);
}

async function staleWhileRevalidate(request, cacheName = STATIC_CACHE) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const networkPromise = fetch(request)
    .then(response => {
      if (response && response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  return cached || networkPromise;
}

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Только GET
  if (request.method !== 'GET') return;

  // Только same-origin
  if (url.origin !== self.location.origin) return;

  // 1. Переходы по страницам
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(async () => {
        const offlinePage = getOfflinePage(url.pathname);
        const cached = await caches.match(offlinePage);

        return (
          cached ||
          new Response('Offline', {
            status: 503,
            statusText: 'Offline',
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
            },
          })
        );
      })
    );
    return;
  }

  // 2. Картинки, иконки
  if (request.destination === 'image' || url.pathname.startsWith('/img/') || url.pathname.startsWith('/icons/')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // 3. Next static assets
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // 4. CSS / JS — отдать кэш сразу, в фоне обновить
  if (request.destination === 'style' || request.destination === 'script') {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // 5. Остальное не трогаем
});
