import { IRepaymentUpload } from "../interfaces/schemasinterfaces";

export interface IRepaymentUploadServiceInterface {
  find(where?: any): Promise<IRepaymentUpload | IRepaymentUpload[]>;

  create(repaymentUpload: IRepaymentUpload): Promise<IRepaymentUpload>;

  update(repaymentUpload: IRepaymentUpload): Promise<IRepaymentUpload>
}
