import joi from 'joi'

const activationSchema = joi.object({
    password: joi.string().length(4).required()
});
export default activationSchema;