import { injectable, inject } from "inversify";
import { ICustomerServiceInterface } from "./customer.service.signature";
import { sequelizeInstance } from "../../index";
import { SequelizeInstanceFactory } from "../../database/orms/sequelize/index";
import { ICustomer } from "../interfaces/schemasinterfaces";
import { databaseType } from "../../database/databaseTypes";

@injectable()
export class CustomerService implements ICustomerServiceInterface {
  database: SequelizeInstanceFactory;
  customerModel: any;

  constructor(@inject(databaseType) database: SequelizeInstanceFactory) {
    this.database = database;
    this.customerModel = this.database.models.Customer;
  }

  async find(where: object = {}): Promise<ICustomer | ICustomer[]> {
    try {
      const result: any = await this.customerModel.findAll({ where });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async create(customer: ICustomer): Promise<ICustomer> {
    try {
      const result: any = await this.customerModel.create(customer);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async bulkCreate(customers: ICustomer[]): Promise<ICustomer> {
    try {
      const result: any = await this.customerModel.bulkCreate(customers);
      return result;
    } catch (error) {
      throw error;
    }
  }
}