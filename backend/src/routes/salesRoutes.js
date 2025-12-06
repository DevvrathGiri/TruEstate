import express from "express";
import { getSalesController } from "../controllers/salesController.js";

const router = express.Router();

router.get("/sales", getSalesController);

export default router;
