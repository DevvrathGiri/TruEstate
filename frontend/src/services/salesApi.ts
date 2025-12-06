import { apiClient, buildQueryParams } from "./apiClient";

export async function fetchSales(params: Record<string, any>) {
  const queryString = buildQueryParams(params);

  const response = await apiClient.get(`/sales?${queryString}`);
  return response.data;  
}
