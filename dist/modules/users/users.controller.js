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
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const users_dto_1 = require("./users_dto");
const client_1 = require("../../temporal/client");
const common_2 = require("@nestjs/common");
const users_service_1 = require("./users.service");
let UserController = UserController_1 = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    client = (0, client_1.getTemporalClient)();
    logger = new common_2.Logger(UserController_1.name, {
        timestamp: true,
    });
    async signUp(user) {
        try {
            return await this.userService.signUp(user);
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
            return await this.userService.verifyEmail(verificationData);
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
            return await this.userService.signIn(userSignInDetails);
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
            return await this.userService.deleteAccount(userId);
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
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UserService])
], UserController);
//# sourceMappingURL=users.controller.js.map