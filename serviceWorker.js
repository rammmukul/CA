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
      './',
      './manifest.json',
      './index.html',
      './index.js',
      './index.css',
      './about.html',
      './imgs/rule30.svg',
      './imgs/icon.svg',
      './imgs/512x512.png',
      './imgs/ldpi.png',
      './imgs/mdpi.png',
      './imgs/hdpi.png',
      './imgs/xhdpi.png',
      './imgs/xxhdpi.png',
      './imgs/xxxhdpi.png',
      './bootstrap.min.css'
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
