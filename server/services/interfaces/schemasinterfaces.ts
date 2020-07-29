
export interface ICustomer {
    CustomerID: number;
    CustomerName: string
}

export interface ISeason {
    SeasonID: number;
    SeasonName: string;
    StartDate: Date;
    EndDate?: Date;
}

export interface ICustomerSummary {
    CustomerID: number;
    SeasonID: number;
    TotalRepaid: number;
    Credit: number;
}

export interface IRepayment {
    RepaymentID?: number;
    CustomerID: number;
    SeasonID: number;
    Date: Date;
    Amount: number;
    ParentID?: number;
}

export interface IRepaymentUpload {
    CustomerID: number;
    SeasonID?: number;
    Date: Date;
    Amount: number;
}

export interface IRepaymentError {
    message: string;
    reason: string
}