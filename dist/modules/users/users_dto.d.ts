import { UserDocument } from 'src/schemas/user.schema';
export declare class SignUpDTO {
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    verificationCode: string;
    verificationExpires: Date;
    deletedAt: Date;
}
export declare class UserVerificationDTO {
    email: string;
    code: string;
}
export declare class SignInDTO {
    id: string;
    password: string;
}
export declare class userIdDTO {
    id: string;
}
export declare class signUpWorkflowDTO {
    success: boolean;
    message: string;
    originalUserData?: UserDocument;
    updatedUserData?: UserDocument;
}
export declare class accountVerificationWorkflowDTO {
    success: boolean;
    message: string;
    verificationCode: string;
}
export declare class userAccountDeletionWorkflowDTO {
    success: true;
    message: string;
}
export declare class userSignInWorkflowDTO {
    success: boolean;
    message: string;
    token: string;
    data: UserDocument;
}
