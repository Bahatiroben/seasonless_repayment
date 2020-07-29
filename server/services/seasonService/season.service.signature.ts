import { ISeason } from "../interfaces/schemasinterfaces";

export interface ISeasonServiceInterface {
  find(where?: any): Promise<ISeason | ISeason[]>;

  bulkCreate(seasons: ISeason[]): Promise<ISeason>;

  update(season: ISeason, where: any): Promise<number[]>;
}
