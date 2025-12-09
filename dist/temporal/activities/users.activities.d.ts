import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { SignInDTO, SignUpDTO, UserVerificationDTO, userIdDTO } from '../../modules/users/users_dto';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
export declare class UserActivities {
    private userModel;
    private mailService;
    private jwtService;
    constructor(userModel: mongoose.Model<UserDocument>, mailService: MailerService, jwtService: JwtService);
    createUser(user: SignUpDTO): Promise<UserDocument>;
    sendVerificationEmail(user: UserDocument): Promise<void>;
    verifyUserEmail(verificationData: UserVerificationDTO): Promise<void>;
    signUserIn(userSignInDetails: SignInDTO): Promise<{
        token: string;
        data: UserDocument;
    }>;
    deleteUserAccount(userId: userIdDTO): Promise<void>;
    private generateRandomCode;
}
export declare function initializeUserActivities(userModel: Model<UserDocument>, mailerService: MailerService, jwtService: JwtService): void;
export declare function createUser(user: SignUpDTO): Promise<mongoose.Document<unknown, {}, User, {}, {}> & User & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare function sendVerificationEmail(user: UserDocument): Promise<void>;
export declare function verifyUserEmail(data: UserVerificationDTO): Promise<void>;
export declare function signUserIn(userSignInDetails: SignInDTO): Promise<{
    token: string;
    data: UserDocument;
}>;
export declare function deleteUserAccount(userId: userIdDTO): Promise<void>;
