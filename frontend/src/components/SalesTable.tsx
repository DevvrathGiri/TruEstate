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
      className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition"
    >
      <span>{label}</span>
      <ArrowUpDown className="w-3 h-3 opacity-50" />
    </button>
  );

  return (
    <div className="w-full overflow-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-[1400px] w-full border-separate border-spacing-0 text-sm text-gray-800">

        {/* TABLE HEADER */}
        <thead>
          <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200 h-12">

            <th className="px-4 py-2">{sortable("Transaction_ID", "Transaction ID")}</th>
            <th className="px-4 py-2">{sortable("Date", "Date")}</th>
            <th className="px-4 py-2">{sortable("Customer_ID", "Customer ID")}</th>
            <th className="px-4 py-2">{sortable("Customer_Name", "Customer Name")}</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Gender</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Product Category</th>
            <th className="px-4 py-2">Quantity</th>

            {/* Divider */}
            <th className="w-[1px] px-0">
              <div className="w-[1px] h-5 bg-blue-500/40 mx-auto rounded-full" />
            </th>

            <th className="px-4 py-2">{sortable("Total_Sales", "Amount")}</th>
            <th className="px-4 py-2">Customer Region</th>
            <th className="px-4 py-2">Product ID</th>
            <th className="px-4 py-2">Employee Name</th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {rows.map((r, i) => {
            const isEven = i % 2 === 0;
            const bgClass = isEven ? "bg-white" : "bg-gray-50";

            return (
              <tr
                key={i}
                className={`${bgClass} border-b border-gray-200 hover:bg-blue-50 transition`}
              >
                <td className="px-4 py-3">{r.Transaction_ID}</td>
                <td className="px-4 py-3">
                  {new Date(r.Date).toLocaleDateString("en-IN")}
                </td>
                <td className="px-4 py-3">{r.Customer_ID}</td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {r.Customer_Name}
                </td>
                <td className="px-4 py-3 text-gray-600">{r.Phone_Number}</td>
                <td className="px-4 py-3">{r.Gender}</td>
                <td className="px-4 py-3">{r.Age}</td>
                <td className="px-4 py-3">{r.Product_Category}</td>
                <td className="px-4 py-3">{r.Quantity}</td>

                {/* Divider */}
                <td className="px-0">
                  <div className="w-[1px] h-full bg-blue-500/20 mx-auto" />
                </td>

                <td className="px-4 py-3 font-semibold text-gray-900">
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
