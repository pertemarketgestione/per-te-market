const CACHE_NAME = 'per-te-v2';
const ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'https://cdn.jsdelivr.net'
];

// Installa e salva in cache i file necessari
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Attiva il Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Gestisce le richieste (permette l'uso offline limitato)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
