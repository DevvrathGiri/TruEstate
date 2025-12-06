import { getAllSales } from "../models/salesModel.js";
import { applySearch, applyFilters, applySorting, applyPagination } from "../utils/queryHelpers.js";

export function getSales(query) {
  const allData = getAllSales();

  // Extract query params
  const {
    search = "",
    regions = "",
    genders = "",
    categories = "",
    tags = "",
    paymentMethods = "",
    ageMin = null,
    ageMax = null,
    dateFrom = null,
    dateTo = null,
    sortBy = "date",
    sortOrder = "desc",
    page = 1,
    pageSize = 10,
  } = query;

  // Convert comma-separated values into arrays
  const filters = {
    regions: regions ? regions.split(",").map((x) => x.toLowerCase()) : [],
    genders: genders ? genders.split(",").map((x) => x.toLowerCase()) : [],
    categories: categories ? categories.split(",").map((x) => x.toLowerCase()) : [],
    tags: tags ? tags.split(",").map((x) => x.toLowerCase()) : [],
    paymentMethods: paymentMethods ? paymentMethods.split(",").map((x) => x.toLowerCase()) : [],
    ageMin: ageMin ? Number(ageMin) : null,
    ageMax: ageMax ? Number(ageMax) : null,
    dateFrom: dateFrom ? new Date(dateFrom) : null,
    dateTo: dateTo ? new Date(dateTo) : null,
  };

  // PROCESSING PIPELINE
  let result = allData;

  result = applySearch(result, search);
  result = applyFilters(result, filters);
  result = applySorting(result, sortBy, sortOrder);

  // Pagination returns object
  const paginated = applyPagination(result, page, pageSize);

  return paginated;
}
