import {Model, Table, Column, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { ICustomer } from '../../../../services/interfaces/schemasinterfaces';

@Table
export class Customer extends Model implements ICustomer {
    @AutoIncrement
    @PrimaryKey
    @Column
    CustomerID: number;

    @Column
    CustomerName: string;
}