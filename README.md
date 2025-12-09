# TruEstate — Full-Stack Sales Management System

## 1. Overview (3–5 lines)

TruEstate is a full-stack sales management dashboard built to efficiently handle large real-estate datasets with powerful search, filter, sorting, and pagination capabilities. It uses a React + Vite frontend and Node.js + Express + MongoDB backend. The system is optimized for fast, smooth data querying and provides a clean, intuitive UI for sales teams.

## 2. Tech Stack

**Frontend:**
- React (Vite)
- JavaScript / TypeScript
- TailwindCSS
- Axios

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB Atlas

**Deployment:**
- Vercel → Frontend
- Render → Backend

## 3. Search Implementation Summary

- Search field updates the query using debounced input
- Frontend sends `?search=query` to backend
- Backend uses case-insensitive MongoDB `$regex` on multiple fields
- Results update instantly without reloading the page

## 4. Filter Implementation Summary

**Filters supported:**
- Date Range
- Status
- Amount Range
- Property Type
- Agent / Project filters

**Backend internally uses:**
- `$gte`, `$lte` for ranges
- `$in` for multi-select filters
- Dynamic query builder to combine multiple filters at once

## 5. Sorting Implementation Summary

- UI sends `sortBy` + `sortOrder` to API
- Backend applies `.sort({ field: 1 or -1 })`
- Compatible with search + filters simultaneously

## 6. Pagination Implementation Summary

- Frontend uses page numbers + next/prev controls
- Backend calculates: `skip = (page - 1) * limit`
- Returns:
  ```json
  {
    "data": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalPages": 12,
      "totalCount": 240
    }
  }
  ```

## 7. Setup Instructions

**Clone the project:**
```bash
git clone <repo-url>
cd project-folder
```

**Backend Setup:**
```bash
cd backend
npm install
```

Create `.env`:
```
MONGO_URI=your_mongodb_url
PORT=4000
```

Run backend:
```bash
npm run dev
```

**Frontend Setup:**
```bash
cd frontend
npm install
npm run dev
```

Create `.env`:
```
VITE_API_BASE=http://localhost:4000/api
```
