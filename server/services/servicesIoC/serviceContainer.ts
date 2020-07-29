import { Container } from "inversify";
import { SERVICESTYPES } from "../types";
import {
    ISeasonServiceInterface,
    ICustomerServiceInterface, 
    IRepaymentServiceInterface, 
    IRepaymentUploadServiceInterface, 
    ICustomerSummaryServiceInterface,
    SeasonService, 
    RepaymentService, 
    RepaymentUploadService, 
    CustomerService, 
    CustomerSummaryService} from "../index";

const CservicesContainer = new Container();

CservicesContainer.bind<ISeasonServiceInterface>(SERVICESTYPES.seasonService).to(SeasonService);
CservicesContainer.bind<ICustomerServiceInterface>(SERVICESTYPES.customerService).to(CustomerService);
CservicesContainer.bind<IRepaymentServiceInterface>(SERVICESTYPES.repaymentService).to(RepaymentService);
CservicesContainer.bind<IRepaymentUploadServiceInterface>(SERVICESTYPES.repaymentUploadService).to(RepaymentUploadService);
CservicesContainer.bind<ICustomerSummaryServiceInterface>(SERVICESTYPES.customerSummaryService).to(CustomerSummaryService);

export default CservicesContainer;
