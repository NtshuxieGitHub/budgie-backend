"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PaymentsSchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users", required: true },
    loan_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "Loans", required: true },
    payment_amount: { type: Number, required: true },
    latest_balance: { type: Number, required: true },
    payday: { type: Number, required: true },
    paid: { type: Boolean, default: false },
}, { timestamps: true });
const Payments = (0, mongoose_1.model)("Payments", PaymentsSchema);
exports.default = Payments;
//# sourceMappingURL=Payments.js.map