import { ICustomerServiceInterface,
  ICustomerSummaryServiceInterface,
  IRepaymentServiceInterface,
  IRepaymentUploadServiceInterface,
  RepaymentService,RepaymentUploadService,
  CustomerService,CustomerSummaryService
 } from "../../services/index";
 import { sequelizeInstance } from '../../database/orms/sequelize/sequelizeInstance';
 import { databaseType } from '../../database/databaseTypes';

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
import { SequelizeInstanceFactory } from "../../database/orms/sequelize";

@controller("/repayments-upload")
export class RepaymentUploadController {

  @inject(SERVICESTYPES.customerSummaryService)
  protected customerSummaryService: ICustomerSummaryServiceInterface;

  @inject(responseType)
  protected CustomResponse: IResponse;

  @inject(SERVICESTYPES.repaymentService)
  protected repaymentService: IRepaymentServiceInterface

  @inject(databaseType)
  protected database: SequelizeInstanceFactory

  @inject(SERVICESTYPES.repaymentUploadService)
  protected repaymentUploadService: IRepaymentUploadServiceInterface

  @httpPost("/") //insert the middlewares for validations and a middleware to parse an excell file // no auth needed
  async uploadRepayments(req: Request, res: Response): Promise<Response> {
    try {
      const repaymentRecords: IRepayment[] = [];
      const repaymentsUploads: IRepaymentUpload[] = (req as any).repaymentsUpload || req.body;
      const repaymentErrors: IRepaymentError[] = [];

      await Promise.all(

      repaymentsUploads.map(async repaymentUpload => {
        // TODO get all customer summaries with debts (repaid < credit) and belongs to each specific client
        this.repaymentUploadService.create(repaymentUpload);
        const { CustomerID, SeasonID } = repaymentUpload
        // start with the overide where SeasonID is specified by the user
        if(SeasonID) {
          try {
          const customerSummaries: ICustomerSummary[] = await this.customerSummaryService.find({CustomerID, SeasonID });
          if(customerSummaries) {
            // if the cutomer summary does exist (the specified user has  purchased something in the specified season)
            // update the customer Summary
            const customerSummary = (customerSummaries as any).dataValues;
            customerSummary.TotalRepaid = customerSummary.TotalRepaid + repaymentUpload.Amount;
            this.customerSummaryService.update(customerSummary, { CustomerID, SeasonID });
            // make the repayment record (remember only 1 record for overide);
            const repaymentRecord: IRepayment = {
              CustomerID: repaymentUpload.CustomerID,
              SeasonID: repaymentUpload.SeasonID,
              Date: repaymentUpload.Date,
              Amount: repaymentUpload.Amount,
            }

            const record = await this.repaymentService.create(repaymentRecord);
            repaymentRecords.push(record)
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
        }else {
          const currentRepaymentUpload: IRepaymentUpload = {...repaymentUpload};
          const sql = `SELECT summary.CustomerID, summary.Credit, summary.TotalRepaid, season.SeasonID, season.StartDate
            FROM CustomerSummaries as summary INNER JOIN Seasons as season ON summary.SeasonID = season.SeasonID
            WHERE summary.CustomerID = ${CustomerID} AND (summary.TotalRepaid < summary.Credit OR season.StartDate = (SELECT MAX(StartDate) FROM Seasons)) 
            ORDER BY season.StartDate ASC;`
            const result = await this.database.query(sql);

          //  const result = this.database.query({query: sql, values: [CustomerID]})
          const customerSummaries: ICustomerSummary[] = (result[0] as any); // assumes that this array is sorted by startDate from the oldest[0] to the newest[n-1] 
            const PRepaymentRecord: IRepayment = {
              CustomerID: currentRepaymentUpload.CustomerID,
              SeasonID: customerSummaries[0].SeasonID,
              Date: currentRepaymentUpload.Date,
              Amount: currentRepaymentUpload.Amount, // apply the full initial repayment
            }

            const record = await this.repaymentService.create(PRepaymentRecord);
            const debt = customerSummaries[0].Credit - customerSummaries[0].TotalRepaid
            const balance = currentRepaymentUpload.Amount - debt;
            let customerSummary: ICustomerSummary = customerSummaries[0];

            if( debt <= 0) {
              customerSummary.TotalRepaid = customerSummary.TotalRepaid + currentRepaymentUpload.Amount;
              currentRepaymentUpload.Amount = 0;
            } else {
              currentRepaymentUpload.Amount = balance;
              customerSummary.TotalRepaid = customerSummary.TotalRepaid + currentRepaymentUpload.Amount
            }
            this.customerSummaryService.update((customerSummary as any).dataValues, { CustomerID: currentRepaymentUpload.CustomerID, SeasonID: customerSummary.SeasonID });

            const ParentID = (record as any).dataValues.RepaymentID;
            if(balance > 0 && debt > 0) {
            const NRepaymentRecord: IRepayment = {
              CustomerID: currentRepaymentUpload.CustomerID,
              SeasonID: customerSummaries[0].SeasonID,
              Date: currentRepaymentUpload.Date,
              Amount: currentRepaymentUpload.Amount * -1,
              ParentID
            }
            // await this.repaymentService.create(NRepaymentRecord);
            repaymentRecords.push(NRepaymentRecord);
            customerSummaries.shift()
          }
            // start on customer summaries that remains can use loops since I wont need any async
            // remaining implementation should be here
              while(currentRepaymentUpload.Amount > 0 && customerSummaries.length > 0) {
                customerSummary = customerSummaries[0];
                const PRepaymentRecord: IRepayment = {
                  CustomerID: currentRepaymentUpload.CustomerID,
                  SeasonID: customerSummary.SeasonID,
                  Date: currentRepaymentUpload.Date,
                  Amount: currentRepaymentUpload.Amount,
                  ParentID
                }
                repaymentRecords.push(PRepaymentRecord);
                const debt = customerSummary.Credit - customerSummary.TotalRepaid
                const balance = currentRepaymentUpload.Amount - debt;
                if( debt <= 0) {
                  customerSummary.TotalRepaid = customerSummary.TotalRepaid + currentRepaymentUpload.Amount;
                  currentRepaymentUpload.Amount = 0;
                } else {
                  currentRepaymentUpload.Amount = balance;
                  customerSummary.TotalRepaid = customerSummary.TotalRepaid + currentRepaymentUpload.Amount
                }
                this.customerSummaryService.update((customerSummary as any).dataValues, { CustomerID: currentRepaymentUpload.CustomerID, SeasonID: customerSummary.SeasonID });

                if(balance > 0 && debt > 0) {
                const ParentID = (record as any).dataValues.RepaymentID
                const NRepaymentRecord: IRepayment = {
                  CustomerID: currentRepaymentUpload.CustomerID,
                  SeasonID: customerSummary.SeasonID,
                  Date: currentRepaymentUpload.Date,
                  Amount: currentRepaymentUpload.Amount * -1,
                  ParentID
                }
                repaymentRecords.push(NRepaymentRecord);
                customerSummaries.shift();
                }
              }

              this.repaymentService.bulkCreate(repaymentRecords);
              repaymentRecords.unshift(record)
            }
          }
      ));

      return this.CustomResponse.success(
        res,
        {errors: repaymentErrors, repaymentRecords},
        repaymentErrors[0] ? 'Repayments applied with errors': 'Repayments applied without errors',
      );
    } catch (error) {
      throw error;
    }
  }
}
