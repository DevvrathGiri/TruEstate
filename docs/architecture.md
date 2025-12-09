1. Backend Architecture

The backend is built using Node.js, Express, and MongoDB, following a modular, layered architecture.

Key Architectural Characteristics

RESTful API design

Separation of concerns using MVC principles:

Model → MongoDB schema and database logic

Controller → Request handling, validations, and query formation

Routes → API endpoint definitions

Utils → Helper functions for query parsing

Environment-based configuration using .env

Express middleware pipeline used for:

CORS

JSON parsing

Error handling

Backend Workflow Summary

Request arrives via Express route

Route forwards request to appropriate Controller

Controller processes:

Search

Filtering

Sorting

Pagination

Controller interacts with MongoDB via Mongoose Model

Response returned to frontend with structured pagination metadata

2. Frontend Architecture

The frontend is built using React + Vite with a modular component-driven architecture.

Key Architectural Characteristics

Component-based UI structure (React functional components)

Custom hooks for API calls and query management (useSalesQuery)

State managed at component level (filters, sorting, pagination, search)

UI broken into reusable modules:

FilterPanel

SortDropdown

PaginationControls

SalesTable

SummaryCards

Axios used for API communication

TailwindCSS used for styling

Rendering Flow

User interacts with UI (search, filters, sorting, pagination)

Local state updates

useSalesQuery constructs API request

API returns data + metadata

UI components update reactivity

3. Data Flow
High-Level Data Flow
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

Request Structure (Example)
GET /sales?search=alex
           &status=Paid
           &sortBy=amount
           &sortOrder=desc
           &page=2
           &limit=20

Response Structure (Example)
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 20,
    "totalPages": 10,
    "totalCount": 200
  }
}

4. Folder Structure
Root Project
project/
│── frontend/
│── backend/
│── docs/
│   └── architecture.md

Backend Structure
backend/
│── config/
│   └── db.js               # MongoDB connection setup
│── controllers/
│   └── salesController.js  # Search, filter, sort, pagination logic
│── models/
│   └── salesModel.js       # Mongoose schema
│── routes/
│   └── salesRoutes.js      # API route definitions
│── utils/
│   └── queryHelpers.js     # Helper functions for building dynamic queries
│── server.js               # Express server setup
│── .env
│── package.json

Frontend Structure
frontend/
│── src/
│   ├── components/
│   │   ├── FilterPanel.jsx
│   │   ├── PaginationControls.jsx
│   │   ├── SortDropdown.jsx
│   │   ├── SalesTable.jsx
│   │   └── SummaryCards.jsx
│   ├── hooks/
│   │   └── useSalesQuery.js
│   ├── utils/
│   │   └── formatters.js
│   ├── App.jsx
│   └── main.jsx
│── public/
│── .env
│── package.json
│── vite.config.js

5. Module Responsibilities
Backend Modules
Module	Responsibility
salesModel.js	Defines MongoDB schema for sales data
salesController.js	Implements search, filtering, sorting, and pagination logic
salesRoutes.js	Maps REST endpoints to controller methods
queryHelpers.js	Utilities for building dynamic MongoDB query objects
db.js	MongoDB connection setup
server.js	Initializes Express app, middleware, API routes
Frontend Modules
Module	Responsibility
FilterPanel	Collects filter inputs and updates state
SortDropdown	Provides sorting options
PaginationControls	Renders pagination UI and handles navigation
SalesTable	Displays sales data in responsive format
SummaryCards	Shows aggregated statistics
useSalesQuery	Builds API requests based on state (search, filter, sort, pagination)
formatters.js	Utility functions for formatting values
