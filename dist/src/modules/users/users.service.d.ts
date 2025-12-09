import mongoose from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { SignInDTO, SignUpDTO, UserVerifcationDTO, userIdDTO } from './users_dto';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private userModel;
    private mailService;
    private jwtService;
    constructor(userModel: mongoose.Model<User>, mailService: MailerService, jwtService: JwtService);
    createUser(user: SignUpDTO): Promise<UserDocument>;
    sendVerificationEmail(user: UserDocument): Promise<void>;
    verifyUserEmail(verificationData: UserVerifcationDTO): Promise<void>;
    signUserIn(userSignInDetails: SignInDTO): Promise<{
        token: string;
        data: UserDocument;
    }>;
    deleteUserAccount(userId: userIdDTO): Promise<void>;
    private generateRandomCode;
}
