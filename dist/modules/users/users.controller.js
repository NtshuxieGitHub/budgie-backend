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
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const users_dto_1 = require("./users_dto");
const config_1 = __importDefault(require("../../config/config"));
const user_sign_up_workflow_1 = require("../../temporal/workflows/users/user_sign_up.workflow");
const account_deletion_workflow_1 = require("../../temporal/workflows/users/account_deletion.workflow");
const sign_in_workflow_1 = require("../../temporal/workflows/users/sign_in.workflow");
const client_1 = require("../../temporal/client");
const account_verification_workflow_1 = require("../../temporal/workflows/users/account_verification.workflow");
const common_2 = require("@nestjs/common");
let UserController = UserController_1 = class UserController {
    client = (0, client_1.getTemporalClient)();
    logger = new common_2.Logger(UserController_1.name, {
        timestamp: true,
    });
    async signUp(user) {
        try {
            const workflowId = `${user.email}_${Date.now()}`;
            this.logger.log('Workflow Id: ', workflowId);
            const handle = await this.client.workflow.start(user_sign_up_workflow_1.userSignUpWorkflow, {
                taskQueue: config_1.default.task_queue_name,
                workflowId: workflowId,
                args: [user],
            });
            return {
                success: 'OK',
                message: 'User created successfully! Check your email to verify your account',
                workflowId: handle.workflowId,
            };
        }
        catch (error) {
            this.logger.log('Failed to sign in: ', error);
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Failed to sign up.',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error,
            });
        }
    }
    async verifyEmail(verificationData) {
        try {
            const workflowId = `${verificationData.code}_${Date.now()}`;
            const handle = await this.client.workflow.start(account_verification_workflow_1.accountVerificationWorkflow, {
                taskQueue: config_1.default.task_queue_name,
                workflowId: workflowId,
                args: [verificationData],
            });
            return {
                success: 'OK',
                message: 'Verification code submitted. Your account will be verified shortly.',
                workflowId: handle.workflowId,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Failed to verify user email account.',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error,
            });
        }
    }
    async signIn(userSignInDetails) {
        try {
            const signInResult = await (0, client_1.getTemporalClient)().workflow.start(sign_in_workflow_1.userSignInWorkflow, {
                taskQueue: config_1.default.task_queue_name,
                workflowId: userSignInDetails.id,
                args: [userSignInDetails],
            });
            return signInResult;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Failed to sign-in.',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error,
            });
        }
    }
    async delete(userId) {
        try {
            const accountDeletionResult = await (0, client_1.getTemporalClient)().workflow.start(account_deletion_workflow_1.userAccountDeletionWorkflow, {
                taskQueue: config_1.default.task_queue_name,
                workflowId: userId.id,
                args: [userId],
            });
            return accountDeletionResult;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Failed to delete user account.',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error,
            });
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('sign-up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.SignUpDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('verify-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UserVerificationDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Get)('sign-in'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.SignInDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signIn", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.userIdDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
exports.UserController = UserController = UserController_1 = __decorate([
    (0, common_1.Controller)('users')
], UserController);
//# sourceMappingURL=users.controller.js.map