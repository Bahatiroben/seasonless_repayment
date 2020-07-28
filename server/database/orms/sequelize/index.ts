import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import {QueryOptions} from 'sequelize';
import * as config from '../../../configVars';
const {NODE_ENV, DATABASE_URL, DEV_DATABASE_URL, TEST_DATABASE_URL} = config;

const connectionString: string  = NODE_ENV === 'production' ? DATABASE_URL : NODE_ENV === 'test' ? TEST_DATABASE_URL : DEV_DATABASE_URL;
export class SequelizeInstanceFactory extends Sequelize{
 constructor(seqOptions: SequelizeOptions, uri: string = connectionString){
    super(uri, seqOptions)
 }

 async migrate() {
    try {
        this.sync({force:  NODE_ENV === 'test'});
        this.sync();
        console.log("connectionString", connectionString);
    } catch(error) {
        console.log(error)
        throw error; 
    } 
 }
}