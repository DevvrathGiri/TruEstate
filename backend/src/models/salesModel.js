import fs from "fs";
import path from "path";
import csv from "csv-parser";
import axios from "axios";

let salesData = []; // Memory store

// Google Drive CSV URL
const GOOGLE_DRIVE_FILE_ID = "1tPLJd-O3jr68ydOS2HzFmQXuqCwUKpgU";
const GOOGLE_DRIVE_URL = `https://drive.google.com/uc?export=download&id=${GOOGLE_DRIVE_FILE_ID}&confirm=t`;

export function loadSalesData() {
  return new Promise(async (resolve, reject) => {
    const results = [];

    // Try Google Drive first (works on Render/Vercel)
    try {
      console.log("📥 Attempting to load CSV from Google Drive...");
      const response = await axios.get(GOOGLE_DRIVE_URL, {
        responseType: "stream",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        maxRedirects: 10,
        timeout: 15000,
      });

      response.data
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
        if (results.length === 0) {
          console.log("⚠️  Google Drive returned no data, falling back to local file...");
          loadFromLocalFile().then(resolve).catch(reject);
          return;
        }
        salesData = results;
        console.log(`✅ Loaded ${salesData.length} rows from Google Drive`);
        resolve();
      })
      .on("error", (err) => {
        console.log("❌ Google Drive error, falling back to local file...", err.message);
        loadFromLocalFile().then(resolve).catch(reject);
      });
    } catch (err) {
      console.log("❌ Google Drive error, falling back to local file...", err.message);
      loadFromLocalFile().then(resolve).catch(reject);
    }
  });
}

// Fallback: Load from local file
async function loadFromLocalFile() {
  return new Promise((resolve, reject) => {
    const filePath = path.join(process.cwd(), "src", "Data", "sales.csv");
    const results = [];

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  Local file not found at ${filePath}, starting with empty data`);
      // Don't reject - just start with empty data if file not available
      return resolve();
    }

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
        console.log(`✅ Loaded ${salesData.length} rows from local file`);
        resolve();
      })
      .on("error", (err) => reject(err));
  });
}

// Getter
export function getAllSales() {
  return salesData;
}
