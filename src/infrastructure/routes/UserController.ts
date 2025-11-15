import {injectable} from "inversify";
import {IUserInteractor} from "../../core/domain/usecase/IUserInteractor";
import {inject} from "inversify";
import {INTERFACE_TYPE} from "../utils/AppConst";
import {NextFunction} from "express";
import {IUser, UserModel} from "../../infradetails/persistence/entity/UserSchema";

@injectable()
export class UserController {
    private readonly userInteractor: IUserInteractor;

    constructor(@inject(INTERFACE_TYPE.UserInteractor) userInteractor: IUserInteractor) {
        this.userInteractor = userInteractor;
    }

    async onUserSignUp(req: Request, res: Response, next: NextFunction):Promise<void> {
        try {
            // @ts-ignore
            const user:IUser = new UserModel(req.body);
            await this.userInteractor.signUpUser(user);
            // @ts-ignore
            res.status(201).send("User signed up successfully");
        } catch (err) {
            // @ts-ignore
            res.status(400).send("Error: "+err);
        }
    }
    async onUserLogin(req: Request, res: Response, next: NextFunction):Promise<void> {
        try {
            // @ts-ignore
            const user:IUser = new UserModel(req.body);
            const result:string =  await this.userInteractor.loginUser(user);
            // @ts-ignore
            res.status(200).send(result);
        } catch (err) {
            // @ts-ignore
            res.status(400).send("Error: "+err);
        }
    }

    // @ts-ignore
    async onFindUser(req: Request, res: Response, next: NextFunction):Promise<IUser[]> {
        try {
            // @ts-ignore
            const email:String = req.body.email;
            const user:IUser = await this.userInteractor.findUser(email);
            // @ts-ignore
            res.status(200).send(user);
        } catch (err) {
            // @ts-ignore
            res.status(400).send("Something went wrong : "+err);
        }
    }

    // @ts-ignore
    async onFindAllUser(req: Request, res: Response, next: NextFunction):Promise<IUser[]> {
        try {
            const users:IUser[] =  await this.userInteractor.findAllUser();
            // @ts-ignore
            res.status(200).send(users);
        } catch (err) {
            // @ts-ignore
            res.status(400).send("Something went wrong : "+err);
        }
    }

    // @ts-ignore
    async onUpdateUser(req: Request, res: Response, next: NextFunction):Promise<IUser> {
        try {
            // @ts-ignore
            // const userId:any = req.body.userId;
            // const data:any = req.body;
            const users:IUser =  await this.userInteractor.updateUser(user);
            // @ts-ignore
            res.status(200).send("User updated successfully");
        } catch (err) {
            // @ts-ignore
            res.status(400).send("Something went wrong : "+err);
        }
    }
}