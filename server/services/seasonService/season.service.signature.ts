import { ISeason } from "../interfaces/schemasinterfaces";

export interface ISeasonServiceInterface {
  find(where?: any): Promise<ISeason | ISeason[]>;

  create(user: ISeason): Promise<ISeason>;

  update(user: ISeason, where: any): Promise<number[]>;
}
