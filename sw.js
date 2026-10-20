// Service worker : met l'application en cache pour qu'elle s'ouvre sans réseau.
// À chaque mise à jour de l'application, changez le numéro de version ci-dessous.
const VERSION = 'pvpeche-v1';
const FICHIERS = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(noms => Promise.all(noms.filter(n => n !== VERSION).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  // On ne touche ni aux envois (POST), ni au dossier api/, ni aux autres sites.
  if (e.request.method !== 'GET' || u.origin !== location.origin || u.pathname.includes('/api/')) return;
  e.respondWith(
    caches.match(e.request).then(enCache => {
      const reseau = fetch(e.request)
        .then(r => { if (r.ok) { const copie = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copie)); } return r; })
        .catch(() => enCache);
      return enCache || reseau;
    })
  );
});
