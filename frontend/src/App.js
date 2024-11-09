import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "@/App.css";
import Main from "@/pages/Main";
import List from "@/pages/List";
import Current from "@/pages/Current";
import Chat from "@/pages/Chat";
import registerPushSubscription from "@/services/serviceWorkerRegistration";
import Notice from "@/pages/Notice";
import FloatingButton from "@/components/FloatingButton/FloatingButton";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function AppContent() {
  const location = useLocation();
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/main" element={<Main />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/current" element={<Current />} />
        <Route path="/chat" element={<Chat />} />
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
      {!(location.pathname === "/" || location.pathname === "/current" || location.pathname === "/chat") && <FloatingButton />}
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

          // 알림 권한 확인 후 요청
          if (Notification.permission === "default") {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
              registerPushSubscription(); // 구독 생성 호출
            } else if (permission === "denied") {
              console.warn("Notification permission denied.");
              alert(
                "알림 권한이 거부되었습니다. 브라우저 설정에서 권한을 허용해 주세요."
              );
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
