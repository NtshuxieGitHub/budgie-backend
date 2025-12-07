import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const CategoriesSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    category_name: { type: String, required: true },
    category_icon: { type: String, required: true },
  },
  { timestamps: true }
);

const Categories = model("Categories", CategoriesSchema);
export default Categories;
