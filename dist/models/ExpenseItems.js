"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ExpenseItemsSchema = new mongoose_1.Schema({
    subcategory_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Subcategories",
        required: true,
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    expense_amount: { type: Number },
    payday: { type: Number, required: true },
    paid: { type: Boolean, default: false },
}, { timestamps: true });
const ExpenseItems = (0, mongoose_1.model)("ExpenseItems", ExpenseItemsSchema);
exports.default = ExpenseItems;
//# sourceMappingURL=ExpenseItems.js.map