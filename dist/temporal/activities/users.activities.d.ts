import { Model } from 'mongoose';
import { UserDocument } from '../../schemas/user.schema';
import { SignInDTO, SignUpDTO, UserVerificationDTO, userIdDTO } from '../../modules/users/users_dto';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
export declare class UserActivities {
    private userModel;
    private mailService;
    private jwtService;
    private readonly logger;
    constructor(userModel: Model<UserDocument>, mailService: MailerService, jwtService: JwtService);
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
