import * as Joi from 'joi';

export const generalSchema = {
    string: Joi
                .string()
                .trim()
                .min(3),
    password: Joi
                .string()
                .min(8)
                .required(),
    email: Joi
            .string()
            .email()
            .required(),
    longString: Joi
                    .string()
                    .min(30)
                    .required(),
    imageUrl: Joi
                .string(),
    date: Joi.date()
}