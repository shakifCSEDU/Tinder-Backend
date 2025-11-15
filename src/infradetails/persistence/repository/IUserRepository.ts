import {IUser} from "../entity/UserSchema";

export interface IUserRepository {
    signUpUser(user:IUser):Promise<void>;
    findUser(email: String): Promise<IUser>;
    findAllUser(): Promise<IUser[]>;
    updateUser(user:IUser):Promise<void>;
}