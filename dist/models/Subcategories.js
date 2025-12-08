"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SubcategoriesSchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users", required: true },
    category_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Categories",
        required: true,
    },
    subcategory_name: { type: String, required: true },
    subcategory_icon: { type: String, required: true },
}, { timestamps: true });
const Subcategories = (0, mongoose_1.model)("Subcategories", SubcategoriesSchema);
exports.default = Subcategories;
//# sourceMappingURL=Subcategories.js.map