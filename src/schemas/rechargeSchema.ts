import joi from 'joi'

const rechargeSchema = joi.object({
    amount: joi.number().min(0).required(),
    employeeId: joi.number().min(1).required(),
    type: joi.string().required()
});
export default rechargeSchema;