const CACHE_VERSION = 'v2';
const PRECACHE_URLS = ['/offline.de.html', '/offline.en.html', '/offline.ua.html', '/img/lex/500.webp'];

// install
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_VERSION).then(cache => cache.addAll(PRECACHE_URLS)));
  self.skipWaiting();
});

// activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_VERSION).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

// helper
function getOfflinePage(pathname) {
  if (pathname.startsWith('/en')) return '/offline.en.html';
  if (pathname.startsWith('/uk') || pathname.startsWith('/ua')) return '/offline.ua.html';
  return '/offline.de.html';
}

// fetch
self.addEventListener('fetch', event => {
  const request = event.request;

  // Кэшируем только GET
  if (request.method !== 'GET') return;

  // Для переходов по страницам
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(async () => {
        const url = new URL(request.url);
        const offlinePage = getOfflinePage(url.pathname);
        const cachedResponse = await caches.match(offlinePage);

        return (
          cachedResponse ||
          new Response('Offline', {
            status: 503,
            statusText: 'Offline',
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          })
        );
      })
    );
    return;
  }

  // Всё остальное пока просто сеть
  event.respondWith(
    fetch(request).catch(() => {
      return new Response('Offline', {
        status: 503,
        statusText: 'Offline',
      });
    })
  );
});
