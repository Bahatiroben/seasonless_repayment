import {Model, Table, Column, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { ICustomerSummary } from '../../../../services/interfaces/schemasinterfaces';

@Table
export class CustomerSummary extends Model implements ICustomerSummary {
    @PrimaryKey
    @Column
    customerId: number;

    @Column
    seasonId: number;

    @Column
    totalCredit: number;

    @Column
    totalRepaid: number;
}
