import axios from "axios";

// Base URL for backend API
const API_BASE = import.meta.env.VITE_API_BASE || "https://truestate-yg49.onrender.com/api";

console.log("API_BASE:", API_BASE);

export const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
});

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      method: error.config?.method,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

/**
 * Helper to serialize query params into URL string
 */
export function buildQueryParams(params: Record<string, any>): string {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    // Arrays → comma-separated
    if (Array.isArray(value)) {
      if (value.length > 0) {
        query.append(key, value.join(","));
      }
    } else {
      query.append(key, String(value));
    }
  });

  return query.toString();
}
