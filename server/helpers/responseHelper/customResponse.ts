import {Response} from 'express';
import {injectable} from 'inversify'
import {IResponse} from './reponseInterface'

@injectable()
export class CustomResponse implements IResponse {
    success(res: Response, data: object, message='success', status = 200): Response {
        return res.status(status).json({status, message, data})
    };

    conflict(res: Response, message='record already exist') {
        return res.status(409).json({status: 409, error: 'conflict', message});
    }

    notFound(res: Response, message: any) {
        return res.status(404).json({status: 404, error: 'Resource is not found', message});
    }

    badMethod(res: Response, message: 'wrong http verb') {
        return res.status(405).json({status: 405, error: 'use of wrong verb', message});
    }

    unAuthorized(res: Response, message = 'you are not authorized') {
        return res.status(401).json({status: 401, error: 'unauthorized', message});
    }

    forbidden(res: Response, message: 'you are not allowed to perform this task') {
        return res.status(403).json({status: 403, error: 'forbidden', message});
    }
}