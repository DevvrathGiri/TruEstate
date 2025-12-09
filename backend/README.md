🔧 TruEstate Backend (Node.js + Express + MongoDB)
📌 1. Overview (3–5 lines)

The TruEstate backend is a high-performance REST API built with Node.js, Express, and MongoDB.
It powers the frontend dashboard with efficient search, filter, sort, and pagination capabilities for large real-estate datasets.
The backend uses dynamic query builders, optimized MongoDB queries, and modular architecture for maintainability and scalability.

🧰 2. Tech Stack

Node.js

Express.js

MongoDB (Mongoose)

dotenv

CORS

Render Deployment

🔍 3. Search Implementation Summary

Supports ?search= query parameter.

Backend builds a case-insensitive $regex filter on multiple fields (e.g., name, project, agent).

Example internal query:

{ name: { $regex: search, $options: "i" } }


Fully compatible with filters, sorting, and pagination.

🎛 4. Filter Implementation Summary

Filters supported:

Date range

Amount range

Payment status

Property type

Project / Agent filters

Backend implementation:

Query params converted using helper utilities.

Uses MongoDB operators:

$gte, $lte, $in


Dynamically builds a single combined query object.

Example:

if (minAmount) query.amount = { ...query.amount, $gte: minAmount };
if (maxAmount) query.amount = { ...query.amount, $lte: maxAmount };

↕️ 5. Sorting Implementation Summary

Sorting parameters:

?sortBy=amount&sortOrder=asc


Backend applies:

.sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })


Sorting is applied after filters and search to ensure correct result ordering.

Supported fields include: date, amount, customer name, project name, etc.

📄 6. Pagination Implementation Summary

Pagination parameters:

?page=1&limit=20


Backend logic:

const skip = (page - 1) * limit;
const results = await Sale.find(query)
  .sort(sortOptions)
  .skip(skip)
  .limit(limit);


Response includes full metadata:

{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalCount": 240,
    "totalPages": 12
  }
}


This ensures the frontend can display proper page numbers and next/prev states.

🛠 7. Setup Instructions
1. Install Dependencies
cd backend
npm install

2. Create Environment File

Create /backend/.env:

MONGO_URI=your_mongodb_uri
PORT=4000


⚠️ You told me your backend runs on PORT 4000, so this is correct.

3. Start Development Server
npm run dev


The backend will run at:

http://localhost:4000

📂 Backend Folder Structure (Optional but highly professional)
backend/
│── models/
│   └── salesModel.js
│── routes/
│   └── salesRoutes.js
│── controllers/
│   └── salesController.js
│── utils/
│   └── queryHelpers.js
│── config/
│   └── db.js
│── server.js
│── .env
│── package.json
