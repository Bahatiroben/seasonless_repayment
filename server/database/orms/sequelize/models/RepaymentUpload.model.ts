import {Model, Table, Column, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { IRepaymentUpload } from '../../../../services/interfaces/schemasinterfaces';

@Table
export class RepaymentUpload extends Model implements IRepaymentUpload {
    @AutoIncrement
    @PrimaryKey
    @Column
    RepaymentUploadId: number;

    @Column
    CustomerID: number;

    @Column
    SeasonID: number;

    @Column
    Amount: number;

    @Column
    Date: Date;
} 