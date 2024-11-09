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

export default function CurrentMap({ currentLocation, isDrawing, onSavePolygon }) {
  const navermaps = useNavermaps();
  const [currentPath, setCurrentPath] = useState([]); // 현재 그리는 폴리곤 경로
  const [polygons, setPolygons] = useState([]); // 그려진 모든 폴리곤 저장

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
      setPolygons((prevPolygons) => [...prevPolygons, currentPath]);
      onSavePolygon(currentPath); // 데이터베이스에 저장
      setCurrentPath([]); // 새로운 폴리곤을 위해 경로 초기화
    }
  }, [currentPath, onSavePolygon]);

  useEffect(() => {
    if (!isDrawing) {
      savePolygon();
    }
  }, [isDrawing, savePolygon]);

  return (
    <MapDiv className="main-map">
      <NaverMap
        zoomControl
        zoomControlOptions={{
          position: navermaps?.Position?.TOP_RIGHT,
        }}

        defaultCenter={new navermaps.LatLng(37.52389, 126.92667)} // 여의도 중심 좌표 설정
        minZoom={14} // 최소 줌 레벨 설정
        maxBounds={
          new navermaps.LatLngBounds(
            new navermaps.LatLng(37.5189, 126.9241), // 여의도 남서쪽 끝 좌표
            new navermaps.LatLng(37.5330, 126.9369)  // 여의도 북동쪽 끝 좌표
          )
        }
        onClick={handleMapClick}
      >
        {currentPath.map((point, index) => (
          <Marker key={index} position={point} />
        ))}

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
