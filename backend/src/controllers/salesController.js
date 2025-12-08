import { getSales } from "../services/salesService.js";

export async function getSalesController(req, res) {
  try {
    const data = await getSales(req.query);  // correct: async service call
    res.json(data);
  } catch (err) {
    console.error("Error in salesController:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
