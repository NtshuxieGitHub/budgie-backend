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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_dto_1 = require("./users_dto");
let UserController = class UserController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async signUp(user) {
        const newUser = await this.usersService.createUser(user);
        await this.usersService.sendVerificationEmail(newUser);
        return {
            success: 'OK',
            message: 'User created successfully! Check your email to verify your account',
            data: newUser,
        };
    }
    async verifyEmail(verificationData) {
        await this.usersService.verifyUserEmail(verificationData);
        return {
            success: 'OK',
            message: 'Email verified successfully',
        };
    }
    async signIn(userSignInDetails) {
        const signInResult = await this.usersService.signUserIn(userSignInDetails);
        return {
            success: 'OK',
            message: 'User signed in successfully',
            data: signInResult.data,
            token: signInResult.token,
        };
    }
    async delete(userId) {
        await this.usersService.deleteUserAccount(userId);
        return {
            success: 'OK',
            message: 'User account deleted successfully',
        };
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
    (0, common_1.Post)('verify-emai'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UserVerifcationDTO]),
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
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UserService])
], UserController);
//# sourceMappingURL=users.controller.js.map