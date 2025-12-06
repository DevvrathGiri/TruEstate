import React from "react";

export type TransactionRow = {
  Transaction_ID: string;
  Date: string;
  Customer_ID: string;
  Customer_Name: string;
  Phone_Number: string;
  Gender: string;
  Age: number;
  Product_Category: string;
  Quantity: number;
  Total_Amount: number;
  Customer_Region: string;
  Product_ID: string;
  Employee_Name: string;
};

type Props = {
  rows: TransactionRow[];
};

export default function TransactionTable({ rows }: Props) {
  if (!rows || rows.length === 0) {
    return (
      <div className="w-full text-center py-10 text-gray-500 text-lg">
        No transactions found
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto border border-gray-200 rounded-lg bg-white">
      <table className="min-w-full text-sm">
        {/* HEADER */}
        <thead>
          <tr className="bg-gray-100 text-gray-600 font-medium border-b border-gray-200">
            <th className="px-4 py-3 text-left">Transaction ID</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Customer ID</th>
            <th className="px-4 py-3 text-left">Customer name</th>
            <th className="px-4 py-3 text-left">Phone Number</th>
            <th className="px-4 py-3 text-left">Gender</th>
            <th className="px-4 py-3 text-left">Age</th>
            <th className="px-4 py-3 text-left">Product Category</th>
            <th className="px-4 py-3 text-left">Quantity</th>
            <th className="px-4 py-3 text-right">Total Amount</th>
            <th className="px-4 py-3 text-left">Customer Region</th>
            <th className="px-4 py-3 text-left">Product ID</th>
            <th className="px-4 py-3 text-left">Employee name</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3">{row.Transaction_ID}</td>
              <td className="px-4 py-3">
                {new Date(row.Date).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">{row.Customer_ID}</td>
              <td className="px-4 py-3">{row.Customer_Name}</td>
              <td className="px-4 py-3">{row.Phone_Number}</td>
              <td className="px-4 py-3">{row.Gender}</td>
              <td className="px-4 py-3">{row.Age}</td>

              {/* Bold Product Category */}
              <td className="px-4 py-3 font-semibold text-gray-800">
                {row.Product_Category}
              </td>

              <td className="px-4 py-3">{row.Quantity}</td>

              {/* Money Right-aligned */}
              <td className="px-4 py-3 text-right font-medium">
                ₹ {row.Total_Amount.toLocaleString("en-IN")}
              </td>

              <td className="px-4 py-3">{row.Customer_Region}</td>
              <td className="px-4 py-3">{row.Product_ID}</td>
              <td className="px-4 py-3">{row.Employee_Name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
