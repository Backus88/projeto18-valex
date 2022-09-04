import { Router } from "express";
import { cardCreation, cardActivation } from "../controllers/cardController";
import {validateCardType} from '../middlewares/cardTypeValidation';


const cardRouter = Router();
cardRouter.post('/card',validateCardType,cardCreation);
cardRouter.post('/card/activation',cardActivation);

export default cardRouter;