import { ICustomer } from "../interfaces/schemasinterfaces";

export interface ICustomerServiceInterface {
  find(where?: any): Promise<ICustomer | ICustomer[]>;

  create(customer: ICustomer): Promise<ICustomer>;
}
