import { Request, Response } from "express";
import * as cardServices from '../services/cardServices';
import * as cvcUtils from '../../utils/cvcGenerator';
import sumDate from '../../utils/sumYearDate';
import transformInitials from '../../utils/transformName';
import cardGernerator from '../../utils/cardNumberGenerator';


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
    res.status(200).send(cardInfo);
    return
}