import * as Joi from 'joi';
import { generalSchema } from './generalSchema';

export const userSignupSchema: Joi.Schema = Joi.object().keys({
    firstName: generalSchema.string.required(),
    lastName:generalSchema.string.required(),
    email: generalSchema.email,
    password: generalSchema.password,
    phoneNumber: generalSchema.string.optional(),
});

export const userLoginSchema: Joi.Schema = Joi.object().keys({
    email: generalSchema.email,
    password: generalSchema.password
})