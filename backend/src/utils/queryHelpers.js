// utils/queryHelpers.js

/**
 * Search within dataset
 * @param {Array} data 
 * @param {string} searchTerm 
 */
export function applySearch(data, search) {
  if (!search || search.trim() === "") {
    return data; // Empty search → return everything
  }

  const term = search.toLowerCase();

  // If the user searched only digits → we treat it as phone search priority
  const isNumericSearch = /^\d+$/.test(term);

  return data.filter((row) => {
    const name = row.Customer_Name?.toLowerCase() || "";
    const phone = row.Phone_Number?.toLowerCase() || "";

    if (isNumericSearch) {
      // Searching phone number only
      return phone.includes(term);
    }

    // Otherwise search in both name + phone
    return (
      name.includes(term) ||
      phone.includes(term)
    );
  });
}


/**
 * Apply multi-field filters
 * @param {Array} data 
 * @param {Object} filters 
 */
export function applyFilters(data, filters) {
  if (!filters) return data;

  const {
    regions = [],
    genders = [],
    ageMin = null,
    ageMax = null,
    categories = [],
    tags = [],
    paymentMethods = [],
    dateFrom = null,
    dateTo = null,
  } = filters;

  let result = [...data];

  // -------------------------
  // 1. REGION FILTER
  // -------------------------
  if (regions.length > 0) {
    result = result.filter((row) =>
      regions.includes(row.Customer_Region?.toLowerCase())
    );
  }

  // -------------------------
  // 2. GENDER FILTER
  // -------------------------
  if (genders.length > 0) {
    result = result.filter((row) =>
      genders.includes(row.Gender?.toLowerCase())
    );
  }

  // -------------------------
  // 3. AGE RANGE FILTER
  // -------------------------
  if (ageMin !== null && ageMax !== null) {
    if (ageMin > ageMax) {
      return []; // conflicting filter → empty result
    }

    result = result.filter(
      (row) => row.Age >= ageMin && row.Age <= ageMax
    );
  } else {
    if (ageMin !== null) {
      result = result.filter((row) => row.Age >= ageMin);
    }
    if (ageMax !== null) {
      result = result.filter((row) => row.Age <= ageMax);
    }
  }

  // -------------------------
  // 4. CATEGORY FILTER
  // -------------------------
  if (categories.length > 0) {
    result = result.filter((row) =>
      categories.includes(row.Product_Category?.toLowerCase())
    );
  }

  // -------------------------
  // 5. TAGS FILTER
  // -------------------------
  if (tags.length > 0) {
    result = result.filter((row) => {
      if (!row.Tags) return false;

      // Convert "Wireless, Bluetooth, Tech" → ["wireless","bluetooth","tech"]
      const rowTags = row.Tags.split(",")
        .map((t) => t.trim().toLowerCase());

      return tags.some((tag) => rowTags.includes(tag));
    });
  }

  // -------------------------
  // 6. PAYMENT METHOD FILTER
  // -------------------------
  if (paymentMethods.length > 0) {
    result = result.filter((row) =>
      paymentMethods.includes(row.Payment_Method?.toLowerCase())
    );
  }

  // -------------------------
  // 7. DATE RANGE FILTER
  // -------------------------
  if (dateFrom !== null) {
    result = result.filter(
      (row) => new Date(row.Date) >= dateFrom
    );
  }

  if (dateTo !== null) {
    result = result.filter(
      (row) => new Date(row.Date) <= dateTo
    );
  }

  return result;
}


/**
 * Sort data by any field
 * @param {Array} data 
 * @param {string} sortBy 
 * @param {string} sortOrder "asc" or "desc"
 */
export function applySorting(data, sortBy, sortOrder) {
  if (!data || data.length === 0) return data;

  // Default sorting → date desc (newest first)
  const sortField = sortBy || "date";
  const order = sortOrder || "desc";

  const sorted = [...data];

  sorted.sort((a, b) => {
    // ------------------------------
    // HANDLE MISSING / NULL VALUES
    // ------------------------------
    if (a[sortField] == null) return 1;  // a missing → goes last
    if (b[sortField] == null) return -1; // b missing → goes last

    // Normalize values
    let valA = a[sortField];
    let valB = b[sortField];

    // Convert special fields
    if (sortField === "date" || sortField === "Date") {
      valA = new Date(a.Date);
      valB = new Date(b.Date);
    }

    // ------------------------------
    // SORTING LOGIC
    // ------------------------------

    // 1️⃣ DATE SORTING
    if (sortField === "date" || sortField === "Date") {
      return order === "asc"
        ? valA - valB
        : valB - valA;
    }

    // 2️⃣ QUANTITY SORTING
    if (sortField === "quantity" || sortField === "Quantity") {
      return order === "asc"
        ? valA - valB
        : valB - valA;
    }

    // 3️⃣ CUSTOMER NAME SORTING (case-insensitive)
    if (
      sortField === "customerName" ||
      sortField === "Customer_Name"
    ) {
      const nameA = a.Customer_Name?.toLowerCase() || "";
      const nameB = b.Customer_Name?.toLowerCase() || "";

      return order === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    }

    // DEFAULT (fallback)
    return 0;
  });

  return sorted;
}


/**
 * Paginate dataset
 * @param {Array} data 
 * @param {number} page 
 * @param {number} pageSize 
 */
export function applyPagination(data, page = 1, pageSize = 10) {
  if (!data || data.length === 0) {
    return {
      data: [],
      page,
      pageSize,
      totalItems: 0,
      totalPages: 0
    };
  }

  // Enforce minimum values
  const currentPage = Math.max(1, Number(page) || 1);
  const size = Number(pageSize) || 10;

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / size);

  const start = (currentPage - 1) * size;
  const end = start + size;

  const paginatedItems = data.slice(start, end);

  return {
    data: paginatedItems,
    page: currentPage,
    pageSize: size,
    totalItems,
    totalPages
  };
}

