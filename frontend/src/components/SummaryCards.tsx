export type SummaryData = {
  totalUnits: number;
  totalAmount: number;
  totalDiscount: number;
  salesCountForAmount?: number;
  salesCountForDiscount?: number;
};

type Props = {
  data: SummaryData;
};

export default function SummaryCards({ data }: Props) {
  return (
    <div className="flex items-center gap-6">

      {/* CARD 1 */}
      <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm min-w-[220px]">
        <div className="flex items-center justify-between">
          <p className="text-gray-700 text-sm font-medium">Total units sold</p>
          <span className="text-gray-400 text-sm">ⓘ</span>
        </div>
        <p className="text-2xl font-bold text-gray-900 mt-2">
          {data.totalUnits}
        </p>
      </div>

      {/* CARD 2 */}
      <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm min-w-[220px]">
        <div className="flex items-center justify-between">
          <p className="text-gray-700 text-sm font-medium">Total Amount</p>
          <span className="text-gray-400 text-sm">ⓘ</span>
        </div>
        <p className="text-2xl font-bold text-gray-900 mt-2">
          ₹{data.totalAmount.toLocaleString("en-IN")}
        </p>
        {data.salesCountForAmount !== undefined && (
          <p className="text-gray-500 text-xs mt-1">
            ({data.salesCountForAmount} SRs)
          </p>
        )}
      </div>

      {/* CARD 3 */}
      <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm min-w-[220px]">
        <div className="flex items-center justify-between">
          <p className="text-gray-700 text-sm font-medium">Total Discount</p>
          <span className="text-gray-400 text-sm">ⓘ</span>
        </div>
        <p className="text-2xl font-bold text-gray-900 mt-2">
          ₹{data.totalDiscount.toLocaleString("en-IN")}
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
