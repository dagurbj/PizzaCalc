self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-app-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/static/css/main.2d8189c2.css',
                '/static/js/main.0d04e169.js'
                // Add other assets you want to cache
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
