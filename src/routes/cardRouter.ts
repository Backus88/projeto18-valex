import { Router } from "express";
import { cardCreation, cardActivation, blockCard, unblockCard,showCardTransactions } from "../controllers/cardController";
import {validateCardType} from '../middlewares/cardTypeValidation';


const cardRouter = Router();
cardRouter.post('/card',validateCardType,cardCreation);
cardRouter.post('/card/activation',cardActivation);
cardRouter.post('/card/block', blockCard);
cardRouter.post('/card/unblock', unblockCard);
cardRouter.get('/card/:id', showCardTransactions);

export default cardRouter;