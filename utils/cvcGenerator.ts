import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr';

export function newCvcCrypted (){
    const cryptr = new Cryptr('newSalt');
    const newCvc = faker.finance.creditCardCVV();
    return cryptr.encrypt(newCvc);
}

export function decryptCvc(cryptedCvc : string){
    const cryptr = new Cryptr('newSalt');
    return cryptr.decrypt(cryptedCvc);
}


