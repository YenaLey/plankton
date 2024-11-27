import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchAPI = async (
  method,
  endpoint,
  data = null,
  params = null,
  additionalHeaders = {}
) => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...additionalHeaders,
      },
      data,
      params,
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Error ${error.response.status}: ${error.message}`);
      return { status: error.response.status, data: null };
    } else {
      console.error("Unknown error occurred:", error);
      return { status: 500, data: null };
    }
  }
};
