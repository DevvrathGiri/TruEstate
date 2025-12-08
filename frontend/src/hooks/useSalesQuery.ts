import useSWR from "swr";
import { fetchSales } from "../services/salesApi";
import { useMemo } from "react";

export function useSalesQuery(queryParams: Record<string, any>) {

  const key = useMemo(
    () => [
      "/sales",
      queryParams.search,
      queryParams.regions,
      queryParams.genders,
      queryParams.categories,
      queryParams.tags,
      queryParams.paymentMethods,
      queryParams.ageRange,
      queryParams.dateRange,
      queryParams.sortBy,
      queryParams.sortOrder,
      queryParams.page,
      queryParams.pageSize
    ],
    [
      queryParams.search,
      queryParams.regions,
      queryParams.genders,
      queryParams.categories,
      queryParams.tags,
      queryParams.paymentMethods,
      queryParams.ageRange,
      queryParams.dateRange,
      queryParams.sortBy,
      queryParams.sortOrder,
      queryParams.page,
      queryParams.pageSize
    ]
  );

  const { data, error, isValidating } = useSWR(
    key,
    () => fetchSales(queryParams),
    { revalidateOnFocus: false }
  );

  return {
    data,
    loading: isValidating,
    error
  };
}
