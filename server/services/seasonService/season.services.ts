import { injectable, inject } from "inversify";
import { ISeasonServiceInterface } from "./season.service.signature";
import { sequelizeInstance } from "../../index";
import { SequelizeInstanceFactory } from "../../database/orms/sequelize/index";
import { ISeason } from "../interfaces/schemasinterfaces";
import { databaseType } from "../../database/databaseTypes";

@injectable()
export class SeasonService implements ISeasonServiceInterface {
  database: SequelizeInstanceFactory;
  seasonModel: any;

  constructor(@inject(databaseType) database: SequelizeInstanceFactory) {
    this.database = database;
    this.seasonModel = this.database.models.User;
  }

  async find(where: object = {}): Promise<ISeason | ISeason[]> {
    try {
      const result: any = await this.seasonModel.findAll({ where });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(user: ISeason, where: any): Promise<number[]> {
    try {
      const result: number[] = await this.seasonModel.update(user, { where });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async create(user: ISeason): Promise<ISeason> {
    try {
      const result: any = await this.seasonModel.create(user);
      return result;
    } catch (error) {
      throw error;
    }
  }
}