import axios from "axios";

// Base URL for backend API
const API_BASE = import.meta.env.VITE_API_BASE || "https://truestate-yg49.onrender.com/api";

export const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
});

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
