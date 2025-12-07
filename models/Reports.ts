import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const ReportsSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    month: { type: String, required: true },
    year: { type: Number, required: true },
    reportpath: { type: String, required: true },
  },
  { timestamps: true }
);

const Reports = model("Reports", ReportsSchema);
export default Reports;
