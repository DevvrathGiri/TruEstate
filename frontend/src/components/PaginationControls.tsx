import React from "react";

type Props = {
  page: number;
  totalPages: number;
  onChangePage: (nextPage: number) => void;
};

export default function PaginationControls({
  page,
  totalPages,
  onChangePage,
}: Props) {
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <div className="w-full flex items-center justify-center gap-4 py-4">
      {/* PREV BUTTON */}
      <button
        disabled={prevDisabled}
        onClick={() => !prevDisabled && onChangePage(page - 1)}
        className={`px-4 py-2 rounded-md border text-sm font-medium
          ${
            prevDisabled
              ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }
        `}
      >
        Prev
      </button>

      {/* PAGE INDICATOR */}
      <div className="text-sm text-gray-600 font-medium">
        {page} / {totalPages || 1}
      </div>

      {/* NEXT BUTTON */}
      <button
        disabled={nextDisabled}
        onClick={() => !nextDisabled && onChangePage(page + 1)}
        className={`px-4 py-2 rounded-md border text-sm font-medium
          ${
            nextDisabled
              ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }
        `}
      >
        Next
      </button>
    </div>
  );
}
