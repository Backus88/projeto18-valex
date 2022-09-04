import joi from 'joi'

const cardSchema = joi.object({
    employeeid: joi.number().required(),
    isVirtual: joi.boolean().required(),
    isBlocked: joi.boolean().required(),
    type: joi.string().required()
});
export default cardSchema;