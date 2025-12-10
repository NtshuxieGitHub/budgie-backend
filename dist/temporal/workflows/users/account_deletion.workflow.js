"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAccountDeletionWorkflow = userAccountDeletionWorkflow;
const workflow_1 = require("@temporalio/workflow");
const { deleteUserAccount } = (0, workflow_1.proxyActivities)({
    startToCloseTimeout: '3 seconds',
    retry: {
        initialInterval: '1 second',
        maximumAttempts: 3,
        backoffCoefficient: 2,
        maximumInterval: '90 seconds',
    },
});
async function userAccountDeletionWorkflow(user) {
    await deleteUserAccount(user);
    return {
        success: true,
        message: 'User account deleted successfully',
    };
}
//# sourceMappingURL=account_deletion.workflow.js.map