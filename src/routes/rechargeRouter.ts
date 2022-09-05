import { Router } from "express";
import { rechargeCard } from "../controllers/rechargeController";
import {validateCardType} from '../middlewares/cardTypeValidation';

const rechargeRouter = Router();
rechargeRouter.post('/recharge',rechargeCard);


export default rechargeRouter;