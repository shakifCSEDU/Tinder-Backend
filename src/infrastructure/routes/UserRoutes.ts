import express, {Router} from "express";
import {INTERFACE_TYPE} from "../utils/AppConst";
import {UserController} from "./UserController";
import {container} from "../configuration/Config";

export class UserRoutes {
    private readonly router: Router;
    private readonly userController: UserController;

    constructor() {
        this.router = express.Router();
        this.userController = container.get<UserController>(INTERFACE_TYPE.UserController);
        this.registerRoutes();
    }

    private registerRoutes(): void {
        // @ts-ignore
        this.router.post("/signup", this.userController.onUserSignUp.bind(this.userController));
        // @ts-ignore
        this.router.post("/login", this.userController.onUserLogin.bind(this.userController));
        // @ts-ignore
        this.router.get("/user", this.userController.onFindUser.bind(this.userController));
        // @ts-ignore
        this.router.get("/feed", this.userController.onFindAllUser.bind(this.userController));
        // @ts-ignore
        this.router.patch("/user", this.userController.onUpdateUser.bind(this.userController));
    }

    public getRouter(): Router {
        return this.router;
    }
}
