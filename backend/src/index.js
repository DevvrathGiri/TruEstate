import express from "express";
import cors from "cors";
import { loadSalesData } from "./models/salesModel.js";
import salesRoutes from "./routes/salesRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Load CSV before server starts
await loadSalesData();

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Mount API routes
app.use("/api", salesRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
