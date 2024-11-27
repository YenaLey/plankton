import {
  Container as MapDiv,
  NaverMap,
  Marker,
  Polygon,
  useNavermaps,
} from "react-naver-maps";
import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./CurrentMap.css";

export default function CurrentMap({
  currentLocation,
  isDrawing,
  onSavePolygon,
}) {
  const navermaps = useNavermaps();
  const [currentPath, setCurrentPath] = useState([]); // Stores current polygon path
  const [polygons, setPolygons] = useState([]); // Stores all completed polygons

  const handleMapClick = useCallback(
    (e) => {
      if (!isDrawing) return;

      const newPoint = new navermaps.LatLng(e.coord.y, e.coord.x);
      setCurrentPath((prevPath) => [...prevPath, newPoint]);
    },
    [isDrawing, navermaps]
  );

  const savePolygon = useCallback(() => {
    if (currentPath.length > 2) {
      console.log(currentPath);
      setPolygons((prevPolygons) => [...prevPolygons, currentPath]);
      onSavePolygon(currentPath); // Save to DB through parent component
      setCurrentPath([]); // Reset for next polygon
    }
  }, [currentPath, onSavePolygon]);

  useEffect(() => {
    if (!isDrawing && currentPath.length > 0) {
      savePolygon();
    }
  }, [isDrawing, savePolygon, currentPath]);

  if (!navermaps) return <p>Loading map...</p>;

  return (
    <MapDiv className="main-map">
      <NaverMap
        zoomControl
        zoomControlOptions={{
          position: navermaps?.Position?.TOP_RIGHT,
        }}
        defaultCenter={new navermaps.LatLng(37.52389, 126.92667)} // Center at Yeouido
        minZoom={10}
        maxBounds={
          new navermaps.LatLngBounds(
            new navermaps.LatLng(37.5189, 126.9241), // SW corner
            new navermaps.LatLng(37.533, 126.9369) // NE corner
          )
        }
        onClick={handleMapClick}
      >
        {/* Markers for each point in the current path */}
        {currentPath.map((point, index) => (
          <Marker key={index} position={point} />
        ))}

        {/* Display the currently drawing polygon */}
        {isDrawing && currentPath.length > 2 && (
          <Polygon
            paths={[currentPath]}
            fillColor="#ff0000"
            fillOpacity={0.3}
            strokeColor="#ff0000"
            strokeOpacity={0.6}
            strokeWeight={3}
          />
        )}

        {/* Display all saved polygons */}
        {polygons.map((path, index) => (
          <Polygon
            key={`polygon-${index}`}
            paths={[path]}
            fillColor="#0000ff50"
            strokeColor="#0000ff"
            strokeWeight={2}
          />
        ))}
      </NaverMap>
    </MapDiv>
  );
}

CurrentMap.propTypes = {
  currentLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  isDrawing: PropTypes.bool.isRequired,
  onSavePolygon: PropTypes.func.isRequired,
};
