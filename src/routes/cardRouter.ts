import { Router } from "express";
import { cardCreation, cardActivation, blockCard, unblockCard,showCardTransactions } from "../controllers/cardController";
import {validateCardType} from '../middlewares/cardTypeValidation';
import joiValidation from "../middlewares/joiValidation";
import cardSchema from "../schemas/cardSchema";
import blockSchema from '../schemas/blockSchema';
import activationSchema from "../schemas/activationSchema";

const cardRouter = Router();
cardRouter.post('/card',validateCardType,joiValidation(cardSchema),cardCreation);
cardRouter.post('/card/activation',joiValidation(activationSchema),cardActivation);
cardRouter.post('/card/block',joiValidation(blockSchema), blockCard);
cardRouter.post('/card/unblock',joiValidation(blockSchema), unblockCard);
cardRouter.get('/card/:id', showCardTransactions);

export default cardRouter;