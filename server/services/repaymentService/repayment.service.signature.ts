import { IRepayment } from "../interfaces/schemasinterfaces";

export interface IRepaymentServiceInterface {
  find(where?: any): Promise<IRepayment | IRepayment[]>;

  create(repayment: IRepayment): Promise<IRepayment>;

  update(repayment: IRepayment): Promise<IRepayment>
}
