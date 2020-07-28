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
