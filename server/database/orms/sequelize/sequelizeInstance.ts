import {SequelizeInstanceFactory} from './index';
import * as models from './models/index';
import * as path from 'path';

const dbLink = path.join(__dirname, '../../../../', 'data.db');
console.log("Running the migrations");
export const sequelizeInstance: SequelizeInstanceFactory = new SequelizeInstanceFactory({
    dialect: 'sqlite',
    models: Object.values(models),
    storage: dbLink,
    logging: false // console.log,
});