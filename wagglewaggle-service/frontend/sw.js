self.addEventListener("install", (e) => {
  console.log("[Service Worker] Installed");
});

self.addEventListener("activate", (e) => {
  console.log("[Service Worker] Activated");
  return self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

// push 이벤트 - 푸시 알림 표시
self.addEventListener("push", (event) => {
  console.log("Push event received");
  if (event.data && Notification.permission === "granted") {
    const data = event.data.json();
    console.log(data);

    const options = {
      body: data.content,
      data: {
        url: "/notice",
      },
    };

    event.waitUntil(
      self.registration
        .showNotification(data.title, options)
        .then(() => console.log("Notification displayed successfully"))
        .catch((error) => console.error("Notification display failed:", error))
    );
  } else {
    console.warn("Notification permission is not granted.");
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        const targetUrl = event.notification.data.url;
        for (const client of clientList) {
          if (client.url.includes(targetUrl) && "focus" in client) {
            return client.focus();
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow(targetUrl);
        }
      })
  );
});
