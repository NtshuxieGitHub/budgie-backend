"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationCodeSignal = void 0;
exports.userSignUpWorkflow = userSignUpWorkflow;
const workflow_1 = require("@temporalio/workflow");
const { createUser, sendVerificationEmail, verifyUserEmail, getUserById } = (0, workflow_1.proxyActivities)({
    startToCloseTimeout: '1 minute',
    retry: {
        initialInterval: '5 second',
        maximumAttempts: 10,
        backoffCoefficient: 3,
        maximumInterval: '90 seconds',
    },
});
exports.verificationCodeSignal = (0, workflow_1.defineSignal)('userVerificationCodeReceived');
async function userSignUpWorkflow(user) {
    const newUser = await createUser(user);
    const updatedUser = await sendVerificationEmail({
        id: newUser._id.toString(),
    });
    let userSubmittedInfo;
    (0, workflow_1.setHandler)(exports.verificationCodeSignal, (verificationInfo) => {
        userSubmittedInfo = verificationInfo;
    });
    while (true) {
        if (userSubmittedInfo) {
            const user = await getUserById({ id: updatedUser._id.toString() });
            if (!user) {
                return {
                    success: false,
                    message: 'User not found',
                };
            }
            if (!user?.verificationExpires) {
                return {
                    success: false,
                    message: 'Not verificate window available',
                };
            }
            if (Date.now() > user.verificationExpires.getTime()) {
                return {
                    success: false,
                    message: 'Verification code expired',
                };
            }
            if (user.verificationCode !== userSubmittedInfo.code) {
                userSubmittedInfo = undefined;
                await (0, workflow_1.sleep)(500);
                continue;
            }
            await verifyUserEmail(userSubmittedInfo);
            return {
                success: true,
                message: 'User signed up successfully, awaiting account verification',
                originalUserData: newUser,
                updatedUserData: updatedUser,
            };
        }
    }
    return {
        success: true,
        message: 'User signed up successfully, awaiting account verification',
        originalUserData: newUser,
        updatedUserData: updatedUser,
    };
}
//# sourceMappingURL=user_sign_up.workflow.js.map