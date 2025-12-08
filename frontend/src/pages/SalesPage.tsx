import { useState, useEffect, useMemo } from "react";
import PaginationControls from "../components/PaginationControls";
import SalesTable from "../components/SalesTable";

import FilterPanel from "../components/FilterPanel";
import type { Filters } from "../components/FilterPanel";

import SortDropdown from "../components/SortDropdown";
import SummaryCards from "../components/SummaryCards";
import TableSkeleton from "../components/TableSkeleton";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";
import Header from "../components/Header";

export default function SalesPage() {
  const { message, show } = useToast();

  const [allData, setAllData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState<Filters>({
    regions: [],
    genders: [],
    categories: [],
    tags: [],
    paymentMethods: [],
    ageRange: [],
    dateRange: [],
  });

  const [sort, setSort] = useState({
    sortBy: "",
    sortOrder: "asc" as "asc" | "desc",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });

  const resetPage = () =>
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));

  // ------------------------------
  // 🔥 SIMPLE API CALL (NO PARAMS)
  // ------------------------------
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:4000/api/sales");
        const json = await res.json();

        // Backend returns { data: [...] }
        setAllData(json.data || []);
      } catch (err) {
        console.error(err);
        show("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // ------------------------------------
  // 🔥 FRONTEND FILTER + SEARCH + SORT
  // ------------------------------------
  const processedData = useMemo(() => {
    let rows = [...allData];

    // SEARCH
    if (search.trim()) {
      const s = search.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.Customer_Name?.toLowerCase().includes(s) ||
          r.Product_Name?.toLowerCase().includes(s)
      );
    }

    // REGION FILTER
    if (filters.regions.length > 0) {
      rows = rows.filter((r) => filters.regions.includes(r.Customer_Region));
    }

    // GENDER FILTER
    if (filters.genders.length > 0) {
      rows = rows.filter((r) => filters.genders.includes(r.Gender));
    }

    // CATEGORY FILTER
    if (filters.categories.length > 0) {
      rows = rows.filter((r) =>
        filters.categories.includes(r.Product_Category)
      );
    }

    // SORT
    if (sort.sortBy) {
      rows.sort((a, b) => {
        const A = a[sort.sortBy];
        const B = b[sort.sortBy];

        if (A < B) return sort.sortOrder === "asc" ? -1 : 1;
        if (A > B) return sort.sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return rows;
  }, [allData, search, filters, sort]);

  // ------------------------------
  // 🔥 PAGINATION (FRONTEND)
  // ------------------------------
  const currentRows = useMemo(() => {
    const start = (pagination.page - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    return processedData.slice(start, end);
  }, [processedData, pagination]);

  const totalPages = Math.ceil(processedData.length / pagination.pageSize);

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <Header
        title="Sales Management System"
        searchValue={search}
        onSearchChange={(v) => {
          setSearch(v);
          resetPage();
        }}
      />

      <div className="flex-1 overflow-auto">
        <div className="p-6 flex flex-col gap-4">
          <Toast message={message} />

          {/* Filter Toolbar */}
          <div className="w-full flex justify-start px-1">
            <div
              className="
                bg-white
                border border-gray-200
                rounded-xl
                shadow-sm
                px-4 py-3
                flex flex-wrap items-center gap-3
                max-w-fit
              "
            >
              <FilterPanel
                value={filters}
                onChange={(next) => {
                  setFilters(next);
                  resetPage();
                }}
                allRegions={["North", "South", "East", "West"]}
                allGenders={["Male", "Female"]}
                allCategories={["Clothing", "Electronics", "Beauty", "Home"]}
                allTags={["wireless", "organic", "portable"]}
                allPayments={["cash", "card", "upi"]}
              />

              <SortDropdown
                value={sort}
                onChange={(next) => {
                  setSort(next);
                  resetPage();
                }}
              />
            </div>
          </div>

          {loading && <TableSkeleton />}

          {!loading && currentRows.length === 0 && (
            <div className="text-center py-10 text-gray-500 text-lg">
              No results found. Try adjusting your filters.
            </div>
          )}

          {!loading && currentRows.length > 0 && (
            <>
              <SalesTable rows={currentRows} />
              <PaginationControls
                page={pagination.page}
                totalPages={totalPages}
                onChangePage={(p) =>
                  setPagination((prev) => ({ ...prev, page: p }))
                }
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
