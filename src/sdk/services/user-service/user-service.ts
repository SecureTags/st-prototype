import { User } from "../../proxies/user/user";

export interface UserService
{
    fetchUserData(userId: string): Promise<User>;
    checkIfUserExist(userId: string): Promise<boolean>;
}