// 구독 정보 생성 함수

async function registerPushSubscription() {
  const registration = await navigator.serviceWorker.ready;

  const publicVapidKey = "YOUR_PUBLIC_VAPID_KEY";
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });

  await fetch("/api/save-subscription", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subscription),
  });

  console.log("User is subscribed.");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
}

export default registerPushSubscription;

// subscription 예시

// {
//   "endpoint": "https://fcm.googleapis.com/fcm/send/unique-id",
//   "expirationTime": null,
//   "keys": {
//     "p256dh": "generated_key_p256dh",
//     "auth": "generated_auth_key"
//   }
// }
