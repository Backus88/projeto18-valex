import joi from 'joi'

const blockSchema = joi.object({
    password: joi.string().regex(/^([0-9]{4})$/),
    number: joi.string().required(),
    cardholderName:joi.string().required(),
    expirationDate: joi.string().required()
});
export default blockSchema;