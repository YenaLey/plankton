import React, { useState } from "react";
import "./WaggleReport.css";
import { sendIncidentReport } from "@/services/incidentService";

export default function WaggleReport() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(0); // 카테고리 인덱스 사용
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await sendIncidentReport({
        title,
        content,
        category, // 인덱스 값으로 전송
        img: image,
      });

      if (response.status === 201) {
        alert("사고 신고가 성공적으로 제출되었습니다!");
      } else {
        alert("사고 신고 제출에 실패했습니다.");
      }
    } catch (error) {
      console.error("사고 신고 중 오류가 발생했습니다.", error);
      alert("사고 신고 제출에 실패했습니다.");
    }
  };

  return (
    <div className="wreport-container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="wreport-category">
          <p>사건 유형</p>
          <div className="wreport-category-list">
            {["인원혼잡", "시설문제"].map((cat, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCategory(index)} // 인덱스 값을 설정
                className={category === index ? "selected" : ""}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="wreport-content">
          <h1>신고내용</h1>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="wreport-img">
          <h1>사진 첨부하기</h1>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          style={{ backgroundColor: "rgba(255, 73, 28, 1)" }}
        >
          접수하기
        </button>
      </form>
    </div>
  );
}
