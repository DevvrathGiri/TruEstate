# TruEstate Frontend (React + Vite)

## 1. Overview (3–5 lines)

The TruEstate frontend is a fast, responsive, and user-friendly dashboard built using React + Vite. It provides seamless search, filter, sort, and pagination interactions for large sales datasets. Optimized API calls, a modular component architecture, and polished UI elements ensure a smooth user experience.

## 2. Tech Stack

**Frontend:**
- React (Vite)
- JavaScript / TypeScript
- TailwindCSS
- Axios
- React Hooks (useState, useEffect, useMemo, custom hooks)

**Deployment:**
- Vercel

## 3. Search Implementation Summary

- The search bar uses a debounced input to reduce unnecessary API calls
- User input dynamically updates the query and triggers a request to: `GET /sales?search=<query>`
- The backend performs case-insensitive matching, and results update instantly
- Works smoothly alongside filters, sorting, and pagination

## 4. Filter Implementation Summary

**Filters available:**
- Date range
- Payment status
- Amount range
- Property type
- Agent / Project

**Implementation:**
- Filters are managed inside FilterPanel and stored in state
- Each change updates query parameters via useSalesQuery hook
- Frontend sends filter values like: `GET /sales?status=Paid&minAmount=1000&maxAmount=5000&from=2023-01-01&to=2023-02-01`
- API response updates the table instantly

## 5. Sorting Implementation Summary

- Sorting UI is handled by the SortDropdown component
- Sort state includes: `{ sortBy: "amount" | "date" | "name", sortOrder: "asc" | "desc" }`
- Sent to backend as: `GET /sales?sortBy=amount&sortOrder=desc`
- Backend returns sorted results that reflect immediately in the table

## 6. Pagination Implementation Summary

- Pagination uses a dedicated PaginationControls component
- Users can move through pages (next, prev, or by page number)
- Query parameters sent: `GET /sales?page=3&limit=20`
- Backend provides: `totalPages`, `totalCount`, `hasNext` / `hasPrev`
- UI updates without full reload

## 7. Setup Instructions

**Install Dependencies:**
```bash
cd frontend
npm install
```

**Create Environment File:**

Create `./frontend/.env`:
```
VITE_API_BASE=http://localhost:4000/api
```

(If deployed: set production backend URL here.)

**Run Frontend:**
```bash
npm run dev
```
