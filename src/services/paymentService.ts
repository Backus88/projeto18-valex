import {Card, findById} from '../repositories/cardRepository';
import {notFoundError, notPossibleOperation, notValidEntrie} from '../../utils/errorFunctions';
import { decrypt } from '../../utils/genericCryptAndDecrypt';
import {findById as findByBusinessId, Business} from '../repositories/businessRepository';
import { findByCardId as byRechargeId } from '../repositories/rechargeRepository';
import { findByCardId as byPaymentId, PaymentInsertData, insert } from '../repositories/paymentRepository';
import sumAmounts from '../../utils/sumAmounts';

export async function getCardById (cardId: number){
    const card = await findById(cardId);
    if(!card){
        throw notFoundError('card');
    }
    return card;
}

export async function comparePassword(card:Card, password:string){
    if(!card.password){
        throw notPossibleOperation('password');
    }
    if(decrypt(card.password) !== password){
        throw notFoundError('password');
    }
    return 'ok';
}

export async function checkBusiness(businessId: number){
    const data = await findByBusinessId(businessId);
    if(!data){
        throw notFoundError('businessId');
    }
    return data;
}

export async function checkTypesMatch(card: Card, business: Business ){
    if(card.type !== business.type){
        throw notValidEntrie('type');
    }
    return 'ok';
}

export async function checkBalance(card: Card, amount: number){
    const payments = await byPaymentId(card.id);
    const recharges = await byRechargeId(card.id);
    const amountPayments = sumAmounts(payments);
    const amountRecharges = sumAmounts(recharges);
    if(amountPayments + amount > amountRecharges){
        throw notPossibleOperation('insuficient balance');
    }
    return 'ok';
}
export async function insertPayment (data : PaymentInsertData){
    await insert(data);
    return 'ok';
}