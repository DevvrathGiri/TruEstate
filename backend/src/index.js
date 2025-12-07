import express from "express";
import cors from "cors";
import { loadSalesData } from "./models/salesModel.js";
import salesRoutes from "./routes/salesRoutes.js";

const app = express();

// CORS configuration for Vercel and localhost
app.use(cors({
  origin: ["https://truestate-giri.vercel.app", "http://localhost:5173", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

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
