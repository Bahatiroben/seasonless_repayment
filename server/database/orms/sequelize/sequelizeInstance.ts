import {SequelizeInstanceFactory} from './index';
import * as models from './models/index';

export const sequelizeInstance: SequelizeInstanceFactory = new SequelizeInstanceFactory({
    dialect: 'postgres',
    models: Object.values(models),
    logging: false // console.log,
});
