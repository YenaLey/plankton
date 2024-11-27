import React from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const isMainPage = location.pathname === "/main"; // 현재 페이지가 main인지 확인

  return (
    <header className="header">
      <div className="header-container">
        {isMainPage ? (
          <div className="header-logo">
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" />
          </div>
        ) : (
          <Link to="/main" className="header-logo">
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" />
          </Link>
        )}
      </div>
    </header>
  );
}
