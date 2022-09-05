import { findByApiKey, Company } from "../repositories/companyRepository";
import { findById} from "../repositories/employeeRepository";
import { findByTypeAndEmployeeId, TransactionTypes, insert, CardInsertData } from "../repositories/cardRepository";
import {notFoundError, notValidEntrie, notPossibleOperation} from '../../utils/errorFunctions';
import { findByCardId as byRechargeId } from '../repositories/rechargeRepository';
import { findByCardId as byPaymentId} from '../repositories/paymentRepository';
import sumAmounts from "../../utils/sumAmounts";
import formatTimestamp from "../../utils/formatTimestamp";

export async function containsApiKey (apiKey : string){
    const thereIsApi = await findByApiKey(apiKey);
    if(!thereIsApi){
        throw notFoundError('Api-key');
    }
    return thereIsApi;
}

export async function validEmployee (employeeId : number, companyTable: Company){
    const thereIsEmployee  = await findById(employeeId);
    if(!thereIsEmployee){
        throw notFoundError('Invalid Employee');
    }
    if(thereIsEmployee.companyId === companyTable.id ){
        return "ok"
    }else{
        throw notFoundError('Employee');
    }

}

export async function employeeHaveType(type : TransactionTypes ,employeeId: number){
    const thereIsCardType = await findByTypeAndEmployeeId(type, employeeId);
    if(thereIsCardType){
        throw notPossibleOperation('Card type');
    }
    return "ok";
}

export async function insertCard(cardInfos: CardInsertData ){
    await insert(cardInfos);
    return 'ok';
}

export async function getName (employeeId : number){
    const name =  await findById(employeeId);
    if(!name){
        throw notFoundError('employee');
    }
    return name.fullName
}

export async function showCardInfo(cardId: number){
    const paymentInfo = await byPaymentId(cardId);
    const rechargeInfo = await byRechargeId(cardId);
    const paymentAmount = sumAmounts(paymentInfo);
    const rechargeAmount = sumAmounts(rechargeInfo);
    let newPaymentInfo = formatTimestamp(paymentInfo);
    let newRechargeInfo = formatTimestamp(rechargeInfo);
    if(newPaymentInfo === 'error'){
        newPaymentInfo = paymentInfo;
    }
    if(newRechargeInfo === 'error'){
        newRechargeInfo = rechargeInfo;
    }
    const dataTransactions = {
        balance: rechargeAmount - paymentAmount,
        transactions: newPaymentInfo,
        recharges: newRechargeInfo
    }
    return dataTransactions;
}


