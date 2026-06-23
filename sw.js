const CACHE_NAME = 'rashmika-portfolio-v1';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html', // Now accurately pointing to your home layout target
  'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
  'https://i.postimg.cc/RZGLMYTb/Black-and-White-Minimalist-Laptop-Mockup-Instagram-Post-(672-x-504-px).png',
  'https://i.postimg.cc/3xVf5RF0/brainpath-mobile-(1).png',
  'https://i.postimg.cc/ZR8JvX5p/Black-and-White-Minimalist-Laptop-Mockup-Instagram-Post-(672-x-504-px)-(2).png',
  'https://i.postimg.cc/C56MwkK4/Black-and-White-Minimalist-Laptop-Mockup-Instagram-Post-(672-x-504-px)-(4).png',
  'https://i.postimg.cc/tJ6vgHRJ/Black-and-White-Minimalist-Laptop-Mockup-Instagram-Post-(672-x-504-px)-(3).png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});