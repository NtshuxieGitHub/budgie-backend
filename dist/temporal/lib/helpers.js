"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserModel = void 0;
exports.generateRandomCode = generateRandomCode;
const mongoose_1 = require("mongoose");
const user_schema_1 = require("../../schemas/user.schema");
const getUserModel = () => {
    if (mongoose_1.models.User) {
        return mongoose_1.models.User;
    }
    return (0, mongoose_1.model)('User', user_schema_1.UserSchema);
};
exports.getUserModel = getUserModel;
function generateRandomCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
//# sourceMappingURL=helpers.js.map