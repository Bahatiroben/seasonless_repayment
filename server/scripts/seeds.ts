import { sequelizeInstance } from '../database/orms/sequelize/sequelizeInstance';
import { SeasonService, CustomerSummaryService, CustomerService } from '../services/index';
import { mockData } from './mockData'
import { ICustomer, ICustomerSummary } from 'services/interfaces/schemasinterfaces';

function makeDate (date: string) {
  const arrayDate = date.split('/');
  const month = Number(arrayDate[0]) < 10 ? `0${arrayDate[0]}`: arrayDate[0];
  const day = Number(arrayDate[1]) < 10 ? `0${arrayDate[1]}`:arrayDate[1] 
  const newDate = `${arrayDate[2]}` + '-' + month + '-' + day;
  const parsedDate = new Date(newDate);
  return parsedDate
}

const Seasons: any[] = mockData.Seasons;
const CustomerSummaries: ICustomerSummary[] = mockData.CustomerSummaries;
const Customers: ICustomer[] = mockData.Customers;

const seasons: any[] = Seasons.map(season => {
  const newSeason = {...season};
  newSeason.StartDate = makeDate(season.StartDate)
  return newSeason
})

const seasonService = new SeasonService(sequelizeInstance);
const customerService = new CustomerService(sequelizeInstance);
const customerSummaryService = new CustomerSummaryService(sequelizeInstance);

seasonService.bulkCreate(seasons)
customerService.bulkCreate(Customers);
customerSummaryService.bulkCreate(CustomerSummaries)
