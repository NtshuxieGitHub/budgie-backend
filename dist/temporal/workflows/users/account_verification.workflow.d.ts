import { accountVerificationWorkflowDTO, UserVerificationDTO } from 'src/modules/users/users_dto';
export declare const submitVerificationCodeSignal: import("@temporalio/workflow").SignalDefinition<[UserVerificationDTO], string>;
export declare function accountVerificationWorkflow(verificationCodeData: UserVerificationDTO): Promise<accountVerificationWorkflowDTO>;
