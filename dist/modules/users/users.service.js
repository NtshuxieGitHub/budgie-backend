"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = __importDefault(require("../../config/config"));
const client_1 = require("../../temporal/client");
const user_sign_up_workflow_1 = require("../../temporal/workflows/users/user_sign_up.workflow");
const account_verification_workflow_1 = require("../../temporal/workflows/users/account_verification.workflow");
const account_deletion_workflow_1 = require("../../temporal/workflows/users/account_deletion.workflow");
const users_activities_1 = require("../../temporal/activities/users.activities");
let UserService = UserService_1 = class UserService {
    client = (0, client_1.getTemporalClient)();
    logger = new common_1.Logger(UserService_1.name, {
        timestamp: true,
    });
    async signUp(user) {
        try {
            const workflowId = `signup:${user.email}_${Date.now()}`;
            const handle = await this.client.workflow.start(user_sign_up_workflow_1.userSignUpWorkflow, {
                taskQueue: config_1.default.task_queue_name,
                workflowId,
                args: [user],
            });
            return {
                success: 'OK',
                message: 'User created. Check email for verification.',
                workflowId: handle.workflowId,
            };
        }
        catch (error) {
            this.logger.log('Failed to sign up', error);
            throw new Error('Failed to sign up');
        }
    }
    async verifyEmail(userVerificationData) {
        try {
            const workflowId = `verify:${userVerificationData.email}-${userVerificationData.code}`;
            await this.client.workflow.start(account_verification_workflow_1.accountVerificationWorkflow, {
                taskQueue: config_1.default.task_queue_name,
                workflowId,
                args: [userVerificationData],
            });
            return {
                success: 'OK',
                message: 'Verification in progress.',
                workflowId,
            };
        }
        catch (error) {
            this.logger.log('Failed to verify user email account', error);
            throw new Error('Failed to verify user email account');
        }
    }
    async signIn(userSignInDetails) {
        try {
            return (0, users_activities_1.signUserIn)(userSignInDetails);
        }
        catch (error) {
            this.logger.log('Failed to sign user in', error);
            throw new Error('Failed to sign user in');
        }
    }
    async deleteAccount(userId) {
        try {
            const workflowId = `delete:${userId.id}`;
            await this.client.workflow.start(account_deletion_workflow_1.userAccountDeletionWorkflow, {
                taskQueue: config_1.default.task_queue_name,
                workflowId,
                args: [userId],
            });
            return {
                success: 'OK',
                message: 'Account deletion scheduled.',
            };
        }
        catch (error) {
            this.logger.log('Failed to delete user account', error);
            throw new Error('Failed to delete user account');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=users.service.js.map