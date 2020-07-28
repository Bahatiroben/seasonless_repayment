import {Model, Table, Column, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { ISeason } from '../../../../services/interfaces/schemasinterfaces';

@Table
export class Season extends Model implements ISeason {
    @AutoIncrement
    @PrimaryKey
    @Column
    seasonId: number;

    @Column
    seasonName: string;

    @Column
    startDate: Date;

    @Column
    endDate: Date;
}