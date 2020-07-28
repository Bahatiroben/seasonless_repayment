import {Request, Response, NextFunction} from 'express'
import { IUser, ILoginUser } from 'services/interfaces/schemasinterfaces'
import * as joi from 'joi';
import validate from '../utils/validator';
import { userSignupSchema, userLoginSchema } from './schemas/userSchema';

export class UserValidations {
    static signup(req: Request, res: Response, next: NextFunction) {
        const userCredentials: IUser = req.body;
        validate(userCredentials, userSignupSchema, res, next);
    }

    static login(req: Request, res: Response, next: NextFunction) {
        const userCredentials: ILoginUser = req.body;
        validate(userCredentials, userLoginSchema, res, next);
    }
}