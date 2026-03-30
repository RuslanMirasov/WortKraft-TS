const CACHE_NAME = 'wortkraft-v2';

// Устанавливаем SW
self.addEventListener('install', event => {
  console.log('[SW] Installed');
  self.skipWaiting();
});

// Активируем
self.addEventListener('activate', event => {
  console.log('[SW] Activated');
  event.waitUntil(self.clients.claim());
});

// Перехват запросов (пока просто прокси)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response('Offline', {
        status: 503,
        statusText: 'Offline',
      });
    })
  );
});
