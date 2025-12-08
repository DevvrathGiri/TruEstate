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
  const maxButtons = 6;

  const getPageNumbers = () => {
    const pages = [];

    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + maxButtons - 1);

    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="w-full flex items-center justify-center gap-2 py-4">

      {getPageNumbers().map((num) => (
        <button
          key={num}
          onClick={() => onChangePage(num)}
          className={`px-3 py-1.5 rounded-md border text-sm font-medium transition
              ${
                num === page
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }
          `}
        >
          {num}
        </button>
      ))}

    </div>
  );
}
