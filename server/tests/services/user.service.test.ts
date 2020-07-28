import {expect, should, use as useChai} from 'chai'
import DServiceContainer from '../../services/servicesIoC/serviceContainer'
import { SERVICESTYPES } from '../../services/types';
import { IUserServiceInterfacee } from '../../services/userServices/user.service.signature';
import { IUser } from 'services/interfaces/schemasinterfaces';
import { UserService } from '../../services/userServices/user.services';
import { databaseType } from '../../database/databaseTypes'
import CDatabaseContainer from '../../database/databaseIoC'
import {SequelizeInstanceFactory} from '../../database/orms/sequelize/index'
import * as sinon from 'sinon';
import * as sinonchai from 'sinon-chai';
require('bluebird');

useChai(sinonchai)
const database: SequelizeInstanceFactory = CDatabaseContainer.get(databaseType)

describe('initial test', () => {
    beforeEach(() => {
        sinon.restore()
    });
    it('it should create a user', () => {
        const mockUser: IUser = {
            firstName: "Bahati",
            lastName: "Robben",
            email: "bahati@robben.com",
            password: "Root1123#"
        }
        const {User} = database.models
       const stub = sinon.stub(User, "create")
       const userService: IUserServiceInterfacee = new UserService(database);
       userService.create(mockUser);
       expect(User.create).to.have.been.calledWith(mockUser);
    });
});