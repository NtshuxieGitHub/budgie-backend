import { UserService } from './users.service';
import { UserDocument } from 'src/schemas/user.schema';
import { UserVerifcationDTO, SignUpDTO, SignInDTO, userIdDTO } from './users_dto';
export declare class UserController {
    private usersService;
    constructor(usersService: UserService);
    signUp(user: SignUpDTO): Promise<{
        success: string;
        message: string;
        data: UserDocument;
    }>;
    verifyEmail(verificationData: UserVerifcationDTO): Promise<{
        success: string;
        message: string;
    }>;
    signIn(userSignInDetails: SignInDTO): Promise<{
        success: string;
        message: string;
        data: UserDocument;
        token: string;
    }>;
    delete(userId: userIdDTO): Promise<{
        success: string;
        message: string;
    }>;
}
