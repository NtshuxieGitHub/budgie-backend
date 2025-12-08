"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const ENV = {
    port: process.env.PORT,
    db_uri: process.env.DATABASE_URI,
};
exports.default = ENV;
//# sourceMappingURL=config.js.map