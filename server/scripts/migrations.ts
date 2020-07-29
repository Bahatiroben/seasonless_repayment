import {sequelizeInstance} from '../database/orms/sequelize/sequelizeInstance';
// import { SeasonService } from '../services/index';
// import { ContainerFactory } from '../globalIoC/index';
// import { databaseType } from '../database/databaseTypes';

// export const Container = ContainerFactory.config();
sequelizeInstance.migrate(true)