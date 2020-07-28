import { UserService, IUserServiceInterfacee } from "../../services/index";
import { SERVICESTYPES } from "../../services/types";
import {
  httpGet,
  httpPost,
  httpPatch,
  controller,
} from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import { IUser, ILoginUser } from "services/interfaces/schemasinterfaces";
import { IResponse } from "../../helpers/responseHelper/reponseInterface";
import { responseType } from "../../helpers/responseHelper/responseTypes";
import { IPassword, passwordType } from "../../helpers/passwordHelper/index";
import { IAuthHelper, authType } from "../../helpers/authHelper/index";
import { UserValidations } from '../../validations/userValidations'

@controller("/user")
export class UserController {
  @inject(SERVICESTYPES.userService)
  protected userService: IUserServiceInterfacee;

  @inject(responseType)
  protected CustomResponse: IResponse;

  @inject(passwordType)
  protected PasswordHelper: IPassword;

  @inject(authType)
  protected AuthencticationHelper: IAuthHelper;

  @httpPost("/signup", UserValidations.signup)
  async signup(req: Request, res: Response): Promise<Response> {
    try {
      const userCredentials: IUser = req.body;
      const result = <IUser[]>(
        await this.userService.find({ email: userCredentials.email })
      );

      if (result.length !== 0) {
        return this.CustomResponse.conflict(res, "email already registered");
      }

      // hash password
      const hashedPassword: string = await this.PasswordHelper.encrypt(
        userCredentials.password
      );
      userCredentials.password = hashedPassword;

      // create token
      const token = this.AuthencticationHelper.encrypt(userCredentials);
      const createdUser = await this.userService.create(userCredentials);
      delete createdUser.password;
      return this.CustomResponse.success(
        res,
        { createdUser, token },
        "user created successfully",
        201
      );
    } catch (error) {
      throw error;
    }
  }

  @httpPost('/signin', UserValidations.login)
  async signin(req: Request, res: Response) {
    try {
      const userCredentials: ILoginUser = req.body;
      const result = <any[]> await this.userService.find({ email: userCredentials.email })

      if (result.length === 0) {
        return this.CustomResponse.notFound(res, "user not registered");
      }
      // hash password
      const passwordMatch: boolean = await this.PasswordHelper.decrypt(result[0].password, userCredentials.password);
      if(!passwordMatch) {
        return this.CustomResponse.forbidden(res, "Incorrect password");
      }

      delete result[0].password;
      // create token
      const token = this.AuthencticationHelper.encrypt(result[0].dataValues);
      return this.CustomResponse.success(
        res,
        { token },
        "logged in successfully"
      );
    } catch (error) {
      throw error;
    }
  }
}
