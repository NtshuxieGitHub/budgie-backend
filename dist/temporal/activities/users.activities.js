"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.sendVerificationEmail = sendVerificationEmail;
exports.verifyUserEmail = verifyUserEmail;
exports.signUserIn = signUserIn;
exports.deleteUserAccount = deleteUserAccount;
exports.getUserById = getUserById;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const config_1 = __importDefault(require("../../config/config"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const helpers_1 = require("../lib/helpers");
const mongoose_1 = __importDefault(require("mongoose"));
const logger = new common_1.Logger('UserActivities');
const jwtService = new jwt_1.JwtService();
const userModel = (0, helpers_1.getUserModel)();
async function createUser(user) {
    try {
        const hashedUserPassword = await bcrypt_1.default.hash(user.password, 12);
        user.password = hashedUserPassword;
        const newUser = new userModel(user);
        return await newUser.save();
    }
    catch (error) {
        logger.error('Failed to create new user ', error.stack || error);
        throw error;
    }
}
async function sendVerificationEmail(userId) {
    try {
        const verificationCode = (0, helpers_1.generateRandomCode)();
        const verificationExpiryDate = new Date(Date.now() + 5 * 60 * 1000);
        const user = await userModel.findById(new mongoose_1.default.Types.ObjectId(userId.id));
        if (!user)
            throw new Error('User not found');
        user.verificationCode = verificationCode;
        user.verificationExpires = verificationExpiryDate;
        await mailTransporter.sendMail({
            to: user.email,
            subject: 'Email Verification Required for your Budgie Account',
            html: `<p>Your verification code is <b>${verificationCode}</b></p>`,
        });
        return await user.save();
    }
    catch (error) {
        logger.error('Failed to send user verification email ', error.stack || error);
        throw error;
    }
}
async function verifyUserEmail(verificationData) {
    try {
        const { email, code } = verificationData;
        const user = await userModel.findOne({ email });
        user.verified = true;
        user.verificationCode = null;
        user.verificationExpires = null;
        return await user.save();
    }
    catch (error) {
        logger.error('Error verifying user email account', error.stack || error);
        throw error;
    }
}
async function signUserIn(userSignInDetails) {
    try {
        const { id, password } = userSignInDetails;
        const user = await userModel.findOne({
            $or: [{ email: id }, { username: id }],
        });
        if (!user)
            throw new Error('User email or username is invalid.');
        if (!user.verified)
            throw new Error('User is unverified.');
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid)
            throw new Error('User password is invalid.');
        const payload = {
            userId: user._id,
            email: user.email,
            username: user.username,
        };
        const jwtToken = jwtService.sign(payload);
        return {
            token: jwtToken,
            data: user,
        };
    }
    catch (error) {
        logger.error('Failed to sign user in', error.stack || error);
        throw error;
    }
}
async function deleteUserAccount(userId) {
    try {
        const deletionResult = await userModel.findByIdAndDelete(userId);
        if (!deletionResult)
            throw new Error('User account not found.');
        deletionResult.deletedAt = new Date();
        await deletionResult.save();
    }
    catch (error) {
        logger.error('Failed to delete user account', error.stack || error);
        throw new Error('Failed to delete user account');
    }
}
async function getUserById(userId) {
    const user = await userModel.findById(new mongoose_1.default.Types.ObjectId(userId.id));
    return user;
}
const mailTransporter = nodemailer_1.default.createTransport({
    host: config_1.default.email_host,
    port: Number(config_1.default.email_port),
    secure: false,
    auth: {
        user: config_1.default.email_username,
        pass: config_1.default.email_password,
    },
});
//# sourceMappingURL=users.activities.js.map