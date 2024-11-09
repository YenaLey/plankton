// 사건 신고 폼 제출 컴포넌트

import React, { useState } from "react";
import { sendIncidentReport } from "@/services/incidentService";

export default function ReportIncident() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(0);
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await sendIncidentReport({
        title,
        content,
        category,
        img: image,
      });

      if (response.status === 200) {
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
    <div>
      <h2>사고 신고</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="content">내용:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="category">카테고리:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(parseInt(e.target.value))}
          >
            <option value={0}>인명사고</option>
            <option value={1}>시설사고</option>
            <option value={2}>범죄</option>
          </select>
        </div>

        <div>
          <label htmlFor="img">이미지 첨부:</label>
          <input
            type="file"
            id="img"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
          />
        </div>

        <button type="submit">신고 제출</button>
      </form>
    </div>
  );
}
