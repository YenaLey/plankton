import {
  Container as MapDiv,
  NaverMap,
  Polygon,
  useNavermaps,
} from "react-naver-maps";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./CurrentMap.css";

export default function CurrentMap({ currentLocation }) {
  const navermaps = useNavermaps();
  const [polygons, setPolygons] = useState([]); // 모든 폴리곤 저장

  // 각 공원의 폴리곤 좌표 설정
  useEffect(() => {
    const parkPolygons = [
      // 여의도 샛강생태공원
      [
        new navermaps.LatLng(37.5197849, 126.917224),   // 남서쪽 꼭짓점
        new navermaps.LatLng(37.515335, 126.92649),  // 남동쪽 꼭짓점
        new navermaps.LatLng(37.5169011, 126.92810239),  // 북동쪽 꼭짓점
        new navermaps.LatLng(37.521247, 126.917224),   // 북서쪽 꼭짓점
      ],
      // 여의도 한강공원
      [
        new navermaps.LatLng(37.5225771, 126.9381753),
        new navermaps.LatLng(37.5178799, 126.9420377),
        new navermaps.LatLng(37.5182203, 126.9453851),
        new navermaps.LatLng(37.5231898, 126.9406644)
      ],
      // 서울 색공원
      [
        new navermaps.LatLng(37.524645, 126.91852),// 남서쪽 꼭짓점
        new navermaps.LatLng(37.525, 126.920),// 남동쪽 꼭짓점
        new navermaps.LatLng(37.52139, 126.919706),
        new navermaps.LatLng(37.524, 126.925),// 북동쪽 꼭짓점
        new navermaps.LatLng(37.53000, 126.926),// 북서쪽 꼭짓점
        
      ],
      // 여의도 공원
      [
        new navermaps.LatLng(37.5306094, 126.9257299),
        new navermaps.LatLng(37.5253, 126.934313),
        new navermaps.LatLng(37.5265253, 126.9365446),
        new navermaps.LatLng(37.5318345, 126.9284765)
      ],
      //  소녀시대 숲
      [
        new navermaps.LatLng(37.5314261, 126.9217817),
        new navermaps.LatLng(37.5342848, 126.9229833),
        new navermaps.LatLng(37.5354419, 126.9123403),
        new navermaps.LatLng(37.5337403, 126.9127695)
      ],
    ];

    setPolygons(parkPolygons);
  }, [navermaps]);

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
            new navermaps.LatLng(37.515, 126.9241), // 여의도 남서쪽 끝 좌표
            new navermaps.LatLng(37.5330, 126.9369)  // 여의도 북동쪽 끝 좌표
          )
        }
      >
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
};
