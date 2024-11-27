import "../styles/AdminCurrent.css";
import CurrentMap from "./CurrentMap";
import PolygonButton from "./PolygonButton";
import useGeolocation from "../hooks/useGeolocation";
import React, { useState } from "react";

export default function AdminCurrent({ onPolygonDataChange }) {
  const { currentMyLocation, locationLoading } = useGeolocation();
  const [isDrawing, setIsDrawing] = useState(false);

  const toggleDrawing = () => {
    setIsDrawing((prev) => !prev);
  };

  const savePolygonToDB = (polygonPath) => {
    const polygonData = polygonPath.map((point) => ({
      lat: point.lat(),
      lng: point.lng(),
    }));
    console.log("저장할 폴리곤 데이터:", polygonData);

    // Update the parent component with the new polygon data
    onPolygonDataChange(polygonData);
  };

  return (
    <div className="current-container">
      <div className="current-map-box">
        {locationLoading ? (
          <p>Loading location...</p>
        ) : (
          <CurrentMap
            currentLocation={currentMyLocation}
            isDrawing={isDrawing}
            onSavePolygon={savePolygonToDB} // Pass the function
          />
        )}
      </div>
      <div className="current-button-container">
        <PolygonButton isDrawing={isDrawing} onClick={toggleDrawing} />
      </div>
    </div>
  );
}
