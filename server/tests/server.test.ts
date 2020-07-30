import { RepaymentUploadController} from '../controllers/repaymentsController/Repayments.controller';
import { ContainerFactory } from '../globalIoC/index';
import { Request, Response, NextFunction } from "express";
import { Container } from '../index'
import * as sinon from 'sinon';
import * as sinonchai from 'sinon-chai';
require('bluebird');
// export const Container = ContainerFactory.config();
// import './controllers/index';
// export const Container = ContainerFactory.config();

describe('test', () => {
    it('should test', () => {
        const repayments  = new RepaymentUploadController();
        
        repayments.uploadRepayments(Request as any, Response as any)
    })
})