import { Container } from "inversify";
import { SERVICESTYPES } from "../types";
import {ISeasonServiceInterface, SeasonService} from "../index";

const DServiceContainer = new Container();

DServiceContainer.bind<ISeasonServiceInterface>(SERVICESTYPES.seasonService).to(SeasonService);

export default DServiceContainer;
