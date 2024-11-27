import { fetchAPI } from "@/utils/fetch_api";

export const getCongestionData = async (hotspotName) => {
  const encodedHotspot = encodeURIComponent(hotspotName);
  const endpoint = `/status/?location=${encodedHotspot}`;
  return await fetchAPI("post", endpoint);
};
