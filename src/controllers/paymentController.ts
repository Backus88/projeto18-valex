import { Request, Response } from "express";
import * as paymentService from '../services/paymentService';
import {existPassword} from '../services/rechargeService';
import {cardDateValidate} from '../services/activationServices';
import * as blockService from '../services/BlockCardServices';

export async function paymentController(req: Request, res: Response){
    const {password, cardId, businessId, amount} = req.body;
    const card = await paymentService.getCardById(cardId);
    await existPassword(card);
    await cardDateValidate(card);
    await blockService.blockedCard(card);
    await paymentService.comparePassword(card, password);
    const business = await paymentService.checkBusiness(businessId);
    await paymentService.checkTypesMatch(card, business);
    await paymentService.checkBalance(card, amount);
    
    const dataPayment={
        cardId:cardId,
        amount:amount,
        businessId:businessId
    }
    await paymentService.insertPayment(dataPayment);
    res.status(201).send(dataPayment);
    return;
}