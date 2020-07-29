import {Model, Table, Column, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { ICustomerSummary } from '../../../../services/interfaces/schemasinterfaces';

@Table
export class CustomerSummary extends Model implements ICustomerSummary {
    @PrimaryKey
    @Column
    CustomerID: number;

    @PrimaryKey
    @Column
    SeasonID: number;

    @Column
    Credit: number;

    @Column
    TotalRepaid: number;
}
