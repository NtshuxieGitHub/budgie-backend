"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReportsSchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users", required: true },
    month: { type: String, required: true },
    year: { type: Number, required: true },
    reportpath: { type: String, required: true },
}, { timestamps: true });
const Reports = (0, mongoose_1.model)("Reports", ReportsSchema);
exports.default = Reports;
//# sourceMappingURL=Reports.js.map