import { UserVerificationDTO, SignUpDTO, SignInDTO, userIdDTO } from './users_dto';
import { userAccountDeletionWorkflow } from 'src/temporal/workflows/users/account_deletion.workflow';
import { userSignInWorkflow } from 'src/temporal/workflows/users/sign_in.workflow';
export declare class UserController {
    private client;
    signUp(user: SignUpDTO): Promise<{
        success: string;
        message: string;
        workflowId: string;
    }>;
    verifyEmail(verificationData: UserVerificationDTO): Promise<{
        success: string;
        message: string;
        workflowId: string;
    }>;
    signIn(userSignInDetails: SignInDTO): Promise<import("@temporalio/client").WorkflowHandleWithStartDetails<typeof userSignInWorkflow>>;
    delete(userId: userIdDTO): Promise<import("@temporalio/client").WorkflowHandleWithStartDetails<typeof userAccountDeletionWorkflow>>;
}
