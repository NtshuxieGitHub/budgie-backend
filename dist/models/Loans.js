"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LoansSchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users", required: true },
    loan_name: { type: String, required: true },
    principal_amount: { type: Number, required: true },
    interest_rate: { type: Number, required: true },
    min_payment: { type: Number, required: true },
    extra_payment: { type: Number },
    payday: { type: Number, required: true },
    remaining_amount: { type: Number, required: true },
    original_term: { type: Number, required: true },
}, { timestamps: true });
const Loans = (0, mongoose_1.model)("Loans", LoansSchema);
exports.default = Loans;
//# sourceMappingURL=Loans.js.map