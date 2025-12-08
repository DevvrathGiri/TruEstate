import { Search } from "lucide-react";

type HeaderProps = {
  title: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  children?: React.ReactNode;
};

export default function Header({
  title,
  searchValue = "",
  onSearchChange,
  children,
}: HeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-8 h-24 flex items-center justify-between sticky top-0 z-20">

      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {children}

        {/* Search Box */}
        <div className="flex items-center border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 w-80">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Name, Phone no."
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="ml-2 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
          />
        </div>
      </div>
    </div>
  );
}
