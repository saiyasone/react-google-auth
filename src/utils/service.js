import { apiClient } from "./axiosClient";

export const postRequest = async (url, body) => {
  const response = await apiClient.post(url, body, {
    headers: { "Content-Type": "application/json" },
  });

  const result = await response;
  return result.data;
};

export const getRequest = async (url) => {
  const response = await apiClient.get(url);

  const result = await response.data;
  return result;
};
