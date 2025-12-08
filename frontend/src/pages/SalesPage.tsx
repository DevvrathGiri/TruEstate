import { useState, useMemo } from "react";
import SearchBar from "../components/SearchBar";
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
    ageMin: null,
    ageMax: null,
    dateFrom: null,
    dateTo: null,
  });

  const [sort, setSort] = useState<SortState>({
    sortBy: "date",
    sortOrder: "desc",
  });

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
  });

  const resetPage = () => setPagination((prev) => ({ ...prev, page: 1 }));

  const fixFilters = (next: Filters) => {
    if (
      next.ageMin !== null &&
      next.ageMax !== null &&
      next.ageMin > next.ageMax
    ) {
      return {
        ...next,
        ageMin: next.ageMax,
        ageMax: next.ageMin,
      };
    }
    return next;
  };

  const queryParams = useMemo(() => {
    return {
      search,
      regions: filters.regions,
      genders: filters.genders,
      categories: filters.categories,
      tags: filters.tags,
      paymentMethods: filters.paymentMethods,
      ageMin: filters.ageMin,
      ageMax: filters.ageMax,
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo,
      sortBy: sort.sortBy,
      sortOrder: sort.sortOrder,
      page: pagination.page,
      pageSize: pagination.pageSize,
    };
  }, [search, filters, sort, pagination]);

  const { data, loading, error } = useSalesQuery(queryParams);

  if (error) show("Failed to fetch data. Please try again.");

  return (
    <div className="p-6 flex flex-col gap-6">
      <Toast message={message} />

      <h1 className="text-2xl font-semibold text-gray-900">
        Sales Management System
      </h1>

      {/* ⭐ Figma-style Toolbar */}
      <div className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 flex flex-wrap items-center gap-3 shadow-sm">
        {/* Refresh Icon */}
        <button
          className="p-2 rounded-md hover:bg-gray-100 border border-gray-200 text-gray-600"
          onClick={() => {
            setFilters({
              regions: [],
              genders: [],
              categories: [],
              tags: [],
              paymentMethods: [],
              ageMin: null,
              ageMax: null,
              dateFrom: null,
              dateTo: null,
            });
            setSearch("");
            resetPage();
          }}
        >
          🔄
        </button>

        {/* Filters */}
        <FilterPanel
          value={filters}
          onChange={(next) => {
            setFilters(fixFilters(next));
            resetPage();
          }}
          allRegions={["North", "South", "East", "West"]}
          allGenders={["Male", "Female"]}
          allCategories={["Clothing", "Electronics", "Beauty", "Home"]}
          allTags={["wireless", "organic", "portable"]}
          allPayments={["cash", "card", "upi"]}
        />

        {/* Sort Dropdown */}
        <SortDropdown
          value={sort}
          onChange={(next) => {
            setSort(next);
            resetPage();
          }}
        />

        {/* Search Bar (right aligned) */}
        <div className="ml-auto">
          <SearchBar
            value={search}
            onChange={(v) => {
              setSearch(v);
              resetPage();
            }}
          />
        </div>
      </div>

      {/* Summary Cards */}
      {data && (
        <SummaryCards
          data={{
            totalUnits: data.totalUnits ?? 0,
            totalAmount: data.totalAmount ?? 0,
            totalDiscount: data.totalDiscount ?? 0,
            salesCountForAmount: data.numSalesForAmount,
            salesCountForDiscount: data.numSalesForDiscount,
          }}
        />
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
  );
}
