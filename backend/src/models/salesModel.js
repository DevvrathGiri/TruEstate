import fs from "fs";
import path from "path";
import csv from "csv-parser";

let salesData = []; // Memory store

export function loadSalesData() {
  return new Promise((resolve, reject) => {
    const filePath = path.join(process.cwd(), "src", "data", "sales.csv");

    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        results.push({
          // --- BASIC INFO ---
          Transaction_ID: row["Transaction ID"],
          Date: new Date(row["Date"]),
          Customer_ID: row["Customer ID"],
          Customer_Name: row["Customer Name"],
          Phone_Number: row["Phone Number"],
          Gender: row["Gender"],
          Age: Number(row["Age"]),

          // --- CUSTOMER REGION ---
          Customer_Region: row["Customer Region"],
          Customer_Type: row["Customer Type"],

          // --- PRODUCT INFO ---
          Product_ID: row["Product ID"],
          Product_Name: row["Product Name"],
          Brand: row["Brand"],
          Product_Category: row["Product Category"],
          Tags: row["Tags"] ? row["Tags"].split(",").map(t => t.trim().toLowerCase()) : [],

          // --- SALES FIELDS ---
          Quantity: Number(row["Quantity"] || 0),
          Unit_Price: Number(row["Unit Price"] || 0),
          Discount: Number(row["Discount"] || 0),
          Total_Sales: Number(row["Total Amount"] || 0),
          Profit: Number(row["Profit"] || 0),

          // --- EMPLOYEE ---
          Employee_Name: row["Employee Name"] || "",
        });
      })
      .on("end", () => {
        salesData = results;
        console.log(`Loaded ${salesData.length} rows from sales.csv`);
        resolve();
      })
      .on("error", (err) => reject(err));
  });
}

// Getter
export function getAllSales() {
  return salesData;
}
