import { IRepaymentUpload, IRepaymentError } from "services/interfaces/schemasinterfaces"

export const makeRepaymentError = (repaymentUpload: IRepaymentUpload, reason: string): IRepaymentError => {
    const error: IRepaymentError = {
        message: `repayment of ${repaymentUpload.Amount} from customer ${repaymentUpload.CustomerID} was not successfull`,
        reason: reason
      }
    return error
}