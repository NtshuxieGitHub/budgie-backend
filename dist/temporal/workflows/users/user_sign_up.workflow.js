"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignUpWorkflow = userSignUpWorkflow;
const workflow_1 = require("@temporalio/workflow");
const { createUser, sendVerificationEmail } = (0, workflow_1.proxyActivities)({
    startToCloseTimeout: '1 minute',
    retry: {
        initialInterval: '5 second',
        maximumAttempts: 10,
        backoffCoefficient: 3,
        maximumInterval: '90 seconds',
    },
});
async function userSignUpWorkflow(user) {
    const newUser = await createUser(user);
    await sendVerificationEmail(newUser);
    return {
        success: true,
        message: 'User signed up successfully, awaiting account verification',
        data: newUser,
    };
}
//# sourceMappingURL=user_sign_up.workflow.js.map