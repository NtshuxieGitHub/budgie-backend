"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbRegister = dbRegister;
const mongoose_1 = __importDefault(require("mongoose"));
const user_schema_1 = require("../schemas/user.schema");
const config_1 = __importDefault(require("../config/config"));
let isConnected = false;
async function dbRegister() {
    if (isConnected)
        return;
    await mongoose_1.default.connect(config_1.default.db_uri);
    mongoose_1.default.model('User', user_schema_1.UserSchema);
    isConnected = true;
}
//# sourceMappingURL=db_register.js.map