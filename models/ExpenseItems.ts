import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const ExpenseItemsSchema = new Schema(
  {
    subcategory_id: {
      type: Schema.Types.ObjectId,
      ref: "Subcategories",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    expense_amount: { type: Number },
    payday: { type: Number, required: true },
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ExpenseItems = model("ExpenseItems", ExpenseItemsSchema);
export default ExpenseItems;
