import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// Convert comma-separated string → array
const parseArray = (val: string | null) =>
  val ? val.split(",").filter(Boolean) : [];

// Convert number-like value
const parseNumber = (val: string | null) =>
  val && !isNaN(Number(val)) ? Number(val) : null;

export function useQueryStateSync({
  search,
  setSearch,
  filters,
  setFilters,
  sort,
  setSort,
  pagination,
  setPagination,
}: any) {
  const [params, setParams] = useSearchParams();

  // ------------------------------
  // 1️⃣ URL → STATE (On initial load)
  // ------------------------------
  useEffect(() => {
    const p = params;

    // search
    const qSearch = p.get("search");
    if (qSearch) setSearch(qSearch);

    // pagination
    const page = parseNumber(p.get("page")) ?? 1;
    const pageSize = parseNumber(p.get("pageSize")) ?? 10;
    setPagination({ page, pageSize });

    // sort
    const sortBy = p.get("sortBy") || "date";
    const sortOrder = (p.get("sortOrder") as "asc" | "desc") || "desc";
    setSort({ sortBy, sortOrder });

    // -------------------------
    // FILTERS
    // -------------------------
    setFilters({
      ...filters,
      regions: parseArray(p.get("regions")),
      genders: parseArray(p.get("genders")),
      categories: parseArray(p.get("categories")),
      tags: parseArray(p.get("tags")),
      paymentMethods: parseArray(p.get("paymentMethods")),

      // UPDATED: Read ageRange from URL
      ageRange: parseArray(p.get("ageRange")).map((n) => Number(n)),

      // UPDATED: Read dateRange from URL
      dateRange: parseArray(p.get("dateRange")),
    });
  }, []);

  // ------------------------------
  // 2️⃣ STATE → URL (Whenever user changes something)
  // ------------------------------
  useEffect(() => {
    const q = new URLSearchParams();

    // search
    if (search) q.set("search", search);

    // pagination
    q.set("page", String(pagination.page));
    q.set("pageSize", String(pagination.pageSize));

    // sort
    q.set("sortBy", sort.sortBy);
    q.set("sortOrder", sort.sortOrder);

    // filters
    if (filters.regions.length)
      q.set("regions", filters.regions.join(","));

    if (filters.genders.length)
      q.set("genders", filters.genders.join(","));

    if (filters.categories.length)
      q.set("categories", filters.categories.join(","));

    if (filters.tags.length)
      q.set("tags", filters.tags.join(","));

    if (filters.paymentMethods.length)
      q.set("paymentMethods", filters.paymentMethods.join(","));

    // UPDATED: Write ageRange → URL
    if (filters.ageRange.length === 2)
      q.set("ageRange", filters.ageRange.join(","));

    // UPDATED: Write dateRange → URL
    if (filters.dateRange.length === 2)
      q.set("dateRange", filters.dateRange.join(","));

    setParams(q);
  }, [search, filters, sort, pagination]);
}
