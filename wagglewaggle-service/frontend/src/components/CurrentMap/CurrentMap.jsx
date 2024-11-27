import {
  Container as MapDiv,
  NaverMap,
  Marker,
  Polygon,
  useNavermaps,
} from "react-naver-maps";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./CurrentMap.css";

export default function CurrentMap({ currentLocation }) {
  console.log(currentLocation);
  const navermaps = useNavermaps();
  const [polygons, setPolygons] = useState([]);

  // 서버에서 폴리곤 데이터를 가져와서 변환하여 지도에 표시
  useEffect(() => {
    const fetchPolygons = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/info`, {
          method: "POST",
          headers: {
            accept: "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          // 응답 데이터를 navermaps.LatLng 객체 배열로 변환
          const parsedPolygons = data.map((polygon) =>
            polygon.map((point) => new navermaps.LatLng(point.lat, point.lng))
          );
          setPolygons(parsedPolygons);
        } else {
          console.error(
            "폴리곤 데이터를 가져오는 데 실패했습니다:",
            response.status
          );
        }
      } catch (error) {
        console.error("폴리곤 데이터 가져오기 오류:", error);
      }
    };

    fetchPolygons();
  }, [navermaps]);

  // 폴리곤의 색상 배열
  const fillColors = ["#ff000050", "#ffa50050", "#98fb9850"]; // 빨강, 주황, 연두
  const strokeColors = ["#ff0000", "#ffa500", "#98fb98"];

  return (
    <MapDiv className="main-map">
      {/* 범례 추가 */}
      <div className="legend">
        <div className="legend-item">
          <span
            className="legend-color"
            style={{ backgroundColor: "#ff0000" }}
          ></span>
          위험
        </div>
        <div className="legend-item">
          <span
            className="legend-color"
            style={{ backgroundColor: "#ffa500" }}
          ></span>
          주의
        </div>
        <div className="legend-item">
          <span
            className="legend-color"
            style={{ backgroundColor: "#98fb98" }}
          ></span>
          안전
        </div>
      </div>

      <NaverMap
        zoomControl
        zoomControlOptions={{
          position: navermaps?.Position?.TOP_RIGHT,
        }}
        defaultCenter={new navermaps.LatLng(37.52389, 126.92667)}
        center={new navermaps.LatLng(currentLocation.lat, currentLocation.lng)}
        minZoom={14}
        maxBounds={
          new navermaps.LatLngBounds(
            new navermaps.LatLng(37.515, 126.9241),
            new navermaps.LatLng(37.533, 126.9369)
          )
        }
      >
        {/* 현재 위치에 마커 추가 */}
        <Marker
          position={
            new navermaps.LatLng(currentLocation.lat, currentLocation.lng)
          }
          title="현재 위치"
          animation={navermaps.Animation.BOUNCE}
        />

        {/* 폴리곤 표시 */}
        {polygons.map((path, index) => (
          <Polygon
            key={`polygon-${index}`}
            paths={[path]}
            fillColor={fillColors[index % 3]}
            strokeColor={strokeColors[index % 3]}
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
};
