"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SalarySchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users", required: true },
    salary_amount: { type: Number, required: true },
    currency: { type: String, required: true },
    payday: { type: Number },
    bank: { type: String },
}, { timestamps: true });
const Salary = (0, mongoose_1.model)("Salary", SalarySchema);
exports.default = Salary;
//# sourceMappingURL=Salary.js.map