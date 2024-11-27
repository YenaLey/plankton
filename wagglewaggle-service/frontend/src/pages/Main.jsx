import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "@/styles/Main.css";
import MainMap from "@/components/MainMap/MainMap";
import useGeolocation from "@/hooks/useGeolocation";
import { getCongestionData } from "@/services/congestionService";
import { FaRegFaceSurprise } from "react-icons/fa6";

export default function Main() {
  const { currentMyLocation, locationLoading } = useGeolocation();
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState({});
  const location = useLocation();
  const [hotspotName, setHotspotName] = useState("여의도한강공원");

  const fetchCongestionData = async () => {
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
    setHotspotName("여의도한강공원"); // Set hotspot name from location state
  }, []);

  useEffect(() => {
    fetchCongestionData();
  }, [hotspotName]);

  return (
    <div className="main-container">
      {isLoading ? (
        <div className="main-loading">
          <p>데이터를 불러오는 중입니다...</p>
        </div>
      ) : (
        <div className="main-content">
          <div className="main-map-box">
            <p>현재 내 위치</p>
            {locationLoading ? (
              <p>Loading location...</p>
            ) : (
              <MainMap currentLocation={currentMyLocation} />
            )}
          </div>

          <div className="main-jam">
            <h1>{hotspotName} 실시간 인구 혼잡도</h1>
            <div className="main-jam-content">
              <p>{info.AREA_CONGEST_LVL}</p>
              <FaRegFaceSurprise />
              <p>
                현재 실시간 인구: {info.AREA_PPLTN_MIN}~{info.AREA_PPLTN_MAX}명
              </p>
              <ul>
                {info.AREA_CONGEST_MSG &&
                  info.AREA_CONGEST_MSG.split(".").map((sentence, index) => {
                    const trimmedSentence = sentence.trim();
                    if (trimmedSentence)
                      return <li key={index}>{trimmedSentence}.</li>;
                    return null;
                  })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
