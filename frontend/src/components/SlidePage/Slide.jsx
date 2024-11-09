// Slide.jsx
import "@/styles/Slide.css";
import React, { useState } from "react";
import PropTypes from "prop-types";

export default function Slide({ isOpen, togglePanel }) {
  const [touchStart, setTouchStart] = useState(0);

  return (
    <div
      className={`sliding-panel-container ${isOpen ? "open" : ""}`}
      onTouchStart={(e) => setTouchStart(e.touches[0].clientY)}
      onTouchMove={(e) => {
        if (touchStart - e.touches[0].clientY > 50) {
          togglePanel(true);
        } else if (e.touches[0].clientY - touchStart > 50) {
          togglePanel(false);
        }
      }}
    >
      <div
        className="drag-handle"
        onClick={() => togglePanel(!isOpen)}
        onKeyDown={(e) => e.key === "Enter" && togglePanel(!isOpen)}
        tabIndex="0"
        role="button"
        aria-expanded={isOpen}
      ></div>
      <div className="sliding-panel">
        <h2>Sliding Panel</h2>
        <p>This is a sliding panel content.</p>
      </div>
    </div>
  );
}

// propTypes 추가
Slide.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  togglePanel: PropTypes.func.isRequired,
};
