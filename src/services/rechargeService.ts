import { notPossibleOperation, notFoundError } from "../../utils/errorFunctions";
import { Card, TransactionTypes, findByTypeAndEmployeeId } from "../repositories/cardRepository";
import {insert} from '../repositories/rechargeRepository'


export async function findCard(employeeId: number, type:TransactionTypes ){
    const card = await findByTypeAndEmployeeId(type, employeeId);
    if(!card){
        throw notFoundError('card');
    }
    return card;
}

export async function existPassword(card: Card){
    if(!card.password){
        throw notPossibleOperation('password');
    }
    return 'ok';
}

export async function insertAmount(card:Card, amount: number){
    const rechargeConfig ={
        cardId: card.id,
        amount: amount
    }
    await insert(rechargeConfig);
    return 'ok';
}