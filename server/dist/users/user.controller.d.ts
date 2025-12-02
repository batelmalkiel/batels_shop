import { UsersService } from './user.service';
import { User } from './user.entity';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getMe(user: User): {
        user: User;
    };
    updateMe(user: User, updateData: Partial<User>): Promise<{
        message: string;
        user: User;
    }>;
}
