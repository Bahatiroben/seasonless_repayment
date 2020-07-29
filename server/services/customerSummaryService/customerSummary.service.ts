import { injectable, inject } from "inversify";
import { ICustomerSummaryServiceInterface } from "./customerSummary.service.signature";
import { sequelizeInstance } from "../../index";
import { SequelizeInstanceFactory } from "../../database/orms/sequelize/index";
import { ICustomerSummary } from "../interfaces/schemasinterfaces";
import { databaseType } from "../../database/databaseTypes";

@injectable()
export class CustomerSummaryService implements ICustomerSummaryServiceInterface {
  database: SequelizeInstanceFactory;
  customerModel: any;

  constructor(@inject(databaseType) database: SequelizeInstanceFactory) {
    this.database = database;
    this.customerModel = this.database.models.CustomerSummary;
  }

  async find(where: object = {}): Promise<ICustomerSummary[]> {
    try {
      const result: any = await this.customerModel.findAll({ where });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async create(customerSummary: ICustomerSummary): Promise<ICustomerSummary> {
    try {
      const result: any = await this.customerModel.create(customerSummary);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async bulkCreate(customerSummaries: ICustomerSummary[]): Promise<ICustomerSummary> {
    try {
      const result: any = await this.customerModel.bulkCreate(customerSummaries);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(customerSummary: ICustomerSummary): Promise<ICustomerSummary> {
    try {
      const result: any = await this.customerModel.update(customerSummary);
      return result;
    } catch (error) {
      throw error;
    }
  }
}