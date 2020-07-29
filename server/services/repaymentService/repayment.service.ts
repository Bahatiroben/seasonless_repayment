import { injectable, inject } from "inversify";
import { IRepaymentServiceInterface } from "./repayment.service.signature";
import { sequelizeInstance } from "../../index";
import { SequelizeInstanceFactory } from "../../database/orms/sequelize/index";
import { IRepayment } from "../interfaces/schemasinterfaces";
import { databaseType } from "../../database/databaseTypes";

@injectable()
export class RepaymentService implements IRepaymentServiceInterface {
  database: SequelizeInstanceFactory;
  repaymentModel: any;

  constructor(@inject(databaseType) database: SequelizeInstanceFactory) {
    this.database = database;
    this.repaymentModel = this.database.models.Repayment;
  }

  async find(where: object = {}): Promise<IRepayment | IRepayment[]> {
    try {
      const result: any = await this.repaymentModel.findAll({ where });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async create(repayment: IRepayment): Promise<IRepayment> {
    try {
      const result: any = await this.repaymentModel.create(repayment);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async bulkCreate(repayments: IRepayment[]): Promise<IRepayment> {
    try {
      const result: any = await this.repaymentModel.bulkCreate(repayments);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(repayment: IRepayment): Promise<IRepayment> {
    try {
      const result: any = await this.repaymentModel.update(repayment);
      return result;
    } catch (error) {
      throw error;
    }
  }
}