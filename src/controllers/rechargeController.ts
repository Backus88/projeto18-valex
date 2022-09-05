import { Request, Response } from "express";
import {cardDateValidate} from '../services/activationServices';
import { existPassword, insertAmount, findCard } from "../services/rechargeService";
import {containsApiKey, validEmployee} from '../services/cardServices'

export async function rechargeCard(req: Request, res: Response){
    let newKey = '';
    const {amount, employeeId, type} = req.body;
    if(req.headers["x-api-key"] !== undefined){
        newKey =  req.headers["x-api-key"].toString();
    }
    const containsApi = await containsApiKey(newKey);
    await validEmployee(employeeId, containsApi);
    const card = await findCard(employeeId, type);
    await existPassword(card);
    await cardDateValidate(card);
    await insertAmount(card, amount);
    res.status(201).send(card);
}