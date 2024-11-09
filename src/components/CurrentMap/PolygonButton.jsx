// PolygonButton.jsx
import React from "react";
import PropTypes from "prop-types";

export default function PolygonButton({ isDrawing, onClick }) {
  return (
    <button onClick={onClick} className="polygon-button">
      {isDrawing ? "폴리곤 그리기 중..." : "폴리곤 그리기 시작"}
    </button>
  );
}

PolygonButton.propTypes = {
  isDrawing: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
