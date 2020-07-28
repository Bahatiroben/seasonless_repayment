import { Container } from "inversify";
import { SERVICESTYPES } from "../types";
import {
  UserService,
  IUserServiceInterfacee,
} from "../index";

const DServiceContainer = new Container();

DServiceContainer.bind<IUserServiceInterfacee>(SERVICESTYPES.userService).to(
  UserService
);

export default DServiceContainer;
