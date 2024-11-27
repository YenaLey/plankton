import React, { useState, useEffect } from "react";
import "../styles/AdminReport.css";
import { report, getAccidents } from "../services/chatbotService";

export default function AdminReport() {
  const [title, setTitle] = useState(""); // 제목 상태
  const [content, setContent] = useState(""); // 내용 상태
  const [isSubmitting, setIsSubmitting] = useState(false); // 로딩 상태
  const [accidentReports, setAccidentReports] = useState([]); // 사고 데이터
  const [selectedTypes, setSelectedTypes] = useState({
    type1: false,
    type2: false,
  });

  useEffect(() => {
    const fetchAccidentReports = async () => {
      try {
        const response = await getAccidents();
        if (response.status === 200) {
          const accidentData = response.data;
          setAccidentReports(accidentData);
          accidentData.forEach((accident) => {
            console.log("Longitude:", accident.longitude);
            console.log("Latitude:", accident.latitude);
          });
        } else {
          console.error("Failed to fetch accident data");
        }
      } catch (error) {
        console.error("Error fetching accident data:", error);
      }
    };

    fetchAccidentReports();
  }, []);

  const handleReportSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해 주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await report(title, content);
      if (response.status === 200) {
        alert("공지를 보냈습니다.");
        setTitle("");
        setContent("");
      } else {
        alert("공지 보내기에 실패했습니다.");
      }
    } catch (error) {
      console.error("Report submission error:", error);
    }
    setIsSubmitting(false);
  };

  const handleCheckboxChange = (type) => {
    setSelectedTypes((prevTypes) => {
      if (type === "type1" && !prevTypes.type1) {
        return { type1: true, type2: false }; // type1이 체크되면 type2는 해제
      }
      if (type === "type2" && !prevTypes.type2) {
        return { type1: false, type2: true }; // type2가 체크되면 type1은 해제
      }
      return prevTypes; // 다른 변경이 없으면 상태 유지
    });
  };

  const getImageSrc = (base64String) => {
    return `data:image/jpeg;base64,${base64String}`;
  };

  return (
    <div className="report-container">
      <div className="report-left">
        {accidentReports.map((accident) => (
          <div key={accident.accidentId} className="report-box">
            {accident.img && (
              <img
                src={getImageSrc(accident.img)} // Base64를 img src로 변환
                alt={`accident-${accident.accidentId}`}
              />
            )}
            <div className="report-content">
              {accident.category === 0 ? (
                <p>인명사고</p>
              ) : accident.category === 1 ? (
                <p>시설사고</p>
              ) : (
                <p>범죄</p>
              )}
              <h4>{accident.content}</h4>
            </div>
          </div>
        ))}
      </div>
      <div className="report-right">
        <div className="report-category">
          {/* <h3>공지유형</h3> */}
          {/* <div className="report-category-select">
            <label>
              <input
                type="checkbox"
                checked={selectedTypes.type1}
                onChange={() => handleCheckboxChange("type1")}
              />
              긴급공지
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedTypes.type2}
                onChange={() => handleCheckboxChange("type2")}
              />
              일반공지
            </label>
          </div> */}
        </div>
        <div className="report-title">
          <h3>제목</h3>
          <input
            placeholder="제목을 적어주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="report-content">
          <h3>내용</h3>
          <input
            placeholder="내용을 적어주세요"
            style={{ height: "350px" }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="report-submit">
          <div className="submit-block" />
          <button
            onClick={handleReportSubmit}
            disabled={isSubmitting}
            style={{ position: "relative", left: "25px" }}
          >
            {isSubmitting ? "제출 중..." : "공지하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
