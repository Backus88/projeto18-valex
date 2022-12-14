import joi from 'joi'

const activationSchema = joi.object({
    password: joi.string().regex(/^([0-9]{4})$/),
    number: joi.string().required(),
    cardholderName:joi.string().required(),
    securityCode: joi.string().regex(/^([0-9]{3})$/),
    expirationDate: joi.string().required()
});
export default activationSchema;