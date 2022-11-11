const Joi = require('joi');
const { number } = require('joi');

module.exports.cashSchema = Joi.object({
    cash: Joi.object({
        to: Joi.string().required(),
        amount: Joi.number().required().min(0),
        description: Joi.string().required(),
        description: Joi.string().required()
    }).required()
});

