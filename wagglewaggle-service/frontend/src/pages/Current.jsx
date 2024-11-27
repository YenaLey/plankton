// Current.jsx
import "@/styles/Current.css";
import "@/styles/Slide.css";
import CurrentMap from "@/components/CurrentMap/CurrentMap";
import Slide from "@/components/SlidePage/Slide";

import useGeolocation from "@/hooks/useGeolocation";
import React, { useState } from "react";

export default function Current() {
  const { currentMyLocation, locationLoading } = useGeolocation();
  const [isPanelOpen, setIsPanelOpen] = useState(false); // 패널이 기본으로 열리도록 설정

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="current-container">
      <div className="current-title">
        <h1>실시간 와글와글</h1>
        <p>실시간 와글와글 공유를 위한 위치를 알려주세요</p>
      </div>
      <div className="current-map-box">
        {locationLoading ? (
          <p className="current-map-loading">Loading location...</p>
        ) : (
          <CurrentMap currentLocation={currentMyLocation} />
        )}
      </div>

      <div className="current-slide-box">
        {/* Slide 컴포넌트에 isOpen 상태와 toggle 함수 전달 */}
        <Slide isOpen={isPanelOpen} togglePanel={togglePanel} />
      </div>
    </div>
  );
}
