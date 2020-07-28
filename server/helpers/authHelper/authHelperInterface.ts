import { IUser } from "services/interfaces/schemasinterfaces";
import { Request, Response, NextFunction } from "express";

export interface IAuthHelper {

    encrypt: (payload: IUser) => string

    decrypt: (req: Request, res: Response) => Promise<IUser | any>
    
}