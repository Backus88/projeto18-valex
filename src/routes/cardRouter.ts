import { Router } from "express";
import { cardCreation } from "../controllers/cardController";
import {validateCardType} from '../middlewares/cardTypeValidation'

const cardRouter = Router();
cardRouter.post('/card',validateCardType,cardCreation);

export default cardRouter;