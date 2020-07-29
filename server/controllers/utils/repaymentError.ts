import { IRepaymentUpload, IRepaymentError } from "services/interfaces/schemasinterfaces"

export const makeRepaymentError = (repaymentUpload: IRepaymentUpload): IRepaymentError => {
    const error: IRepaymentError = {
        message: `repayment of ${repaymentUpload.Amount} from customer ${repaymentUpload.CustomerID} was not successfull`,
        reason: `Customer ${repaymentUpload.CustomerID} has made on credit puschases in season ${repaymentUpload.SeasonID}`
      }
    return error
}