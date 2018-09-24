var CACHE = 'cache-only'

self.addEventListener('install', function (evt) {
  console.log('The service worker is being installed.')

  evt.waitUntil(precache())
})

self.addEventListener('fetch', function (evt) {
  console.log('The service worker is serving the asset.', evt.request)
  evt.respondWith(fromCache(evt.request).catch(console.error))
})

function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
      '/CA/',
      '/CA/manifest.json',
      '/CA/index.html',
      '/CA/index.js',
      '/CA/index.css',
      '/CA/about.html',
      '/CA/imgs/rule30.svg',
      '/CA/imgs/icon.svg',
      '/CA/imgs/512x512.png',
      '/CA/imgs/ldpi.png',
      '/CA/imgs/mdpi.png',
      '/CA/imgs/hdpi.png',
      '/CA/imgs/xhdpi.png',
      '/CA/imgs/xxhdpi.png',
      '/CA/imgs/xxxhdpi.png',
      '/CA/bootstrap.min.css'
    ])
  })
}

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match')
    })
  })
}
