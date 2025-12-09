# Architecture Document

## 1. Backend Architecture

The backend is built using Node.js, Express, and MongoDB, following a modular, layered architecture.

### Key Architectural Characteristics

- **RESTful API design** - Standard HTTP methods and status codes
- **Separation of concerns using MVC principles:**
  - **Model** → MongoDB schema and database logic
  - **Controller** → Request handling, validations, and query formation
  - **Routes** → API endpoint definitions
  - **Services** → Business logic layer
  - **Utils** → Helper functions for query parsing
- **Environment-based configuration** using `.env`
- **Express middleware pipeline** used for:
  - CORS
  - JSON parsing
  - Error handling

### Backend Workflow Summary

1. Request arrives via Express route
2. Route forwards request to appropriate Controller
3. Controller processes:
   - Search
   - Filtering
   - Sorting
   - Pagination
4. Controller interacts with MongoDB via Mongoose Model
5. Response returned to frontend with structured pagination metadata

## 2. Frontend Architecture

The frontend is built using React + Vite with a modular component-driven architecture.

### Key Architectural Characteristics

- **Component-based UI structure** (React functional components with TypeScript)
- **Custom hooks** for API calls and query management (`useSalesQuery`, `useQueryStateSync`, `useToast`)
- **State managed at component level** (filters, sorting, pagination, search)
- **UI broken into reusable modules:**
  - `FilterPanel` - Filter controls
  - `SortDropdown` - Sorting options
  - `PaginationControls` - Page navigation
  - `SalesTable` / `TransactionTable` - Data display
  - `SummaryCards` - Aggregated statistics
  - `SearchBar` - Search input
  - `Header`, `Sidebar` - Layout components
  - `Toast` - Notification system
  - `TableSkeleton` - Loading states
- **Axios** used for API communication
- **TailwindCSS** used for styling
- **TypeScript** for type safety

### Rendering Flow

1. User interacts with UI (search, filters, sorting, pagination)
2. Local state updates
3. `useSalesQuery` constructs API request
4. API returns data + metadata
5. UI components update reactively

## 3. Data Flow

### High-Level Data Flow

```
User Action (Search / Filter / Sort / Pagination)
            ↓
Frontend State Updates
            ↓
API Request Generated (Query Params Constructed)
            ↓
Backend Routes Receive Request
            ↓
Controller Builds Dynamic MongoDB Query
            ↓
MongoDB Returns Filtered + Sorted Data
            ↓
Backend Sends Paginated Response
            ↓
Frontend Renders Updated Table + Pagination
```

### Request Structure (Example)

```
GET /sales?search=alex
           &status=Paid
           &sortBy=amount
           &sortOrder=desc
           &page=2
           &limit=20
```

### Response Structure (Example)

```json
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 20,
    "totalPages": 10,
    "totalCount": 200
  }
}
```

## 4. Folder Structure

### Root Project

```
my-project/
├── frontend/
├── backend/
├── docs/
│   └── architecture.md
└── README.md
```

### Backend Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── salesController.js    # Request handling, validations
│   ├── models/
│   │   └── salesModel.js         # Mongoose schema
│   ├── routes/
│   │   └── salesRoutes.js        # API route definitions
│   ├── services/
│   │   └── salesService.js       # Business logic layer
│   ├── utils/
│   │   └── queryHelpers.js       # Helper functions for building dynamic queries
│   └── index.js                  # Express server setup and entry point
├── .env
└── package.json
```

### Frontend Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── FilterPanel.tsx
│   │   ├── PaginationControls.tsx
│   │   ├── SortDropdown.tsx
│   │   ├── SalesTable.tsx
│   │   ├── TransactionTable.tsx
│   │   ├── SummaryCards.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── MultiSelectDropdown.tsx
│   │   ├── TableSkeleton.tsx
│   │   └── Toast.tsx
│   ├── hooks/
│   │   ├── useSalesQuery.ts      # Main API query hook
│   │   ├── useQueryStateSync.ts  # URL state synchronization
│   │   └── useToast.ts           # Toast notification hook
│   ├── pages/
│   │   └── SalesPage.tsx         # Main sales page component
│   ├── services/
│   │   ├── apiClient.ts          # Axios instance configuration
│   │   └── salesApi.ts           # API service functions
│   ├── App.tsx
│   └── main.tsx
├── public/
├── .env
├── package.json
└── vite.config.ts
```

## 5. Module Responsibilities

### Backend Modules

| Module | Responsibility |
|--------|---------------|
| `salesModel.js` | Defines MongoDB schema for sales data |
| `salesController.js` | Implements request handling, validations, and orchestrates search, filtering, sorting, and pagination |
| `salesService.js` | Contains business logic for sales operations |
| `salesRoutes.js` | Maps REST endpoints to controller methods |
| `queryHelpers.js` | Utilities for building dynamic MongoDB query objects |
| `index.js` | Initializes Express app, middleware, and API routes |

### Frontend Modules

| Module | Responsibility |
|--------|---------------|
| `FilterPanel.tsx` | Collects filter inputs and updates state |
| `SortDropdown.tsx` | Provides sorting options and state management |
| `PaginationControls.tsx` | Renders pagination UI and handles navigation |
| `SalesTable.tsx` / `TransactionTable.tsx` | Displays sales data in responsive table format |
| `SummaryCards.tsx` | Shows aggregated statistics |
| `SearchBar.tsx` | Handles search input with debouncing |
| `Header.tsx` | Application header component |
| `Sidebar.tsx` | Navigation sidebar component |
| `MultiSelectDropdown.tsx` | Reusable multi-select dropdown component |
| `TableSkeleton.tsx` | Loading skeleton for table data |
| `Toast.tsx` | Toast notification component |
| `useSalesQuery.ts` | Builds API requests based on state (search, filter, sort, pagination) |
| `useQueryStateSync.ts` | Synchronizes application state with URL query parameters |
| `useToast.ts` | Manages toast notification state and display |
| `salesApi.ts` | API service functions for sales endpoints |
| `apiClient.ts` | Axios instance configuration and interceptors |
