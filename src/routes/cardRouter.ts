import { Router } from "express";
import { cardCreation } from "../controllers/cardController";

const cardRouter = Router();
cardRouter.post('/card',cardCreation);

export default cardRouter;