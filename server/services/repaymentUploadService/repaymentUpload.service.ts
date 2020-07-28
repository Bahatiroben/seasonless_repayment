import { injectable, inject } from "inversify";
import { IRepaymentUploadServiceInterface } from "./repaymentUpload.service.signature";
import { sequelizeInstance } from "../../index";
import { SequelizeInstanceFactory } from "../../database/orms/sequelize/index";
import { IRepaymentUpload } from "../interfaces/schemasinterfaces";
import { databaseType } from "../../database/databaseTypes";

@injectable()
export class RepaymentUploadService implements IRepaymentUploadServiceInterface {
  database: SequelizeInstanceFactory;
  repaymentUploadModel: any;

  constructor(@inject(databaseType) database: SequelizeInstanceFactory) {
    this.database = database;
    this.repaymentUploadModel = this.database.models.RepaymentUpload;
  }

  async find(where: object = {}): Promise<IRepaymentUpload | IRepaymentUpload[]> {
    try {
      const result: any = await this.repaymentUploadModel.findAll({ where });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async create(repaymentUpload: IRepaymentUpload): Promise<IRepaymentUpload> {
    try {
      const result: any = await this.repaymentUploadModel.create(repaymentUpload);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(repaymentUpload: IRepaymentUpload): Promise<IRepaymentUpload> {
    try {
      const result: any = await this.repaymentUploadModel.update(repaymentUpload);
      return result;
    } catch (error) {
      throw error;
    }
  }
}