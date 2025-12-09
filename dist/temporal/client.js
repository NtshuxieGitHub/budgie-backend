"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemporalClient = getTemporalClient;
const client_1 = require("@temporalio/client");
const config_1 = __importDefault(require("../config/config"));
let temporalClient;
function getTemporalClient() {
    if (!temporalClient) {
        temporalClient = new client_1.Client({
            namespace: config_1.default.namespace,
        });
    }
    return temporalClient;
}
//# sourceMappingURL=client.js.map