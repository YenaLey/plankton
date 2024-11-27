import { fetchAPI } from "../utils/fetch_api";

export const report = async (title, content) => {
  const endpoint = `/posts/`;
  const eventId = "1";
  const level = "0";
  const data = { title, content, eventId, level };

  return await fetchAPI("post", endpoint, data);
};

export const getAccidents = async () => {
  const endpoint = `/accidents/`;

  return await fetchAPI("get", endpoint);
};
