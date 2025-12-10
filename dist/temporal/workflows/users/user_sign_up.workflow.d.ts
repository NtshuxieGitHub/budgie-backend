import { SignUpDTO, signUpWorkflowDTO, UserVerificationDTO } from 'src/modules/users/users_dto';
export declare const verificationCodeSignal: import("@temporalio/workflow").SignalDefinition<[UserVerificationDTO], string>;
export declare function userSignUpWorkflow(user: SignUpDTO): Promise<signUpWorkflowDTO>;
