import {Model, Table, Column, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { IRepayment } from '../../../../services/interfaces/schemasinterfaces';

@Table
export class Repayment extends Model implements IRepayment {
    @PrimaryKey
    @Column
    repaymentId: number;

    @Column
    customerId: number;

    @Column
    seasonId: number;

    @Column
    amount: number;

    @Column
    parentId: number;

    @Column
    date: Date;
}