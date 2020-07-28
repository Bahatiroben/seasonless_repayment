import { IUser } from "../interfaces/schemasinterfaces";

export interface IUserServiceInterfacee {
  find(where?: any): Promise<IUser | IUser[]>;

  create(user: IUser): Promise<IUser>;

  update(user: IUser, where: any): Promise<number[]>;
}
