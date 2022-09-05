export default function formatTimestamp (data :any){
    let aux = [];
    let aux2 = [];
    if(data.length > 0){
        const newData = [...data];
        for(const v of newData){
            aux = v.timestamp.toISOString().split('T');
            aux2 = aux[0].split('-');
            v.timestamp = aux2[2] + '/' +aux2[1] + '/' +aux2[0];
        }
        return newData;
    }
    return 'error';
}