import {Model, Table, Column, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { IRepaymentUpload } from '../../../../services/interfaces/schemasinterfaces';

@Table
export class RepaymentUpload extends Model implements IRepaymentUpload {
    @AutoIncrement
    @PrimaryKey
    @Column
    repaymentUploadId: number;

    @Column
    customerId: number;

    @Column
    seasonId: number;

    @Column
    amount: number;

    @Column
    date: Date;
} 