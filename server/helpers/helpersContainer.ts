import { Container} from 'inversify';
import {IResponse, responseType, CustomResponse} from './responseHelper/index'
import {IPassword, passwordType, Password} from './passwordHelper/index';
import {IAuthHelper, authType, Authentication} from './authHelper';

const CHelpersContainer = new Container();

CHelpersContainer.bind<IResponse>(responseType).to(CustomResponse);
CHelpersContainer.bind<IPassword>(passwordType).to(Password);
CHelpersContainer.bind<IAuthHelper>(authType).to(Authentication);

export default CHelpersContainer;