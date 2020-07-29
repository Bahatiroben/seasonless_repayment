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
        const customerSummaries: ICustomerSummary[] = await this.customerSummaryService.find({CustomerID});
        // start with the overide where SeasonID is specified by the user
        if(SeasonID) {
          try {
          const customerSummaries: ICustomerSummary[] = await this.customerSummaryService.find({CustomerID, SeasonID });
          if(customerSummaries && customerSummaries[0]) {
            // if the cutomer summary does exist (the specified user has  purchased something in the specified season)
            // update the customer Summary
            const customerSummary = customerSummaries[0];
            customerSummary.TotalRepaid = customerSummary.TotalRepaid + repaymentUpload.Amount;
            const re = await this.customerSummaryService.update((customerSummary as any).dataValues, { CustomerID, SeasonID });
            console.log(re)
            // make the repayment record (remember only 1 record for overide);
            const repaymentRecord: IRepayment = {
              CustomerID: repaymentUpload.CustomerID,
              SeasonID: repaymentUpload.SeasonID,
              Date: repaymentUpload.Date,
              Amount: repaymentUpload.Amount,
            }

            await this.repaymentService.create(repaymentRecord)
          } else {
            // if no re purchases of the specified customer in that season create an error for that record
            const error = makeRepaymentError(repaymentUpload);
            repaymentErrors.push(error);
          }
        }catch(err) {
          const error = makeRepaymentError(repaymentUpload);
          repaymentErrors.push(error);
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
