import { UserDocument } from '../../schemas/user.schema';
import { SignInDTO, SignUpDTO, UserVerificationDTO, userIdDTO } from '../../modules/users/users_dto';
export declare function createUser(user: SignUpDTO): Promise<UserDocument>;
export declare function sendVerificationEmail(userId: userIdDTO): Promise<UserDocument>;
export declare function verifyUserEmail(verificationData: UserVerificationDTO): Promise<UserDocument>;
export declare function signUserIn(userSignInDetails: SignInDTO): Promise<{
    token: string;
    data: UserDocument;
}>;
export declare function deleteUserAccount(userId: userIdDTO): Promise<void>;
export declare function getUserById(userId: userIdDTO): Promise<UserDocument | null>;
