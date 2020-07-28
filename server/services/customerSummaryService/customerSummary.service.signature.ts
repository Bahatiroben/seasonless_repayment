import { ICustomerSummary } from "../interfaces/schemasinterfaces";

export interface ICustomerSummaryServiceInterface {
  find(where?: any): Promise<ICustomerSummary | ICustomerSummary[]>;

  create(customerSummary: ICustomerSummary): Promise<ICustomerSummary>;

  update(customerSummary: ICustomerSummary): Promise<ICustomerSummary>
}
