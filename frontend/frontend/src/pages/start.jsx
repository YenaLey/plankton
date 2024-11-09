import React from "react";
import "@/styles/Start.css";

export default function Start() {
  return (
    <div className="start">
      {/* 현재 나의 위치 로딩 중 */}
      <div className="start-loading">
        <h1>
          와글
          <br />
          와글
        </h1>
      </div>
      <div className="start-container"></div>
    </div>
  );
}
