import { Container } from "inversify";
import {UserController} from "../routes/UserController";
import {INTERFACE_TYPE} from "../utils/AppConst";
import {IUserInteractor} from "../../core/domain/usecase/IUserInteractor";
import {UserInteractor} from "../../core/domain/usecase/impl/UserInteractor"
import {IUserRepository} from "../../infradetails/persistence/repository/IUserRepository";
import {UserRepository} from "../../infradetails/persistence/repository/impl/UserRepository";

const container = new Container();

container.bind<UserController>(INTERFACE_TYPE.UserController).to(UserController);
container.bind<IUserInteractor>(INTERFACE_TYPE.UserInteractor).to(UserInteractor);
container.bind<IUserRepository>(INTERFACE_TYPE.UserRepository).to(UserRepository);

export { container };
