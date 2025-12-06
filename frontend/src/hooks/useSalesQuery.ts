import useSWR from "swr";
import { fetchSales } from "../services/salesApi";

export function useSalesQuery(queryParams: Record<string, any>) {
  const key = ["/sales", JSON.stringify(queryParams)];

  const { data, error, isLoading } = useSWR(key, () => fetchSales(queryParams), {
    revalidateOnFocus: false
  });

  return {
    data,
    loading: isLoading,
    error
  };
}
