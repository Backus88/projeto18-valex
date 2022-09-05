import joi from 'joi'

const paymentSchema = joi.object({
    password: joi.string().regex(/^([0-9]{4})$/),
    cardId: joi.number().min(1).required(),
    businessId: joi.number().min(1).required(),
    amount: joi.number().min(0).required()
});
export default paymentSchema;