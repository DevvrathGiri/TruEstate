import { getSales } from "../services/salesService.js";

export async function getSalesController(req, res) {
  try {
    // Set default pagination: 20 results per page
    const query = {
      page: req.query.page || 1,
      pageSize: req.query.pageSize || 100, // Default: 20 results per page
      ...req.query,
    };

    const data = await getSales(query);
    res.json(data);
  } catch (err) {
    console.error("Error in salesController:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
}
