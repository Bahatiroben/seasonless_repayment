import {SequelizeInstanceFactory} from './database/orms/sequelize/index';
import * as models from './database/orms/sequelize/models/index';
import { SeasonService } from './services/index';
import { ContainerFactory } from './globalIoC/index';
import { databaseType } from './database/databaseTypes';
import * as dotenv from 'dotenv';
import * as moment from 'moment';
import * as cors from 'cors';
import * as path from 'path';
import * as express from 'express';

dotenv.config()

export const Container = ContainerFactory.config();
import './controllers/index';

export const sequelizeInstance: SequelizeInstanceFactory = Container.get(databaseType)
sequelizeInstance.migrate()

import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
// // start the server
let server = new InversifyExpressServer(Container);
server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(cors())
  app.use('/', express.static(path.join(__dirname, '../client/build')));
  app.get('/home', (req, res) => {
    res.status(200).json({status: 200, message: 'welcome to the server'});
  });
});
let app = server.build();
app.listen(process.env.PORT);
export default app;
console.log('Server started on port 3001 ---:)');

