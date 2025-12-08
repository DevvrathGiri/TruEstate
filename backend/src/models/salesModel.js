import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({}, { strict: false });

// MUST MATCH EXACT COLLECTION NAME
const Sale = mongoose.model("Sale", salesSchema, "csvfile");

export default Sale;
