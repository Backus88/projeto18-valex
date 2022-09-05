import { Router } from "express";
import {paymentController} from '../controllers/paymentController';
import joiValidation from "../middlewares/joiValidation";
import paymentSchema from '../schemas/paymentSchema';

const paymentRouter = Router();
paymentRouter.post('/payment',joiValidation(paymentSchema),paymentController);


export default paymentRouter;