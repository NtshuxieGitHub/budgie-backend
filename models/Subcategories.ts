import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const SubcategoriesSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    subcategory_name: { type: String, required: true },
    subcategory_icon: { type: String, required: true },
  },
  { timestamps: true }
);

const Subcategories = model("Subcategories", SubcategoriesSchema);
export default Subcategories;
