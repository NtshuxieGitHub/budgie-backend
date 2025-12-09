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
export declare class UserVerifcationDTO {
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
