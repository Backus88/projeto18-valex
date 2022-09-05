import { Router } from "express";
import {paymentController} from '../controllers/paymentController'

const paymentRouter = Router();
paymentRouter.post('/payment',paymentController);


export default paymentRouter;