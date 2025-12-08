import express from "express";
import cors from "cors";
import { loadSalesData } from "./models/salesModel.js";
import salesRoutes from "./routes/salesRoutes.js";

const app = express();

// CORS configuration - allow all origins for now (can be restricted later)
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests from:
    // - Vercel deployments
    // - Localhost (development)
    // - Any origin with this header (useful for testing)
    const allowedOrigins = [
      "https://tru-estate-pi.vercel.app",
      "https://truestate-giri.vercel.app",
      "https://truestate.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:4000",
    ];

    // Allow if origin is in whitelist or if no origin provided (same-origin requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // For development, log but still allow
      console.log("CORS request from:", origin);
      callback(null, true); // Allow all for now
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Load CSV before server starts
await loadSalesData();

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Mount API routes
app.use("/api", salesRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
