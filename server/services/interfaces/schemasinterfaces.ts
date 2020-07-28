export interface ILoginUser {
    email: string,
    password: string
}

export interface IUser extends ILoginUser {
    id?: number;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
};

export interface ICustomer {
    customerId: number;
    customerName: string
}

export interface ISeason {
    seasonId: number;
    seasonName: string;
    startDate: Date;
    endDate: Date;
}

export interface IcustomerSummary {
    customerId: number;
    seasonId: number;
    totalRepaid: number;
    totalCredit: number;
}

export interface IRepayment {
    repaymentId: number;
    customerId: number;
    seasonId: number;
    date: Date;
    amount: number;
    parentId: number;
}

export interface IRepaymentUpload {
    customerId: number;
    seasonId?: number;
    date: Date;
    amount: number;
}