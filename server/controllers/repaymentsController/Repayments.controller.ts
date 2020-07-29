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
import { ICustomerSummary, IRepaymentUpload } from "services/interfaces/schemasinterfaces";
import { IResponse } from "../../helpers/responseHelper/reponseInterface";
import { responseType } from "../../helpers/responseHelper/responseTypes";
import { promises } from "dns";

@controller("/repayments-upload")
export class RepaymentUploadController {

  @inject(SERVICESTYPES.customerSummaryService)
  protected customerSummaryService: ICustomerSummaryServiceInterface;

  @inject(responseType)
  protected CustomResponse: IResponse;

  @httpPost("/") //insert the middlewares for validations and a middleware to parse an excell file // no auth needed
  async uploadRepayments(req: Request, res: Response): Promise<Response> {
    try {

      const repaymentsUploads: IRepaymentUpload[] = (req as any).repaymentsUpload || req.body;

      await Promise.all(
      repaymentsUploads.map(async repaymentUpload => {
        // TODO get all customer summaries with debts (repaid < credit) and belongs to each specific client
        const { CustomerID } = repaymentUpload
        const customerSummaries: ICustomerSummary[] = await this.customerSummaryService.find({CustomerID: CustomerID});
      }));

      const result = <ICustomerSummary[]>(
        await this.customerSummaryService.find({})
      );

      return this.CustomResponse.success(
        res,
        result,
        "DATA FETCHED SUCCESSFULLY",
      );
    } catch (error) {
      throw error;
    }
  }
}
