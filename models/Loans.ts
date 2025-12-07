import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const LoansSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    loan_name: { type: String, required: true },
    principal_amount: { type: Number, required: true },
    interest_rate: { type: Number, required: true },
    min_payment: { type: Number, required: true },
    extra_payment: { type: Number },
    payday: { type: Number, required: true },
    remaining_amount: { type: Number, required: true },
    original_term: { type: Number, required: true },
  },
  { timestamps: true }
);

const Loans = model("Loans", LoansSchema);
export default Loans;
