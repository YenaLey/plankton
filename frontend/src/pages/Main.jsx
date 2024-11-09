import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "@/styles/Main.css";
import MainMap from "@/components/MainMap/MainMap";
import useGeolocation from "@/hooks/useGeolocation";
import { getCongestionData } from "@/services/congestionService";

export default function Main() {
  const { currentMyLocation, locationLoading } = useGeolocation();
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState({});
  const location = useLocation();
  const [hotspotName, setHotspotName] = useState(
    location.state?.position || ""
  );

  const fetchCongestionData = async () => {
    if (!hotspotName) return;

    setIsLoading(true); // 로딩 시작
    const { status, data } = await getCongestionData(hotspotName);

    if (status === 200 && data) {
      const congestionInfo = data.CITYDATA?.LIVE_PPLTN_STTS[0];

      if (congestionInfo) {
        console.log("Congestion Level:", congestionInfo.AREA_CONGEST_LVL);
        console.log("Congestion Message:", congestionInfo.AREA_CONGEST_MSG);
        console.log("Population Min:", congestionInfo.AREA_PPLTN_MIN);
        console.log("Population Max:", congestionInfo.AREA_PPLTN_MAX);
        setInfo(congestionInfo);
      } else {
        console.log("No congestion info available.");
      }
    } else {
      console.log("Error status:", status);
    }
    setIsLoading(false); // 로딩 종료
  };

  useEffect(() => {
    if (location.state?.position) {
      setHotspotName(location.state.position); // Set hotspot name from location state
    }
  }, [location.state?.position]);

  useEffect(() => {
    fetchCongestionData();
  }, [hotspotName]);

  return (
    <div className="main-container">
      {isLoading ? (
        <p>데이터를 불러오는 중입니다...</p>
      ) : (
        <>
          <div className="main-map-box">
            {locationLoading ? (
              <p>Loading location...</p>
            ) : (
              <MainMap currentLocation={currentMyLocation} />
            )}
          </div>
          <p>{info.AREA_CONGEST_LVL}</p>
          <p>{info.AREA_CONGEST_MSG}</p>
          <p>인구 최소: {info.AREA_PPLTN_MIN}</p>
          <p>인구 최대: {info.AREA_PPLTN_MAX}</p>
        </>
      )}
    </div>
  );
}
