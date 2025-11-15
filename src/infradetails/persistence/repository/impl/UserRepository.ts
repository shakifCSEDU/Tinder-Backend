import {IUser, UserModel} from "../../entity/UserSchema";
import {IUserRepository} from "../IUserRepository";
import {injectable} from "inversify";

@injectable()
export class UserRepository implements IUserRepository {
   async updateUser(user: IUser): Promise<void> {
        await UserModel.findByIdAndUpdate({_id: user._id},user);
    }

    findAllUser(): Promise<IUser[]> {
        return UserModel.find({});
    }

    async signUpUser(user: IUser): Promise<void> {
         await user.save();
    }

    async findUser(email: String): Promise<IUser> {
        const user:IUser = await UserModel.findOne({email:email});
        return user;
    }
}