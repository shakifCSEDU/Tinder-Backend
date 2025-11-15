import {inject, injectable} from "inversify";
import {IUserInteractor} from "../IUserInteractor";
import {IUser} from "../../../../infradetails/persistence/entity/UserSchema";
import {IUserRepository} from "../../../../infradetails/persistence/repository/IUserRepository";
import {INTERFACE_TYPE} from "../../../../infrastructure/utils/AppConst";
import bcrypt from "bcrypt";
import {Error} from "mongoose";

@injectable()
export class UserInteractor implements IUserInteractor {
    private readonly userRepository: IUserRepository;

    constructor(@inject(INTERFACE_TYPE.UserRepository) userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async updateUser(user: IUser): Promise<void> {
        this.userRepository.updateUser(user);
    }

    findAllUser(): Promise<IUser[]> {
        return this.userRepository.findAllUser();
    }

    // @ts-ignore
    async findUser(email: String): Promise<IUser[]> {
        const user:IUser = await this.userRepository.findUser(email);
        if(!user){
            throw new Error("No user found with email");
        }
        return user;
    }

    // @ts-ignore
    async signUpUser(user: IUser):Promise<void> {
        console.log("+++ User Interactor called +++");
        const password:string = user.password;
        user.password = await bcrypt.hash(password, 10);
        await this.userRepository.signUpUser(user);
        console.log("User saved successfully:", user.email);
    }

    // @ts-ignore
    async loginUser(user: IUser): Promise<string> {
        console.log("+++ User Login called +++");
        // @ts-ignore
        const dbUser: IUser = await this.userRepository.findUser(user.email);
        if (!dbUser) throw new Error("Invalid Credentials");

        const isPasswordValid: boolean = await bcrypt.compare(user.password, dbUser.password);
        if (isPasswordValid) {
            return "Login successfully";
        } else
            return "Invalid Credentials";
    }
}
