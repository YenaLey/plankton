import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/components/FloatingButton/FloatingButton.css";
import { FaPlus } from "react-icons/fa6";

export default function FloatingButton() {
  const navigate = useNavigate();
  const [activate, setActivate] = useState(false);

  const handleNavigation = (path, e) => {
    navigate(path);
    setActivate(false);
    e.stopPropagation(); // 메뉴 클릭 시 이벤트 전파를 막음
  };

  const handleKeyDown = (e, path) => {
    if (e.key === "Enter" || e.key === " ") {
      handleNavigation(path, e);
    }
  };

  return (
    <div className="fab">
      {/* 버튼을 누를 때 배경색이 변하도록 설정 */}
      <div
        className="fab-container"
        style={{
          backgroundColor: activate ? "rgba(0, 0, 0, 0.4)" : "transparent",
        }}
      >
        <button
          className="fab-button"
          onClick={() => setActivate(!activate)}
          aria-pressed={activate} // 버튼의 활성화 상태를 나타냄
          aria-label="Toggle menu"
        >
          <FaPlus />
        </button>
      </div>

      {/* 메뉴가 활성화되었을 때 오버레이 및 메뉴가 나타남 */}
      {activate && (
        <div
          className="fab-menu-overlay"
          role="button" // 클릭 가능한 요소임을 명시
          tabIndex={0} // 키보드 탐색을 허용
          onClick={() => setActivate(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setActivate(false); // 오버레이를 클릭한 것처럼 작동
            }
          }}
        >
          <div
            className="fab-menu"
            role="button" // 클릭 가능한 요소임을 명시
            tabIndex={0} // 키보드 탐색을 허용
            onClick={(e) => e.stopPropagation()} // 클릭 시 이벤트 전파 방지
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation(); // 클릭 시 이벤트 전파 방지
              }
            }}
          >
            <button
              className="fab-menu-item"
              onClick={(e) => handleNavigation("/notice", e)}
              onKeyDown={(e) => handleKeyDown(e, "/notice")}
            >
              관리자 공지글
            </button>
            <button
              className="fab-menu-item"
              onClick={(e) => handleNavigation("/current", e)}
              onKeyDown={(e) => handleKeyDown(e, "/current")}
            >
              실시간 와글와글
            </button>
            <button
              className="fab-menu-item"
              onClick={(e) => handleNavigation("/chat", e)}
              onKeyDown={(e) => handleKeyDown(e, "/chat")}
            >
              챗봇에게 물어보기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
