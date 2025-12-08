export type SummaryData = {
  totalUnits: number;
  totalAmount: number;
  totalDiscount: number;
  salesCountForAmount?: number; // e.g. "19 SRs"
  salesCountForDiscount?: number; // e.g. "45 SRs"
};

type Props = {
  data: SummaryData;
};

export default function SummaryCards({ data }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      {/* TOTAL UNITS */}
      <div className="p-4 bg-[#FAFAFA] rounded-lg border border-gray-200 shadow-sm">
        <p className="text-gray-700 text-sm font-medium">Total units sold</p>
        <p className="text-2xl font-bold mt-1 text-gray-900">
          {data.totalUnits.toLocaleString("en-IN")}
        </p>
      </div>

      {/* TOTAL AMOUNT */}
      <div className="p-4 bg-[#FAFAFA] rounded-lg border border-gray-200 shadow-sm">
        <p className="text-gray-700 text-sm font-medium">Total Amount</p>

        <p className="text-2xl font-bold mt-1 text-gray-900">
          ₹ {data.totalAmount.toLocaleString("en-IN")}
        </p>

        {data.salesCountForAmount !== undefined && (
          <p className="text-gray-500 text-xs mt-1">
            ({data.salesCountForAmount} SRs)
          </p>
        )}
      </div>

      {/* TOTAL DISCOUNT */}
      <div className="p-4 bg-[#FAFAFA] rounded-lg border border-gray-200 shadow-sm">
        <p className="text-gray-700 text-sm font-medium">Total Discount</p>

        <p className="text-2xl font-bold mt-1 text-gray-900">
          ₹ {data.totalDiscount.toLocaleString("en-IN")}
        </p>

        {data.salesCountForDiscount !== undefined && (
          <p className="text-gray-500 text-xs mt-1">
            ({data.salesCountForDiscount} SRs)
          </p>
        )}
      </div>
    </div>
  );
}
