import {Container} from 'inversify';
import {SequelizeInstanceFactory} from './orms/sequelize/index';
import {databaseType} from './databaseTypes';
import {sequelizeInstance} from './orms/sequelize/sequelizeInstance';

const CDatabaseContainer = new Container();
CDatabaseContainer.bind<SequelizeInstanceFactory>(databaseType).toConstantValue(sequelizeInstance);

export default CDatabaseContainer;