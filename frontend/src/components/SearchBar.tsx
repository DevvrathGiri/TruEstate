import { useEffect, useState } from "react";

type Props = {
  value: string;
  onChange: (val: string) => void;
  debounceTime?: number;
};

export default function SearchBar({
  value,
  onChange,
  debounceTime = 500,
}: Props) {
  const [localValue, setLocalValue] = useState(value);

  // Sync local UI input with parent state
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [localValue]);

  return (
    <div className="flex items-center w-full max-w-md bg-[#F5F5F5] rounded-lg px-3 py-2 border border-gray-300">
      {/* Search Icon */}
      <svg
        className="w-5 h-5 text-gray-500 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
        />
      </svg>

      {/* Input */}
      <input
        type="text"
        placeholder="Name, Phone no."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
      />

      {/* Clear Button */}
      {localValue && (
        <button
          onClick={() => setLocalValue("")}
          className="ml-2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      )}
    </div>
  );
}
