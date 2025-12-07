import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const SalarySchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    salary_amount: { type: Number, required: true },
    currency: { type: String, required: true },
    payday: { type: Number },
    bank: { type: String },
  },
  { timestamps: true }
);

const Salary = model("Salary", SalarySchema);
export default Salary;
