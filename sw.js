// Define cache names
const CACHE_NAME = 'my-app-cache-v1';
const DYNAMIC_CACHE_NAME = 'my-app-dynamic-cache-v1';

// Files to cache during install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/mainscript.js',
  '/icon/icon512_maskable.png',
  '/icon/icon512_rounded.png',
  '/brandsimg/images.webp',
  '/brandsimg/Netflix.webp',
  '/brandsimg/Paramount-Logo.webp',
  '/brandsimg/Prime.webp',
  '/manifest.json'
  // Add other static files you want to cache
];

// Install event: Cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME && cache !== DYNAMIC_CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event: Network-first strategy
self.addEventListener('fetch', event => {
  // Only cache HTTP(s) requests
  if (event.request.url.startsWith('http')) {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          // If network fetch is successful, cache the response
          return caches.open(DYNAMIC_CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());

            return networkResponse;
          });
        })
        .catch(() => {
          // If network fetch fails, fallback to cache
          return caches.match(event.request);
        })
    );
  } else {
    // For non-HTTP(s) requests (e.g., chrome-extension://), fallback to the network
    event.respondWith(fetch(event.request));
  }
});
