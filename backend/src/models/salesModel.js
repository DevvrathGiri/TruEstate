import mongoose from "mongoose";

// We use strict: false so MongoDB accepts all fields
const salesSchema = new mongoose.Schema({}, { strict: false });

// 3rd argument "csvfile" = collection name in your MongoDB
const Sale = mongoose.model("Sale", salesSchema, "csvfile");

export default Sale;
