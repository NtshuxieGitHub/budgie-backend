"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CategoriesSchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users", required: true },
    category_name: { type: String, required: true },
    category_icon: { type: String, required: true },
}, { timestamps: true });
const Categories = (0, mongoose_1.model)("Categories", CategoriesSchema);
exports.default = Categories;
//# sourceMappingURL=Categories.js.map