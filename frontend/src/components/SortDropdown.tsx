import React, { useState, useRef, useEffect } from "react";

export type SortState = {
  sortBy: string;
  sortOrder: "asc" | "desc";
};

type Props = {
  value: SortState;
  onChange: (next: SortState) => void;
};

const OPTIONS = [
  { label: "Date (Newest First)", sortBy: "date", sortOrder: "desc" },
  { label: "Quantity (Low → High)", sortBy: "quantity", sortOrder: "asc" },
  { label: "Quantity (High → Low)", sortBy: "quantity", sortOrder: "desc" },
  { label: "Customer Name (A–Z)", sortBy: "customerName", sortOrder: "asc" },
  { label: "Customer Name (Z–A)", sortBy: "customerName", sortOrder: "desc" },
];

export default function SortDropdown({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const activeLabel =
    OPTIONS.find(
      (o) => o.sortBy === value.sortBy && o.sortOrder === value.sortOrder
    )?.label || "Sort";

  // Close dropdown on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* BUTTON */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm text-sm hover:shadow-md"
      >
        Sort by: <span className="font-medium">{activeLabel}</span>

        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* DROPDOWN PANEL */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          {OPTIONS.map((o) => {
            const isActive =
              o.sortBy === value.sortBy && o.sortOrder === value.sortOrder;

            return (
              <button
                key={o.label}
                onClick={() => {
                  onChange({ sortBy: o.sortBy, sortOrder: o.sortOrder });
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                  isActive ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
