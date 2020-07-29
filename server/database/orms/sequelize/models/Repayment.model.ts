import {Model, Table, Column, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { IRepayment } from '../../../../services/interfaces/schemasinterfaces';

@Table
export class Repayment extends Model implements IRepayment {
    @AutoIncrement
    @PrimaryKey
    @Column
    RepaymentID: number;

    @Column
    CustomerID: number;

    @Column
    SeasonID: number;

    @Column
    Amount: number;

    @Column
    ParentID: number;

    @Column
    Date: Date;
}