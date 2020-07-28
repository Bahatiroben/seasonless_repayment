import { Container} from 'inversify';
import {IResponse, responseType, CustomResponse} from './responseHelper/index'

const CHelpersContainer = new Container();

CHelpersContainer.bind<IResponse>(responseType).to(CustomResponse);

export default CHelpersContainer;