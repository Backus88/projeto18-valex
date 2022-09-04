import joi from 'joi'

const cardSchema = joi.object({
    employeeid: joi.number().required(),
    number: joi.number().required(),
    cardholderName: joi.string().required(),
    secutiryCode: joi.string().required(),
    password: joi.string().required(),
    isVirtual: joi.string().required(),
    originalCardId: joi.number().required(),
    isBlocked: joi.boolean().required(),
    type: joi.string().required()
});