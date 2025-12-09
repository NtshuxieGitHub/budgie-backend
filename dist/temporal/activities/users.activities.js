"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivities = void 0;
exports.initializeUserActivities = initializeUserActivities;
exports.createUser = createUser;
exports.sendVerificationEmail = sendVerificationEmail;
exports.verifyUserEmail = verifyUserEmail;
exports.signUserIn = signUserIn;
exports.deleteUserAccount = deleteUserAccount;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const user_schema_1 = require("../../schemas/user.schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const mailer_1 = require("@nestjs-modules/mailer");
const jwt_1 = require("@nestjs/jwt");
let UserActivities = class UserActivities {
    userModel;
    mailService;
    jwtService;
    constructor(userModel, mailService, jwtService) {
        this.userModel = userModel;
        this.mailService = mailService;
        this.jwtService = jwtService;
    }
    async createUser(user) {
        try {
            const hashedUserPassword = await bcrypt_1.default.hash(user.password, 12);
            user.password = hashedUserPassword;
            const newUser = new this.userModel(user);
            return await newUser.save();
        }
        catch (error) {
            console.log('Failed to create new user ', error);
            throw new Error('Failed to create new user');
        }
    }
    async sendVerificationEmail(user) {
        try {
            const verificationCode = this.generateRandomCode();
            const verificationExpiryDate = new Date(Date.now() + 2 * 60 * 1000);
            user.verificationCode = verificationCode;
            user.verificationExpires = verificationExpiryDate;
            await user.save();
            await this.mailService.sendMail({
                to: user.email,
                subject: 'Email Verification Required for your Budgie Account',
                template: './verification_email',
                context: { code: user.verificationCode },
            });
        }
        catch (error) {
            console.log('Failed to send user verification email', error);
            throw new Error('Failed to send user verification email');
        }
    }
    async verifyUserEmail(verificationData) {
        try {
            const { email, code } = verificationData;
            const user = await this.userModel.findOne({ email });
            if (!user)
                throw new Error('User not found.');
            if (user.verified)
                return;
            if (!user.verificationCode || user.verificationCode !== code) {
                throw new Error('Verification code is inavlid or incorrect.');
            }
            if (!user.verificationExpires || user.verificationExpires < new Date()) {
                throw new Error('Verification code has expired.');
            }
            user.verified = true;
            user.verificationCode = null;
            user.verificationExpires = null;
            await user.save();
        }
        catch (error) {
            console.log('Error verifying user email account', error);
            throw new Error('Error verifying user email account');
        }
    }
    async signUserIn(userSignInDetails) {
        try {
            const { id, password } = userSignInDetails;
            const user = await this.userModel.findOne({
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
            const jwtToken = this.jwtService.sign(payload);
            return {
                token: jwtToken,
                data: user,
            };
        }
        catch (error) {
            console.log('Failed to sign user in', error);
            throw new Error('Failed to sign user in');
        }
    }
    async deleteUserAccount(userId) {
        try {
            const deletionResult = await this.userModel.findByIdAndDelete(userId);
            if (!deletionResult)
                throw new Error('User account not found.');
            deletionResult.deletedAt = new Date();
            await deletionResult.save();
        }
        catch (error) {
            console.log('Failed to delete user account', error);
            throw new Error('Failed to delete user account');
        }
    }
    generateRandomCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
};
exports.UserActivities = UserActivities;
exports.UserActivities = UserActivities = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model, mailer_1.MailerService,
        jwt_1.JwtService])
], UserActivities);
let activitiesInstance;
function initializeUserActivities(userModel, mailerService, jwtService) {
    activitiesInstance = new UserActivities(userModel, mailerService, jwtService);
}
async function createUser(user) {
    return activitiesInstance.createUser(user);
}
async function sendVerificationEmail(user) {
    return activitiesInstance.sendVerificationEmail(user);
}
async function verifyUserEmail(data) {
    return activitiesInstance.verifyUserEmail(data);
}
async function signUserIn(userSignInDetails) {
    return activitiesInstance.signUserIn(userSignInDetails);
}
async function deleteUserAccount(userId) {
    return activitiesInstance.deleteUserAccount(userId);
}
//# sourceMappingURL=users.activities.js.map