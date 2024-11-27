// public/service-worker.js

const CACHE_NAME = "waggle-cache-v1";
const urlsToCache = [
  "/",
  "/start", // 앱이 시작될 때 보여줄 초기 URL
  "/index.html",
  "/plankton/favicons/apple-icon-120x120.png",
  "/plankton/favicons/apple-icon-180x180.png",
  "/plankton/favicons/android-icon-192x192.png",
  "/splash_screens/iPhone_16_Pro_portrait.png",
  "/styles.css",
  "/app.js",
];

// 설치 이벤트: 캐시 생성
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// 활성화 이벤트: 이전 캐시 제거
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
  );
});

// 네트워크 요청 이벤트: 캐시된 자원 사용
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
