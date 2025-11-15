import {IUser} from "../../../infradetails/persistence/entity/UserSchema";

export interface IUserInteractor {
    // @ts-ignore
    signUpUser(user:IUser):Promise<void>;
    loginUser(user:IUser):Promise<string>;
    findUser(email:String):Promise<IUser>;
    findAllUser():Promise<IUser[]>;
    updateUser(user:IUser):Promise<void>;
}