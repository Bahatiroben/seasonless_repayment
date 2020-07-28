import { Schema } from 'joi';
import { Response, NextFunction } from 'express';
import { CustomResponse, IResponse} from '../../helpers/responseHelper';

export default function validate(ObjectToValidate: object, schema: Schema, res: Response, next: NextFunction) {
    const {error} = schema.validate(ObjectToValidate);
    const Response: IResponse = new CustomResponse()
    if(error) {
        return Response.validationError(res, error.message);
    }
    next();
}