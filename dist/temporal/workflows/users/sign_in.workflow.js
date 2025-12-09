"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignInWorkflow = userSignInWorkflow;
const workflow_1 = require("@temporalio/workflow");
const { signUserIn } = (0, workflow_1.proxyActivities)({
    startToCloseTimeout: '3 seconds',
    retry: {
        initialInterval: '2 second',
        maximumAttempts: 5,
        backoffCoefficient: 2,
        maximumInterval: '90 seconds',
    },
});
async function userSignInWorkflow(user) {
    const signInResult = await signUserIn(user);
    return {
        success: true,
        message: 'User signed in successfully',
        token: signInResult.token,
        data: signInResult.data,
    };
}
//# sourceMappingURL=sign_in.workflow.js.map