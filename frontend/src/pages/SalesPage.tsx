import { useState, useMemo } from "react";
import PaginationControls from "../components/PaginationControls";
import SalesTable from "../components/SalesTable";
import { useSalesQuery } from "../hooks/useSalesQuery";

import FilterPanel from "../components/FilterPanel";
import type { Filters } from "../components/FilterPanel";

import SortDropdown from "../components/SortDropdown";
import SummaryCards from "../components/SummaryCards";
import TableSkeleton from "../components/TableSkeleton";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";
import Header from "../components/Header";

type SortState = {
  sortBy: string;
  sortOrder: "asc" | "desc";
};

type PaginationState = {
  page: number;
  pageSize: number;
};

export default function SalesPage() {
  const { message, show } = useToast();

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

  const [sort, setSort] = useState<SortState>({
    sortBy: "customerName",
    sortOrder: "asc",
  });

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
  });

  const resetPage = () =>
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));

  const queryParams = useMemo(() => {
    return {
      search,
      regions: filters.regions,
      genders: filters.genders,
      categories: filters.categories,
      tags: filters.tags,
      paymentMethods: filters.paymentMethods,
      ageRange: filters.ageRange,
      dateRange: filters.dateRange,
      sortBy: sort.sortBy,
      sortOrder: sort.sortOrder,
      page: pagination.page,
      pageSize: pagination.pageSize,
    };
  }, [search, filters, sort, pagination]);

  const { data, loading, error } = useSalesQuery(queryParams);

  if (error) show("Failed to fetch data. Please try again.");

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

          {/* ======= FILTER TOOLBAR (Masal.ai exact layout) ======= */}
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
              {/* Filters */}
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

              {/* Sort - placed immediately after filters */}
              <SortDropdown
                value={sort}
                onChange={(next) => {
                  setSort(next);
                  resetPage();
                }}
              />
            </div>
          </div>

          {/* Summary Cards */}
          {data && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-4 py-4">
              <SummaryCards
                data={{
                  totalUnits: data.totalUnits ?? 0,
                  totalAmount: data.totalAmount ?? 0,
                  totalDiscount: data.totalDiscount ?? 0,
                  salesCountForAmount: data.numSalesForAmount,
                  salesCountForDiscount: data.numSalesForDiscount,
                }}
              />
            </div>
          )}

          {/* Loading */}
          {loading && <TableSkeleton />}

          {/* No Results */}
          {!loading && data && data.data.length === 0 && (
            <div className="text-center py-10 text-gray-500 text-lg">
              No results found. Try adjusting your filters.
            </div>
          )}

          {/* Table */}
          {!loading && data && data.data.length > 0 && (
            <>
              <SalesTable rows={data.data} />
              <PaginationControls
                page={data.page}
                totalPages={data.totalPages}
                onChangePage={(newPage) =>
                  setPagination((prev) => ({ ...prev, page: newPage }))
                }
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
