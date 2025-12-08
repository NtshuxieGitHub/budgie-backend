import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
export declare class User {
    name: {
        type: string;
        required: true;
        minLength: 3;
        maxLength: 20;
    };
    surname: {
        type: string;
        required: true;
        minLength: 3;
        maxLength: 20;
    };
    username: {
        type: string;
        required: true;
        minLength: 3;
        maxLength: 20;
    };
    email: {
        type: string;
        required: true;
        unique: true;
    };
    password: {
        type: string;
        required: true;
        minLength: 6;
        maxLength: 50;
    };
    verified: {
        type: boolean;
        required: true;
        default: false;
    };
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User, any, {}> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
