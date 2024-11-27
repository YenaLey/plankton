import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminMain.css";
import AdminForm from "../component/AdminForm";
import AdminReport from "../component/AdminReport";
import { PiNotebookFill } from "react-icons/pi";
import { BsInboxFill } from "react-icons/bs";

export default function AdminMain() {
  const navigate = useNavigate();
  const [comp, setComp] = useState("form");

  return (
    <div className="main-container">
      <div className="main-top" onClick={() => navigate("/")}>
        <div className="main-logo">
          <img src={process.env.PUBLIC_URL + "/logo.png"} alt="w" />
        </div>
        <h1>와글와글</h1>
      </div>

      <div className="main-bottom">
        <div className="main-sidebar">
          <button
            className={`main-sidebar-button ${comp === "form" ? "active" : ""}`}
            onClick={() => setComp("form")}
          >
            <PiNotebookFill />
            &nbsp;행사설정
          </button>
          <button
            className={`main-sidebar-button ${
              comp === "notice" ? "active" : ""
            }`}
            onClick={() => setComp("notice")}
          >
            <BsInboxFill />
            &nbsp;사건확인 및 공지작성
          </button>
        </div>

        <div className="main-content">
          {comp === "form" ? <AdminForm /> : <AdminReport />}
        </div>
      </div>
    </div>
  );
}
