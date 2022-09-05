import { Router } from "express";
import { rechargeCard } from "../controllers/rechargeController";
import {validateCardType} from '../middlewares/cardTypeValidation';
import joiValidation from "../middlewares/joiValidation";
import rechargeSchema from '../schemas/rechargeSchema';

const rechargeRouter = Router();
rechargeRouter.post('/recharge',validateCardType,joiValidation(rechargeSchema),rechargeCard);


export default rechargeRouter;