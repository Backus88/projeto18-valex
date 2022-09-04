import { Card, CardUpdateData, update, findByCardDetails } from "../repositories/cardRepository";
import {notFoundError, notValidEntrie, notPossibleOperation, notAuthorized} from '../../utils/errorFunctions';
import dayjs from "dayjs";
import * as cvcUtils from '../../utils/cvcGenerator';
import * as cryptUtils from '../../utils/genericCryptAndDecrypt';

export async function checkCardExists(number:string, cardholderName: string, expirationDate: string){
    const card = await findByCardDetails(number, cardholderName, expirationDate);
    if(!card){
        throw notFoundError('cardId');
    }
    return card
}

export async function cardDateValidate(card: Card){
    const actualDate = dayjs().format('MM/YY');
    const splitDateCard = card.expirationDate.split('/');
    const splitDateNow = actualDate.split('/')
    if(splitDateNow[1]> splitDateCard[1]){
        throw notValidEntrie('expirationDate');
    }
    if(splitDateNow[1]=== splitDateCard[1]){
        if(splitDateNow[0]> splitDateNow[0]){
            throw notValidEntrie('expirationDate');
        }
    }
    return 'ok'
}

export async function passwordExists(card: Card){
    if(card.password){
        throw notPossibleOperation('password');
    }
    return 'ok';
}
export async function validateCvc(card: Card, securityCode:string){
    const decryptedCvc = cvcUtils.decryptCvc(card.securityCode);
    console.log(decryptedCvc);
    console.log(securityCode);
    if(decryptedCvc !== securityCode){
        throw notAuthorized ('securityCode');
    }
    return 'ok';
}

export async function activateCard(card: Card, password:string){
    const cryptedPassword = cryptUtils.crypt(password);
    const updateStatus : CardUpdateData= {
        password: cryptedPassword,
        isBlocked: false
    }
    await update(card.id, updateStatus);
}