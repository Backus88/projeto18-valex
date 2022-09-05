import { Card, update } from "../repositories/cardRepository";
import {notAuthorized, notPossibleOperation, notValidEntrie} from '../../utils/errorFunctions';
import * as cryptUtils from '../../utils/genericCryptAndDecrypt';

export async function blockedCard(card: Card){
    if(card.isBlocked){
        throw notPossibleOperation("Block Card");
    }
    return 'ok'
}
export async function NotBlockedCard(card: Card){
    if(!card.isBlocked){
        throw notPossibleOperation("unblocked Card");
    }
    return 'ok'
}

export async function checkPassowrd(card: Card, password: string){
    if(!card.password){
        throw notValidEntrie('card not activated');
    }
    if(cryptUtils.decrypt(card.password)!== password ){
        throw notAuthorized('password invalid');
    }
    return 'ok';
}

export async function changeBlockStatus(option: string, card: Card){
    if(option === 'block'){
        const changeStatus = {
            isBlocked: true
        };
        await update(card.id,changeStatus);
        return 'ok';
    }
    if(option === 'unblock'){
        const changeStatus = {
            isBlocked: false
        };
        await update(card.id,changeStatus);
        return 'ok';
    }
    throw notValidEntrie('option');
}