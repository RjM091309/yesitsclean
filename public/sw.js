const VERSION = 'v1';
const IMAGE_CACHE = `yesitsclean-images-${VERSION}`;

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.startsWith('yesitsclean-images-') && key !== IMAGE_CACHE)
          .map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  const isImageRequest =
    req.destination === 'image' ||
    /\.(avif|webp|png|jpe?g|gif|svg)(\?.*)?$/i.test(url.pathname);

  if (!isImageRequest) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(IMAGE_CACHE);
      const cached = await cache.match(req);

      if (cached) {
        event.waitUntil(
          fetch(req)
            .then((freshRes) => {
              if (freshRes && freshRes.ok) {
                return cache.put(req, freshRes.clone());
              }
            })
            .catch(() => {}),
        );
        return cached;
      }

      try {
        const networkRes = await fetch(req);
        if (networkRes && networkRes.ok) {
          await cache.put(req, networkRes.clone());
        }
        return networkRes;
      } catch (err) {
        if (cached) return cached;
        throw err;
      }
    })(),
  );
});
