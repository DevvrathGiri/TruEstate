import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import salesRoutes from "./routes/salesRoutes.js";

dotenv.config(); // Load .env file

const app = express();

// ----------------------------
// 🔗 1. Connect to MongoDB
// ----------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("📦 MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ----------------------------
// 🌐 2. CORS Setup
// ----------------------------
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://tru-estate-pi.vercel.app",
      "https://truestate-giri.vercel.app",
      "https://truestate.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:4000",
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("CORS request from:", origin);
      callback(null, true);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// ----------------------------
// ❤️ 3. Health Route
// ----------------------------
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// ----------------------------
// 📌 4. API Routes
// ----------------------------
app.use("/api", salesRoutes);

// ----------------------------
// 🚀 5. Start Server
// ----------------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
