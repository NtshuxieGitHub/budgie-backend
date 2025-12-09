"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitVerificationCodeSignal = void 0;
exports.accountVerificationWorkflow = accountVerificationWorkflow;
const workflow_1 = require("@temporalio/workflow");
const { verifyUserEmail } = (0, workflow_1.proxyActivities)({
    startToCloseTimeout: '1 minute',
    retry: {
        initialInterval: '5 second',
        maximumAttempts: 10,
        backoffCoefficient: 3,
        maximumInterval: '90 seconds',
    },
});
exports.submitVerificationCodeSignal = (0, workflow_1.defineSignal)('submitVerificationCode');
async function accountVerificationWorkflow(verificationCodeData) {
    (0, workflow_1.setHandler)(exports.submitVerificationCodeSignal, (verificationData) => {
        verificationCodeData = verificationData;
    });
    while (!verificationCodeData) {
        await (0, workflow_1.sleep)('3s');
    }
    await verifyUserEmail(verificationCodeData);
    return {
        success: true,
        message: `Email account: ${verificationCodeData.email} verified successfully`,
        verificationCode: verificationCodeData.code,
    };
}
//# sourceMappingURL=account_verification.workflow.js.map