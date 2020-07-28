import { Request, Response, NextFunction } from "express";
import { IAuthHelper } from "./authHelperInterface";
import { IUser, ILoginUser } from "services/interfaces/schemasinterfaces";
import { sign, verify } from "jsonwebtoken";
import * as Config from "../../configVars";
import { inject, injectable } from "inversify";
import { IUserServiceInterfacee } from "../../services/index";
import { SERVICESTYPES } from "../../services/types";
import { IResponse, responseType } from "../responseHelper/index";

@injectable()
export class Authentication implements IAuthHelper {
  @inject(SERVICESTYPES.userService)
  protected UserService: IUserServiceInterfacee;

  @inject(responseType)
  protected CustomResponse: IResponse;

  encrypt(payload: IUser | ILoginUser): string {
    const token: string = sign(payload, Config.JWT_SECRET);
    return token;
  }

  async decrypt(req: Request, res: Response): Promise<IUser | any>  {
    try {
      const authorization: string = req.headers.authorization;
      if (!authorization) {
        return this.CustomResponse.unAuthorized(res);
      }

      const token = authorization.split(" ")[1];
      if (!token) {
        return this.CustomResponse.unAuthorized(res, "token not found");
      }

      // verify
      const payload = <IUser>verify(token, Config.JWT_SECRET);
      const { email } = payload;
      const User = <IUser[]>await this.UserService.find({ email });
      const { email: fetchedEmail } = User[0];
      if (!fetchedEmail) {
        // if no user found
        return this.CustomResponse.unAuthorized(res);
      }
      return payload
    } catch (error) {
      throw error;
    }
  }
}
