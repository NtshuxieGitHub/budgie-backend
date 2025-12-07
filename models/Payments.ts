import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const PaymentsSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    loan_id: { type: Schema.Types.ObjectId, ref: "Loans", required: true },
    payment_amount: { type: Number, required: true },
    latest_balance: { type: Number, required: true },
    payday: { type: Number, required: true },
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Payments = model("Payments", PaymentsSchema);
export default Payments;
