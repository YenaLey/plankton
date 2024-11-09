import { fetchAPI } from "@/utils/fetch_api";

export const chat = async (query) => {
  const encodedQuery = encodeURIComponent(query);
  const endpoint = `/openai?query=${encodedQuery}`;
  return await fetchAPI("get", endpoint);
};
