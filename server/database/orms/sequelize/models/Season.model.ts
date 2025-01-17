import {Model, Table, Column, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { ISeason } from '../../../../services/interfaces/schemasinterfaces';

@Table
export class Season extends Model implements ISeason {
    @AutoIncrement
    @PrimaryKey
    @Column
    SeasonID: number;

    @Column
    SeasonName: string;

    @Column
    StartDate: Date;

    @Column
    EndDate: Date;
}