// 사건신고 폼 보내기
import { fetchAPI } from "@/utils/fetch_api";

export const sendIncidentReport = async ({ title, content, category, img }) => {
  const formData = new FormData();
  const longitude = 37.52389;
  const latitude = 126.92667;
  formData.append("longitude", longitude);
  formData.append("latitude", latitude);
  formData.append("title", title);
  formData.append("content", content);
  formData.append("category", category);
  formData.append("img", img);

  const endpoint = "/accidents/";
  const additionalHeaders = { "Content-Type": "multipart/form-data" };

  return await fetchAPI("post", endpoint, formData, null, additionalHeaders);
};
