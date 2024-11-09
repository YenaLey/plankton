import {
  Container as MapDiv,
  NaverMap,
  Marker,
  Polygon,
  useNavermaps,
} from "react-naver-maps";
import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import "./CurrentMap.css";

export default function CurrentMap({ currentLocation }) {
  const navermaps = useNavermaps();
  const [markers, setMarkers] = useState([]);

  const handleZoomChanged = useCallback((zoom) => {
    console.log(`zoom: ${zoom}`);
  }, []);

  // Handle map click to add a marker and update the polygon
  const handleMapClick = useCallback((e) => {
    const newMarker = {
      lat: e.coord.y,
      lng: e.coord.x,
    };
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  }, []);

  // Convert marker positions to LatLng instances for the polygon path
  const polygonPaths = markers.map(
    (marker) => new navermaps.LatLng(marker.lat, marker.lng)
  );

  return (
    <MapDiv className="main-map">
      <NaverMap
        zoomControl
        zoomControlOptions={{
          position: navermaps.Position.TOP_RIGHT,
        }}
        defaultCenter={
          new navermaps.LatLng(currentLocation.lat, currentLocation.lng)
        }
        defaultZoom={17}
        onZoomChanged={handleZoomChanged}
        onClick={handleMapClick} // Add click event to place markers
      >
        {/* Render a marker for each saved location */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={new navermaps.LatLng(marker.lat, marker.lng)}
            title={`Marker ${index + 1}`}
            animation={navermaps?.Animation?.DROP || undefined}
          />
        ))}

        {/* Render the polygon based on marker positions */}
        {polygonPaths.length > 2 && (
          <Polygon
            paths={polygonPaths}
            fillColor="#00ff0050" // semi-transparent green
            strokeColor="#00ff00"
            strokeWeight={2}
          />
        )}
      </NaverMap>
    </MapDiv>
  );
}

CurrentMap.propTypes = {
  currentLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};
