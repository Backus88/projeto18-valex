import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr';


export function crypt (password: string){
    const cryptr = new Cryptr('newSalt');
    return cryptr.encrypt(password);
}

export function decrypt(password : string){
    const cryptr = new Cryptr('newSalt');
    return cryptr.decrypt(password);
}
