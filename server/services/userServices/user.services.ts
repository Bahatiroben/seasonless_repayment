import { injectable, inject } from "inversify";
import { IUserServiceInterfacee } from "./user.service.signature";
import { sequelizeInstance } from "../../index";
import { SequelizeInstanceFactory } from "../../database/orms/sequelize/index";
import { IUser } from "../interfaces/schemasinterfaces";
import { databaseType } from "../../database/databaseTypes";

@injectable()
export class UserService implements IUserServiceInterfacee {
  database: SequelizeInstanceFactory;
  userModel: any;

  constructor(@inject(databaseType) database: SequelizeInstanceFactory) {
    this.database = database;
    this.userModel = this.database.models.User;
  }

  async find(where: object = {}): Promise<IUser | IUser[]> {
    try {
      const result: any = await this.userModel.findAll({ where });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(user: IUser, where: any): Promise<number[]> {
    try {
      const result: number[] = await this.userModel.update(user, { where });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async create(user: IUser): Promise<IUser> {
    try {
      const result: any = await this.userModel.create(user);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
