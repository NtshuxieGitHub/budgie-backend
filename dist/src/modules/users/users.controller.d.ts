import { UserService } from './users.service';
import { UserInterface } from './types';
import { User } from 'src/schemas/user.schema';
export declare class UserController {
    private usersService;
    constructor(usersService: UserService);
    signUp(user: UserInterface): Promise<User>;
    signIn(): Promise<void>;
    patch(): Promise<void>;
    delete(): Promise<void>;
}
