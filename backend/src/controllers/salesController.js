import { getSales } from "../services/salesService.js";

export function getSalesController(req, res) {
  try {
    const data = getSales(req.query);
    res.json(data);
  } catch (err) {
    console.error("Error in salesController:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
