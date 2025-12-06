import { ArrowUpDown } from "lucide-react";

type Props = {
  rows: any[];
  onSort?: (column: string) => void;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export default function SalesTable({ rows, onSort }: Props) {
  const sortable = (key: string, label: string) => (
    <button
      onClick={() => onSort && onSort(key)}
      className="flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors"
    >
      <span>{label}</span>
      <ArrowUpDown className="w-3 h-3 opacity-60" />
    </button>
  );

  return (
    <div className="w-full overflow-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-[1400px] w-full text-sm text-slate-800 border-separate border-spacing-0">
        <thead>
          <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wide border-b border-slate-200">
            {/* Transaction ID - sticky col 1 */}
            <th className="px-4 py-3 sticky left-0 z-20 bg-slate-50 border-r border-slate-200">
              {sortable("Transaction_ID", "Transaction ID")}
            </th>

            {/* Date - sticky col 2 */}
            <th className="px-4 py-3 sticky left-[150px] z-20 bg-slate-50 border-r border-slate-200">
              {sortable("Date", "Date")}
            </th>

            <th className="px-4 py-3">{sortable("Customer_ID", "Customer ID")}</th>
            <th className="px-4 py-3">{sortable("Customer_Name", "Customer Name")}</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Gender</th>
            <th className="px-4 py-3">Age</th>
            <th className="px-4 py-3">Product Category</th>
            <th className="px-4 py-3">Qty</th>

            {/* Blue divider column */}
            <th className="px-0 py-3 w-[2px]">
              <div className="w-[2px] h-5 bg-sky-500/70 mx-auto rounded-full" />
            </th>

            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Customer Region</th>
            <th className="px-4 py-3">Product ID</th>
            <th className="px-4 py-3">Employee Name</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => {
            const isEven = i % 2 === 0;
            const rowBg = isEven ? "bg-white" : "bg-slate-50/60";

            return (
              <tr
                key={i}
                className={`${rowBg} border-b border-slate-200 hover:bg-sky-50 transition-colors`}
              >
                {/* Transaction ID - sticky col 1 */}
                <td
                  className={`px-4 py-3 sticky left-0 z-10 border-r border-slate-200 ${rowBg}`}
                >
                  {r.Transaction_ID}
                </td>

                {/* Date - sticky col 2 */}
                <td
                  className={`px-4 py-3 sticky left-[150px] z-10 border-r border-slate-200 ${rowBg}`}
                >
                  {new Date(r.Date).toLocaleDateString("en-IN")}
                </td>

                <td className="px-4 py-3">{r.Customer_ID}</td>
                <td className="px-4 py-3 font-medium text-slate-900">
                  {r.Customer_Name}
                </td>
                <td className="px-4 py-3 text-slate-600">{r.Phone_Number}</td>
                <td className="px-4 py-3">{r.Gender}</td>
                <td className="px-4 py-3">{r.Age}</td>
                <td className="px-4 py-3">{r.Product_Category}</td>
                <td className="px-4 py-3">{r.Quantity}</td>

                {/* Blue divider column */}
                <td className="px-0 py-3">
                  <div className="w-[2px] h-full bg-sky-500/20 mx-auto" />
                </td>

                <td className="px-4 py-3 font-semibold text-slate-900">
                  ₹ {Number(r.Total_Sales).toLocaleString("en-IN")}
                </td>
                <td className="px-4 py-3">{r.Customer_Region}</td>
                <td className="px-4 py-3">{r.Product_ID}</td>
                <td className="px-4 py-3">{r.Employee_Name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
