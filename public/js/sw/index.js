self.addEventListener('install', function(event) {
  var urlsToCache = [
    '/',
    'js/main.js',
    'css/main.css',
    'imgs/icon.png',
    'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
    'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
  ];

  event.waitUntil(
    // TODO: crie um cahce com nome'wittr-static-v1'
    // crie no cache as urls do array urlsToCache
  );
});

self.addEventListener('fetch', function(event) {
  // Ja ja chegamos aqui
});