import { Request, Response } from "express";
import * as cardServices from '../services/cardServices';
import * as cvcUtils from '../../utils/cvcGenerator';
import sumDate from '../../utils/sumYearDate';
import transformInitials from '../../utils/transformName';
import cardGernerator from '../../utils/cardNumberGenerator';
import * as activationService from '../services/activationServices';
import * as blockService from '../services/BlockCardServices';
import { getCardById } from "../services/paymentService";


export async function cardCreation(req: Request, res: Response){
    let newKey = '';
    const {employeeId,
        password,
        isVirtual,
        originalCardId,
        isBlocked,
        type} = req.body;
    if(req.headers["x-api-key"] !== undefined){
        newKey =  req.headers["x-api-key"].toString();
    }
    const containsApi = await cardServices.containsApiKey(newKey);
    await cardServices.validEmployee(employeeId, containsApi);
    await cardServices.employeeHaveType(type, employeeId);
    const cvc = cvcUtils.newCvcCrypted();
    const expirationDate = sumDate();
    const cardholderName =  await cardServices.getName(employeeId);
    const cardName = transformInitials(cardholderName);
    const number = cardGernerator();
    const cardInfo ={
        employeeId: employeeId,
        number: number,
        cardholderName: cardName,
        securityCode: cvc,
        expirationDate:expirationDate,
        password:password,
        isVirtual:isVirtual,
        originalCardId:originalCardId,
        isBlocked:isBlocked,
        type:type
    }
    await cardServices.insertCard(cardInfo)
    cardInfo.securityCode = cvcUtils.decryptCvc(cardInfo.securityCode);
    res.status(201).send(cardInfo);
    return;
}

export async function cardActivation(req : Request, res: Response){
    const {securityCode, password, number, cardholderName, expirationDate} = req.body

    const card = await activationService.checkCardExists(number, cardholderName, expirationDate);
    await activationService.cardDateValidate(card);
    await activationService.passwordExists(card);
    await activationService.validateCvc(card, securityCode);
    await activationService.activateCard(card, password);
    res.status(201).send(card);
    return;
}

export async function blockCard(req: Request, res: Response){
    const {password, number, cardholderName, expirationDate} = req.body

    const card = await activationService.checkCardExists(number, cardholderName, expirationDate);
    await activationService.cardDateValidate(card);
    await blockService.blockedCard(card);
    await blockService.checkPassowrd(card, password);
    await blockService.changeBlockStatus('block', card);
    res.status(201).send(card);
}

export async function unblockCard(req: Request, res: Response){
    const {password, number, cardholderName, expirationDate} = req.body

    const card = await activationService.checkCardExists(number, cardholderName, expirationDate);
    await activationService.cardDateValidate(card);
    await blockService.NotBlockedCard(card);
    await blockService.checkPassowrd(card, password);
    await blockService.changeBlockStatus('unblock', card);
    res.status(201).send(card);
}

export async function showCardTransactions (req: Request, res:Response){
    const cardId = parseInt(req.params.id);
    await getCardById(cardId);
    const cardInfo = await cardServices.showCardInfo(cardId);
    res.status(200).send(cardInfo);
}