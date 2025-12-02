import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://childhood-disability-network-canada.onrender.com/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        `API error ${error.response.status} ${error.config?.url ?? "unknown"}:`,
        error.response.data
      );
    } else {
      console.error(`API network error:`, error.message ?? error);
    }
    return Promise.reject(error);
  }
);

export default api;
