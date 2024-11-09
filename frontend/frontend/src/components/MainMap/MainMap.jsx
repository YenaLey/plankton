import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import "./MainMap.css";

export default function MainMap({ currentLocation }) {
  const navermaps = useNavermaps();

  const handleZoomChanged = useCallback((zoom) => {
    console.log(`zoom: ${zoom}`);
  }, []);

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
      >
        {/* 현재 위치에 마커 표시 */}
        <Marker
          position={
            new navermaps.LatLng(currentLocation.lat, currentLocation.lng)
          }
          title="현재 위치"
          animation={navermaps.Animation.DROP}
        />
      </NaverMap>
    </MapDiv>
  );
}

MainMap.propTypes = {
  currentLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};
