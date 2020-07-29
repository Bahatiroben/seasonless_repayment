import { ICustomerServiceInterface,
  ICustomerSummaryServiceInterface,
  IRepaymentServiceInterface,
  IRepaymentUploadServiceInterface,
  RepaymentService,RepaymentUploadService,
  CustomerService,CustomerSummaryService
 } from "../../services/index";

import { SERVICESTYPES } from "../../services/types";
import {
  httpPost,
  controller,
  httpGet,
} from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import { ICustomerSummary, IRepaymentUpload, IRepaymentError, IRepayment } from "services/interfaces/schemasinterfaces";
import { IResponse } from "../../helpers/responseHelper/reponseInterface";
import { responseType } from "../../helpers/responseHelper/responseTypes";
import { makeRepaymentError } from '../utils/repaymentError'

@controller("/repayments-upload")
export class RepaymentUploadController {

  @inject(SERVICESTYPES.customerSummaryService)
  protected customerSummaryService: ICustomerSummaryServiceInterface;

  @inject(responseType)
  protected CustomResponse: IResponse;

  @inject(SERVICESTYPES.repaymentService)
  protected repaymentService: IRepaymentServiceInterface

  @httpPost("/") //insert the middlewares for validations and a middleware to parse an excell file // no auth needed
  async uploadRepayments(req: Request, res: Response): Promise<Response> {
    try {

      const repaymentsUploads: IRepaymentUpload[] = (req as any).repaymentsUpload || req.body;
      const repaymentErrors: IRepaymentError[] = [];
      await Promise.all(
      repaymentsUploads.map(async repaymentUpload => {
        // TODO get all customer summaries with debts (repaid < credit) and belongs to each specific client
        const { CustomerID, SeasonID } = repaymentUpload
        // start with the overide where SeasonID is specified by the user
        if(SeasonID) {
          try {
          const customerSummaries: ICustomerSummary[] = await this.customerSummaryService.find({CustomerID, SeasonID });
          if(customerSummaries && customerSummaries[0]) {
            // if the cutomer summary does exist (the specified user has  purchased something in the specified season)
            // update the customer Summary
            const customerSummary = customerSummaries[0];
            customerSummary.TotalRepaid = customerSummary.TotalRepaid + repaymentUpload.Amount;
            this.customerSummaryService.update((customerSummary as any).dataValues, { CustomerID, SeasonID });
            // make the repayment record (remember only 1 record for overide);
            const repaymentRecord: IRepayment = {
              CustomerID: repaymentUpload.CustomerID,
              SeasonID: repaymentUpload.SeasonID,
              Date: repaymentUpload.Date,
              Amount: repaymentUpload.Amount,
            }

            const record = await this.repaymentService.create(repaymentRecord);
          } else {
            // if no re purchases of the specified customer in that season create an error for that record
            const reason = `Customer ${repaymentUpload.CustomerID} has made no credit puschases in season ${repaymentUpload.SeasonID}`
            const error = makeRepaymentError(repaymentUpload, reason);
            repaymentErrors.push(error);
          }
        }catch(err) {
          const error = makeRepaymentError(repaymentUpload, err.message || err);
          repaymentErrors.push(error);
        }
        } else {
          const currentRepaymentUpload: IRepaymentUpload = {...repaymentUpload}
          // the seasonID is not specified
          const customerSummaries: ICustomerSummary[] = await this.customerSummaryService.find({CustomerID}); // assumes that this array is sorted by startDate from the oldest[0] to the newest[n-1] 
          // perform the transaction for the first 
          const oldestCustomerSummary: ICustomerSummary = (customerSummaries.shift() as any).dataValues;
          // get the credits



          const { Credit, TotalRepaid } = oldestCustomerSummary;
          // if there are no more entries (it means we either check if it is an overPay and apply a single positive (adjustment))
          if(customerSummaries.length === 0) {
            // update the oldest customer summary with the ammount
            oldestCustomerSummary.TotalRepaid = oldestCustomerSummary.TotalRepaid + currentRepaymentUpload.Amount;
            const repaymentRecords: IRepayment[] = [];

            if((!(TotalRepaid < Credit)) || ((Credit - currentRepaymentUpload.Amount) >=0)) {
              // if credit is currently fully or over paid, or will get fully or over paid after applying the payment
              const repaymentRecord: IRepayment = {
                CustomerID: currentRepaymentUpload.CustomerID,
                SeasonID: oldestCustomerSummary.SeasonID,
                Date: currentRepaymentUpload.Date,
                Amount: currentRepaymentUpload.Amount,
              }
              repaymentRecords.push(repaymentRecord);
              // const record = await this.repaymentService.create(repaymentRecord)
              // save the updated oldest customer summary (where the customer )
              this.customerSummaryService.update(oldestCustomerSummary, {CustomerID: currentRepaymentUpload.CustomerID, SeasonID: oldestCustomerSummary.SeasonID});
            } else {
              // total repaid is less than credit before and after applying the payment
              

            }
          } else {
            // await Promise.all(repaymentsUploads.map((repaymentUpload) => {
            //   while(repaymentUpload.Amount > 0) {
            //     // all logic should be here
            //     if(!customerSummaries[1]) {
            //       // if there is only one record, it means that it is either an overpay
            //     }
            //   }
            // }))
          }
        }

      }));

      return this.CustomResponse.success(
        res,
        {errors: repaymentErrors},
        repaymentErrors[0] ? 'Repayments applied with errors': 'Repayments applied without errors',
      );
    } catch (error) {
      throw error;
    }
  }
}
