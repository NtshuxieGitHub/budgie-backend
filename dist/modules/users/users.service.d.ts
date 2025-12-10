import { SignUpDTO, UserVerificationDTO, SignInDTO, userIdDTO } from './users_dto';
export declare class UserService {
    private client;
    private readonly logger;
    signUp(user: SignUpDTO): Promise<{
        success: string;
        message: string;
        workflowId: string;
    }>;
    verifyEmail(userVerificationData: UserVerificationDTO): Promise<{
        success: string;
        message: string;
        workflowId: string;
    }>;
    signIn(userSignInDetails: SignInDTO): Promise<{
        token: string;
        data: import("../../schemas/user.schema").UserDocument;
    }>;
    deleteAccount(userId: userIdDTO): Promise<{
        success: string;
        message: string;
    }>;
}
