import {Container} from 'inversify';

import CDatabaseContainer from '../database/databaseIoC';
import  CHelpersContainer from '../helpers/helpersContainer';
import CServicesContainer from '../services/servicesIoC/serviceContainer'

export const allContainers: Container[] = [
    CDatabaseContainer,
    CHelpersContainer,
    CServicesContainer
]