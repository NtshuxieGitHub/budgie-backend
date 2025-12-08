declare class AuthController {
    sign_in(): Promise<void>;
    sign_up(): Promise<void>;
    googleAuth(): Promise<void>;
    facebookAuth(): Promise<void>;
    appleAuth(): Promise<void>;
}
declare const _default: AuthController;
export default _default;
