import { fetchAPI } from "@/utils/fetch_api";

async function registerPushSubscription() {
  console.log("test");
  const registration = await navigator.serviceWorker.ready;

  const publicVapidKey =
    "BB4P3QAB6tIVb0DBufMf3YQXIpZqPpT30l5YHsevtR09AUvFDQ9cOgIADZa_it1NUAjJeFAx6lRlXhZvPhr42Zo";

  console.log(publicVapidKey);

  async function attemptSubscription(retries = 3) {
    let subscription = null;

    for (let i = 0; i < retries; i++) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });

      if (
        subscription.keys &&
        subscription.keys.p256dh &&
        subscription.keys.auth
      ) {
        return subscription;
      }

      console.warn("Subscription keys missing, retrying...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    throw new Error("Failed to retrieve subscription keys after retries.");
  }

  try {
    const subscription = await attemptSubscription();

    const formattedSubscription = {
      endpoint: subscription.endpoint,
      expirationTime: subscription.expirationTime,
      keys: {
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
      },
    };

    // Logging formattedSubscription to verify data
    console.log("Formatted subscription:", formattedSubscription);

    // Making the API call and logging response status
    const { status } = await fetchAPI(
      "POST",
      "/posts/save-subscription",
      formattedSubscription
    );

    if (status === 200) {
      console.log("Subscription data sent successfully.");
      return true;
    } else {
      console.error("Failed to send subscription data with status:", status);
      return false;
    }
  } catch (error) {
    console.error("Failed to subscribe to push notifications:", error);
    return false;
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
}

export default registerPushSubscription;
