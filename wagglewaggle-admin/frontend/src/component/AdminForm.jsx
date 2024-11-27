import React, { useState } from "react";
import "../styles/AdminForm.css";
import AdminCurrent from "./AdminCurrent";

export default function AdminForm() {
  const [address, setAddress] = useState("");
  const [file, setFile] = useState(null);
  const [polygonData, setPolygonData] = useState([]); // State to store polygon data

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("PDF 파일만 업로드 가능합니다.");
      event.target.value = "";
      setFile(null);
    }
  };

  // Callback to update polygon data when a new polygon is added
  const handlePolygonDataChange = (newPolygon) => {
    setPolygonData((prevPolygons) => [...prevPolygons, newPolygon]);
  };

  const handleSubmit = async () => {
    if (polygonData.length === 0) {
      alert("폴리곤 데이터를 추가해 주세요.");
      return;
    }
    const formattedPolygonData = encodeURIComponent(
      JSON.stringify(polygonData)
    );

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/info?polygon=${formattedPolygonData}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );

      if (response.ok) {
        alert("폴리곤 데이터가 성공적으로 저장되었습니다.");
        setPolygonData([]); // Clear the data after successful submission
      } else {
        console.error("데이터 전송에 실패했습니다.");
        alert("데이터 전송에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error submitting polygon data:", error);
      alert("서버에 폴리곤 데이터를 전송하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="form-container">
      <div className="form-information">
        <div className="form-address">
          <p>행사 주소</p>
          <input
            type="text"
            placeholder="행사가 개최되는 주소를 입력해주세요"
            value={address}
            onChange={handleAddressChange}
          />
        </div>
        <div className="form-file">
          <p>행사 정보</p>
          <label htmlFor="file-upload" className="form-custom-file-upload">
            {file ? (
              <h4>{file.name}</h4>
            ) : (
              <h4>행사에 대한 정보를 얻을 수 있는 파일 업로드(pdf)</h4>
            )}
          </label>
          <input
            id="file-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        <AdminCurrent onPolygonDataChange={handlePolygonDataChange} />
      </div>

      <button className="form-submit" onClick={handleSubmit}>
        완료하기
      </button>
    </div>
  );
}
