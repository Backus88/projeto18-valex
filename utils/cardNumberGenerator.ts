import { faker } from '@faker-js/faker';

export default function cardGenerator(){
    return faker.finance.creditCardNumber();
}