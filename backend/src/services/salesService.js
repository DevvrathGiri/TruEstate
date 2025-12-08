import Sale from "../models/salesModel.js";

// -------------------------
// Utility Helpers
// -------------------------

function toArray(val) {
  if (!val && val !== 0) return [];
  if (Array.isArray(val)) return val.filter(Boolean);
  if (typeof val === "string") {
    return val
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function escapeRegExp(s = "") {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// -------------------------
// Normalize DB → Frontend
// -------------------------
function normalizeSales(doc) {
  return {
    _id: doc._id,

    Transaction_ID: doc["Transaction ID"],
    Date: doc["Date"],
    Customer_ID: doc["Customer ID"],
    Customer_Name: doc["Customer Name"],
    Phone_Number: doc["Phone Number"],
    Gender: doc["Gender"],
    Age: doc["Age"],
    Customer_Region: doc["Customer Region"],
    Customer_Type: doc["Customer Type"],

    Product_ID: doc["Product ID"],
    Product_Name: doc["Product Name"],
    Brand: doc["Brand"],
    Product_Category: doc["Product Category"],
    Tags: doc["Tags"],

    Quantity: doc["Quantity"],
    Unit_Price: doc["Unit Price"],
    Discount: doc["Discount"],
    Total_Sales: doc["Total Amount"],
    Profit: doc["Final Amount"],
    Payment_Method: doc["Payment Method"],
    Employee_Name: doc["Employee Name"],

    ...doc,
  };
}

// -------------------------
// Build MongoDB Filters
// -------------------------
function buildMongoFilters(query) {
  const {
    search = "",
    regions = "",
    genders = "",
    categories = "",
    tags = "",
    paymentMethods = "",
  } = query;

  const andFilters = [];

  // --- SEARCH (starts-with)
  if (search.trim() !== "") {
    const s = escapeRegExp(search.trim());
    const regex = new RegExp("^" + s, "i");

    andFilters.push({
      $or: [
        { "Customer Name": { $regex: regex } },
        { "Product Name": { $regex: regex } },
        { Brand: { $regex: regex } },
        { "Employee Name": { $regex: regex } },
        { "Customer ID": { $regex: regex } },
      ],
    });
  }

  // --- REGION / GENDER / CATEGORY / PAYMENT
  const addCIIn = (field, val) => {
    const arr = toArray(val);
    if (arr.length === 0) return;

    const regexes = arr.map(v => new RegExp("^" + escapeRegExp(v) + "$", "i"));
    andFilters.push({ [field]: { $in: regexes } });
  };

  addCIIn("Customer Region", regions);
  addCIIn("Gender", genders);
  addCIIn("Product Category", categories);
  addCIIn("Payment Method", paymentMethods);

  // --- TAGS
  const tagArr = toArray(tags);
  if (tagArr.length > 0) {
    const tagRegexes = tagArr.map(t =>
      new RegExp("(^|,\\s*)" + escapeRegExp(t) + "(\\s*,|$)", "i")
    );

    andFilters.push({
      $or: [
        ...tagRegexes.map(rx => ({ Tags: { $regex: rx } })),
        { Tags: { $in: tagRegexes } },
      ],
    });
  }

  // --- AGE RANGE
  if (query.ageRange) {
    const ranges = toArray(query.ageRange);
    const ageOr = [];

    ranges.forEach(r => {
      if (r.includes("-")) {
        const [min, max] = r.split("-").map(Number);
        ageOr.push({ Age: { $gte: min, $lte: max } });
      } else if (r.endsWith("+")) {
        const min = Number(r.replace("+", ""));
        ageOr.push({ Age: { $gte: min } });
      }
    });

    if (ageOr.length > 0) {
      andFilters.push({ $or: ageOr });
    }
  }

  // --- DATE RANGE (string-safe compare)
  if (query.dateRange) {
    const presets = toArray(query.dateRange);
    const today = new Date();
    let from = null;

    presets.forEach(v => {
      v = v.toLowerCase();
      if (v.includes("7")) from = new Date(today - 7 * 86400000);
      if (v.includes("30")) from = new Date(today - 30 * 86400000);
      if (v.includes("90")) from = new Date(today - 90 * 86400000);
      if (v.includes("year")) from = new Date(today - 365 * 86400000);
    });

    if (from) {
      // Convert to string YYYY-MM-DD for comparing with your string dates
      andFilters.push({
        Date: {
          $gte: from.toISOString().slice(0, 10),
          $lte: today.toISOString().slice(0, 10),
        },
      });
    }
  }

  return andFilters.length > 0 ? { $and: andFilters } : {};
}

// ----------------------------------------------------
// MAIN SERVICE — getSales()
// ----------------------------------------------------
export async function getSales(query) {
  const {
    sortBy = "Date",
    sortOrder = "desc",
    page = 1,
    pageSize = 10,
  } = query;

  const mongoFilters = buildMongoFilters(query);

  // Sorting map
  const sortMap = {
    Transaction_ID: "Transaction ID",
    Date: "Date",
    Customer_ID: "Customer ID",
    Customer_Name: "Customer Name",
    Product_Category: "Product Category",
    Quantity: "Quantity",
    Total_Sales: "Total Amount",

    customerName: "Customer Name",
    date: "Date",
    quantity: "Quantity",
    amount: "Total Amount",
    profit: "Final Amount",
  };

  const sortField = sortMap[sortBy] || sortBy;
  const sortOrderValue = sortOrder === "asc" ? 1 : -1;

  const skip = (Number(page) - 1) * Number(pageSize);
  const limit = Number(pageSize);

  // --- FIXED: ADD $toDate CONVERSION BEFORE MATCH
  const pipeline = [
    {
      $addFields: {
        Date: { $toDate: "$Date" }
      }
    },
    { $match: mongoFilters },

    {
      $facet: {
        summary: [
          {
            $group: {
              _id: null,
              totalUnits: { $sum: "$Quantity" },
              totalAmount: { $sum: "$Total Amount" },
              totalDiscount: { $sum: "$Discount" },
              numSalesForAmount: {
                $sum: { $cond: [{ $gt: ["$Total Amount", 0] }, 1, 0] },
              },
              numSalesForDiscount: {
                $sum: { $cond: [{ $gt: ["$Discount", 0] }, 1, 0] },
              },
              total: { $sum: 1 },
            },
          },
        ],

        paginated: [
          { $sort: { [sortField]: sortOrderValue } },
          { $skip: skip },
          { $limit: limit },
        ],
      },
    },
  ];

  const result = await Sale.aggregate(pipeline);

  const summary = result[0].summary[0] || {
    totalUnits: 0,
    totalAmount: 0,
    totalDiscount: 0,
    numSalesForAmount: 0,
    numSalesForDiscount: 0,
    total: 0,
  };

  const rawDocs = result[0].paginated || [];
  const data = rawDocs.map((doc) => normalizeSales(doc));

  return {
    data,
    page: Number(page),
    pageSize: Number(pageSize),
    total: summary.total,
    totalPages: Math.ceil(summary.total / pageSize),

    totalUnits: summary.totalUnits,
    totalAmount: summary.totalAmount,
    totalDiscount: summary.totalDiscount,
    numSalesForAmount: summary.numSalesForAmount,
    numSalesForDiscount: summary.numSalesForDiscount,
  };
}
