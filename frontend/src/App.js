import React, { useEffect } from "react";
import { useLocation, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@/App.css";
import Start from "@/pages/Start";
import Main from "@/pages/Main";
import List from "@/pages/List";
import Current from "@/pages/Current";
import Chat from "@/pages/Chat";
import registerPushSubscription from "@/services/serviceWorkerRegistration";
import Notice from "@/pages/Notice";
import FloatingButton from "@/components/FloatingButton/FloatingButton";
import Header from "@/components/Header/Header";

function AppContent() {
  const location = useLocation();

  const showHeader = ["/main", "/notice", "/current", "/chat"].includes(location.pathname);

  return (
    <div className="app-container">
      {showHeader && <Header />}
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/list" element={<List />} />
          <Route path="/main" element={<Main />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/current" element={<Current />} />
          <Route path="/chat" element={<Chat />} />
          {/* <Route path="*" element={<Error />} /> */}
        </Routes>
      {/* 특정 페이지에서 FloatingButton 숨김 */}
      {!(location.pathname === "/" || location.pathname === "/list" || location.pathname === "/current" || location.pathname === "/chat") && <FloatingButton />}
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const registerServiceWorker = async () => {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register(
            `${process.env.PUBLIC_URL}/sw.js`
          );
          console.log("Service worker registration succeeded:", registration);

          if (Notification.permission === "default") {
            console.log("Requesting notification permission...");
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
              console.log("Notification permission granted.");
              const subscriptionSuccess = await registerPushSubscription();
              if (subscriptionSuccess) {
                console.log("Push subscription successfully registered.");
              }
            } else if (permission === "denied") {
              console.warn("Notification permission denied by user.");
              alert(
                "알림 권한이 거부되었습니다. 브라우저 설정에서 권한을 허용해 주세요."
              );
            }
          } else if (Notification.permission === "granted") {
            console.log("Notification permission already granted.");
            const subscriptionSuccess = await registerPushSubscription();
            if (subscriptionSuccess) {
              console.log("Push subscription successfully registered.");
            }
          } else if (Notification.permission === "denied") {
            console.warn("Notification permission already denied.");
            alert(
              "알림 권한이 거부되었습니다. 브라우저 설정에서 권한을 허용해 주세요."
            );
          }
        } catch (error) {
          console.error("Service worker registration failed:", error);
        }
      } else {
        console.warn("Service worker not supported in this browser.");
      }
    };

    registerServiceWorker();
  }, []);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AppContent />
    </Router> 
  );
}
