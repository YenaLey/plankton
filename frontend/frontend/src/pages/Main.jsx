import { useEffect } from "react";
import "@/styles/Main.css";
import MainMap from "@/components/MainMap/MainMap";
import useGeolocation from "@/hooks/useGeolocation";
import { getCongestionData } from "@/services/congestionService";

export default function Main() {
  const { currentMyLocation, locationLoading } = useGeolocation();
  const hotspotName = "여의도한강공원";

  const fetchCongestionData = async () => {
    const { status, data } = await getCongestionData(hotspotName);

    if (status === 200 && data) {
      const congestionInfo = data.CITYDATA?.LIVE_PPLIN_STTS[0];

      if (congestionInfo) {
        console.log("Congestion Level:", congestionInfo.AREA_CONGEST_LVL);
        console.log("Congestion Message:", congestionInfo.AREA_CONGEST_MSG);
        console.log("Population Min:", congestionInfo.AREA_PPLTN_MIN);
        console.log("Population Max:", congestionInfo.AREA_PPLTN_MAX);
      } else {
        console.log("No congestion info available.");
      }
    } else {
      console.log("Error status:", status);
    }
  };

  useEffect(() => {
    fetchCongestionData();
  }, []);

  return (
    <div className="main-container">
      <div className="main-map-box">
        {locationLoading ? (
          <p>Loading location...</p>
        ) : (
          <MainMap currentLocation={currentMyLocation} />
        )}
      </div>
    </div>
  );
}
