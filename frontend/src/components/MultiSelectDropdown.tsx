import React, { useState, useRef, useEffect } from "react";

type Props = {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
};

export default function MultiSelectDropdown({
  label,
  options,
  selected,
  onChange,
  placeholder = "All",
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Toggle selected values
  const toggleOption = (opt: string) => {
    if (selected.includes(opt)) onChange(selected.filter((s) => s !== opt));
    else onChange([...selected, opt]);
  };

  // Clear selection
  const clear = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onChange([]);
  };

  return (
    <div ref={ref} className="relative inline-block select-none">
      {/* BUTTON → Figma-style chip */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border 
                   border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50 
                   transition shadow-sm min-h-[34px]"
      >
        <span className="font-medium">{label}</span>

        <span className="text-gray-500">
          {selected.length > 0 ? `${selected.length} selected` : placeholder}
        </span>

        {/* Clear (X) — only shown if something selected */}
        {selected.length > 0 && (
          <span
            className="ml-1 text-gray-400 hover:text-gray-600 cursor-pointer"
            onClick={clear}
          >
            ✕
          </span>
        )}

        {/* Arrow */}
        <svg
          className={`w-3 h-3 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* DROPDOWN MENU */}
      {open && (
        <div
          className="absolute left-0 mt-2 min-w-[190px] w-auto bg-white border 
                     border-gray-200 rounded-md shadow-lg z-50 p-2"
        >
          <div className="max-h-48 overflow-y-auto pr-1">
            {options.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2 py-1 px-1 cursor-pointer 
                           hover:bg-gray-100 rounded-md text-sm"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(opt)}
                  onChange={() => toggleOption(opt)}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">{opt}</span>
              </label>
            ))}
          </div>

          {/* FOOTER CONTROLS */}
          <div className="flex justify-between items-center mt-2 px-1 text-xs">
            <button
              onClick={() => onChange(options)}
              className="text-blue-600 hover:underline"
            >
              Select all
            </button>

            <button
              onClick={() => onChange([])}
              className="text-gray-600 hover:underline"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
