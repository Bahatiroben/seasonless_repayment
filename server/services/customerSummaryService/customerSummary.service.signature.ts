import { ICustomerSummary } from "../interfaces/schemasinterfaces";

export interface ICustomerSummaryServiceInterface {
  find(where?: any): Promise<ICustomerSummary[]>;

  create(customerSummary: ICustomerSummary): Promise<ICustomerSummary>;

  bulkCreate(customerSummaries: ICustomerSummary[]): Promise<ICustomerSummary>;

  update(customerSummary: ICustomerSummary): Promise<ICustomerSummary>
}
