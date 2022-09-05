export default function sumAmounts(amount:any){
    let totalAmount = 0;
    for(const v of amount){
        totalAmount += v.amount;
    }
    return totalAmount;
}